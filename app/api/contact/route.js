import { NextResponse } from 'next/server';

const recipient = 'yetuqahwah2020@gmail.com';

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';
  if (!name || name.length > 120 || !email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message || message.length > 10000) {
    return NextResponse.json({ error: 'Vérifie les champs du formulaire.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error('Contact email is not configured: set RESEND_API_KEY and CONTACT_FROM_EMAIL.');
    return NextResponse.json({ error: 'Envoi indisponible.' }, { status: 503 });
  }

  const result = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: email,
      subject: `Message du site Yetu Qahwah — ${name}`,
      text: `Nom : ${name}\nAdresse e-mail : ${email}\n\nMessage :\n${message}`,
    }),
  });

  if (!result.ok) {
    console.error('Contact email provider rejected the message:', result.status);
    return NextResponse.json({ error: 'Échec de l’envoi.' }, { status: 502 });
  }

  return NextResponse.json({ sent: true });
}

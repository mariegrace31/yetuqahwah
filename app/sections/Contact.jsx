'use client';

import Image from "next/image";
import React from "react";

function Contact({ content }) {
  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Message du site Yetu Qahwah — ${form.get('name')}`;
    const body = `Nom : ${form.get('name')}\nAdresse e-mail : ${form.get('email')}\n\nMessage :\n${form.get('message')}`;
    window.location.href = `mailto:yetuqahwah2020@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="contact" className="bg-yq_choc pt-14 pb-24 lg:pt-24 lg:pb-32 flex justify-center"
    >
      <div className="w-[100%] lg:w-[85%] flex justify-center items-center relative">

        <div className="w-[90%] md:w-[50%] lg:w-[40%] bg-yq_white1 p-5 md:p-7 lg:p-12 z-10 shadow-xl relative">
  
          <div className=" mb-5 lg:mb-10 text-center">
            <h1 className="text-[14px] md:text-[16px] lg:text-[20px] font-montserrat font-semibold text-yq_choc uppercase mb-3">
              {content.title}
            </h1>
            <p className="mx-auto max-w-md text-center text-yq_black text-[13px] md:text-[14px] lg:text-[16px] font-light leading-relaxed">
              {content.description}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:gap-6">
            <input
              name="name"
              type="text"
              placeholder="Nom"
              required
              className="border border-yq_lightchoc text-yq_main bg-yq_white1 px-4 py-1 lg:py-3 outline-none placeholder:text-[10px] md:placeholder:text-[13px] lg:placeholder:text-[16px] placeholder:text-yq_lightchoc"
            />
            <input
              name="email"
              type="email"
              placeholder="Adresse e-mail"
              required
              className="border bg-yq_white1 text-yq_main border-yq_lightchoc px-4 py-1 lg:py-3 outline-none placeholder:text-[10px] md:placeholder:text-[13px] lg:placeholder:text-[16px] placeholder:text-yq_lightchoc"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              required
              className="border bg-yq_white1 text-yq_main border-yq_lightchoc px-4 py-3 outline-none resize-none placeholder:text-[10px] md:placeholder:text-[13px] lg:placeholder:text-[16px] placeholder:text-yq_lightchoc"
            />
            <button
              type="submit"
              className="bg-yq_main font-medium text-[12px] md:text-[14px] lg:text-[16px] text-yq_white1 py-3 px-6 w-full hover:opacity-90 transition"
            >
              Envoyer
            </button>
          </form>
        </div>

        <div className="hidden lg:block lg:w-[60%] lg:h-[750px] lg:relative lg:-ml-32">
          <Image
            src={content.image}
            alt="contact image"
            unoptimized
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}

export default Contact;

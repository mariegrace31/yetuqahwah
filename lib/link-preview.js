const allowedSourceDomains = [
  'dailycoffeenews.com', 'youtube.com', 'youtu.be', 'time.com', 'nytimes.com', 'comunicaffe.com',
];

function isAllowedSource(url) {
  return url.protocol === 'https:' && allowedSourceDomains.some((domain) => url.hostname === domain || url.hostname.endsWith(`.${domain}`));
}

function decodeHtml(value = '') {
  return value
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'));
  return match?.[2];
}

function parseMeta(html, key) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
    const property = getAttribute(tag, 'property') || getAttribute(tag, 'name');
    if (property?.toLowerCase() === key) return decodeHtml(getAttribute(tag, 'content') || '');
  }
  return '';
}

async function getRemoteHtml(startUrl) {
  let currentUrl = startUrl;
  for (let redirects = 0; redirects <= 3; redirects += 1) {
    const response = await fetch(currentUrl, {
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; YetuQahwahPreview/1.0)', accept: 'text/html,application/xhtml+xml' },
      redirect: 'manual',
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 3600 },
    });
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (!location || redirects === 3) return '';
      const nextUrl = new URL(location, currentUrl);
      if (!isAllowedSource(nextUrl)) return '';
      currentUrl = nextUrl;
      continue;
    }
    if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) return '';
    return response.text();
  }
  return '';
}

export async function getLinkPreview(item) {
  const fallback = { title: item.title || item.link, image: item.image || '', site: item.link };
  try {
    const url = new URL(item.link);
    if (!isAllowedSource(url)) return fallback;
    fallback.site = url.hostname;

    if (url.hostname.endsWith('youtube.com') && url.pathname === '/watch') {
      const endpoint = new URL('https://www.youtube.com/oembed');
      endpoint.searchParams.set('url', url.href);
      endpoint.searchParams.set('format', 'json');
      const response = await fetch(endpoint, { signal: AbortSignal.timeout(4000), next: { revalidate: 3600 } });
      if (response.ok) {
        const data = await response.json();
        return { title: data.title || fallback.title, image: data.thumbnail_url || fallback.image, site: fallback.site };
      }
    }

    const html = await getRemoteHtml(url);
    const title = parseMeta(html, 'og:title') || parseMeta(html, 'twitter:title') ||
      decodeHtml(html.match(/<title\b[^>]*>(.*?)<\/title>/is)?.[1]?.replace(/<[^>]+>/g, '').trim() || '');
    const rawImage = parseMeta(html, 'og:image') || parseMeta(html, 'og:image:url') || parseMeta(html, 'twitter:image');
    let image = fallback.image;
    if (rawImage) {
      const imageUrl = new URL(rawImage, url);
      if (imageUrl.protocol === 'https:') image = imageUrl.href;
    }
    return { title: title || fallback.title, image, site: fallback.site };
  } catch {
    return fallback;
  }
}

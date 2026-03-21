// CORS proxy strategies — ordered by reliability/speed
const PROXY_BUILDERS = [
  // rss2json: dedicated RSS-to-JSON service (fastest, most reliable)
  {
    name: 'rss2json',
    buildUrl: (rssUrl) =>
      `https://api.rss2json.com/api.json?rss_url=${encodeURIComponent(rssUrl)}`,
    isJson: true,
  },
  // allorigins: general CORS proxy
  {
    name: 'allorigins',
    buildUrl: (rssUrl) =>
      `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`,
    isJson: false,
  },
  // corsproxy.io
  {
    name: 'corsproxy',
    buildUrl: (rssUrl) =>
      `https://corsproxy.io/?url=${encodeURIComponent(rssUrl)}`,
    isJson: false,
  },
];

// In-memory cache: url -> { data, timestamp }
const feedCache = new Map();
const CACHE_TTL = 3 * 60 * 1000; // 3 minutes

// Parse rss2json JSON response
function parseRss2JsonResponse(data) {
  if (data.status !== 'ok' && !data.items) throw new Error('rss2json failed');
  return (data.items || []).map((item) => ({
    title: item.title || '',
    link: item.link || '',
    description: item.description || item.content || '',
    pubDate: item.pubDate || '',
    thumbnail: item.thumbnail || item.enclosure?.link || '',
    author: item.author || '',
  }));
}

// Parse RSS/Atom XML into article objects
function parseRssXml(xmlText) {
  if (xmlText.trim().startsWith('<!DOCTYPE') || xmlText.trim().startsWith('<html')) {
    throw new Error('Got HTML instead of XML');
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, 'text/xml');

  const parseError = doc.querySelector('parsererror');
  if (parseError) throw new Error('XML parse error');

  // Try RSS 2.0 format
  let items = doc.querySelectorAll('item');
  if (items.length > 0) {
    return Array.from(items).map((item) => {
      const enclosure = item.querySelector('enclosure');
      const mediaThumbnail =
        item.getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'thumbnail')[0] ||
        item.getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'content')[0];

      return {
        title: getTagText(item, 'title'),
        link: getTagText(item, 'link'),
        description: getTagText(item, 'description'),
        pubDate: getTagText(item, 'pubDate') || getTagText(item, 'dc\\:date'),
        thumbnail:
          mediaThumbnail?.getAttribute('url') ||
          enclosure?.getAttribute('url') ||
          extractImageFromHtml(getTagText(item, 'description')) ||
          extractImageFromHtml(getTagText(item, 'content\\:encoded')) ||
          '',
        author: getTagText(item, 'author') || getTagText(item, 'dc\\:creator') || '',
      };
    });
  }

  // Try Atom format
  items = doc.querySelectorAll('entry');
  if (items.length > 0) {
    return Array.from(items).map((entry) => {
      const link =
        entry.querySelector('link[rel="alternate"]')?.getAttribute('href') ||
        entry.querySelector('link')?.getAttribute('href') ||
        '';

      return {
        title: getTagText(entry, 'title'),
        link,
        description: getTagText(entry, 'summary') || getTagText(entry, 'content'),
        pubDate: getTagText(entry, 'published') || getTagText(entry, 'updated'),
        thumbnail: extractImageFromHtml(getTagText(entry, 'content')) || '',
        author: getTagText(entry, 'author name') || '',
      };
    });
  }

  throw new Error('No items found in feed');
}

function getTagText(parent, tagName) {
  const el = parent.querySelector(tagName);
  return el?.textContent?.trim() || '';
}

function extractImageFromHtml(html) {
  if (!html) return '';
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : '';
}

// Fetch via a single proxy with timeout (reduced to 6s)
async function fetchViaProxy(proxy, rssUrl, timeoutMs = 6000) {
  const url = proxy.buildUrl(rssUrl);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    if (proxy.isJson) {
      const data = await response.json();
      return parseRss2JsonResponse(data);
    } else {
      const text = await response.text();
      return parseRssXml(text);
    }
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

// Race all proxies — first valid result wins, with in-memory caching
export async function fetchRssFeed(rssUrl) {
  // Check memory cache first
  const cached = feedCache.get(rssUrl);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const results = await Promise.any(
      PROXY_BUILDERS.map((proxy) =>
        fetchViaProxy(proxy, rssUrl).then((articles) => {
          if (!articles || articles.length === 0) {
            throw new Error('No articles from ' + proxy.name);
          }
          return articles;
        })
      )
    );

    // Cache successful result
    feedCache.set(rssUrl, { data: results, timestamp: Date.now() });
    return results;
  } catch {
    return [];
  }
}

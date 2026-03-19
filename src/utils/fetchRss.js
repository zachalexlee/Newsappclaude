// Multiple CORS proxy strategies for fetching RSS feeds
const PROXY_STRATEGIES = [
  // Strategy 1: rss2json (returns JSON directly)
  {
    name: 'rss2json',
    buildUrl: (rssUrl) =>
      `https://api.rss2json.com/api.json?rss_url=${encodeURIComponent(rssUrl)}`,
    parse: async (response) => {
      const data = await response.json();
      if (data.status !== 'ok' && !data.items) throw new Error('rss2json failed');
      return (data.items || []).map((item) => ({
        title: item.title,
        link: item.link,
        description: item.description || item.content || '',
        pubDate: item.pubDate,
        thumbnail: item.thumbnail || item.enclosure?.link || '',
        author: item.author || '',
      }));
    },
  },
  // Strategy 2: allorigins (returns raw XML, we parse it)
  {
    name: 'allorigins',
    buildUrl: (rssUrl) =>
      `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`,
    parse: async (response) => {
      const text = await response.text();
      return parseRssXml(text);
    },
  },
  // Strategy 3: corsproxy.io
  {
    name: 'corsproxy',
    buildUrl: (rssUrl) =>
      `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`,
    parse: async (response) => {
      const text = await response.text();
      return parseRssXml(text);
    },
  },
  // Strategy 4: cors-anywhere on herokuapp (may need activation)
  {
    name: 'thingproxy',
    buildUrl: (rssUrl) =>
      `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rssUrl)}`,
    parse: async (response) => {
      const text = await response.text();
      return parseRssXml(text);
    },
  },
];

// Parse RSS/Atom XML into article objects
function parseRssXml(xmlText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, 'text/xml');

  // Check for parse errors
  const parseError = doc.querySelector('parsererror');
  if (parseError) throw new Error('XML parse error');

  // Try RSS 2.0 format first
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
        pubDate: getTagText(item, 'pubDate') || getTagText(item, 'dc:date'),
        thumbnail:
          mediaThumbnail?.getAttribute('url') ||
          enclosure?.getAttribute('url') ||
          extractImageFromHtml(getTagText(item, 'description')) ||
          '',
        author: getTagText(item, 'author') || getTagText(item, 'dc:creator') || '',
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

// Fetch a single RSS feed, trying multiple proxy strategies
export async function fetchRssFeed(rssUrl) {
  for (const strategy of PROXY_STRATEGIES) {
    try {
      const url = strategy.buildUrl(rssUrl);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);

      if (!response.ok) continue;

      const articles = await strategy.parse(response);
      if (articles && articles.length > 0) {
        return articles;
      }
    } catch {
      // Try next strategy
      continue;
    }
  }

  return []; // All strategies failed
}

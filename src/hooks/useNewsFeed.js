import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchRssFeed } from '../utils/fetchRss';

const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

function getArchiveKey(feeds) {
  const urls = (Array.isArray(feeds) ? feeds : []).map((f) => f.url).sort();
  return 'archive_' + urls.join('|');
}

function loadArchive(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const data = JSON.parse(raw);
    const cutoff = Date.now() - TWO_WEEKS_MS;
    return data.filter((a) => new Date(a.archivedAt || a.pubDate).getTime() > cutoff);
  } catch {
    return [];
  }
}

function saveArchive(key, articles) {
  try {
    const cutoff = Date.now() - TWO_WEEKS_MS;
    const trimmed = articles
      .filter((a) => new Date(a.archivedAt || a.pubDate).getTime() > cutoff)
      .slice(0, 200);
    localStorage.setItem(key, JSON.stringify(trimmed));
  } catch {
    // storage full or unavailable
  }
}

function deduplicateArticles(articles) {
  const seen = new Set();
  return articles.filter((a) => {
    const key = a.link || a.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function useNewsFeed(feeds, maxItems = 20) {
  const [articles, setArticles] = useState([]);
  const [archived, setArchived] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  const archiveKey = getArchiveKey(feeds);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // Load archive on mount
  useEffect(() => {
    const saved = loadArchive(archiveKey);
    if (saved.length > 0) {
      setArchived(saved);
    }
  }, [archiveKey]);

  const fetchFeeds = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const feedList = Array.isArray(feeds) ? feeds : [];
      if (feedList.length === 0) {
        setError('No feeds configured');
        setLoading(false);
        return;
      }

      const results = await Promise.allSettled(
        feedList.map(async (feed) => {
          try {
            const items = await fetchRssFeed(feed.url);
            if (items.length === 0) {
              console.warn(`[RSS] No items from: ${feed.name} (${feed.url})`);
            }
            return items.map((item) => ({
              ...item,
              sourceName: feed.name,
              archivedAt: new Date().toISOString(),
            }));
          } catch (err) {
            console.warn(`[RSS] Failed: ${feed.name}:`, err.message);
            return [];
          }
        })
      );

      if (!mountedRef.current) return;

      const freshArticles = results
        .filter((r) => r.status === 'fulfilled')
        .flatMap((r) => r.value)
        .filter((a) => a.title);

      // Merge fresh with existing archive, deduplicate, sort by date
      const previousArchive = loadArchive(archiveKey);
      const merged = deduplicateArticles([...freshArticles, ...previousArchive])
        .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

      // Save full merged set to archive
      saveArchive(archiveKey, merged);

      // Visible = top N, archived = the rest
      const visible = merged.slice(0, maxItems);
      const rest = merged.slice(maxItems);

      setArticles(visible);
      setArchived(rest);

      if (visible.length === 0) {
        setError('Unable to load feeds — check connection and retry');
      } else {
        setError(null);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err.message);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [feeds, maxItems, archiveKey]);

  useEffect(() => {
    fetchFeeds();
    const interval = setInterval(fetchFeeds, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchFeeds]);

  return { articles, archived, loading, error, refresh: fetchFeeds };
}

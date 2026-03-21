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

function sortByDate(articles) {
  return articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
}

export function useNewsFeed(feeds, maxItems = 20) {
  const [articles, setArticles] = useState([]);
  const [archived, setArchived] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);
  const freshArticlesRef = useRef([]);

  const archiveKey = getArchiveKey(feeds);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // INSTANT: Show cached articles immediately on mount (no network wait)
  useEffect(() => {
    const cached = loadArchive(archiveKey);
    if (cached.length > 0) {
      const sorted = sortByDate(cached);
      setArticles(sorted.slice(0, maxItems));
      setArchived(sorted.slice(maxItems));
      setLoading(false); // No spinner if we have cached data
    }
  }, [archiveKey, maxItems]);

  const fetchFeeds = useCallback(async () => {
    const feedList = Array.isArray(feeds) ? feeds : [];
    if (feedList.length === 0) {
      setError('No feeds configured');
      setLoading(false);
      return;
    }

    // Only show spinner if we have zero articles (first visit)
    setError(null);
    freshArticlesRef.current = [];

    // PROGRESSIVE: Fire off all feeds, update UI as each one resolves
    const updateFromFresh = () => {
      if (!mountedRef.current) return;

      const previousArchive = loadArchive(archiveKey);
      const merged = deduplicateArticles([
        ...freshArticlesRef.current,
        ...previousArchive,
      ]);
      const sorted = sortByDate(merged);

      setArticles(sorted.slice(0, maxItems));
      setArchived(sorted.slice(maxItems));
    };

    const feedPromises = feedList.map(async (feed) => {
      try {
        const items = await fetchRssFeed(feed.url);
        if (items.length === 0) return;

        const tagged = items.map((item) => ({
          ...item,
          sourceName: feed.name,
          archivedAt: new Date().toISOString(),
        }));

        // Add to accumulator and trigger UI update
        freshArticlesRef.current = [...freshArticlesRef.current, ...tagged];
        updateFromFresh();
      } catch (err) {
        console.warn(`[RSS] Failed: ${feed.name}:`, err.message);
      }
    });

    // Wait for all to settle, then do final save
    await Promise.allSettled(feedPromises);

    if (!mountedRef.current) return;

    // Final merge and persist
    const previousArchive = loadArchive(archiveKey);
    const finalMerged = deduplicateArticles([
      ...freshArticlesRef.current,
      ...previousArchive,
    ]);
    const sorted = sortByDate(finalMerged);

    saveArchive(archiveKey, sorted);

    setArticles(sorted.slice(0, maxItems));
    setArchived(sorted.slice(maxItems));
    setLoading(false);

    if (sorted.length === 0) {
      setError('Unable to load feeds — check connection and retry');
    }
  }, [feeds, maxItems, archiveKey]);

  useEffect(() => {
    fetchFeeds();
    const interval = setInterval(fetchFeeds, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchFeeds]);

  return { articles, archived, loading, error, refresh: fetchFeeds };
}

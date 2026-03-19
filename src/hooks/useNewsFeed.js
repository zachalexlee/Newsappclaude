import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchRssFeed } from '../utils/fetchRss';

export function useNewsFeed(feeds, maxItems = 8) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

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
            }));
          } catch (err) {
            console.warn(`[RSS] Failed: ${feed.name}:`, err.message);
            return [];
          }
        })
      );

      if (!mountedRef.current) return;

      const allArticles = results
        .filter((r) => r.status === 'fulfilled')
        .flatMap((r) => r.value)
        .filter((a) => a.title)
        .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        .slice(0, maxItems);

      setArticles(allArticles);

      const successCount = allArticles.length;
      if (successCount === 0) {
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
  }, [feeds, maxItems]);

  useEffect(() => {
    fetchFeeds();
    const interval = setInterval(fetchFeeds, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchFeeds]);

  return { articles, loading, error, refresh: fetchFeeds };
}

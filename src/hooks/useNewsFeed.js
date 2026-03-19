import { useState, useEffect, useCallback } from 'react';
import { fetchRssFeed } from '../utils/fetchRss';

export function useNewsFeed(feeds, maxItems = 8) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeeds = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const feedList = Array.isArray(feeds) ? feeds : [];
      const results = await Promise.allSettled(
        feedList.map(async (feed) => {
          const items = await fetchRssFeed(feed.url);
          return items.map((item) => ({
            ...item,
            sourceName: feed.name,
          }));
        })
      );

      const allArticles = results
        .filter((r) => r.status === 'fulfilled')
        .flatMap((r) => r.value)
        .filter((a) => a.title) // skip empty titles
        .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        .slice(0, maxItems);

      setArticles(allArticles);
      if (allArticles.length === 0) {
        setError('No articles loaded');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [feeds, maxItems]);

  useEffect(() => {
    fetchFeeds();
    const interval = setInterval(fetchFeeds, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchFeeds]);

  return { articles, loading, error, refresh: fetchFeeds };
}

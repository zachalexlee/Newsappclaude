import { useState, useEffect, useCallback } from 'react';
import { buildFeedUrl } from '../data/rssFeeds';

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
          const res = await fetch(buildFeedUrl(feed.url));
          if (!res.ok) throw new Error(`Failed to fetch ${feed.name}`);
          const data = await res.json();
          return (data.items || []).map((item) => ({
            ...item,
            sourceName: feed.name,
          }));
        })
      );

      const allArticles = results
        .filter((r) => r.status === 'fulfilled')
        .flatMap((r) => r.value)
        .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        .slice(0, maxItems);

      setArticles(allArticles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [feeds, maxItems]);

  useEffect(() => {
    fetchFeeds();
    const interval = setInterval(fetchFeeds, 5 * 60 * 1000); // refresh every 5 min
    return () => clearInterval(interval);
  }, [fetchFeeds]);

  return { articles, loading, error, refresh: fetchFeeds };
}

import { useState, useEffect } from 'react';
import { fetchRssFeed } from '../utils/fetchRss';
import './BreakingNewsTicker.css';

export default function BreakingNewsTicker() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchBreaking() {
      try {
        const sources = [
          'https://moxie.foxnews.com/google-publisher/latest.xml',
          'https://moxie.foxnews.com/google-publisher/us.xml',
        ];
        const results = await Promise.allSettled(
          sources.map((url) => fetchRssFeed(url))
        );
        const articles = results
          .filter((r) => r.status === 'fulfilled')
          .flatMap((r) => r.value)
          .filter((item) => item.title)
          .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
          .slice(0, 20)
          .map((item, i) => ({
            id: i,
            text: item.title,
            link: item.link,
            source: item.sourceName || 'Fox News',
          }));
        if (articles.length > 0) {
          setItems(articles);
        }
      } catch {
        // silent fallback
      }
    }
    fetchBreaking();
    const interval = setInterval(fetchBreaking, 300000);
    return () => clearInterval(interval);
  }, []);

  if (items.length === 0) return null;

  const tickerItems = [...items, ...items];

  return (
    <div className="breaking-ticker">
      <div className="breaking-ticker__label">
        <span className="breaking-ticker__icon">!</span>
        <span>BREAKING</span>
      </div>
      <div className="breaking-ticker__container">
        <div
          className="breaking-ticker__track"
          style={{ '--item-count': items.length }}
        >
          {tickerItems.map((item, i) => (
            <a
              key={`${item.id}-${i}`}
              className="breaking-ticker__item"
              href={item.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="breaking-ticker__source">{item.source}</span>
              <span className="breaking-ticker__text">{item.text}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

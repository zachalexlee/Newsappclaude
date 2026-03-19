import { useState, useEffect } from 'react';
import { fetchRssFeed } from '../utils/fetchRss';
import './TrendingListView.css';

const SAMPLE_TRENDING = [
  { id: 1, text: "Vibe coding is changing how we build software - just describe what you want and AI builds it", author: "@techdev", likes: "2.4K", source: "Hacker News" },
  { id: 2, text: "Just built an entire SaaS app in 2 hours with Claude Code. Vibe coding is the future.", author: "@aibuilder", likes: "5.1K", source: "Dev.to" },
  { id: 3, text: "Hot take: AI pair programming > solo coding. The productivity gains are insane.", author: "@devops_daily", likes: "3.8K", source: "Lobsters" },
  { id: 4, text: "Claude Opus 4 just dropped and vibe coders are eating good today", author: "@ml_engineer", likes: "8.2K", source: "Hacker News" },
  { id: 5, text: "The gap between 'idea' and 'working prototype' has never been smaller thanks to AI coding tools", author: "@startupfounder", likes: "4.5K", source: "Dev.to" },
  { id: 6, text: "Vibe coding tutorial: Step 1 - describe your app. Step 2 - there is no step 2.", author: "@codinghumor", likes: "12K", source: "Lobsters" },
  { id: 7, text: "AI-generated code just passed our entire test suite on the first try. We live in the future.", author: "@qaengineer", likes: "6.7K", source: "Hacker News" },
  { id: 8, text: "Every developer should learn prompt engineering. It's the new syntax.", author: "@techtrends", likes: "9.3K", source: "Dev.to" },
];

export default function TrendingListView() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const sources = [
          { url: 'https://hnrss.org/newest?q=vibe+coding+OR+AI+coding', name: 'Hacker News' },
          { url: 'https://dev.to/feed/tag/ai', name: 'Dev.to' },
          { url: 'https://lobste.rs/t/ai.rss', name: 'Lobsters' },
        ];
        const results = await Promise.allSettled(
          sources.map(async (src) => {
            const feed = await fetchRssFeed(src.url);
            return feed.map((item) => ({ ...item, feedSource: src.name }));
          })
        );
        const articles = results
          .filter((r) => r.status === 'fulfilled')
          .flatMap((r) => r.value)
          .filter((item) => item.title)
          .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
          .slice(0, 30)
          .map((item, i) => ({
            id: 100 + i,
            text: item.title,
            author: item.author || item.feedSource,
            source: item.feedSource,
            likes: '🔥',
            link: item.link,
            pubDate: item.pubDate,
          }));
        if (articles.length > 0) {
          setItems(articles);
        } else {
          setItems(SAMPLE_TRENDING);
        }
      } catch {
        setItems(SAMPLE_TRENDING);
      }
      setLoading(false);
    }
    fetchTrending();
  }, []);

  const allItems = items.length > 0 ? items : SAMPLE_TRENDING;

  return (
    <section className="trending-list">
      <div className="trending-list__header">
        <h2 className="trending-list__title">
          <span className="trending-list__icon">𝕏</span>
          Trending — AI & Vibe Coding
        </h2>
        <span className="trending-list__note">
          Sources: Hacker News, Dev.to, Lobsters (not live X/Twitter data)
        </span>
      </div>

      {loading && (
        <div className="trending-list__loading">
          <div className="trending-list__spinner" />
          Loading trending posts...
        </div>
      )}

      <div className="trending-list__grid">
        {allItems.map((item) => (
          <a
            key={item.id}
            className="trending-list__card"
            href={item.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="trending-list__card-header">
              <span className="trending-list__author">{item.author}</span>
              <span className="trending-list__source">{item.source}</span>
            </div>
            <p className="trending-list__text">{item.text}</p>
            <div className="trending-list__card-footer">
              <span className="trending-list__likes">♥ {item.likes}</span>
              {item.pubDate && (
                <span className="trending-list__time">
                  {new Date(item.pubDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

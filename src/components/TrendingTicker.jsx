import { useState, useEffect } from 'react';
import { fetchRssFeed } from '../utils/fetchRss';
import './TrendingTicker.css';

const SAMPLE_TRENDING = [
  { id: 1, text: "Vibe coding is changing how we build software - just describe what you want and AI builds it", author: "@techdev", likes: "2.4K" },
  { id: 2, text: "Just built an entire SaaS app in 2 hours with Claude Code. Vibe coding is the future.", author: "@aibuilder", likes: "5.1K" },
  { id: 3, text: "Hot take: AI pair programming > solo coding. The productivity gains are insane.", author: "@devops_daily", likes: "3.8K" },
  { id: 4, text: "Claude Opus 4 just dropped and vibe coders are eating good today", author: "@ml_engineer", likes: "8.2K" },
  { id: 5, text: "The gap between 'idea' and 'working prototype' has never been smaller thanks to AI coding tools", author: "@startupfounder", likes: "4.5K" },
  { id: 6, text: "Vibe coding tutorial: Step 1 - describe your app. Step 2 - there is no step 2.", author: "@codinghumor", likes: "12K" },
  { id: 7, text: "AI-generated code just passed our entire test suite on the first try. We live in the future.", author: "@qaengineer", likes: "6.7K" },
  { id: 8, text: "Every developer should learn prompt engineering. It's the new syntax.", author: "@techtrends", likes: "9.3K" },
];

export default function TrendingTicker() {
  const [feedTweets, setFeedTweets] = useState([]);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const sources = [
          'https://hnrss.org/newest?q=vibe+coding+OR+AI+coding',
          'https://dev.to/feed/tag/ai',
          'https://lobste.rs/t/ai.rss',
        ];
        const results = await Promise.allSettled(
          sources.map((url) => fetchRssFeed(url))
        );
        const items = results
          .filter((r) => r.status === 'fulfilled')
          .flatMap((r) => r.value)
          .filter((item) => item.title)
          .slice(0, 15)
          .map((item, i) => ({
            id: 100 + i,
            text: item.title,
            author: item.author || 'Trending',
            likes: '🔥',
            link: item.link,
          }));
        if (items.length > 0) {
          setFeedTweets(items);
        }
      } catch {
        // fallback to sample data
      }
    }
    fetchTrending();
  }, []);

  const allTweets = feedTweets.length > 0 ? [...feedTweets, ...SAMPLE_TRENDING] : SAMPLE_TRENDING;
  const tickerItems = [...allTweets, ...allTweets];

  return (
    <div className="ticker-wrapper">
      <div className="ticker-label">
        <span className="ticker-icon">𝕏</span>
        <span>TRENDING</span>
      </div>
      <div className="ticker-container">
        <div className="ticker-track" style={{ '--item-count': allTweets.length }}>
          {tickerItems.map((tweet, i) => (
            <a
              key={`${tweet.id}-${i}`}
              className="ticker-item"
              href={tweet.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ticker-author">{tweet.author}</span>
              <span className="ticker-text">{tweet.text}</span>
              <span className="ticker-likes">♥ {tweet.likes}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

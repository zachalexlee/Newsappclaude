import { useNewsFeed } from '../hooks/useNewsFeed';
import NewsCard from './NewsCard';
import './NewsSection.css';

export default function NewsSection({ title, icon, feeds, color, maxItems = 6, compact = false }) {
  const { articles, loading, error, refresh } = useNewsFeed(feeds, maxItems);

  return (
    <section className="news-section" style={{ '--section-color': color }}>
      <div className="news-section__header">
        <h2 className="news-section__title">
          <span className="news-section__icon">{icon}</span>
          {title}
        </h2>
        <button className="news-section__refresh" onClick={refresh} title="Refresh">
          ↻
        </button>
      </div>

      {loading && (
        <div className="news-section__loading">
          <div className="news-section__spinner" />
          <span>Loading {title.toLowerCase()}...</span>
        </div>
      )}

      {error && !loading && articles.length === 0 && (
        <div className="news-section__error">
          <span>Unable to load feeds</span>
          <button onClick={refresh}>Retry</button>
        </div>
      )}

      <div className={`news-section__grid ${compact ? 'news-section__grid--compact' : ''}`}>
        {articles.map((article, i) => (
          <NewsCard key={`${article.link}-${i}`} article={article} compact={compact} />
        ))}
      </div>
    </section>
  );
}

import { useState } from 'react';
import { useNewsFeed } from '../hooks/useNewsFeed';
import NewsCard from './NewsCard';
import './NewsSection.css';

export default function NewsSection({ title, icon, feeds, color, maxItems = 20, compact = false }) {
  const { articles, archived, loading, error, refresh } = useNewsFeed(feeds, maxItems);
  const [showArchive, setShowArchive] = useState(false);
  const [archiveSearch, setArchiveSearch] = useState('');

  const filteredArchive = archiveSearch
    ? archived.filter(
        (a) =>
          a.title?.toLowerCase().includes(archiveSearch.toLowerCase()) ||
          a.sourceName?.toLowerCase().includes(archiveSearch.toLowerCase()) ||
          a.description?.toLowerCase().includes(archiveSearch.toLowerCase())
      )
    : archived;

  return (
    <section className="news-section" style={{ '--section-color': color }}>
      <div className="news-section__header">
        <h2 className="news-section__title">
          <span className="news-section__icon">{icon}</span>
          {title}
        </h2>
        <div className="news-section__actions">
          <span className="news-section__count">{articles.length} articles</span>
          <button className="news-section__refresh" onClick={refresh} title="Refresh">
            ↻
          </button>
        </div>
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

      {archived.length > 0 && (
        <div className="news-section__archive-toggle">
          <button
            className="news-section__load-more"
            onClick={() => setShowArchive(!showArchive)}
          >
            {showArchive
              ? 'Hide Archive'
              : `Browse Archive (${archived.length} older articles)`}
          </button>
        </div>
      )}

      {showArchive && (
        <div className="news-section__archive">
          <div className="news-section__archive-header">
            <h3 className="news-section__archive-title">
              Archived Articles (last 2 weeks)
            </h3>
            <input
              type="text"
              className="news-section__archive-search"
              placeholder="Search archive..."
              value={archiveSearch}
              onChange={(e) => setArchiveSearch(e.target.value)}
            />
          </div>
          <div className="news-section__archive-list">
            {filteredArchive.length === 0 && (
              <div className="news-section__archive-empty">
                {archiveSearch ? 'No matching articles found.' : 'No archived articles yet.'}
              </div>
            )}
            {filteredArchive.map((article, i) => (
              <NewsCard key={`archive-${article.link}-${i}`} article={article} compact />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

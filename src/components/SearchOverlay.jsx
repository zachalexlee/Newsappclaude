import { useState, useEffect, useRef } from 'react';
import { timeAgo } from '../utils/timeAgo';
import './SearchOverlay.css';

const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

function getAllArchivedArticles() {
  const articles = [];
  const cutoff = Date.now() - TWO_WEEKS_MS;

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key.startsWith('archive_')) continue;

      const raw = localStorage.getItem(key);
      if (!raw) continue;

      const data = JSON.parse(raw);
      for (const article of data) {
        const ts = new Date(article.archivedAt || article.pubDate).getTime();
        if (ts > cutoff) {
          articles.push(article);
        }
      }
    }
  } catch {
    // ignore parse errors
  }

  // Deduplicate by link
  const seen = new Set();
  const unique = articles.filter((a) => {
    const key = a.link || a.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return unique.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
}

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setAllArticles(getAllArchivedArticles());
      setQuery('');
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const matched = allArticles
      .filter(
        (a) =>
          a.title?.toLowerCase().includes(q) ||
          a.sourceName?.toLowerCase().includes(q) ||
          a.description?.toLowerCase().includes(q) ||
          a.author?.toLowerCase().includes(q)
      )
      .slice(0, 50);

    setResults(matched);
  }, [query, allArticles]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      return () => document.removeEventListener('keydown', handleKey);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-overlay__panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-overlay__input-row">
          <span className="search-overlay__icon">⌕</span>
          <input
            ref={inputRef}
            type="text"
            className="search-overlay__input"
            placeholder="Search all articles from the last 2 weeks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-overlay__close" onClick={onClose}>
            ESC
          </button>
        </div>

        {query.trim() && (
          <div className="search-overlay__meta">
            {results.length} result{results.length !== 1 ? 's' : ''} found
            {allArticles.length > 0 && (
              <span> — searching {allArticles.length} archived articles</span>
            )}
          </div>
        )}

        <div className="search-overlay__results">
          {!query.trim() && (
            <div className="search-overlay__hint">
              <p>Search across all sections: World, Politics, Finance, Sports, Local, Science, Tech</p>
              <p className="search-overlay__hint-sub">
                {allArticles.length} articles available from the last 2 weeks
              </p>
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <div className="search-overlay__empty">
              No articles matching "{query}"
            </div>
          )}

          {results.map((article, i) => (
            <a
              key={`${article.link}-${i}`}
              className="search-overlay__result"
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="search-overlay__result-title">{article.title}</div>
              <div className="search-overlay__result-meta">
                <span className="search-overlay__result-source">
                  {article.sourceName}
                </span>
                <span className="search-overlay__result-time">
                  {timeAgo(article.pubDate)}
                </span>
              </div>
              {article.description && (
                <div
                  className="search-overlay__result-desc"
                  dangerouslySetInnerHTML={{
                    __html: article.description.replace(/<[^>]*>/g, '').slice(0, 150) + '...',
                  }}
                />
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

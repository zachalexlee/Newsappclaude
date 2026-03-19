import { timeAgo } from '../utils/timeAgo';
import './NewsCard.css';

export default function NewsCard({ article, compact = false }) {
  const thumbnail = article.thumbnail || article.enclosure?.link;

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`news-card ${compact ? 'news-card--compact' : ''}`}
    >
      {thumbnail && !compact && (
        <div className="news-card__image">
          <img src={thumbnail} alt="" loading="lazy" />
        </div>
      )}
      <div className="news-card__content">
        <h3 className="news-card__title">{article.title}</h3>
        {!compact && article.description && (
          <p
            className="news-card__desc"
            dangerouslySetInnerHTML={{
              __html: article.description?.replace(/<[^>]*>/g, '').slice(0, 120) + '...',
            }}
          />
        )}
        <div className="news-card__meta">
          <span className="news-card__source">{article.sourceName}</span>
          <span className="news-card__time">{timeAgo(article.pubDate)}</span>
        </div>
      </div>
    </a>
  );
}

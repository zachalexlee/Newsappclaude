import { useState, useEffect, useCallback } from 'react';
import TrendingTicker from './components/TrendingTicker';
import StockTicker from './components/StockTicker';
import BreakingNewsTicker from './components/BreakingNewsTicker';
import NewsSection from './components/NewsSection';
import SportsSection from './components/SportsSection';
import TechSection from './components/TechSection';
import FinanceSection from './components/FinanceSection';
import TrendingListView from './components/TrendingListView';
import SearchOverlay from './components/SearchOverlay';
import { FEED_SOURCES } from './data/rssFeeds';
import './App.css';

const SECTION_TABS = [
  { key: 'world', label: 'World', icon: '☞' },
  { key: 'politics', label: 'Politics', icon: '⚖' },
  { key: 'finance', label: 'Finance', icon: '💰' },
  { key: 'sports', label: 'Sports', icon: '🏆' },
  { key: 'local', label: 'Local', icon: '⚑' },
  { key: 'science', label: 'Science', icon: '⚛' },
  { key: 'tech', label: 'Tech', icon: '💻' },
  { key: 'trending', label: 'Trending', icon: '𝕏' },
];

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState('world');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcut: Ctrl+K or Cmd+K to open search
  useEffect(() => {
    function handleKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const dateStr = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const editionLabel = currentTime.getHours() < 12 ? 'Morning Edition' : 'Evening Edition';

  const renderSection = () => {
    switch (activeSection) {
      case 'world':
        return (
          <div className="dashboard__row dashboard__row--full">
            <NewsSection
              title="World News"
              icon="&#9758;"
              feeds={FEED_SOURCES.world}
              color="#8b0000"
              maxItems={20}
            />
          </div>
        );
      case 'politics':
        return (
          <div className="dashboard__row dashboard__row--full">
            <NewsSection
              title="Politics"
              icon="&#9878;"
              feeds={FEED_SOURCES.politics}
              color="#1a3c6e"
              maxItems={20}
            />
          </div>
        );
      case 'finance':
        return (
          <div className="dashboard__row dashboard__row--full">
            <FinanceSection />
          </div>
        );
      case 'sports':
        return (
          <div className="dashboard__row dashboard__row--full">
            <SportsSection />
          </div>
        );
      case 'local':
        return (
          <div className="dashboard__row dashboard__row--full">
            <NewsSection
              title="Local — WA / South Puget Sound"
              icon="&#9873;"
              feeds={FEED_SOURCES.local}
              color="#b8860b"
              maxItems={20}
            />
          </div>
        );
      case 'science':
        return (
          <div className="dashboard__row dashboard__row--full">
            <NewsSection
              title="Science"
              icon="&#9883;"
              feeds={FEED_SOURCES.science}
              color="#2e7d32"
              maxItems={20}
            />
          </div>
        );
      case 'tech':
        return (
          <div className="dashboard__row dashboard__row--full">
            <TechSection />
          </div>
        );
      case 'trending':
        return (
          <div className="dashboard__row dashboard__row--full">
            <TrendingListView />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <TrendingTicker />
      <BreakingNewsTicker />
      <StockTicker />

      <header className="masthead">
        <div className="masthead__top-line">
          <span>{dateStr}</span>
          <span>{editionLabel}</span>
          <span>
            {currentTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        <h1 className="masthead__title">The Daily Dispatch</h1>
        <p className="masthead__subtitle">Your Personal News Dashboard</p>
        <button
          className="masthead__search-btn"
          onClick={() => setSearchOpen(true)}
          title="Search all articles (Ctrl+K)"
        >
          <span className="masthead__search-icon">⌕</span>
          Search articles...
          <span className="masthead__search-shortcut">Ctrl+K</span>
        </button>
      </header>

      <nav className="section-nav">
        {SECTION_TABS.map((tab) => (
          <button
            key={tab.key}
            className={`section-nav__tab ${activeSection === tab.key ? 'section-nav__tab--active' : ''}`}
            onClick={() => setActiveSection(tab.key)}
          >
            <span className="section-nav__icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="dashboard">
        {renderSection()}
      </main>

      <footer className="app-footer">
        <span>The Daily Dispatch &mdash; Powered by RSS</span>
        <span>Auto-refreshes every 5 minutes</span>
      </footer>

      <SearchOverlay isOpen={searchOpen} onClose={closeSearch} />
    </div>
  );
}

export default App;

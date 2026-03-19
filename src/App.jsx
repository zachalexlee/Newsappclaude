import { useState, useEffect } from 'react';
import TrendingTicker from './components/TrendingTicker';
import NewsSection from './components/NewsSection';
import SportsSection from './components/SportsSection';
import TechSection from './components/TechSection';
import { FEED_SOURCES } from './data/rssFeeds';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app">
      <TrendingTicker />

      <header className="app-header">
        <div className="app-header__brand">
          <h1 className="app-header__title">NewsHub</h1>
          <span className="app-header__subtitle">Your Personal News Dashboard</span>
        </div>
        <div className="app-header__time">
          <span className="app-header__date">
            {currentTime.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="app-header__clock">
            {currentTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </header>

      <main className="dashboard">
        <div className="dashboard__row dashboard__row--2col">
          <NewsSection
            title="World News"
            icon="🌍"
            feeds={FEED_SOURCES.world}
            color="#1d9bf0"
            maxItems={6}
          />
          <NewsSection
            title="Politics"
            icon="🏛️"
            feeds={FEED_SOURCES.politics}
            color="#ff6b35"
            maxItems={6}
          />
        </div>

        <div className="dashboard__row dashboard__row--full">
          <SportsSection />
        </div>

        <div className="dashboard__row dashboard__row--2col">
          <NewsSection
            title="Local News — WA / South Puget Sound"
            icon="📍"
            feeds={FEED_SOURCES.local}
            color="#ffab00"
            maxItems={6}
          />
          <NewsSection
            title="Science"
            icon="🔬"
            feeds={FEED_SOURCES.science}
            color="#00e5ff"
            maxItems={6}
          />
        </div>

        <div className="dashboard__row dashboard__row--full">
          <TechSection />
        </div>
      </main>

      <footer className="app-footer">
        <span>NewsHub Dashboard — Powered by RSS feeds</span>
        <span>Auto-refreshes every 5 minutes</span>
      </footer>
    </div>
  );
}

export default App;

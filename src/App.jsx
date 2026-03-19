import { useState, useEffect } from 'react';
import TrendingTicker from './components/TrendingTicker';
import NewsSection from './components/NewsSection';
import SportsSection from './components/SportsSection';
import TechSection from './components/TechSection';
import FinanceSection from './components/FinanceSection';
import { FEED_SOURCES } from './data/rssFeeds';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const editionLabel = currentTime.getHours() < 12 ? 'Morning Edition' : 'Evening Edition';

  return (
    <div className="app">
      <TrendingTicker />

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
      </header>

      <main className="dashboard">
        <div className="dashboard__row dashboard__row--2col">
          <NewsSection
            title="World News"
            icon="&#9758;"
            feeds={FEED_SOURCES.world}
            color="#8b0000"
            maxItems={8}
          />
          <NewsSection
            title="Politics"
            icon="&#9878;"
            feeds={FEED_SOURCES.politics}
            color="#1a3c6e"
            maxItems={6}
          />
        </div>

        <div className="dashboard__row dashboard__row--full">
          <FinanceSection />
        </div>

        <div className="dashboard__row dashboard__row--full">
          <SportsSection />
        </div>

        <div className="dashboard__row dashboard__row--2col">
          <NewsSection
            title="Local — WA / South Puget Sound"
            icon="&#9873;"
            feeds={FEED_SOURCES.local}
            color="#b8860b"
            maxItems={6}
          />
          <NewsSection
            title="Science"
            icon="&#9883;"
            feeds={FEED_SOURCES.science}
            color="#2e7d32"
            maxItems={6}
          />
        </div>

        <div className="dashboard__row dashboard__row--full">
          <TechSection />
        </div>
      </main>

      <footer className="app-footer">
        <span>The Daily Dispatch &mdash; Powered by RSS</span>
        <span>Auto-refreshes every 5 minutes</span>
      </footer>
    </div>
  );
}

export default App;

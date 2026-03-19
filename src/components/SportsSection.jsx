import { useState } from 'react';
import { FEED_SOURCES } from '../data/rssFeeds';
import NewsSection from './NewsSection';
import './SportsSection.css';

const SPORTS_TABS = [
  { key: 'collegeBball', label: 'College BBall', icon: '🏀' },
  { key: 'nfl', label: 'NFL', icon: '🏈' },
  { key: 'nba', label: 'NBA', icon: '🏀' },
  { key: 'golf', label: 'Golf', icon: '⛳' },
];

export default function SportsSection() {
  const [activeTab, setActiveTab] = useState('collegeBball');

  return (
    <div className="sports-wrapper">
      <div className="sports-tabs">
        {SPORTS_TABS.map((tab) => (
          <button
            key={tab.key}
            className={`sports-tab ${activeTab === tab.key ? 'sports-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      <NewsSection
        title={SPORTS_TABS.find(t => t.key === activeTab)?.label || 'Sports'}
        icon="🏆"
        feeds={FEED_SOURCES.sports[activeTab]}
        color="#00c853"
        maxItems={20}
      />
    </div>
  );
}

import { useState } from 'react';
import { FEED_SOURCES } from '../data/rssFeeds';
import NewsSection from './NewsSection';
import './TechSection.css';

const TECH_TABS = [
  { key: 'ai', label: 'AI News', icon: '🤖' },
  { key: 'vibeCoding', label: 'Vibe Coding', icon: '🎵' },
  { key: 'trending', label: 'Trending Tech', icon: '📈' },
];

export default function TechSection() {
  const [activeTab, setActiveTab] = useState('ai');

  return (
    <div className="tech-wrapper">
      <div className="tech-tabs">
        {TECH_TABS.map((tab) => (
          <button
            key={tab.key}
            className={`tech-tab ${activeTab === tab.key ? 'tech-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      <NewsSection
        title={TECH_TABS.find(t => t.key === activeTab)?.label || 'Tech'}
        icon="💻"
        feeds={FEED_SOURCES.tech[activeTab]}
        color="#bb86fc"
        maxItems={20}
      />
    </div>
  );
}

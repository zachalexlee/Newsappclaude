import { useState } from 'react';
import { FEED_SOURCES } from '../data/rssFeeds';
import NewsSection from './NewsSection';
import './FinanceSection.css';

const FINANCE_TABS = [
  { key: 'markets', label: 'Markets', icon: '📈' },
  { key: 'economy', label: 'Economy', icon: '🏦' },
  { key: 'crypto', label: 'Crypto', icon: '₿' },
];

export default function FinanceSection() {
  const [activeTab, setActiveTab] = useState('markets');

  return (
    <div className="finance-wrapper">
      <div className="finance-tabs">
        {FINANCE_TABS.map((tab) => (
          <button
            key={tab.key}
            className={`finance-tab ${activeTab === tab.key ? 'finance-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      <NewsSection
        title={FINANCE_TABS.find((t) => t.key === activeTab)?.label || 'Finance'}
        icon="💰"
        feeds={FEED_SOURCES.finance[activeTab]}
        color="#f5a623"
        maxItems={6}
      />
    </div>
  );
}

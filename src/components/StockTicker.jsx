import { useState, useEffect } from 'react';
import './StockTicker.css';

const TOP_STOCKS = [
  { symbol: 'AAPL', name: 'Apple' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'GOOGL', name: 'Alphabet' },
  { symbol: 'AMZN', name: 'Amazon' },
  { symbol: 'NVDA', name: 'NVIDIA' },
  { symbol: 'META', name: 'Meta' },
  { symbol: 'TSLA', name: 'Tesla' },
  { symbol: 'BRK.B', name: 'Berkshire' },
  { symbol: 'JPM', name: 'JPMorgan' },
  { symbol: 'V', name: 'Visa' },
  { symbol: 'JNJ', name: 'Johnson & Johnson' },
  { symbol: 'WMT', name: 'Walmart' },
  { symbol: 'UNH', name: 'UnitedHealth' },
  { symbol: 'XOM', name: 'Exxon' },
  { symbol: 'PG', name: 'Procter & Gamble' },
  { symbol: 'MA', name: 'Mastercard' },
  { symbol: 'HD', name: 'Home Depot' },
  { symbol: 'CVX', name: 'Chevron' },
  { symbol: 'KO', name: 'Coca-Cola' },
  { symbol: 'PEP', name: 'PepsiCo' },
  { symbol: 'ABBV', name: 'AbbVie' },
  { symbol: 'COST', name: 'Costco' },
  { symbol: 'MRK', name: 'Merck' },
  { symbol: 'AVGO', name: 'Broadcom' },
  { symbol: 'DIS', name: 'Disney' },
  // AI-focused stocks
  { symbol: 'AMD', name: 'AMD', ai: true },
  { symbol: 'PLTR', name: 'Palantir', ai: true },
  { symbol: 'SNOW', name: 'Snowflake', ai: true },
  { symbol: 'AI', name: 'C3.ai', ai: true },
  { symbol: 'PATH', name: 'UiPath', ai: true },
  { symbol: 'SMCI', name: 'Super Micro', ai: true },
  { symbol: 'ARM', name: 'ARM Holdings', ai: true },
  { symbol: 'MRVL', name: 'Marvell', ai: true },
  { symbol: 'MU', name: 'Micron', ai: true },
  { symbol: 'CRWD', name: 'CrowdStrike', ai: true },
];

function generateMockChange() {
  const change = (Math.random() * 6 - 2.5).toFixed(2);
  return parseFloat(change);
}

export default function StockTicker() {
  const [stocks, setStocks] = useState(() =>
    TOP_STOCKS.map((s) => ({ ...s, change: generateMockChange() }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prev) =>
        prev.map((s) => ({ ...s, change: generateMockChange() }))
      );
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const tickerItems = [...stocks, ...stocks];

  return (
    <div className="stock-ticker">
      <div className="stock-ticker__label">
        <span className="stock-ticker__icon">$</span>
        <span>STOCKS</span>
      </div>
      <div className="stock-ticker__container">
        <div
          className="stock-ticker__track"
          style={{ '--item-count': stocks.length }}
        >
          {tickerItems.map((stock, i) => (
            <span key={`${stock.symbol}-${i}`} className="stock-ticker__item">
              <span className={`stock-ticker__symbol ${stock.ai ? 'stock-ticker__symbol--ai' : ''}`}>
                {stock.symbol}
              </span>
              <span
                className={`stock-ticker__change ${
                  stock.change >= 0
                    ? 'stock-ticker__change--up'
                    : 'stock-ticker__change--down'
                }`}
              >
                {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.change)}%
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

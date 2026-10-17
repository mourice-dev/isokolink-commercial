import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { MARKET_TICKER_ITEMS } from '../data/mockData';

export default function MarketTicker() {
  return (
    <div className="ticker-bar">
      <div className="ticker-label">
        <Activity size={14} className="pulse-icon" />
        <span>Live Rwanda Farm-Gate Index</span>
      </div>
      <div className="ticker-track">
        {MARKET_TICKER_ITEMS.concat(MARKET_TICKER_ITEMS).map((item, idx) => (
          <div key={idx} className="ticker-item">
            <span>{item.crop}:</span>
            <span className="price">{item.price}</span>
            <span className={item.up ? 'change-up' : 'change-down'}>
              {item.up ? <TrendingUp size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> : <TrendingDown size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />}
              {' '}{item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

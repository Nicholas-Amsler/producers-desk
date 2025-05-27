import React from 'react';
import './NewsTicker.css';

export default function NewsTicker({ loading, newsItems }) {
  console.log('🗞️ NewsTicker got:', { loading, newsItems });
  if (loading || !newsItems || newsItems.length === 0) return null;

  return (
    <div className="news-ticker">
      <div className="ticker-content">
        {newsItems.map((item, i) => (
          <span key={i} className="ticker-item">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
            {i < newsItems.length - 1 && (
              <span className="ticker-separator">•</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

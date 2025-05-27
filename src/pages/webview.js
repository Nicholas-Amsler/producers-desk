// src/pages/Webview.js
import React, { useState } from 'react';

export default function Webview() {
  const [url, setUrl] = useState('https://www.youtube.com');

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="w-full px-3 py-2 border rounded text-black"
          placeholder="Enter a URL (e.g., https://example.com)"
        />
      </div>
      <iframe
        src={url}
        title="Webview"
        className="flex-1 border rounded"
        style={{ minHeight: '600px' }}
      />
    </div>
  );
}

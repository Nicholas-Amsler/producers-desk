// src/pages/Browse.js
import React, { useState } from 'react';

export default function Browse() {
  const [url, setUrl] = useState('https://youtube.com');

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 bg-gray-100 border-b flex gap-2">
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Enter a URL"
        />
        <button
          onClick={() => setUrl(url)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go
        </button>
      </div>
      <iframe
        src={url}
        title="Webview"
        className="flex-1 border-none w-full"
      ></iframe>
    </div>
  );
}

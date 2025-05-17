// src/components/SummaryPanel.js
import React from 'react';

export default function SummaryPanel({ summary, summarizeContent, clearSummary, exportSummaryDoc }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-2">🧠 Summary</h2>
      <div className="flex flex-wrap gap-2 mb-2">
  <button
    onClick={summarizeContent}
    className="bg-indigo-500 text-white px-4 py-2 rounded shadow hover:bg-indigo-600 transition-all"
  >
    Summarize
  </button>
  <button
    onClick={clearSummary}
    className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition-all"
  >
    Clear
  </button>
  <button
    onClick={exportSummaryDoc}
    className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-all"
  >
    Export
  </button>
</div>

      <div className="min-h-[100px] p-4 rounded-lg border border-yellow-300 bg-yellow-100 text-gray-800 whitespace-pre-wrap">
        {summary}
      </div>
    </section>
  );
}

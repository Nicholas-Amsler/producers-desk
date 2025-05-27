// src/components/WinsPanel.js
import React from 'react';

export default function WinsPanel({ win, setWin, wins, handleSaveWin, clearWins, exportWinsDoc, handleVoiceInput }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-2">🏆 Wins</h2>
      <textarea
        value={win}
        onChange={e => setWin(e.target.value)}
        placeholder="Don’t forget to log those wins..."
        className="w-full p-3 rounded-lg border border-yellow-300 bg-yellow-100 text-gray-800 shadow-sm"
      />
      <div className="flex flex-wrap gap-2 mt-2">
  <button
    onClick={handleSaveWin}
    className="bg-yellow-400 text-black px-4 py-2 rounded shadow hover:bg-yellow-500 transition-all"
  >
    Save
  </button>
  <button
    onClick={() => handleVoiceInput(setWin)}
    className="bg-gray-200 text-black px-4 py-2 rounded shadow hover:bg-gray-300 transition-all"
  >
    🎤 Voice
  </button>
  <button
    onClick={exportWinsDoc}
    className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-all"
  >
    Export
  </button>
  <button
    onClick={clearWins}
    className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition-all"
  >
    Clear
  </button>
</div>

      <ul className="list-disc mt-4 pl-5 space-y-1">
        {wins.map((w, i) => <li key={i}>{w}</li>)}
      </ul>
    </section>
  );
}

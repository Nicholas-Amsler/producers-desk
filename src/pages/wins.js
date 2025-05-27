// src/pages/Wins.js
import React from 'react';

export default function Wins({ win, setWin, wins, setWins }) {
  const handleSaveWin = () => {
    if (win.trim()) {
      setWins([...wins, win]);
      setWin('');
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">🏆 Wins</h2>
      <textarea
        value={win}
        onChange={e => setWin(e.target.value)}
        placeholder="Log your win..."
        className="w-full p-2 border rounded"
      />
      <button onClick={handleSaveWin} className="bg-green-500 text-white px-4 py-2 rounded mt-2">Save</button>
      <ul className="list-disc pl-6 mt-4">
        {wins.map((w, i) => <li key={i}>{w}</li>)}
      </ul>
    </section>
  );
}

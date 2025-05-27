// src/pages/Notes.js
import React from 'react';

export default function Notes({ note, setNote, notes, setNotes }) {
  const handleSaveNote = () => {
    if (note.trim()) {
      setNotes([...notes, note]);
      setNote('');
    }
  };

  const handleTimestamp = () => {
    const now = new Date();
    const timestamp = `[${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}] `;
    setNote(n => timestamp + n);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">📝 Notes</h2>
      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="Type your note..."
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-2 mt-2">
        <button onClick={handleSaveNote} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        <button onClick={handleTimestamp} className="bg-gray-700 text-white px-4 py-2 rounded">🕓 Timestamp</button>
      </div>
      <ul className="list-disc pl-6 mt-4">
        {notes.map((n, i) => <li key={i}>{n}</li>)}
      </ul>
    </section>
  );
}

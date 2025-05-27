import React from 'react';

export default function NotesPanel({
  note,
  setNote,
  notes,
  handleSaveNote,
  clearNotes,
  exportNotesDoc,
  handleTimestamp,
  handlePasteClip,
  handleCueMarker,
  handleVoiceInput
}) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-2">📝 Notes</h2>
      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="your personal notepad and idea grabber"
        className="w-full p-3 rounded-lg border border-yellow-300 bg-yellow-100 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        <button onClick={handleTimestamp} className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow">🕓 Timestamp</button>
        <button onClick={handlePasteClip} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg shadow">📋 Paste Clip</button>
        <button onClick={handleCueMarker} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow">🔊 Cue Marker</button>
        <button onClick={handleSaveNote} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold shadow">Save</button>
        <button onClick={() => handleVoiceInput(setNote)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium shadow">🎤 Voice</button>
        <button onClick={exportNotesDoc} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow">Export</button>
        <button onClick={clearNotes} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow">Clear</button>
      </div>
      <ul className="list-disc mt-4 pl-5 space-y-1">
        {notes.map((n, i) => <li key={i}>{n}</li>)}
      </ul>
    </section>
  );
}

// src/hooks/useNotes.js
import { useState, useEffect } from 'react';

export default function useNotes() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('notes');
    if (stored) setNotes(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = () => {
    if (note.trim()) {
      setNotes(prev => [...prev, note]);
      setNote('');
    }
  };

  const clearNotes = () => setNotes([]);

  const exportNotesDoc = () => {
    const html = `<!DOCTYPE html><html><body>${notes.map(n => `<p>${n}</p>`).join('')}</body></html>`;
    const blob = new Blob([html], { type: 'application/msword' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'notes.doc';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleTimestamp = () => {
    const now = new Date();
    const timestamp = `[${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}] `;
    setNote(n => timestamp + n);
  };

  const handlePasteClip = async () => {
    const text = await navigator.clipboard.readText();
    if (text) setNote(n => n + '\n' + text);
  };

  const handleCueMarker = () => {
    const audio = new Audio('/cue-sound.mp3');
    audio.play().catch(console.error);
  };

  const handleVoiceInput = setter => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert('Speech recognition not supported.');
    const rec = new SR();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.start();
    rec.onresult = e => setter(e.results[0][0].transcript);
    rec.onerror = e => alert('Voice error: ' + e.error);
  };

  return {
    note,
    notes,
    setNote,
    setNotes,
    handleSaveNote,
    clearNotes,
    exportNotesDoc,
    handleTimestamp,
    handlePasteClip,
    handleCueMarker,
    handleVoiceInput
  };
}

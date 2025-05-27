import { useState, useEffect } from 'react';

export default function useWins() {
  const [win, setWin] = useState('');
  const [wins, setWins] = useState(() => JSON.parse(localStorage.getItem('wins')) || []);

  useEffect(() => {
    localStorage.setItem('wins', JSON.stringify(wins));
  }, [wins]);

  const handleSaveWin = () => {
    if (win.trim()) {
      setWins(prev => [...prev, win]);
      setWin('');
    }
  };

  const clearWins = () => setWins([]);

  const exportWinsDoc = () => {
    const html = `<!DOCTYPE html><html><body>${wins.map(w => `<p>${w}</p>`).join('')}</body></html>`;
    const blob = new Blob([html], { type: 'application/msword' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'wins.doc';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleVoiceInput = async setter => {
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
    win,
    wins,
    setWin,
    setWins,
    handleSaveWin,
    clearWins,
    exportWinsDoc,
    handleVoiceInput
  };
}

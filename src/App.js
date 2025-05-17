import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as ChatIcon } from './message-circle.svg';
import Sidebar from './Sidebar';
import NotesPanel from './Components/NotesPanel';
import WinsPanel from './Components/WinsPanel';
import SummaryPanel from './Components/SummaryPanel';
import FloatingChat from './Components/FloatingChat';
import SettingsPanel from './Components/SettingsPanel';
import NewsTicker from './Components/NewsTicker';
import Header from './Components/Header';
import useNotes from './hooks/useNotes';
import useWins from './hooks/useWins';
import useChat from './hooks/useChat';
import useNews from './hooks/useNews';

const callWebhook = async (url, method = 'GET', body = null) => {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(url, options);
  return res.json();
};

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('notes');
  const [showLowerThird, setShowLowerThird] = useState(false);

  const {
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
    handleVoiceInput: handleNoteVoiceInput
  } = useNotes();

  const {
    win,
    wins,
    setWin,
    setWins,
    handleSaveWin,
    clearWins,
    exportWinsDoc,
    handleVoiceInput: handleWinVoiceInput
  } = useWins();

  const {
    chatOpen,
    setChatOpen,
    chatPrompt,
    setChatPrompt,
    chatHistory,
    setChatHistory,
    chatResponse,
    handleAskChatGPT,
    handleCopyResponse,
    handleChatKeyPress,
    handleVoiceInput: handleChatVoiceInput,
    chatPos,
    setChatPos,
    draggingChat,
    setDraggingChat,
    chatScrollRef,
    chatOffset,
    chatInputRef
  } = useChat();

  const {
    horoscope,
    categories,
    setCategories,
    bgClass,
    toggleCategory
  } = useNews(darkMode, showLowerThird);

  const [newsItems, setNewsItems] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [summary, setSummary] = useState('');
  const [chillMode, setChillMode] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (chillMode) {
      audio.play().catch(e => console.warn('Audio play blocked:', e));
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [chillMode]);

const fetchNews = async () => {
  setLoadingNews(true);
  try {
    const data = await callWebhook('https://n8n.amslerlabs.com/webhook/Newsticker');
    console.log('news payload:', data);   // should log an array of {title,url}
    setNewsItems(Array.isArray(data) ? data : []);
  } catch {
    setNewsItems([{ title: '⚠️ Unable to load news at the moment.' }]);
  } finally {
    setLoadingNews(false);
  }
};

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 3600000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showLowerThird) fetchNews();
  }, [showLowerThird]);

  const summarizeText = async text => {
    try {
      const data = await callWebhook('https://n8n.amslerlabs.com/webhook/producer-summary', 'POST', { notes: text });
      setSummary(data.result || 'No summary.');
    } catch {
      setSummary('Error summarizing.');
    }
  };

  const summarizeContent = () => summarizeText([...notes, ...wins].join('\n'));

  const exportSummaryDoc = () => {
    const html = `<!DOCTYPE html><html><body><p>${summary}</p><audio src="/lofi.mp3" autoplay loop></audio></body></html>`;
    const blob = new Blob([html], { type: 'application/msword' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'summary.doc';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const clearSummary = () => setSummary('');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'notes':
        return (
          <NotesPanel
            note={note}
            setNote={setNote}
            notes={notes}
            handleSaveNote={handleSaveNote}
            clearNotes={clearNotes}
            exportNotesDoc={exportNotesDoc}
            handleTimestamp={handleTimestamp}
            handlePasteClip={handlePasteClip}
            handleCueMarker={handleCueMarker}
            handleVoiceInput={handleNoteVoiceInput}
          />
        );
      case 'wins':
        return (
          <WinsPanel
            win={win}
            setWin={setWin}
            wins={wins}
            handleSaveWin={handleSaveWin}
            clearWins={clearWins}
            exportWinsDoc={exportWinsDoc}
            handleVoiceInput={handleWinVoiceInput}
          />
        );
      case 'chat':
        return null;
      case 'browse':
        return (
          <NewsTicker
            loading={loadingNews}
            horoscope={horoscope}
            newsItems={newsItems}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        expanded={sidebarExpanded}
        toggle={() => setSidebarExpanded(e => !e)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="flex-1 overflow-y-auto relative">
        <div className={`${darkMode ? 'dark' : ''}`}>
          <Header
            onToggleSettings={() => setSettingsOpen(o => !o)}
            showLowerThird={showLowerThird}
            setShowLowerThird={setShowLowerThird}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          >
            <a href="https://mail.google.com" target="_blank" rel="noreferrer" className="hover:text-red-400">📧 Gmail</a>
            <a href="slack://open" className="hover:text-purple-400">💬 Slack</a>
          </Header>

          {settingsOpen && (
            <SettingsPanel
              isOpen={settingsOpen}
              toggle={() => setSettingsOpen(o => !o)}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              categories={categories}
              toggleCategory={toggleCategory}
              bgClass={bgClass}
              chillMode={chillMode}
              setChillMode={setChillMode}
            />
          )}

          <main
            onDragOver={e => e.preventDefault()}
            className={`min-h-screen pt-20 p-6 ${darkMode ? 'bg-gray-900 text-white' : bgClass + ' text-gray-900'}`}
          >
            {renderTabContent()}
            {activeTab !== 'browse' && (
              <SummaryPanel
                summary={summary}
                summarizeContent={summarizeContent}
                clearSummary={clearSummary}
                exportSummaryDoc={exportSummaryDoc}
              />
            )}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={showLowerThird}
                onChange={() => setShowLowerThird(s => !s)}
                className="mr-2"
              />
              <label className="text-lg font-medium">Show News Ticker</label>
            </div>
          </main>

          {showLowerThird && activeTab !== 'browse' && (
            <NewsTicker
              loading={loadingNews}
              horoscope={horoscope}
              newsItems={newsItems}
            />
          )}

          <FloatingChat
            chatOpen={chatOpen}
            setChatOpen={setChatOpen}
            chatPrompt={chatPrompt}
            setChatPrompt={setChatPrompt}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            chatResponse={chatResponse}
            handleAskChatGPT={handleAskChatGPT}
            handleCopyResponse={handleCopyResponse}
            handleChatKeyPress={handleChatKeyPress}
            handleVoiceInput={handleChatVoiceInput}
            chatPos={chatPos}
            setChatPos={setChatPos}
            draggingChat={draggingChat}
            setDraggingChat={setDraggingChat}
            chatScrollRef={chatScrollRef}
            chatOffset={chatOffset}
            chatInputRef={chatInputRef}
            useAvatars={true}
            darkMode={darkMode}
            bgClass={bgClass}
          />

          <audio ref={audioRef} src="/lofi.mp3" loop preload="auto" />
        </div>
      </div>
    </div>
  );
}

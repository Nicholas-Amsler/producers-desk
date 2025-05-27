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
import { ZenParticles, ZenQuotes, zenModeStyles } from './Components/ZenMode';
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
  const [zenMode, setZenMode] = useState(false);
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

  // Get dynamic styles based on current mode
  const getStyles = () => {
    if (zenMode) return zenModeStyles;
    if (darkMode) return {
      background: 'bg-gray-900',
      text: 'text-white',
      button: 'bg-gray-700 hover:bg-gray-600 text-white',
      chatBg: 'bg-gray-800',
      notesBg: 'bg-gray-800',
      summaryBg: 'bg-gray-700'
    };
    return {
      background: bgClass,
      text: 'text-gray-900',
      button: '',
      chatBg: 'bg-white',
      notesBg: 'bg-white',
      summaryBg: 'bg-white'
    };
  };

  const currentStyles = getStyles();

  // Love Button Function - ADD THIS
  const playDaughterMessage = () => {
    const audio = new Audio('/5pm-sound.m4a');
    audio.play().catch(e => console.warn('Audio play blocked:', e));
    
    setChatHistory(prev => [...prev, {
      role: 'assistant',
      content: '💝 Playing your special love message... Your daughter thinks you\'re the most amazing mommy in the world! 🥰'
    }]);
  };

  const fetchNews = async () => {
    setLoadingNews(true);
    try {
      const data = await callWebhook('https://n8n.amslerlabs.com/webhook/Newsticker');
      console.log('news payload:', data);
      setNewsItems(Array.isArray(data) ? data : []);
    } catch {
      setNewsItems([{ title: '⚠️ Unable to load news at the moment.' }]);
    } finally {
      setLoadingNews(false);
    }
  };

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
    const html = `<!DOCTYPE html><html><body><p>${summary}</p></body></html>`;
    const blob = new Blob([html], { type: 'application/msword' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'summary.doc';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const clearSummary = () => setSummary('');

  // NEWS FETCH EFFECTS
  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 3600000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showLowerThird) fetchNews();
  }, [showLowerThird]);

  // DAUGHTER'S 5PM MESSAGE EFFECT - FIXED
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const cst = new Date(now.toLocaleString("en-US", {timeZone: "America/Chicago"}));
      const hour = cst.getHours();
      const minute = cst.getMinutes();
      
      const today = new Date().toDateString();
      const lastPlayed = localStorage.getItem('daughterMessageDate');
      
      if (hour === 17 && minute === 0 && lastPlayed !== today) {
        const audio = new Audio('/5pm-sound.m4a');
        audio.play().catch(e => console.warn('Audio play blocked:', e));
        
        setChatHistory(prev => [...prev, {
          role: 'assistant',
          content: '💕 5:00 PM - Time for a special message from someone who loves you very much... Listen closely! 👂✨'
        }]);
        
        localStorage.setItem('daughterMessageDate', today);
      }
    };

    // Check every minute
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, [setChatHistory]);

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
            zenMode={zenMode}
            styles={currentStyles}
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
            zenMode={zenMode}
            styles={currentStyles}
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
    <div className="flex h-screen overflow-hidden relative">
      {/* Zen Mode Background Effects */}
      {zenMode && (
        <>
          <ZenParticles />
          <ZenQuotes />
        </>
      )}

      <Sidebar
        expanded={sidebarExpanded}
        toggle={() => setSidebarExpanded(e => !e)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        zenMode={zenMode}
        styles={currentStyles}
      />
      
      <div className="flex-1 overflow-y-auto relative">
        <div className={`${darkMode && !zenMode ? 'dark' : ''}`}>
          <Header
            onToggleSettings={() => setSettingsOpen(o => !o)}
            showLowerThird={showLowerThird}
            setShowLowerThird={setShowLowerThird}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            zenMode={zenMode}
            styles={currentStyles}
            playDaughterMessage={playDaughterMessage}
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
              zenMode={zenMode}
              setZenMode={setZenMode}
              styles={currentStyles}
            />
          )}

          <main
            onDragOver={e => e.preventDefault()}
            className={`min-h-screen pt-20 p-6 relative z-10 ${currentStyles.background} ${currentStyles.text}`}
          >
            {renderTabContent()}
            
            {activeTab !== 'browse' && (
              <SummaryPanel
                summary={summary}
                summarizeContent={summarizeContent}
                clearSummary={clearSummary}
                exportSummaryDoc={exportSummaryDoc}
                zenMode={zenMode}
                styles={currentStyles}
              />
            )}
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={showLowerThird}
                  onChange={() => setShowLowerThird(s => !s)}
                  className="mr-2"
                />
                <label className={`text-lg font-medium ${currentStyles.text}`}>Show News Ticker</label>
              </div>
              
              {/* SECRET LOVE BUTTON */}
              <button
                onClick={playDaughterMessage}
                className={`
                  group relative overflow-hidden
                  px-4 py-2 rounded-full
                  ${zenMode 
                    ? 'bg-gradient-to-r from-yellow-200 to-teal-200 hover:from-yellow-300 hover:to-teal-300 text-teal-800' 
                    : darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-pink-300' 
                    : 'bg-pink-100 hover:bg-pink-200 text-pink-700'
                  }
                  transition-all duration-300 transform hover:scale-110
                  shadow-lg hover:shadow-xl
                `}
                title="A special message from someone who loves you ❤️"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span className="animate-pulse">💕</span>
                  <span className="text-sm font-medium">Love</span>
                </span>
              </button>
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
            zenMode={zenMode}
            bgClass={bgClass}
            styles={currentStyles}
          />
        </div>
      </div>
    </div>
  );
}
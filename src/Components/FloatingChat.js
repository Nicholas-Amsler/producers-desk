import React, { useRef, useState, useEffect } from 'react';
import { ReactComponent as ChatIcon } from '../message-circle.svg';

export default function FloatingChat({
  chatOpen,
  setChatOpen,
  chatPrompt,
  setChatPrompt,
  chatHistory,
  setChatHistory,
  handleAskChatGPT,
  handleChatKeyPress,
  chatInputRef,
  chatScrollRef,
  useAvatars = false,
  darkMode,
  bgClass,
  loading = false
}) {
  const chatBoxRef = useRef(null);
  const audioRef = useRef(null);
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });
  const [greeted, setGreeted] = useState(false);

// In your FloatingChat.js, replace the getTimeBasedGreeting function:

const getTimeBasedGreeting = async () => {
  try {
    // Create Basic Auth header (same as in useChat.js)
    const username = 'Mademoiselle';
    const password = 'Amelia1129!';
    const basicAuth = btoa(`${username}:${password}`);

    const res = await fetch("https://n8n.amslerlabs.com/webhook/53cc4027-8e82-46ed-b855-880cd4c15b33/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${basicAuth}`  // ADD THIS LINE
      },
      body: JSON.stringify({
        question: "Give me a time-based greeting for Mademoiselle."
      })
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();
    return data.output || data.text || data.reply || data.answer || 'Hello, Mademoiselle.';
  } catch (err) {
    console.error("Greeting fetch failed:", err);
    return 'Hello, Mademoiselle.';
  }
};

 useEffect(() => {
  if (chatOpen && !greeted) {
    (async () => {
      const message = await getTimeBasedGreeting();
      setChatHistory(prev => [...prev, { role: 'assistant', content: message }]);
      setGreeted(true);
    })();
  }

  if (!chatOpen) setGreeted(false);
}, [chatOpen]);

  useEffect(() => {
  const sequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'
  ];
  let index = 0;

  const handleKeyDown = (e) => {
    if (e.key === sequence[index]) {
      index++;
      if (index === sequence.length) {
        setChatHistory(prev => [...prev, {
          role: 'assistant',
          content: '🕹️ Secret Mode Activated! Unlimited charisma enabled. (Press Escape to stop ocean sounds)'
        }]);
        
        // Play the ocean sound
        if (audioRef.current) {
          audioRef.current.currentTime = 0; // Reset to beginning
          audioRef.current.play();
        }
        
        index = 0;
      }
    } else if (e.key === 'Escape') {
      // Stop the ocean sounds with Escape key
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    } else {
      index = 0;
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);

  useEffect(() => {
    if (chatScrollRef?.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const startDrag = (e) => {
    if (e.button !== 0) return;
    const box = chatBoxRef.current.getBoundingClientRect();
    setDragging(true);
    setRel({ x: e.clientX - box.left, y: e.clientY - box.top });
    e.stopPropagation();
    e.preventDefault();
  };

  const onDrag = (e) => {
    if (!dragging) return;
    e.preventDefault();
    setPos({ x: e.clientX - rel.x, y: e.clientY - rel.y });
  };

  const stopDrag = () => {
    setDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
    return () => {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
    };
  }, [dragging, rel]);

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support speech recognition.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setChatPrompt(result);
    };
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
    recognition.start();
  };

  return (
    <>
      <audio ref={audioRef} src="/sounds/ocean.mp3" preload="auto" />
      {chatOpen && (
        <div
          ref={chatBoxRef}
          style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
          className={`fixed z-[9999] border rounded-lg shadow-xl w-96 h-[70vh] flex flex-col transition-all duration-75 ${bgClass} ${darkMode ? 'text-white border-gray-600' : 'text-gray-900 border-gray-300'}`}
          role="dialog"
          aria-modal="true"
        >
          <div
            onMouseDown={startDrag}
            className={`cursor-move px-4 py-2 border-b font-bold select-none ${darkMode ? 'text-white bg-gradient-to-r from-purple-800 to-pink-800' : 'text-gray-900 bg-gradient-to-r from-pink-100 to-yellow-100'}`}
          >
            🎬 Mademoiselle's Assistant
          </div>
          <div
            ref={chatScrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3"
          >
            {chatHistory.map((msg, idx) => (
              <div key={idx} className="flex items-start">
                {useAvatars && (
                  <img
                    src={`/avatars/${msg.role === 'user' ? 'user-avatar.png' : 'al-avatar.png'}`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}
                <div className="flex-1">
                  <div
                    className={`p-2 rounded-lg whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? darkMode ? 'bg-blue-800 text-white' : 'bg-blue-100 text-black'
                        : darkMode ? 'bg-green-800 text-white' : 'bg-green-100 text-black'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {loading && <p className="text-sm text-gray-400">Mademoiselle is thinking...</p>}
          </div>
          <div className="p-4 border-t">
            <textarea
              value={chatPrompt}
              onChange={(e) => setChatPrompt(e.target.value)}
              onKeyDown={handleChatKeyPress}
              ref={chatInputRef}
              className="w-full h-20 p-2 border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="What would you like me to handle, Mademoiselle?"
              aria-label="Type a message to Mademoiselle"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleAskChatGPT}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
              >
                Relay Command
              </button>
              <button
                onClick={handleVoiceInput}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full"
              >
                🎤 Speak
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setChatOpen((o) => !o)}
        aria-label="Toggle assistant chat"
        className="fixed bottom-24 left-1/2 transform -translate-x-1/2 flex items-center px-4 py-2 rounded-full bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 transition z-50"
      >
        <ChatIcon className="h-6 w-6 mr-2" />
        Summon the Assistant
      </button>
    </>
  );
}

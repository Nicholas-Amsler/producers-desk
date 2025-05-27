import { useState, useEffect, useRef } from 'react';

export default function useChat() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatPrompt, setChatPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [chatResponse, setChatResponse] = useState('');
  const [chatPos, setChatPos] = useState({
    x: window.innerWidth / 2 - 160,
    y: window.innerHeight - 300,
  });
  const [draggingChat, setDraggingChat] = useState(false);
  const chatOffset = useRef({ x: 0, y: 0 });
  const chatInputRef = useRef(null);
  const chatScrollRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  // Core logic: Send prompt to ChatBrain via webhook
  const handleAskChatGPT = async () => {
    const prompt = chatPrompt.trim();
    if (!prompt) return;

    // 1. Show user prompt in chat
    setChatHistory((prev) => [...prev, { role: 'user', content: prompt }]);
    setChatPrompt('');
    setChatResponse('Loading...');

    try {
      // 2. Generate or retrieve persistent sessionId
      let sessionId = localStorage.getItem('chatSessionId');
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem('chatSessionId', sessionId);
      }

      // 3. Create Basic Auth header
      const username = 'Mademoiselle';
      const password = 'Amelia1129!';
      const basicAuth = btoa(`${username}:${password}`);

      // 4. Send POST to n8n webhook with authentication
      const res = await fetch('https://n8n.amslerlabs.com/webhook/53cc4027-8e82-46ed-b855-880cd4c15b33/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Basic ${basicAuth}`
        },
        body: JSON.stringify({
          question: prompt,
          sessionId: sessionId,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      }

      const data = await res.json();

      // 5. Get reply and update history
      const reply = data.output || data.text || data.reply || data.answer || 'No reply from Mademoiselle.';
      setChatHistory((prev) => [...prev, { role: 'assistant', content: reply }]);
      setChatResponse(reply);
    } catch (err) {
      console.error('ChatBrain error:', err);
      setChatResponse('⚠️ Mademoiselle is offline. Try again shortly.');
    }
  };

  const handleCopyResponse = () => {
    if (chatResponse) {
      navigator.clipboard.writeText(chatResponse).then(() => {
        console.log('Response copied to clipboard.');
      });
    }
  };

  const handleChatKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskChatGPT();
    }
  };

  const handleVoiceInput = async (setter) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert('Speech recognition not supported.');
    const rec = new SR();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => setter(e.results[0][0].transcript);
    rec.onerror = (e) => alert('Voice error: ' + e.error);
    rec.start();
  };

  return {
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
    handleVoiceInput,
    chatPos,
    setChatPos,
    draggingChat,
    setDraggingChat,
    chatOffset,
    chatInputRef,
    chatScrollRef,
  };
}
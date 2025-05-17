// src/hooks/useChat.js
import { useState, useEffect, useRef } from 'react';

export default function useChat() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatPrompt, setChatPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [chatResponse, setChatResponse] = useState('');
  const [chatPos, setChatPos] = useState({ x: window.innerWidth / 2 - 160, y: window.innerHeight - 300 });
  const [draggingChat, setDraggingChat] = useState(false);
  const chatOffset = useRef({ x: 0, y: 0 });
  const chatInputRef = useRef(null);
  const chatScrollRef = useRef(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  const handleAskChatGPT = async () => {
    if (!chatPrompt.trim()) return;
    setChatHistory(h => [...h, { role: 'user', content: chatPrompt }]);
    setChatPrompt('');
    setChatResponse('Loading...');

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: "You are AL, the voice assistant for Mademoiselle..."
            },
            ...chatHistory,
            { role: 'user', content: chatPrompt }
          ],
          temperature: 0.7
        })
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'No response.';
      setChatHistory(h => [...h, { role: 'assistant', content: reply }]);
      setChatResponse(reply);
    } catch {
      setChatResponse('Error contacting OpenAI.');
    }
  };

  const handleCopyResponse = () => {
    if (chatResponse) navigator.clipboard.writeText(chatResponse);
  };

  const handleChatKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskChatGPT();
    }
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
    chatScrollRef
  };
}
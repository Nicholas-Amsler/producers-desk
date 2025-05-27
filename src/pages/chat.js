// src/pages/Chat.js
import React, { useRef, useEffect } from 'react';

export default function Chat({ chatPrompt, setChatPrompt, chatHistory, setChatHistory, handleAskChatGPT }) {
  const chatInputRef = useRef(null);
  const chatScrollRef = useRef(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">💬 Chat</h2>
      <div className="border p-4 rounded mb-2 max-h-64 overflow-y-auto">
        {chatHistory.map((msg, i) => (
          <div key={i} className={`mb-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-1 rounded ${msg.role === 'user' ? 'bg-blue-200' : 'bg-yellow-200'}`}>{msg.content}</span>
          </div>
        ))}
        <div ref={chatScrollRef} />
      </div>
      <textarea
        ref={chatInputRef}
        value={chatPrompt}
        onChange={e => setChatPrompt(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAskChatGPT();
          }
        }}
        placeholder="Ask AL anything..."
        className="w-full p-2 border rounded"
      />
      <button onClick={handleAskChatGPT} className="bg-purple-600 text-white px-4 py-2 rounded mt-2">Send</button>
    </section>
  );
}

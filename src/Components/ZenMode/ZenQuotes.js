// src/Components/ZenMode/ZenQuotes.js
import React, { useState, useEffect } from 'react';

const ZenQuotes = () => {
  const quotes = [
    "Every great production starts with a single vision 🎬",
    "You're creating magic, one scene at a time ✨",
    "Today's challenges are tomorrow's success stories 🌟",
    "Your creativity knows no bounds 🌈",
    "Each project is a step toward your masterpiece 🎭",
    "You have the power to bring stories to life 📽️",
    "Trust your vision, it's uniquely yours 💫",
    "Great producers turn dreams into reality 🌙",
    "Your passion is the fuel for extraordinary work 🔥",
    "Every detail matters in your creative journey 🎨",
    "You're not just making content, you're crafting experiences 💛",
    "Your leadership brings stories to life 🌟",
    "Today is full of creative possibilities ☀️"
  ];

  const [currentQuote, setCurrentQuote] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setIsVisible(true);
      }, 500);
    }, 8000); // Change quote every 8 seconds

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
      <div
        className={`
          bg-gradient-to-r from-yellow-200/90 to-teal-200/90 
          backdrop-blur-sm rounded-full px-8 py-4 shadow-xl
          border border-yellow-300/50
          transition-all duration-500 ease-in-out
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
        style={{
          boxShadow: '0 8px 32px rgba(255, 215, 0, 0.3), 0 4px 16px rgba(0, 188, 212, 0.2)'
        }}
      >
        <p className="text-teal-800 font-semibold text-center whitespace-nowrap text-lg">
          {quotes[currentQuote]}
        </p>
      </div>
    </div>
  );
};

export default ZenQuotes;
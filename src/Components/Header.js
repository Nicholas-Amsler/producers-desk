import React from 'react';
import { FiSettings, FiVolume2, FiTv, FiShoppingCart, FiMail, FiMessageCircle } from 'react-icons/fi';

export default function Header({ onToggleSettings }) {
  return (
    <header className="fixed top-0 right-0 left-0 z-40 flex items-center justify-end p-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-md">
      <span className="mr-auto text-xl font-bold pl-4 bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 animate-text">
        Mademoiselle's <span className="italic font-light">Producer Perch</span>
      </span>

      <div className="flex items-center space-x-4">
        <a href="https://mail.google.com" target="_blank" rel="noreferrer" className="hover:text-red-400 transition" title="Gmail">
          <FiMail size={20} />
        </a>
        <a href="slack://open" className="hover:text-purple-400 transition" title="Slack">
          <FiMessageCircle size={20} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-red-500 transition" title="YouTube">
          <FiTv size={20} />
        </a>
        <a href="https://megaphone.com" target="_blank" rel="noreferrer" className="hover:text-yellow-300 transition" title="Megaphone">
          <FiVolume2 size={20} />
        </a>
        <a href="https://amazon.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition" title="Amazon">
          <FiShoppingCart size={20} />
        </a>
        <button onClick={onToggleSettings} className="hover:text-green-400 transition" title="Settings">
          <FiSettings size={20} />
          <span className="sr-only">Settings</span>
        </button>
      </div>
    </header>
  );
}

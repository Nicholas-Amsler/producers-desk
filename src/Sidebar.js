// src/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaStickyNote, FaTrophy, FaComments, FaBars, FaChevronLeft, FaGlobe } from 'react-icons/fa';

export default function Sidebar({ expanded, toggle, activeTab, setActiveTab }) {
  const location = useLocation();

const tabs = [
  { name: 'Notes', path: '/', icon: <FaStickyNote /> },
  { name: 'Wins', path: '/wins', icon: <FaTrophy /> },
  { name: 'Chat', path: '/chat', icon: <FaComments /> },
  { name: 'Browse', path: '/browse', icon: <FaGlobe /> }
];


  return (
    <div className={`bg-gray-900 text-white h-full transition-all duration-300 flex flex-col ${expanded ? 'w-64' : 'w-16'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <span className={`text-lg font-semibold transition-opacity duration-300 ${expanded ? 'opacity-100' : 'opacity-0'} overflow-hidden whitespace-nowrap`}>Mademoiselle</span>
        <button onClick={toggle} className="ml-auto text-white text-sm hover:text-yellow-300">
          {expanded ? <FaChevronLeft /> : <FaBars />}
        </button>
      </div>
      <nav className="flex-1 mt-4">
        {tabs.map(tab => (
          <Link
            key={tab.name}
            to={tab.path}
            onClick={() => setActiveTab(tab.name.toLowerCase())}
            className={`flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-gray-700 ${location.pathname === tab.path ? 'bg-yellow-500 text-black' : ''}`}
          >
            {tab.icon}
            {expanded && <span>{tab.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
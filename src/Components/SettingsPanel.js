// src/components/SettingsPanel.js
import React from 'react';

export default function SettingsPanel({
  isOpen,
  toggle,
  darkMode,
  setDarkMode,
  categories,
  toggleCategory,
  bgClass,
  chillMode,         // ✅ ADDED
  setChillMode       // ✅ ADDED
}) {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed top-16 right-4 p-4 w-48 rounded shadow-lg border z-50 ${
        darkMode
          ? 'bg-gray-800 border-gray-600 text-white'
          : bgClass + ' border-gray-300 text-gray-900'
      }`}
    >
      <h3 className="font-semibold mb-2">Settings</h3>

      <div className="mb-2">
        <span className="font-medium">Categories:</span>
        {['entertainment', 'music'].map((cat) => (
          <label key={cat} className="flex items-center mt-1">
            <input
              type="checkbox"
              checked={categories.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="mr-2"
            />
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </label>
        ))}
      </div>

      <label className="flex items-center">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode((d) => !d)}
          className="mr-2"
        />
        Dark Mode
      </label>

      {/* ✅ CHILL MODE */}
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          checked={chillMode}
          onChange={() => setChillMode((m) => !m)}
          className="mr-2"
        />
        <label className="text-lg font-medium">🌙 Chill Mode</label>
      </div>
    </div>
  );
}

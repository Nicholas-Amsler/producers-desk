import React from 'react';

export default function SettingsPanel({
  isOpen,
  toggle,
  darkMode,
  setDarkMode,
  zenMode,
  setZenMode,
  styles
}) {
  if (!isOpen) return null;

  const panelBg = zenMode 
    ? 'bg-gradient-to-br from-yellow-100/95 to-teal-100/95 backdrop-blur-md' 
    : darkMode 
    ? 'bg-gray-800' 
    : 'bg-white';

  const textColor = zenMode ? 'text-teal-900' : darkMode ? 'text-white' : 'text-gray-900';
  const borderColor = zenMode ? 'border-teal-200' : darkMode ? 'border-gray-600' : 'border-gray-200';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${panelBg} ${textColor} p-6 rounded-lg shadow-xl border ${borderColor} max-w-md w-full mx-4`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center">
            {zenMode ? '🧘‍♀️' : '⚙️'} Settings
          </h2>
          <button
            onClick={toggle}
            className={`${textColor} hover:opacity-70 text-2xl`}
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Mode Controls */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Experience Mode</h3>
            
            {/* Zen Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🧘‍♀️</span>
                <div>
                  <label className="font-medium">Zen Producer Mode</label>
                  <p className="text-sm opacity-70">
                    Peaceful environment with floating particles & inspiration
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={zenMode}
                  onChange={(e) => {
                    setZenMode(e.target.checked);
                    if (e.target.checked) {
                      setDarkMode(false); // Disable dark mode when zen mode is on
                    }
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-yellow-400 peer-checked:to-teal-400"></div>
              </label>
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🌙</span>
                <div>
                  <label className="font-medium">Dark Mode</label>
                  <p className="text-sm opacity-70">
                    Classic dark theme for focused work
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode && !zenMode}
                  disabled={zenMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-11 h-6 ${zenMode ? 'bg-gray-300' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${!zenMode && 'peer-checked:bg-blue-600'}`}></div>
              </label>
            </div>
          </div>

          {/* Curated News Info */}
          <div className="space-y-3">
            <h3 className="font-semibold">News Feed</h3>
            <div className={`p-4 rounded-lg ${zenMode ? 'bg-gradient-to-r from-yellow-50 to-teal-50 border border-yellow-200' : darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${zenMode ? 'text-teal-800' : textColor}`}>
                📰 <strong>Curated Feed:</strong> Your news ticker shows handpicked stories from premium entertainment and industry sources, updated regularly for the perfect producer experience.
              </p>
            </div>
          </div>

          {/* Zen Mode Info */}
          {zenMode && (
            <div className="bg-gradient-to-r from-yellow-50 to-teal-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-sm text-teal-800">
                🌟 <strong>Zen Mode Active:</strong> Experience a calming environment designed to enhance your creative flow. Floating particles, inspiring quotes, and peaceful colors create the perfect atmosphere for productive work.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
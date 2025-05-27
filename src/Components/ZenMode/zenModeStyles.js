// src/Components/ZenMode/zenModeStyles.js

// CSS-in-JS styles for zen mode with yellow & teal theme
export const zenModeStyles = {
  // Main background gradient - more transparent to let particles show
  background: 'bg-gradient-to-br from-yellow-50/60 via-teal-50/60 to-cyan-50/60',
  
  // Text colors
  text: 'text-teal-900',
  
  // Button styles
  button: 'bg-gradient-to-r from-yellow-200 to-teal-200 hover:from-yellow-300 hover:to-teal-300 text-teal-800 border-teal-300',
  
  // Chat styles
  chatBg: 'bg-gradient-to-r from-yellow-100/70 to-teal-100/70 backdrop-blur-sm',
  chatBorder: 'border-teal-300',
  
  // Notes panel - more transparent to show particles
  notesBg: 'bg-white/30 backdrop-blur-sm border-yellow-300',
  
  // Summary panel - more transparent
  summaryBg: 'bg-gradient-to-r from-teal-100/50 to-yellow-100/50 backdrop-blur-sm',
  
  // Sidebar
  sidebarBg: 'bg-gradient-to-b from-teal-900/90 to-yellow-800/90',
  sidebarText: 'text-yellow-100',
  
  // Header
  headerBg: 'bg-gradient-to-r from-teal-800/90 to-yellow-700/90 backdrop-blur-sm',
  headerText: 'text-yellow-100'
};
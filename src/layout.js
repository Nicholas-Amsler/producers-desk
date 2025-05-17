// src/Layout.js
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout({ sidebarExpanded, setSidebarExpanded, activeTab, setActiveTab }) {
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        expanded={sidebarExpanded}
        toggle={() => setSidebarExpanded(e => !e)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="flex-1 overflow-y-auto p-4">
        {/* Optional breadcrumb or path indicator */}
        <div className="mb-4 text-sm text-gray-500">
          Current path: <code>{location.pathname}</code>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
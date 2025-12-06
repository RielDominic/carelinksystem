import React, { useState } from 'react';
import Sidebar from './Sidebar';

export default function CaregiverDashboard({ user, onLogout }) {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ display: "flex", background: "#f8fdfb", minHeight: "100vh" }}>
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} role="caregiver" />
      
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ background: "white", borderBottom: "1px solid #e6f7f0", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0, color: "#1a3a2e", fontSize: 28 }}>Caregiver Dashboard</h2>
          <p style={{ margin: "8px 0 0", color: "#5f8074" }}>View and manage your assigned seniors</p>
        </div>
        <div>
          {user && <span style={{ marginRight: 16, color: "#5f8074" }}>Signed in as {user.name || user.email}</span>}
          <button onClick={onLogout} style={{ padding: "8px 16px", background: "#2d9b6d", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}>Logout</button>
        </div>
      </header>

      <main style={{ padding: 32 }}>
        <p>Welcome to the caregiver dashboard. Add caregiver-specific features here.</p>
        <ul>
          <li>View assigned seniors</li>
          <li>Monitor alerts</li>
          <li>Send messages</li>
        </ul>
      </main>
      </div>
    </div>
  );
}

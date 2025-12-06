import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

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
          {user && <span style={{ marginRight: 12 }}>Signed in as {user.name || user.email}</span>}
          <button onClick={onLogout} style={{ padding: '8px 12px' }}>Logout</button>
        </div>
      </header>

      <main style={{ marginTop: 24 }}>
        <p>Welcome to the caregiver view. Add caregiver-specific features here.</p>
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

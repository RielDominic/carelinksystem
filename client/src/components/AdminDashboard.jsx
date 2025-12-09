import React, { useState } from 'react';
import Sidebar from './Sidebar';
import SeniorsListPage from './SeniorsListPage';

export default function AdminDashboard({ user, onLogout }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const stats = [
    { title: "Total Seniors", value: "12", change: "+3 this month", color: "#2d9b6d" },
    { title: "Active Caregivers", value: "12", change: "All on duty", color: "#52b788" },
    { title: "Active Alerts", value: "7", change: "2 urgent", color: "#f0ad4e" },
  ];

  const caregivers = [
    { name: "Caregiver 1", seniors: 12, status: "On Duty", shift: "Morning" },
    { name: "Caregiver 2", seniors: 10, status: "On Duty", shift: "Morning" },
    { name: "Caregiver 3", seniors: 9, status: "On Break", shift: "Afternoon" },
    { name: "Caregiver 4", seniors: 11, status: "On Duty", shift: "Afternoon" },
    { name: "Caregiver 5", seniors: 6, status: "Off Duty", shift: "Night" },
  ];

  const recentActivities = [
    { action: "New senior admitted", user: "Elder 4", time: "30 mins ago", type: "info" },
    { action: "Alert resolved", user: "Elder 2 - BP Normal", time: "1 hour ago", type: "success" },
    { action: "Medication updated", user: "Elder 1", time: "2 hours ago", type: "info" },
    { action: "Staff added", user: "New caregiver: Caregiver 6", time: "3 hours ago", type: "success" },
  ];

  const facilitiesOverview = [
    { name: "North Wing", seniors: 18, capacity: 20, status: "good" },
    { name: "South Wing", seniors: 15, capacity: 18, status: "good" },
    { name: "East Wing", seniors: 15, capacity: 15, status: "full" },
  ];

  const getStatusBadgeStyle = (status) => {
    if (status === "On Duty") return { background: "#52b788", color: "white", padding: "4px 8px", borderRadius: 4, fontSize: 12 };
    if (status === "On Break") return { background: "#f0ad4e", color: "white", padding: "4px 8px", borderRadius: 4, fontSize: 12 };
    return { background: "#5f8074", color: "white", padding: "4px 8px", borderRadius: 4, fontSize: 12 };
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ display: "flex", background: "#f8fdfb", minHeight: "100vh" }}>
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} role="admin" />
      
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ background: "white", borderBottom: "1px solid #e6f7f0", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0, color: "#1a3a2e", fontSize: 28 }}>
            {currentPage === 'dashboard' ? 'Admin Dashboard' : currentPage === 'seniors' ? 'Seniors Management' : 'Admin Portal'}
          </h2>
          <p style={{ margin: "8px 0 0", color: "#5f8074" }}>
            {currentPage === 'dashboard' ? 'Complete overview of facility operations' : currentPage === 'seniors' ? 'Manage and monitor all seniors in your care' : 'CareLink Administration'}
          </p>
        </div>
        <div>
          {user && <span style={{ marginRight: 16, color: "#5f8074" }}>Signed in as {user.name || user.email}</span>}
          <button onClick={onLogout} style={{ padding: "8px 16px", background: "#2d9b6d", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}>Logout</button>
        </div>
      </header>

      <main style={{ padding: 32 }}>
        {currentPage === 'dashboard' && (
          <>
        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 24 }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{ background: "white", padding: 24, borderRadius: 16, border: "1px solid #e6f7f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <p style={{ margin: 0, fontSize: 12, color: "#5f8074" }}>{stat.title}</p>
                  <h3 style={{ margin: "8px 0 0", fontSize: 32, color: "#1a3a2e", fontWeight: "bold" }}>{stat.value}</h3>
                </div>
                <div style={{ width: 48, height: 48, background: stat.color, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 24 }}>📊</span>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: "#5f8074" }}>📈 {stat.change}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 24, marginBottom: 24 }}>
          {/* Caregivers Overview */}
          <div style={{ background: "white", padding: 24, borderRadius: 16, border: "1px solid #e6f7f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ margin: 0, color: "#1a3a2e", fontSize: 18 }}>Caregiver Status</h3>
              <button style={{ background: "none", border: "none", color: "#2d9b6d", cursor: "pointer", textDecoration: "underline" }}>View All</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {caregivers.map((caregiver, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, background: "#f8fdfb", borderRadius: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, background: "#2d9b6d", borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold" }}>C{idx + 1}</div>
                    <div>
                      <p style={{ margin: 0, color: "#1a3a2e" }}>{caregiver.name}</p>
                      <p style={{ margin: "4px 0 0", fontSize: 12, color: "#5f8074" }}>{caregiver.seniors} seniors • {caregiver.shift}</p>
                    </div>
                  </div>
                  <span style={getStatusBadgeStyle(caregiver.status)}>{caregiver.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Facility Overview */}
          <div style={{ background: "white", padding: 24, borderRadius: 16, border: "1px solid #e6f7f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <h3 style={{ margin: "0 0 16px 0", color: "#1a3a2e", fontSize: 18 }}>🏢 Facility Occupancy</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {facilitiesOverview.map((facility, idx) => (
                <div key={idx}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <p style={{ margin: 0, color: "#1a3a2e" }}>{facility.name}</p>
                      {facility.status === "full" && <span style={{ fontSize: 10, background: "#e85d75", color: "white", padding: "2px 6px", borderRadius: 3 }}>Full</span>}
                    </div>
                    <p style={{ margin: 0, fontSize: 12, color: "#5f8074" }}>{facility.seniors}/{facility.capacity}</p>
                  </div>
                  <div style={{ width: "100%", background: "#e6f7f0", borderRadius: 999, height: 12, overflow: "hidden" }}>
                    <div style={{ height: "100%", background: facility.status === "full" ? "#e85d75" : "#2d9b6d", borderRadius: 999, width: `${(facility.seniors / facility.capacity) * 100}%` }} />
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #e6f7f0", paddingTop: 12, marginTop: 12, display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: 0, color: "#1a3a2e" }}>Total Capacity</p>
                <p style={{ margin: 0, color: "#5f8074" }}>48/53 beds occupied</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ background: "white", padding: 24, borderRadius: 16, border: "1px solid #e6f7f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: "0 0 16px 0", color: "#1a3a2e", fontSize: 18 }}>Recent Activity</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {recentActivities.map((activity, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: 12, background: "#f8fdfb", borderRadius: 12 }}>
                <div style={{ width: 8, height: 8, background: activity.type === "success" ? "#52b788" : "#2d9b6d", borderRadius: 999, marginTop: 6 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: "#1a3a2e" }}>{activity.action}</p>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#5f8074" }}>{activity.user}</p>
                </div>
                <span style={{ fontSize: 12, color: "#5f8074" }}>{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
          </>
        )}
        {currentPage === 'seniors' && (
          <SeniorsListPage onViewProfile={() => setCurrentPage('senior-detail')} userType="admin" />
        )}
      </main>
      </div>
    </div>
  );
}

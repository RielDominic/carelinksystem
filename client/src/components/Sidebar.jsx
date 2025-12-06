import React from 'react';

export default function Sidebar({ currentPage, onNavigate, role }) {
  const adminMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "seniors", label: "Seniors", icon: "👥" },
    { id: "caregivers", label: "Caregivers", icon: "🏥" },
    { id: "alerts", label: "Alerts", icon: "⚠️" },
    { id: "reports", label: "Reports", icon: "📄" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const caregiverMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "seniors", label: "My Seniors", icon: "👥" },
    { id: "alerts", label: "Alerts", icon: "⚠️" },
    { id: "messages", label: "Messages", icon: "💬" },
    { id: "schedule", label: "Schedule", icon: "📅" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  const menuItems = role === "admin" ? adminMenuItems : caregiverMenuItems;

  return (
    <div style={{ width: 256, background: "white", borderRight: "1px solid #e6f7f0", height: "100vh", display: "flex", flexDirection: "column", position: "sticky", top: 0 }}>
      {/* Logo */}
      <div style={{ padding: 24, borderBottom: "1px solid #e6f7f0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: "linear-gradient(135deg, #2d9b6d, #4db88a)", padding: 8, borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <span style={{ fontSize: 24 }}>❤️</span>
          </div>
          <div>
            <h2 style={{ margin: 0, color: "#1a3a2e", fontSize: 18, fontWeight: "bold" }}>CareLink</h2>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "#5f8074" }}>{role === "admin" ? "Admin Portal" : "Caregiver Portal"}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 8, overflowY: "auto" }}>
        {menuItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 12,
                paddingBottom: 12,
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: isActive ? "linear-gradient(135deg, #2d9b6d, #4db88a)" : "transparent",
                color: isActive ? "white" : "#1a3a2e",
                fontWeight: isActive ? "500" : "normal",
                boxShadow: isActive ? "0 4px 12px rgba(45, 155, 109, 0.2)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.background = "#f0f9f5";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.background = "transparent";
                }
              }}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: 16, borderTop: "1px solid #e6f7f0", textAlign: "center", fontSize: 12, color: "#5f8074" }}>
        <p style={{ margin: 0 }}>v1.0.0</p>
      </div>
    </div>
  );
}

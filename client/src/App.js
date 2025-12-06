import './App.css';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import CaregiverDashboard from './components/CaregiverDashboard';

function App() {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const u = localStorage.getItem('user');
    if (token && u) {
      try {
        const parsed = JSON.parse(u);
        setUser(parsed);
        setRole(parsed.role || null);
      } catch (e) {
        console.warn('Failed to parse stored user');
      }
    }
  }, []);

  const handleLogin = (userRole) => {
    // On login, read stored user if available
    const u = localStorage.getItem('user');
    if (u) {
      try { setUser(JSON.parse(u)); } catch (e) {}
    }
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setRole(null);
  };

  return (
    <div className="App">
      {!role && <Login onLogin={handleLogin} />}
      {role === 'admin' && <AdminDashboard user={user} onLogout={handleLogout} />}
      {role === 'caregiver' && <CaregiverDashboard user={user} onLogout={handleLogout} />}
    </div>
  );
}

export default App;

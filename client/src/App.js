import './App.css';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import CaregiverDashboard from './components/CaregiverDashboard';
import api from './api/axios';

function App() {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Verify token with backend on load. If token is missing/invalid,
    // clear stored auth and show the login screen.
    const verify = async () => {
      const token = localStorage.getItem('token');
      const u = localStorage.getItem('user');
      if (!token || !u) {
        setCheckingAuth(false);
        return;
      }

      try {
        const res = await api.get('/auth/me');
        const userData = res?.data?.user;
        if (userData) {
          setUser(userData);
          setRole(userData.role || null);
        } else {
          // Fallback to stored user if server didn't return user
          const parsed = JSON.parse(u);
          setUser(parsed);
          setRole(parsed.role || null);
        }
      } catch (err) {
        console.warn('Token invalid or server unreachable - clearing stored auth');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setRole(null);
      } finally {
        setCheckingAuth(false);
      }
    };

    verify();
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
      {checkingAuth ? null : (
        <>
          {!role && <Login onLogin={handleLogin} />}
          {role === 'admin' && <AdminDashboard user={user} onLogout={handleLogout} />}
          {role === 'caregiver' && <CaregiverDashboard user={user} onLogout={handleLogout} />}
        </>
      )}
    </div>
  );
}

export default App;

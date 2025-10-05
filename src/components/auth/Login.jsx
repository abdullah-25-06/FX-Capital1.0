// src/components/auth/Login.jsx
import React, { useState, useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // where to redirect after login
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    // call your backend API to verify credentials...
    // For example:
    // const res = await fetch('/api/login', { method:'POST', body: JSON.stringify({email,password}) })
    // const data = await res.json()
    // if success: login(data.user)

    // Mock success:
    const mockUser = { id: 1, name: 'Ali', email };
    login(mockUser);

    // redirect to intended page
    navigate(from, { replace: true });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <p>New? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}

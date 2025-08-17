import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LightRays from '../ui/backgrounds/LightRays';

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/admin/register', { email, password });
      localStorage.setItem('nexus_admin_token', res.data.token);
      navigate('/admin/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
      {/* Animated LightRays background */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="light-rays-container"
        />
      </div>
      <div className="relative z-10 w-full max-w-md p-8 bg-[#181a1b] bg-opacity-95 rounded-2xl shadow-2xl flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg tracking-wide">Admin Registration</h2>
        <form onSubmit={handleRegister} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-cyan-300 font-semibold" htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full px-4 py-2 rounded-md bg-[#222] border border-cyan-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-cyan-300 font-semibold" htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full px-4 py-2 rounded-md bg-[#222] border border-cyan-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition" />
          </div>
          {error && <div className="text-red-400 text-sm text-center font-semibold">{error}</div>}
          <button type="submit"
            className="w-full py-3 mt-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-lg shadow-lg transition">Register</button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;

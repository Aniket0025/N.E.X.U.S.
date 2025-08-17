import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import LightRays from '../ui/backgrounds/LightRays';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/student/login', { email, password });
      localStorage.setItem('nexus_student_token', res.data.token);
      localStorage.setItem('nexus_student', JSON.stringify(res.data.student));
      navigate('/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  // Google OAuth Success Handler
  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    try {
      // Native JWT decode (no external library)
      const base64Url = credentialResponse.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const decoded = JSON.parse(jsonPayload);
      const googleEmail = decoded.email;
      // Send to backend for student check
      const res = await axios.post('http://localhost:5000/api/student/google-login', { email: googleEmail, token: credentialResponse.credential });
      localStorage.setItem('nexus_student_token', res.data.token);
      localStorage.setItem('nexus_student', JSON.stringify(res.data.student));
      navigate('/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Google login failed');
    }
  };

  return (
    <GoogleOAuthProvider clientId="465180806203-dufv5j793ai4i0epa8bo41iteij4rd8o.apps.googleusercontent.com">
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
          <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg tracking-wide">Student Login</h2>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
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
              className="w-full py-3 mt-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-lg shadow-lg transition">Sign In</button>
          </form>
          <div className="my-6 text-cyan-200 font-bold text-center">OR</div>
          <div className="flex justify-center w-full">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google login failed')}
              width="320"
              theme="filled_black"
              text="continue_with"
              shape="pill"
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default StudentLogin;

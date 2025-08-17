import React from 'react';
import { useNavigate } from 'react-router-dom';
import LightRays from '../ui/backgrounds/LightRays';

const SignInSelect = () => {
  const navigate = useNavigate();
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
      <div className="relative z-10 w-full max-w-lg p-10 bg-[#181a1b] bg-opacity-95 rounded-2xl shadow-2xl flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg tracking-wide">Sign In As</h2>
        <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
          <button className="flex-1 py-4 px-8 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-lg shadow-lg transition" onClick={() => navigate('/admin/login')}>
            Admin
          </button>
          <button className="flex-1 py-4 px-8 rounded-lg bg-green-400 hover:bg-green-300 text-black font-bold text-lg shadow-lg transition" onClick={() => navigate('/teacher/login')}>
            Teacher
          </button>
          <button className="flex-1 py-4 px-8 rounded-lg bg-yellow-300 hover:bg-yellow-200 text-black font-bold text-lg shadow-lg transition" onClick={() => navigate('/student/login')}>
            Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInSelect;

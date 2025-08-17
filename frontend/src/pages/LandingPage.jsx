import React from 'react';
import { useNavigate } from 'react-router-dom';
import LightRays from '../ui/backgrounds/LightRays';
import SplitText from '../ui/texts/SplitText';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden', fontFamily: 'sans-serif', background: 'transparent' }}>
      {/* LightRays Background */}
      <div style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
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
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Top Bar */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: 'rgba(20,20,20,0.95)', color: '#fff', borderRadius: '0 0 20px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem', letterSpacing: '2px', color: '#00ffff', textShadow: '0 0 8px #00ffff88' }}>NEXUS</div>
          <div>
            <button onClick={() => navigate('/signin')} style={{ marginRight: '1rem', padding: '0.5rem 1.2rem', background: '#111', color: '#00ffff', border: '1px solid #00ffff', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 8px #00ffff22' }}>Sign In</button>
            <button style={{ padding: '0.5rem 1.2rem', background: '#00ffff', color: '#111', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 8px #00ffff55' }}>Guest Mode</button>
          </div>
        </nav>
        {/* Main Section */}
        <section style={{ textAlign: 'center', marginTop: '5rem' }}>
          <SplitText
            text="NEXUS School Management System"
            className="text-2xl font-semibold text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={() => { console.log('All letters have animated!'); }}
            style={{ fontSize: '3rem', marginBottom: '0.5rem', color: '#fff', textShadow: '0 0 18px #00ffff44', fontWeight: 'bold' }}
          />
          <h2 style={{ fontSize: '1.5rem', color: '#00ffff', marginBottom: '2rem', textShadow: '0 0 8px #00ffff44' }}>Empowering Schools. Simplifying Management.</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem', color: '#e0e0e0', fontSize: '1.1rem', textShadow: '0 0 4px #222' }}>
            NEXUS is a comprehensive solution for managing school operations, including administration, teachers, and students. Streamline tasks, monitor progress, and enhance collaboration—all in one secure platform.
          </p>
          <button onClick={() => navigate('/admin/register')} style={{ padding: '0.75rem 2.5rem', fontSize: '1.2rem', background: '#00ffff', color: '#111', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 16px #00ffff77' }}>
            Admin Register
          </button>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;

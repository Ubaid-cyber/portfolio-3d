import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Work from './components/Work';
import Contact from './components/Contact';
import ScrollIndicator from './components/ScrollIndicator';
import './App.css';

function ParticleField() {
  const count = 1200;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 50;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  return (
    <Points positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#00f2fe"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function Background({ mouse }) {
  const groupRef = React.useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle parallax rotation based on mouse position
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.1, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.1, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <color attach="background" args={['#020202']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <ParticleField />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-8, 4, -15]} rotation={[0.5, 0.5, 0.5]}>
          <octahedronGeometry args={[1.5]} />
          <meshStandardMaterial color="#4facfe" wireframe />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
        <mesh position={[8, -4, -12]} rotation={[0.2, 0.8, 0.4]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial color="#00f2fe" wireframe />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[-12, -5, -20]} rotation={[1, 1, 1]}>
          <tetrahedronGeometry args={[2]} />
          <meshStandardMaterial color="#ff00ff" wireframe />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={0.5} floatIntensity={2}>
        <mesh position={[15, 6, -25]} rotation={[0, 0, 0]}>
          <torusGeometry args={[1.5, 0.4, 16, 100]} />
          <meshStandardMaterial color="#ffffff" wireframe />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1}>
        <mesh position={[0, 10, -18]} rotation={[0.5, 0, 0.5]}>
          <dodecahedronGeometry args={[1.2]} />
          <meshStandardMaterial color="#4facfe" wireframe />
        </mesh>
      </Float>
    </group>
  );
}

function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Track mouse for parallax
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="portfolio-app">
      <Navbar />
      <div className="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
        <Canvas dpr={[1, 2]} performance={{ min: 0.5 }}>
          <Suspense fallback={null}>
            <Background mouse={mouse} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Suspense>
        </Canvas>
      </div>
      <main>
        <Hero />
        <About />
        <Work />
        <Contact />
      </main>
      <ScrollIndicator />
    </div>
  );
}

export default App;

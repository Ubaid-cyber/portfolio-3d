import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Animations to "go back the way they came"
  const contentX = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  const photoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  return (
    <section className="hero" id="home" ref={containerRef}>
      <div className="premium-container hero-wrapper">
        <motion.div 
          className="hero-content"
          style={{ x: contentX, opacity: contentOpacity, zIndex: 10 }}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ 
            duration: 2, 
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <h1 className="hero-title">
            SOFTWARE <br />
            <span className="accent-text">ENGINEER</span>
          </h1>
          <p className="hero-description">
            Building robust, scalable software solutions and immersive 3D experiences with high-performance infrastructure.
          </p>
          <div className="hero-btns">
            <a href="#work" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>View Projects</a>
            <a href="/Ubaid_Ahmad_Bhat_Resume.md" download className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>Resume</a>
          </div>
        </motion.div>

        <motion.div 
          className="hero-image-container"
          style={{ scale: photoScale, opacity: photoOpacity }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ 
            duration: 2, 
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2
          }}
        >
          <img src="/user_photo.png" alt="Software Engineer" className="hero-photo-raw" />
          <div className="hero-blob"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

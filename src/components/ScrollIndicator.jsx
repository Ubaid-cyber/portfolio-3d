import React from 'react';
import { motion } from 'framer-motion';
import './ScrollIndicator.css';

const ScrollIndicator = () => {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="scroll-indicator-container" onClick={scrollToNext}>
      <div className="mouse">
        <motion.div 
          className="wheel"
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        />
      </div>
      <div className="scroll-text">Scroll Down</div>
    </div>
  );
};

export default ScrollIndicator;

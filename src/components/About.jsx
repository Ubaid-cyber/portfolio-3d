import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <section className="about" id="about">
      <div className="premium-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
        >
          <span className="section-subtitle">Discovery</span>
          <h2 className="section-title text-glow">ABOUT ME</h2>
        </motion.div>

        <div className="about-grid">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="about-para">
              I am a <strong>Software Engineer</strong> and <strong>Full-Stack Developer</strong> currently pursuing my M.Tech. My technical foundation is built on deep expertise in <strong>Data Structures and Algorithms (DSA)</strong>, mastered through the **takeuforward (Striver)** curriculum, alongside core principles of Operating Systems and Networking.
            </p>
            <p className="about-para">
              My expertise lies in building <strong>scalable web applications</strong> and managing **robust cloud infrastructure**. I thrive in environments where technology meets problem-solving, creating impactful solutions for the digital ecosystem.
            </p>
            
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-num">2yr+</span>
                <span className="stat-label">EXP</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">10+</span>
                <span className="stat-label">PROJECTS</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="about-skills"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="skill-category">
              <h4>BACKEND & CLOUD</h4>
              <div className="skill-tags">
                <span>Python</span>
                <span>C++</span>
                <span>SQL</span>
                <span>Cloud Engineering</span>
                <span>Infrastructure</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>FRONTEND</h4>
              <div className="skill-tags">
                <span>React</span>
                <span>JavaScript</span>
                <span>Three.js</span>
                <span>Framer Motion</span>
                <span>HTML/CSS</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

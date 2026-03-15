import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectModal from './ProjectModal';
import './Work.css';

const projects = [
  {
    title: "Garhwal Traders",
    tags: ["React", "Sustainability", "Cloud"],
    description: "Digital waste management platform for Uttarakhand featuring doorstep pickup, real-time weighing, and industrial waste solutions.",
    url: "https://garhwaltrader.com/",
    github: "https://github.com/Ubaid-cyber/garhwal-traders",
    highlights: [
      "Real-time waste tracking system",
      "Integrated logistics for doorstep pickup",
      "Automated industrial reporting tools"
    ]
  },
  {
    title: "Deep Packet Inspection",
    tags: ["Python", "Networking", "Cloud"],
    description: "High-performance network monitoring tool analyzing data packets in real-time to detect threats and optimize traffic.",
    github: "https://github.com/Ubaid-cyber/dpi-monitor",
    highlights: [
      "Real-time packet analysis engine",
      "Custom threat signature detection",
      "Optimized for high-throughput networks"
    ]
  },
  {
    title: "Gtm Adventure",
    tags: ["React", "Architecture", "Scale"],
    description: "Immersive data-driven application focusing on scalable web journeys and high-performance frontend state management.",
    github: "https://github.com/Ubaid-cyber/gtm-adventure",
    highlights: [
      "Complex state synchronization",
      "Dynamic data-driven visualizations",
      "Ultra-responsive 3D transitions"
    ]
  }
];

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="work" id="work">
      <div className="premium-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
        >
          <span className="section-subtitle">Portfolio</span>
          <h2 className="section-title text-glow">FEATURED WORK</h2>
        </motion.div>

        <div className="work-grid">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="work-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="card-top">
                <div className="project-tags">
                  {project.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="card-footer">
                <span className="view-more">VIEW PROJECT DETAILS</span>
              </div>
              <div className="card-glow"></div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default Work;

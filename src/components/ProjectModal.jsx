import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProjectModal.css';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            className="modal-content glass"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button className="close-btn" onClick={onClose}>&times;</button>
            
            <div className="modal-inner">
              <div className="modal-header">
                <span className="modal-subtitle">Project Spotlight</span>
                <h2 className="modal-title">{project.title}</h2>
                <div className="modal-tags">
                  {project.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
              </div>

              <div className="modal-body">
                <section className="modal-section">
                  <h3>Overview</h3>
                  <p>{project.description}</p>
                </section>

                <section className="modal-section">
                  <h3>Highlights</h3>
                  <ul>
                    {project.highlights ? project.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    )) : (
                      <>
                        <li>Scalable infrastructure implementation</li>
                        <li>High-performance optimization</li>
                        <li>Modern UI/UX principles</li>
                      </>
                    )}
                  </ul>
                </section>
              </div>

              <div className="modal-footer">
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="modal-link">
                    Live Preview
                  </a>
                )}
                {project.github && (
                   <a href={project.github} target="_blank" rel="noopener noreferrer" className="modal-link secondary">
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;

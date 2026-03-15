import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState('');
  const [success, setSuccess] = useState(false);

  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Immediate feedback: the "Transmitting..." state starts instantly
    
    emailjs.sendForm(
      'service_default', // Replace with your service ID
      'template_default', // Replace with your template ID
      formRef.current,
      'YOUR_PUBLIC_KEY' // Replace with your public key
    ).then(() => {
        // Snappy transition to success
        setLoading(false);
        setSuccess(true);
        setForm({ name: '', email: '', message: '' });
        // Keeping success message visible for shorter time for snappiness
        setTimeout(() => setSuccess(false), 3000);
    }, (error) => {
        setLoading(false);
        console.error("Email failed:", error.text);
        // Fallback to manual mailto if API fails
        const fallback = confirm("Primary transmission delayed. Would you like to use direct email instead?");
        if(fallback) window.location.href = `mailto:BHATUBAID341@GMAIL.COM?subject=Contact from ${form.name}&body=${form.message}`;
    });
  };

  const contactInfos = [
    { label: 'Email', value: 'BHATUBAID341@GMAIL.COM', link: 'mailto:BHATUBAID341@GMAIL.COM' },
    { label: 'WhatsApp', value: '+91-6005888754', link: 'https://wa.me/916005888754' },
    { label: 'GitHub', value: 'github.com/Ubaid-cyber', link: 'https://github.com/Ubaid-cyber' },
    { label: 'DSA Profile', value: 'takeuforward/Ubaid', link: 'https://takeuforward.org/profile/Ubaid@121180' },
    { label: 'LinkedIn', value: 'linkedin.com/in/ubaid121', link: 'https://www.linkedin.com/in/ubaid121' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: 'LINKEDIN', link: 'https://www.linkedin.com/in/ubaid121' },
    { name: 'WhatsApp', icon: 'WHATSAPP', link: 'https://wa.me/916005888754' },
    { name: 'Instagram', icon: 'INSTAGRAM', link: '#' },
    { name: 'Facebook', icon: 'FACEBOOK', link: '#' }
  ];

  return (
    <section className="contact" id="contact">
      <div className="premium-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <span className="section-subtitle">Connections</span>
          <h2 className="section-title text-glow">GET IN TOUCH</h2>
        </motion.div>

        <div className="contact-grid">
          <motion.div 
            className="contact-details"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h3 className="details-title">Let's Create Something Great</h3>
            <p className="contact-desc">
              Whether you have a question or just want to say hi, my inbox is always open.
            </p>
            
            <div className="info-list">
              {contactInfos.map((info, idx) => (
                <motion.div 
                  key={idx}
                  className="info-card glass"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                >
                  <div className="info-header">
                    <span className="info-label">{info.label}</span>
                    {info.label === 'Email' && (
                      <button 
                        className="copy-badge"
                        onClick={(e) => {
                          e.preventDefault();
                          copyToClipboard(info.value);
                        }}
                      >
                        {copied ? 'COPIED!' : 'COPY'}
                      </button>
                    )}
                  </div>
                  <a 
                    href={info.link}
                    target={info.link.startsWith('mailto:') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="info-value"
                  >
                    {info.value}
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="social-wrap">
              <span className="social-label">Digital Presence</span>
              <div className="social-nodes">
                {socialLinks.map((social, idx) => (
                  <motion.a 
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-node glass"
                    whileHover={{ 
                      scale: 1.1,
                      borderColor: 'var(--primary)',
                      boxShadow: '0 0 20px rgba(0, 242, 254, 0.3)'
                    }}
                  >
                    <span className="node-text">{social.icon}</span>
                    <div className="node-line"></div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="form-wrapper glass"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="premium-form">
              <div className={`input-group ${isFocused === 'name' || form.name ? 'focused' : ''}`}>
                <label>Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  onFocus={() => setIsFocused('name')}
                  onBlur={() => setIsFocused('')}
                  required 
                />
                <div className="input-glow"></div>
              </div>

              <div className={`input-group ${isFocused === 'email' || form.email ? 'focused' : ''}`}>
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  onFocus={() => setIsFocused('email')}
                  onBlur={() => setIsFocused('')}
                  required 
                />
                <div className="input-glow"></div>
              </div>

              <div className={`input-group ${isFocused === 'message' || form.message ? 'focused' : ''}`}>
                <label>Tell me about your project</label>
                <textarea 
                   name="message" 
                   rows="4" 
                   value={form.message} 
                   onChange={handleChange} 
                   onFocus={() => setIsFocused('message')}
                   onBlur={() => setIsFocused('')}
                   required 
                />
                <div className="input-glow"></div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.span 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Transmitting...
                    </motion.span>
                  ) : success ? (
                    <motion.span 
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="success-text"
                    >
                      Message Received! ✓
                    </motion.span>
                  ) : (
                    <motion.span key="idle">Send Transmission</motion.span>
                  )}
                </AnimatePresence>
                <div className="btn-glow"></div>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

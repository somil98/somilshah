import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SolarSystem } from './components/SolarSystem';
import { MagneticButton } from './components/MagneticButton';
import { ArrowUpRight, X, Github, Linkedin, Mail } from 'lucide-react';

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'WORK' | 'CONTACT' | null>(null);

  // Background particle effect logic could go here, but we'll keep it clean as requested.

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative bg-background selection:bg-white/20">
      
      {/* Background Grid - Very subtle */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Main Content Container */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 text-center">
        
        {/* Name & Role Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-3 uppercase">
            Somil Shah
          </h1>
          <div className="flex items-center justify-center gap-3 text-secondary text-sm md:text-base tracking-wider uppercase">
            <span>AI Lead</span>
            <span className="w-1 h-1 bg-secondary rounded-full" />
            <span>Zuddl</span>
          </div>
        </motion.div>

        {/* Divider Line */}
        <motion.div 
          className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mb-12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />

        {/* Central Visual - Solar System */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <SolarSystem />
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-row items-center gap-12 md:gap-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <MagneticButton accentColor="cyan" onClick={() => setActiveModal('WORK')}>
            Work
          </MagneticButton>
          <MagneticButton accentColor="orange" onClick={() => setActiveModal('CONTACT')}>
            Contact
          </MagneticButton>
        </motion.div>
      </main>

      {/* Footer / Corner Details */}
      <footer className="absolute bottom-8 w-full px-8 flex justify-between text-xs text-white/20 uppercase tracking-widest pointer-events-none">
        <div>Based in San Francisco</div>
        <div>© {new Date().getFullYear()}</div>
      </footer>

      {/* Modal Overlay System */}
      <AnimatePresence>
        {activeModal && (
          <Modal onClose={() => setActiveModal(null)} title={activeModal}>
             {activeModal === 'WORK' ? <WorkContent /> : <ContactContent />}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// Sub-components for Modals
const Modal: React.FC<{ onClose: () => void; title: string; children: React.ReactNode }> = ({ onClose, title, children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 20 }}
      onClick={(e) => e.stopPropagation()}
      className="bg-[#1a1a1a] w-full max-w-2xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative"
    >
      <div className="flex items-center justify-between p-6 border-b border-white/5">
        <h2 className="text-xl font-bold text-white tracking-widest">{title}</h2>
        <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>
      <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
        {children}
      </div>
    </motion.div>
  </motion.div>
);

const WorkContent = () => (
  <div className="space-y-8">
    <ProjectItem 
      title="Zuddl AI Integration" 
      role="Lead Architect"
      year="2023"
      description="Spearheaded the integration of Large Language Models into the event platform, increasing user engagement by 40% through automated content generation."
    />
    <ProjectItem 
      title="Neural Network Visualization" 
      role="Frontend & WebGL"
      year="2022"
      description="Built a real-time 3D visualization tool for inspecting transformer attention heads using React Three Fiber."
    />
    <ProjectItem 
      title="Sentient UI Kit" 
      role="Design System Lead"
      year="2021"
      description="Developed a motion-rich component library used across 12 different internal products."
    />
    <div className="pt-4 border-t border-white/5">
      <a href="#" className="inline-flex items-center gap-2 text-accent-cyan hover:underline underline-offset-4 transition-all">
        View Full Resume <ArrowUpRight size={16} />
      </a>
    </div>
  </div>
);

const ContactContent = () => (
  <div className="flex flex-col gap-6">
    <p className="text-secondary text-lg leading-relaxed">
      I am currently open to consulting opportunities and speaking engagements related to Generative AI and Frontend Architecture.
    </p>
    
    <div className="grid gap-4 mt-4">
      <ContactLink icon={<Mail />} label="hello@somil.ai" href="mailto:hello@somil.ai" />
      <ContactLink icon={<Linkedin />} label="LinkedIn Profile" href="#" />
      <ContactLink icon={<Github />} label="GitHub Profile" href="#" />
    </div>

    <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
            <label className="text-xs uppercase text-white/50 tracking-wider">Quick Message</label>
            <textarea 
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent-orange/50 transition-colors min-h-[100px]"
                placeholder="Hey Somil, I'd like to discuss..."
            ></textarea>
        </div>
        <button className="px-6 py-2 bg-white text-black font-bold rounded hover:bg-accent-orange transition-colors">
            Send Message
        </button>
    </form>
  </div>
);

const ProjectItem: React.FC<{title: string, role: string, year: string, description: string}> = ({ title, role, year, description }) => (
  <div className="group cursor-default">
    <div className="flex justify-between items-baseline mb-2">
      <h3 className="text-xl font-medium text-white group-hover:text-accent-cyan transition-colors">{title}</h3>
      <span className="text-xs text-white/30 font-mono">{year}</span>
    </div>
    <div className="text-sm text-accent-cyan/80 mb-2 uppercase tracking-wide">{role}</div>
    <p className="text-secondary leading-relaxed text-sm">
      {description}
    </p>
  </div>
);

const ContactLink: React.FC<{ icon: React.ReactNode, label: string, href: string }> = ({ icon, label, href }) => (
  <a 
    href={href}
    className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent-orange/30 transition-all group"
  >
    <div className="text-white/70 group-hover:text-accent-orange transition-colors">
      {icon}
    </div>
    <span className="text-white font-medium">{label}</span>
    <ArrowUpRight className="ml-auto text-white/20 group-hover:text-white transition-colors" size={18} />
  </a>
);

export default App;
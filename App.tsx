import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SolarSystem } from './components/SolarSystem';
import { NatureVisual } from './components/NatureVisual';
import { MagneticButton } from './components/MagneticButton';
import { ArrowUpRight, X, Github, Linkedin, Mail, ChevronRight, ChevronLeft } from 'lucide-react';

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'WORK' | 'CONTACT' | 'ADVENTURES' | null>(null);
  const [view, setView] = useState<'TECH' | 'NATURE'>('TECH');

  const toggleView = () => setView(prev => prev === 'TECH' ? 'NATURE' : 'TECH');

  // Theme-based configurations
  const themeConfig = {
    TECH: {
      bg: 'bg-[#0f0f11]',
      textRole: 'AI Lead',
      textCompany: 'Zuddl',
      accent: 'cyan',
      component: <SolarSystem />,
      btnPrimary: { label: 'Work', action: () => setActiveModal('WORK') },
      btnSecondary: { label: 'Contact', action: () => setActiveModal('CONTACT') }
    },
    NATURE: {
      bg: 'bg-[#022c22]',
      textRole: 'Explorer',
      textCompany: 'Nature Lover',
      accent: 'emerald',
      component: <NatureVisual />,
      btnPrimary: { label: 'Adventures', action: () => setActiveModal('ADVENTURES') },
      btnSecondary: { label: 'Contact', action: () => setActiveModal('CONTACT') }
    }
  };

  const currentTheme = themeConfig[view];

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center relative transition-colors duration-700 ease-in-out ${currentTheme.bg} selection:bg-white/20 overflow-hidden`}>
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Navigation Arrows */}
      <button 
        onClick={toggleView}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 text-white/30 hover:text-white transition-all z-20 hidden md:block"
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        onClick={toggleView}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 text-white/30 hover:text-white transition-all z-20 hidden md:block"
      >
        <ChevronRight size={32} />
      </button>

      {/* Mobile Navigation Indicator */}
      <div className="absolute bottom-20 flex gap-2 md:hidden">
        <div className={`w-2 h-2 rounded-full transition-colors ${view === 'TECH' ? 'bg-white' : 'bg-white/20'}`} />
        <div className={`w-2 h-2 rounded-full transition-colors ${view === 'NATURE' ? 'bg-white' : 'bg-white/20'}`} />
        {/* Invisible touch target for swiping could go here, but simple click anywhere works nicely for now or adding swipe handlers */}
        <button className="absolute inset-[-20px] w-[100px]" onClick={toggleView} aria-label="Toggle Theme" />
      </div>

      {/* Main Content Container with Slide Transition */}
      <AnimatePresence mode="wait">
        <motion.main 
          key={view}
          initial={{ opacity: 0, x: view === 'TECH' ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: view === 'TECH' ? 50 : -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 text-center"
        >
          
          {/* Name & Role Section */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-3 uppercase drop-shadow-lg">
              Somil Shah
            </h1>
            <div className="flex items-center justify-center gap-3 text-secondary text-sm md:text-base tracking-wider uppercase font-medium">
              <span className="text-white/80">{currentTheme.textRole}</span>
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              <span className={`text-${view === 'TECH' ? 'accent-cyan' : 'accent-lime'}`}>{currentTheme.textCompany}</span>
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mb-12" />

          {/* Central Visual */}
          <div className="mb-16 scale-75 md:scale-100 transform transition-transform">
            {currentTheme.component}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row items-center gap-8 md:gap-16">
            <MagneticButton 
              theme={view === 'TECH' ? 'tech' : 'nature'} 
              variant="primary"
              onClick={currentTheme.btnPrimary.action}
            >
              {currentTheme.btnPrimary.label}
            </MagneticButton>
            <MagneticButton 
              theme={view === 'TECH' ? 'tech' : 'nature'} 
              variant="secondary"
              onClick={currentTheme.btnSecondary.action}
            >
              {currentTheme.btnSecondary.label}
            </MagneticButton>
          </div>

        </motion.main>
      </AnimatePresence>

      {/* Footer / Corner Details */}
      <footer className="absolute bottom-8 w-full px-8 flex justify-between text-xs text-white/20 uppercase tracking-widest pointer-events-none">
        <div>Based in San Francisco</div>
        <div>© {new Date().getFullYear()}</div>
      </footer>

      {/* Modal Overlay System */}
      <AnimatePresence>
        {activeModal && (
          <Modal onClose={() => setActiveModal(null)} title={activeModal}>
             {activeModal === 'WORK' && <WorkContent />}
             {activeModal === 'CONTACT' && <ContactContent />}
             {activeModal === 'ADVENTURES' && <AdventuresContent />}
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
      className="bg-[#1a1a1a] w-full max-w-2xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative flex flex-col max-h-[85vh]"
    >
      <div className="flex items-center justify-between p-6 border-b border-white/5 shrink-0">
        <h2 className="text-xl font-bold text-white tracking-widest">{title}</h2>
        <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>
      <div className="p-8 overflow-y-auto custom-scrollbar">
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

const AdventuresContent = () => (
  <div className="space-y-8">
    <div className="relative h-48 rounded-lg overflow-hidden mb-6 group">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
      <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000" alt="Mountains" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute bottom-4 left-4 z-20">
        <div className="text-white font-bold text-xl">Himalayan Expedition</div>
        <div className="text-accent-lime text-sm">2023 • 18,000ft</div>
      </div>
    </div>

    <ProjectItem 
      title="Yosemite National Park" 
      role="Solo Backpacking"
      year="2022"
      description="Spent 2 weeks traversing the high sierra camps, documenting the changing landscapes and star movements."
    />
    <ProjectItem 
      title="Iceland Ring Road" 
      role="Photography"
      year="2021"
      description="Captured the northern lights and geothermal wonders across 1300km of driving."
    />
    
    <div className="pt-4 border-t border-white/5">
        <p className="text-white/60 italic text-sm">
            "The mountains are calling and I must go."
        </p>
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
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 transition-colors min-h-[100px]"
                placeholder="Hey Somil, I'd like to discuss..."
            ></textarea>
        </div>
        <button className="px-6 py-2 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors">
            Send Message
        </button>
    </form>
  </div>
);

const ProjectItem: React.FC<{title: string, role: string, year: string, description: string}> = ({ title, role, year, description }) => (
  <div className="group cursor-default">
    <div className="flex justify-between items-baseline mb-2">
      <h3 className="text-xl font-medium text-white group-hover:text-primary transition-colors">{title}</h3>
      <span className="text-xs text-white/30 font-mono">{year}</span>
    </div>
    <div className="text-sm text-white/60 mb-2 uppercase tracking-wide group-hover:text-white/80 transition-colors">{role}</div>
    <p className="text-secondary leading-relaxed text-sm">
      {description}
    </p>
  </div>
);

const ContactLink: React.FC<{ icon: React.ReactNode, label: string, href: string }> = ({ icon, label, href }) => (
  <a 
    href={href}
    className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group"
  >
    <div className="text-white/70 group-hover:text-white transition-colors">
      {icon}
    </div>
    <span className="text-white font-medium">{label}</span>
    <ArrowUpRight className="ml-auto text-white/20 group-hover:text-white transition-colors" size={18} />
  </a>
);

export default App;
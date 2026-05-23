import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Mail, Globe, MapPin, ChevronDown } from 'lucide-react';
import { NAV_LINKS, REGIONS } from '../constants';
import { cn } from '../lib/utils';

export const Navbar = ({ onSearchClick }: { onSearchClick?: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("New South Wales");
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-brand-dark/95 backdrop-blur-md shadow-lg py-2" 
          : "bg-transparent py-0"
      )}
    >
      {/* Top Bar */}
      <div className={cn(
        "hidden md:flex bg-brand-accent text-brand-dark font-bold uppercase text-[11px] tracking-wider h-10 border-b border-white/5 items-center justify-between transition-all",
        isScrolled ? "h-0 border-0 overflow-hidden" : "h-10"
      )}>
        <div className="max-w-[1400px] mx-auto w-full px-6 flex justify-between items-center h-full text-brand-dark">
          <div className="flex gap-8 items-center h-full divide-x divide-brand-dark/10">
            <a href="tel:+61 450 708 723+" className="flex items-center gap-2 hover:opacity-70 transition-opacity pr-6">
              <Phone className="w-3 h-3" /> +61 450 708 723
            </a>
            <a href="mailto:office@achpl.com.au" className="flex items-center gap-2 hover:opacity-70 transition-opacity px-6 lowercase">
              <Mail className="w-3 h-3" /> office@achpl.com.au
            </a>
          </div>
          
          <div className="flex items-center h-full">
            <span className="text-brand-dark font-bold mr-4">Change Your State</span>
            <div className="relative h-full">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsStateDropdownOpen(!isStateDropdownOpen);
                }}
                className="flex items-center justify-between gap-4 bg-brand-dark text-white px-6 h-full min-w-[160px] hover:bg-black transition-colors font-black border-l border-white/10"
              >
                {selectedState.toUpperCase()} <ChevronDown className={cn("w-4 h-4 transition-transform", isStateDropdownOpen && "rotate-180")} />
              </button>
              
              <AnimatePresence>
                {isStateDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-[55]" 
                      onClick={() => setIsStateDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute top-full right-0 w-64 bg-brand-secondary border border-white/10 shadow-2xl p-4 z-[60] mt-1"
                    >
                      <p className="text-[10px] font-black text-brand-accent mb-4 tracking-widest border-b border-white/5 pb-2">SELECT YOUR REGION</p>
                      <div className="grid grid-cols-1 gap-1">
                        {REGIONS.map((state) => (
                          <button
                            key={state}
                            onClick={() => {
                              setSelectedState(state);
                              setIsStateDropdownOpen(false);
                            }}
                            className={cn(
                              "w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors flex items-center justify-between group",
                              selectedState === state ? "bg-brand-accent text-brand-dark" : "hover:bg-white/5 text-white"
                            )}
                          >
                            <span className="relative z-10">{state}</span>
                            {selectedState === state && <Globe className="w-3 h-3 text-brand-dark relative z-10" />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className={cn(
        "bg-brand-dark transition-all duration-300 border-b border-white/5",
        isScrolled ? "h-16" : "h-20"
      )}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-full relative">
          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
             <div className="relative flex flex-col items-center">
                <div className="absolute -top-3 left-0 w-full flex justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 18L20 4L38 18" stroke="#F1CB44" strokeWidth="2" strokeLinecap="square"/>
                    <path d="M5 18V10" stroke="#F1CB44" strokeWidth="2"/>
                    <path d="M35 18V6" stroke="#F1CB44" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="flex flex-col items-start h-full pt-2">
                  <span className="text-2xl lg:text-3xl font-black tracking-[-0.05em] text-white leading-[0.8] group-hover:text-brand-accent transition-colors">
                    AUSSIE
                  </span>
                  <span className="text-[8px] lg:text-[10px] font-bold tracking-[0.3em] text-brand-accent uppercase mt-1">
                    CUSTOM HOMES
                  </span>
                </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center h-full">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 h-full flex items-center text-[11px] font-bold uppercase tracking-widest text-white hover:text-brand-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            
            <button 
              onClick={onSearchClick}
              className="bg-brand-accent text-brand-dark h-full px-10 flex items-center justify-center font-black uppercase text-sm tracking-widest hover:bg-white transition-colors ml-4"
            >
              SEARCH
            </button>
          </div>
          
          <div className="lg:hidden flex items-center h-full">
             <a href="tel:+61 450 708 723(" className="text-brand-accent">
                <Phone className="w-6 h-6" />
             </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-brand-dark z-[100] p-12 flex flex-col gap-8"
          >
            <div className="flex justify-between items-center mb-8">
               <a href="#" className="flex flex-col" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="text-xl font-black tracking-tighter text-white">AUSSIE CUSTOM HOMES</span>
                <span className="text-[8px] font-bold tracking-[0.2em] text-brand-accent">PREMIUM DEVELOPER</span>
              </a>
              <X className="w-8 h-8 cursor-pointer text-white" onClick={() => setIsMobileMenuOpen(false)} />
            </div>
            
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-4xl font-black uppercase tracking-tighter hover:text-brand-accent transition-colors text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            
            <div className="mt-auto border-t border-white/10 pt-8 flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-accent">Branch: {selectedState}</p>
              <button className="bg-white text-brand-dark p-6 font-black uppercase tracking-widest">Enquire Now</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

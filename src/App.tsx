import React, { useState, useMemo } from 'react';
import { Phone, MapPin, Bed, Bath, Car, MessageCircle, X } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { TheProcess } from './components/TheProcess';
import { Contact, Footer } from './components/Contact';
import { PropertySearch } from './components/PropertySearch';
import { ProjectDetailsModal } from './components/ProjectDetailsModal';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { PROJECTS, Project } from './constants';
import { cn } from './lib/utils';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeLocation, setActiveLocation] = useState<string>('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [keywordsFilter, setKeywordsFilter] = useState('');
  const [bedsFilter, setBedsFilter] = useState('Any');
  const [bathsFilter, setBathsFilter] = useState('Any');
  const [carsFilter, setCarsFilter] = useState('Any');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const locations = useMemo(() => {
    const reachableProjects = activeCategory === 'All' 
      ? PROJECTS 
      : PROJECTS.filter(p => p.type === activeCategory);
    
    const locs = Array.from(new Set(reachableProjects.map(p => p.location))).sort();
    return ['All', ...locs];
  }, [activeCategory]);

  // Effect to reset location if it becomes invalid for the selected category
  React.useEffect(() => {
    if (activeLocation !== 'All' && !locations.includes(activeLocation)) {
      setActiveLocation('All');
    }
  }, [locations, activeLocation]);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.type === activeCategory;
      const matchesLocation = activeLocation === 'All' || p.location === activeLocation;
      const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesKeywords = !keywordsFilter || 
                              p.title.toLowerCase().includes(keywordsFilter.toLowerCase()) || 
                              p.location.toLowerCase().includes(keywordsFilter.toLowerCase());

      const pBeds = p.beds || 0;
      const pBaths = p.baths || 0;
      const pCars = p.cars || 0;

      const bedsCount = parseInt(bedsFilter) || 0;
      const bathsCount = parseInt(bathsFilter) || 0;
      const carsCount = parseInt(carsFilter) || 0;

      const matchesBeds = bedsFilter === 'Any' || pBeds >= bedsCount;
      const matchesBaths = bathsFilter === 'Any' || pBaths >= bathsCount;
      const matchesCars = carsFilter === 'Any' || pCars >= carsCount;

      return matchesCategory && matchesLocation && matchesQuery && matchesKeywords && matchesBeds && matchesBaths && matchesCars;
    });
  }, [activeCategory, activeLocation, searchQuery, keywordsFilter, bedsFilter, bathsFilter, carsFilter]);

  return (
    <div className="relative antialiased selection:bg-brand-accent selection:text-brand-dark">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-accent origin-left z-[60]"
        style={{ scaleX }}
      />

      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      
      <main>
        <Hero 
          isSearchOpen={isSearchOpen} 
          setIsSearchOpen={setIsSearchOpen}
          onSearch={(filters) => {
            setSearchQuery(filters.query);
            setActiveCategory(filters.category);
            setKeywordsFilter(filters.keywords);
            setBedsFilter(filters.beds);
            setBathsFilter(filters.baths);
            setCarsFilter(filters.cars);
          }}
        />
        <About />
        <Services />
        
        {/* Projects Grid */}
        <section id="houses" className="py-24 bg-brand-dark overflow-hidden border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.4em] mb-4 text-brand-accent">Portfolio</p>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white">
                  Modern <br /> Architecture
                </h2>
              </div>
              <div className="flex flex-col items-start md:items-end gap-8 w-full md:w-auto">
                <div className="w-full md:w-auto overflow-x-auto no-scrollbar">
                  <div className="flex flex-col items-start md:items-end gap-4 min-w-max md:min-w-0">
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Category</span>
                      <div className="flex flex-wrap gap-x-6 gap-y-3 justify-start md:justify-end">
                        {['All', 'Houses', 'Duplex', 'Residential', 'Apartments', 'Land Only'].map(cat => (
                          <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                              "text-[10px] font-black uppercase tracking-widest border-b-2 pb-1 transition-all whitespace-nowrap",
                              activeCategory === cat ? "border-brand-accent text-brand-accent scale-105" : "border-transparent text-white/40 hover:text-brand-accent"
                            )}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-2 border-t border-white/5 pt-4 w-full">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Location</span>
                      <div className="flex flex-wrap gap-x-3 gap-y-2 justify-start md:justify-end">
                        {locations.map(loc => (
                          <button 
                            key={loc}
                            onClick={() => setActiveLocation(loc)}
                            className={cn(
                              "text-[9px] font-bold uppercase tracking-widest transition-all py-1.5 px-3 rounded-full border whitespace-nowrap",
                              activeLocation === loc 
                                ? "bg-brand-accent border-brand-accent text-brand-dark shadow-lg shadow-brand-accent/20" 
                                : "border-white/10 text-white/30 hover:border-brand-accent/50 hover:text-brand-accent"
                            )}
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {(activeCategory !== 'All' || activeLocation !== 'All' || searchQuery !== '' || keywordsFilter !== '') && (
                  <button 
                    onClick={() => {
                      setActiveCategory('All');
                      setActiveLocation('All');
                      setSearchQuery('');
                      setKeywordsFilter('');
                      setBedsFilter('Any');
                      setBathsFilter('Any');
                      setCarsFilter('Any');
                    }}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/10 text-white hover:bg-brand-accent hover:text-brand-dark transition-all px-5 py-2.5 rounded-full border border-white/10"
                  >
                    <X className="w-3.5 h-3.5" /> Reset Filters
                  </button>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div 
                    layout
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -10 }}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-[16/10] overflow-hidden mb-6 shadow-2xl border border-white/5 relative">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 bg-brand-accent text-brand-dark px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                        {project.type}
                      </div>
                      
                      {/* Hover Overlay with View Project Button */}
                      <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                        <button 
                          onClick={() => setSelectedProject(project)}
                          className="bg-brand-accent text-brand-dark px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-white transition-colors"
                        >
                          View Project
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-start" onClick={() => setSelectedProject(project)}>
                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-brand-accent transition-colors">{project.title}</h3>
                        <p className="text-xs font-bold uppercase tracking-widest text-brand-accent mt-2 flex items-center gap-2">
                          <MapPin className="w-3 h-3" /> {project.location}
                        </p>
                      </div>
                    </div>
                    
                    {(project.beds || project.baths || project.cars) && (
                      <div className="mt-4 flex gap-6 border-t border-white/5 pt-4" onClick={() => setSelectedProject(project)}>
                        {project.beds && (
                          <div className="flex items-center gap-2 text-white/50">
                            <Bed className="w-4 h-4" />
                            <span className="text-xs font-bold">{project.beds}</span>
                          </div>
                        )}
                        {project.baths && (
                          <div className="flex items-center gap-2 text-white/50">
                            <Bath className="w-4 h-4" />
                            <span className="text-xs font-bold">{project.baths}</span>
                          </div>
                        )}
                        {project.cars && (
                          <div className="flex items-center gap-2 text-white/50">
                            <Car className="w-4 h-4" />
                            <span className="text-xs font-bold">{project.cars}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredProjects.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-white/30 font-bold uppercase tracking-widest text-xl">No matching projects found</p>
              </div>
            )}
          </div>
        </section>

        <TheProcess />
        <Contact />
      </main>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/61450708723" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-[72px] right-4 z-[100] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all text-white group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
        <span className="absolute right-full mr-4 bg-white text-brand-dark px-4 py-2 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-black/5">
          WhatsApp us
        </span>
      </a>

      {/* Fixed Phone Button */}
      <a 
        href="tel:+61 450 708 723"
        className="fixed bottom-0 right-0 z-[100] bg-brand-accent text-brand-dark py-3 px-6 md:px-8 font-black uppercase text-lg md:text-xl flex items-center gap-4 shadow-2xl rounded-tl-lg hover:bg-white transition-colors duration-300"
      >
        <Phone className="w-5 h-5 md:w-6 md:h-6 fill-brand-dark" />
        <span className="hidden sm:inline">+61 450 708 723</span>
        <span className="sm:hidden">CALL</span>
      </a>

      <Footer />
      
      <PropertySearch 
        isOpen={isSearchOpen} 
        setIsOpen={setIsSearchOpen}
        onSearch={(filters) => {
          setSearchQuery(filters.query);
          setActiveCategory(filters.category);
          setKeywordsFilter(filters.keywords);
          setBedsFilter(filters.beds);
          setBathsFilter(filters.baths);
          setCarsFilter(filters.cars);
          setIsSearchOpen(false);
        }}
        showBar={false}
      />
      
      {/* Project Details Modal */}
      <ProjectDetailsModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
}

export default App;

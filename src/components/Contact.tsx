import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { COMPANIES } from '../constants';

export const Contact = () => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    interest: 'Luxury Villa',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Website Inquiry from ${formData.firstName} ${formData.lastName}`;
    const body = `Name: ${formData.firstName} ${formData.lastName}%0D%0AEmail: ${formData.email}%0D%0AInterested In: ${formData.interest}%0D%0AMessage: ${formData.message}`;
    window.location.href = `mailto:admin@thecapitalre.com.au?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-24 bg-brand-dark">
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
          alt="Contact Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.4em] mb-4 text-brand-accent">Get in touch</p>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-12">
              Start Your <br />
              <span className="text-brand-accent">Build</span> Today
            </h2>

            <div className="space-y-10">
                <a href="tel:+61450 708. 723" className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center shrink-0 group-hover:bg-brand-accent group-hover:text-brand-dark transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Call Us</p>
                    <p className="text-xl font-black text-white group-hover:text-brand-accent transition-colors">+61 450 708 723</p>
                  </div>
                </a>

              <a href="mailto:office@achpl.com.au" className="flex gap-6 group">
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center shrink-0 group-hover:bg-brand-accent group-hover:text-brand-dark transition-all">
                  <Mail className="w-5 h-5 transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Email Us</p>
                  <p className="text-xl font-black text-white group-hover:text-brand-accent transition-colors">office@achpl.com.au</p>
                </div>
              </a>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Head Office</p>
                  <p className="text-xl font-black text-white leading-tight">11/4a, Meridian Place, <br />Bella Vista, NSW - 2153</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-secondary p-12 shadow-2xl border border-white/5"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30">First Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full border-b border-white/10 bg-transparent py-3 focus:border-brand-accent outline-none transition-colors font-bold text-white px-2" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Last Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full border-b border-white/10 bg-transparent py-3 focus:border-brand-accent outline-none transition-colors font-bold text-white px-2" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border-b border-white/10 bg-transparent py-3 focus:border-brand-accent outline-none transition-colors font-bold text-white px-2" 
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-accent">What are you interested in?</label>
                <select 
                  value={formData.interest}
                  onChange={(e) => setFormData({...formData, interest: e.target.value})}
                  className="w-full bg-brand-dark/50 border border-white/10 p-5 focus:border-brand-accent outline-none transition-all font-bold text-white cursor-pointer appearance-none rounded-none"
                >
                  <option className="bg-brand-secondary">Residential Home</option>
                  <option className="bg-brand-secondary">Duplex Development</option>
                  <option className="bg-brand-secondary">Luxury Villa</option>
                  <option className="bg-brand-secondary">Apartment Contract</option>
                  <option className="bg-brand-secondary">High-Rise Development</option>
                  <option className="bg-brand-secondary">Metropolitan Project</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Message</label>
                <textarea 
                  required
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full border-b border-white/10 bg-transparent py-3 focus:border-brand-accent outline-none transition-colors font-bold text-white resize-none px-2" 
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-brand-accent text-brand-dark p-5 font-black uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3"
              >
                Connect With Us <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-brand-dark pt-24 pb-12 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-2">
            <a href="#" className="flex flex-col mb-8 group w-fit">
              <span className="text-4xl font-black tracking-tighter text-white group-hover:text-brand-accent transition-colors">
                AUSSIE
              </span>
              <span className="text-sm font-bold tracking-[0.3em] text-brand-accent uppercase">
                CUSTOM HOMES
              </span>
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-2">
                Aussie Custom Homes Pty Ltd
              </span>
            </a>
            <p className="max-w-sm text-white/50 leading-relaxed font-medium mb-8">
              A leading metropolitan construction group in Australia. Dedicated to quality, transparency, and engineering brilliance in every project.
            </p>
            <div className="flex flex-col gap-4">
              <a href="mailto:office@achpl.com.au" className="flex items-center gap-3 text-white/50 hover:text-brand-accent transition-colors group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-brand-dark transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold">office@achpl.com.au</span>
              </a>
              <a href="tel:+61 450 708 723" className="flex items-center gap-3 text-white/50 hover:text-brand-accent transition-colors group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-brand-dark transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold">+61 450 708 723</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-8">Navigation</h4>
            <ul className="space-y-4">
              <li><a href="#" className="font-bold text-white hover:text-brand-accent transition-colors">Home</a></li>
              <li><a href="#story" className="font-bold text-white hover:text-brand-accent transition-colors">Our Story</a></li>
              <li><a href="#houses" className="font-bold text-white hover:text-brand-accent transition-colors">Projects</a></li>
              <li><a href="#contact" className="font-bold text-white hover:text-brand-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-8">Service Areas</h4>
            <ul className="space-y-4">
              <li><a href="#" className="font-bold text-white hover:text-brand-accent transition-colors">New South Wales</a></li>
              <li><a href="#" className="font-bold text-white hover:text-brand-accent transition-colors">Victoria</a></li>
              <li><a href="#" className="font-bold text-white hover:text-brand-accent transition-colors">Queensland</a></li>
              <li><a href="#" className="font-bold text-white hover:text-brand-accent transition-colors">Western Australia</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12">
          <p className="text-[10px] font-bold uppercase tracking-widest text-center text-white/20">
            © {new Date().getFullYear()} Aussie Custom Homes Pty Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

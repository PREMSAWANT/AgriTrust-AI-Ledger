import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Leaf, TrendingUp, Cpu, ChevronRight, Play, Check, Globe, Award, Menu, X } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleAuthAction = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (token && user) {
      const dashboardPath = user.role === 'Admin' ? '/dashboard/admin' : 
                          user.role === 'Farmer' ? '/dashboard/farmer' : 
                          user.role === 'Distributor' ? '/dashboard/distributor' : '/dashboard/consumer';
      navigate(dashboardPath);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* --- STICKY NAVBAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 md:h-24 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="AgriTrust Icon" className="w-8 h-8 md:w-10 md:h-10 rounded-xl shadow-lg shadow-emerald-200 object-contain" />
            <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter uppercase">AgriTrust</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-10">
            <a href="#features" className="text-sm font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest">Protocol</a>
            <Link to="/network" className="text-sm font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest">Network</Link>
            <Link to="/hardware" className="text-sm font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest">Hardware</Link>
            <button 
              onClick={handleAuthAction}
              className="text-sm font-black text-slate-900 hover:text-emerald-600 transition-all uppercase tracking-widest"
            >
              Portal Login
            </button>
            <button 
              onClick={handleAuthAction}
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-2xl shadow-slate-200"
            >
              Get Started
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="text-xs font-bold text-slate-900 px-4 py-2 border-2 border-slate-100 rounded-lg"
            >
              Sign In
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-slate-50 rounded-lg text-slate-900">
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="px-6 py-10 flex flex-col gap-6 text-center">
                <Link to="/about" className="text-lg font-black text-slate-900">About Us</Link>
                <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black text-slate-900">Protocol</a>
                <Link to="/network" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black text-slate-900">Network</Link>
                <Link to="/hardware" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black text-slate-900">Hardware</Link>
                <button 
                  onClick={handleAuthAction}
                  className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-emerald-100"
                >
                  Get Started Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="z-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="emerald-badge mb-8 inline-block"
            >
              India's Premier Agri-Blockchain
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-6xl md:text-8xl font-black text-slate-900 mb-8 leading-[0.95] tracking-tighter"
            >
              Trust for every <br/><span className="text-emerald-500">Indian Farm.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl text-slate-600 mb-12 leading-relaxed max-w-xl"
            >
              Empowering farmers from Nashik to Punjab with immutable provenance 
              and AI metrics. Securing the journey of every harvest.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <button onClick={handleAuthAction} className="btn-primary w-full sm:w-auto shadow-xl shadow-emerald-100">
                Register Farm <ChevronRight size={20} />
              </button>
              <button className="flex items-center gap-4 text-slate-900 font-bold group">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-emerald-50 transition-all">
                  <Play size={20} fill="currentColor" />
                </div>
                View Video
              </button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-emerald-500/5 blur-[100px] rounded-full"></div>
            <img 
              src="/hero.png" 
              alt="Indian Farmer" 
              className="relative rounded-[3rem] shadow-premium object-cover aspect-[4/5] w-full border-[10px] border-white"
            />
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-8 -left-8 p-6 glass-card bg-white/95 border-emerald-100 max-w-xs"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <Check color="white" size={18} />
                </div>
                <p className="font-black text-slate-900">Batch #IND-MH-01</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-widest mb-1">Ratnagiri Alphonso</p>
              <p className="text-[10px] text-slate-400">Verified on Ethereum Testnet • AI Trust: 99.2%</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">Technology for Transparency</h2>
            <p className="text-slate-500 text-lg">World-class infrastructure for Indian Agriculture.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                title: 'Blockchain Ledger', 
                desc: 'Every harvest handoff is a permanent transaction on the decentralized ledger.',
                icon: <ShieldCheck size={32} className="text-emerald-500" />,
              },
              { 
                title: 'AI Trust Scoring', 
                desc: 'Our neural engine analyzes logistics data to verify farmer trust and authenticity.',
                icon: <TrendingUp size={32} className="text-blue-500" />,
              },
              { 
                title: 'Live IoT Stream', 
                desc: 'Real-time monitoring of temperature and humidity for sensitive produce.',
                icon: <Cpu size={32} className="text-purple-500" />,
              }
            ].map((f, i) => (
              <div key={i} className="p-10 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRODUCT VERIFICATION --- */}
      <section id="network" className="section-padding">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <img 
              src="/crop_verify.png" 
              alt="Verification" 
              className="rounded-[3rem] shadow-premium object-cover aspect-video w-full"
            />
          </div>
          <div>
            <h2 className="text-5xl font-black text-slate-900 mb-8 leading-tight tracking-tighter">
              Instant Verification for <br/><span className="text-emerald-500">Consumer Confidence.</span>
            </h2>
            <div className="space-y-6">
              {["Scan Batch QR Codes with any device.", "View complete vertical history.", "Verify environmental certifications.", "Direct-from-farm authenticity."].map((t, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Check size={14} className="text-emerald-600" />
                  </div>
                  <p className="font-bold text-slate-700">{t}</p>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/verify/AGRI-IND-992')} className="btn-secondary mt-12">
              Try Verification Demo
            </button>
          </div>
        </div>
      </section>

      {/* --- HARDWARE SECTION --- */}
      <section id="hardware" className="section-padding bg-slate-900 text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 p-20 opacity-5">
            <Cpu size={300} />
         </div>
         <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
               <h2 className="text-5xl font-black mb-8 leading-tight tracking-tighter">
                  Distributed IoT Nodes <br/><span className="text-emerald-400">Secure Handoffs.</span>
               </h2>
               <p className="text-slate-400 text-lg mb-10 font-medium">
                  Our hardware stack integrates directly with the Ethereum consensus layer, ensuring that physical environmental readings (Temperature, Humidity, Location) are cryptographically signed before they ever hit the cloud.
               </p>
               <div className="grid grid-cols-2 gap-8">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                     <p className="text-4xl font-black mb-2 text-emerald-400">5.4k</p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Active Sensors</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                     <p className="text-4xl font-black mb-2 text-emerald-400">99.9%</p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Network Uptime</p>
                  </div>
               </div>
            </div>
            <div className="order-1 lg:order-2">
               <img 
                 src="/hardware_mock.png" 
                 alt="AgriTrust Hardware" 
                 className="rounded-[3rem] shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500"
               />
            </div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="AgriTrust Icon" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">AgriTrust</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-10">
            <Link to="/about" className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-all">About Us</Link>
            <Link to="/privacy" className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-all">Privacy Policy</Link>
            <Link to="/terms" className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-all">Terms of Service</Link>
            <a href="#" className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-all">Smart Contracts</a>
          </div>

          <p className="text-xs font-black text-slate-400 tracking-widest uppercase">
            © 2026 DECENTRALIZED CORE • MADE IN INDIA
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

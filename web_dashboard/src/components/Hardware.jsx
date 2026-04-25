import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, ShieldCheck, Radio, Server, Database, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hardware = () => {
  const navigate = useNavigate();

  const hardwareSpecs = [
    { title: 'AT-Mesh Node V2', desc: 'Solar-powered industrial sensor node with LoRaWAN and 5G connectivity.', icon: <Cpu className="text-emerald-500" /> },
    { title: 'Quantum Vault', desc: 'Secure element for cryptographic signing of environmental telemetry.', icon: <ShieldCheck className="text-blue-500" /> },
    { title: 'Holographic Handoff', desc: 'High-speed QR and NFC interface for physical batch authentication.', icon: <Zap className="text-amber-500" /> }
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
           <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all font-black uppercase tracking-widest text-xs">
              <ArrowLeft size={16} /> Back to Hub
           </button>
           <span className="text-xl font-black tracking-tighter uppercase">AgriTrust Hardware</span>
           <div className="w-20"></div>
        </div>
      </nav>

      <main className="pt-40 pb-20 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
           >
              <h1 className="text-6xl font-black tracking-tighter mb-8 leading-tight">
                The Edge of <br/><span className="text-emerald-600">Trust.</span>
              </h1>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
                Our proprietary hardware stack ensures that data integrity begins at the physical source. 
                By using hardware-level encryption and distributed mesh nodes, we eliminate the possibility of data tampering in the supply chain.
              </p>
              <div className="flex gap-6">
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex-1">
                    <p className="text-3xl font-black text-slate-900 mb-1">5.4k</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Nodes</p>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex-1">
                    <p className="text-3xl font-black text-slate-900 mb-1">0.2ms</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Signing Latency</p>
                 </div>
              </div>
           </motion.div>
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="relative"
           >
              <div className="absolute inset-0 bg-emerald-500/10 blur-[120px] rounded-full"></div>
              <img 
                src="/hardware_mock.png" 
                alt="AgriTrust Device" 
                className="relative rounded-[3rem] shadow-premium rotate-3 hover:rotate-0 transition-all duration-700"
              />
           </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {hardwareSpecs.map((spec, i) => (
             <div key={i} className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8">
                   {spec.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{spec.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{spec.desc}</p>
             </div>
           ))}
        </div>
      </main>

      <footer className="py-20 bg-slate-900 text-white text-center">
         <Radio size={48} className="mx-auto mb-6 text-emerald-400 animate-pulse" />
         <h2 className="text-3xl font-black mb-4">Ready to Upgrade Your Farm?</h2>
         <p className="text-slate-400 mb-10">Order our IoT Starter Kit and begin anchoring your harvest today.</p>
         <button className="px-10 py-5 bg-emerald-600 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-emerald-700 transition-all">
            Contact Sales Team
         </button>
      </footer>
    </div>
  );
};

export default Hardware;

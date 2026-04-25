import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, Database, Activity, ShieldCheck, ArrowLeft, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Network = () => {
  const navigate = useNavigate();

  const regions = [
    { name: 'Western India', loads: 'High', nodes: 1204, status: 'Stable' },
    { name: 'Northern Plains', loads: 'Medium', nodes: 890, status: 'Stable' },
    { name: 'Southern Hub', loads: 'Peak', nodes: 2105, status: 'Stable' },
    { name: 'Eastern Region', loads: 'Low', nodes: 450, status: 'Maintenance' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
           <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-500 hover:text-white transition-all font-black uppercase tracking-widest text-xs">
              <ArrowLeft size={16} /> Dashboard
           </button>
           <span className="text-xl font-black tracking-tighter uppercase text-emerald-400">Network Consensus</span>
           <div className="w-20"></div>
        </div>
      </nav>

      <main className="pt-40 pb-20 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-24">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
           >
              <h1 className="text-7xl font-black tracking-tighter mb-6">Global Resilience.</h1>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                Monitoring the heartbeat of India's first decentralized agricultural ledger. 
                Every node is a pillar of transparency.
              </p>
           </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
           {[
             { label: 'Network Hashrate', value: '128.4 TH/s', icon: <Cpu /> },
             { label: 'Blockchain Height', value: '2,840,192', icon: <Server /> },
             { label: 'Daily Transactions', value: '45.2k', icon: <Activity /> },
             { label: 'Nodes Online', value: '4,649', icon: <Globe /> }
           ].map((m, i) => (
             <div key={i} className="p-8 bg-white/5 rounded-[2rem] border border-white/5 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-all">
                   {React.cloneElement(m.icon, { size: 80 })}
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{m.label}</p>
                <h3 className="text-3xl font-black text-white">{m.value}</h3>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           <div className="lg:col-span-2 bg-white/5 rounded-[2.5rem] border border-white/5 p-10">
              <h3 className="text-2xl font-black mb-10 flex items-center gap-3">
                 <Database className="text-emerald-500" /> Regional Distribution
              </h3>
              <div className="space-y-8">
                 {regions.map((r, i) => (
                   <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-6">
                         <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-emerald-500">
                            <MapPin size={24} />
                         </div>
                         <div>
                            <p className="font-black text-lg">{r.name}</p>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">{r.nodes} Active Nodes</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className={`text-xs font-black uppercase tracking-widest mb-1 ${r.status === 'Stable' ? 'text-emerald-500' : 'text-amber-500'}`}>
                           {r.status}
                         </p>
                         <p className="text-sm font-bold text-slate-400">Load: {r.loads}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-emerald-600 rounded-[2.5rem] p-12 text-white flex flex-col justify-between shadow-2xl shadow-emerald-500/20">
              <div>
                 <ShieldCheck size={64} className="mb-8" />
                 <h3 className="text-3xl font-black mb-4 tracking-tighter">Byzantine Fault Tolerance</h3>
                 <p className="text-emerald-100 font-medium leading-relaxed">
                   Our network uses a custom Proof-of-Trust (PoT) consensus mechanism that prevents Sybil attacks while maintaining extreme efficiency.
                 </p>
              </div>
              <button className="w-full py-5 bg-white text-emerald-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-50 transition-all">
                 Read Protocol Whitepaper
              </button>
           </div>
        </div>
      </main>
    </div>
  );
};

const MapPin = ({ size, className }) => (
  <svg 
    width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" 
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default Network;

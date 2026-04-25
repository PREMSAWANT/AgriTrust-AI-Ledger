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
    <div className="min-h-screen bg-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
           <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all font-black uppercase tracking-widest text-[10px]">
              <ArrowLeft size={16} /> Hub
           </button>
           <span className="text-xl font-black tracking-tighter uppercase text-slate-900">Network Consensus</span>
           <div className="w-20"></div>
        </div>
      </nav>

      <main className="pt-40 pb-20 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-24">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
           >
              <h1 className="text-7xl font-black tracking-tighter mb-6 text-slate-900 leading-tight">Global Resilience.</h1>
              <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">
                Monitoring the heartbeat of India's first decentralized agricultural ledger. 
                Every node is a pillar of transparency.
              </p>
           </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
           {[
             { label: 'Network Hashrate', value: '128.4 TH/s', icon: <Cpu />, color: 'text-emerald-600' },
             { label: 'Blockchain Height', value: '2,840,192', icon: <Server />, color: 'text-blue-600' },
             { label: 'Daily Transactions', value: '45.2k', icon: <Activity />, color: 'text-purple-600' },
             { label: 'Nodes Online', value: '4,649', icon: <Globe />, color: 'text-amber-600' }
           ].map((m, i) => (
             <div key={i} className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
                <div className={`absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-all ${m.color}`}>
                   {React.cloneElement(m.icon, { size: 80 })}
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{m.label}</p>
                <h3 className="text-4xl font-black text-slate-900">{m.value}</h3>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           <div className="lg:col-span-2 bg-slate-50 rounded-[2.5rem] border border-slate-100 p-12">
              <h3 className="text-2xl font-black mb-12 flex items-center gap-4 text-slate-900">
                 <Database className="text-emerald-500" /> Regional Node Distribution
              </h3>
              <div className="space-y-6">
                 {regions.map((r, i) => (
                   <div key={i} className="flex items-center justify-between p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm group hover:border-emerald-200 transition-all">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                            <MapPin size={28} />
                         </div>
                         <div>
                            <p className="font-black text-xl text-slate-900">{r.name}</p>
                            <p className="text-xs text-slate-400 uppercase font-black tracking-widest">{r.nodes} Active Nodes</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${r.status === 'Stable' ? 'text-emerald-500' : 'text-amber-500'}`}>
                           {r.status}
                         </p>
                         <p className="text-sm font-black text-slate-500">Load: {r.loads}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-slate-900 rounded-[2.5rem] p-12 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-10">
                 <ShieldCheck size={140} />
              </div>
              <div className="relative z-10">
                 <ShieldCheck size={64} className="mb-10 text-emerald-400" />
                 <h3 className="text-4xl font-black mb-6 tracking-tighter leading-none">Fault Tolerant <br/>Governance</h3>
                 <p className="text-slate-400 font-medium leading-relaxed mb-10">
                   Our network uses a custom Proof-of-Trust (PoT) consensus mechanism that ensures 100% batch integrity.
                 </p>
                 <button className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-50 transition-all">
                    Read Whitepaper
                 </button>
              </div>
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

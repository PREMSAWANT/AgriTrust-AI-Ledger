import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Activity, Database, Lock, ArrowLeft, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Protocol = () => {
  const navigate = useNavigate();

  const layers = [
    { title: 'Consensus Layer', desc: 'Proof-of-Trust (PoT) mechanism that validates transactions based on historical farm performance.', icon: <Lock className="text-emerald-500" /> },
    { title: 'AI Verification', desc: 'Neural network analysis of IoT telemetry to detect and flag supply chain anomalies.', icon: <Activity className="text-blue-500" /> },
    { title: 'Data Persistence', desc: 'Decentralized storage of high-resolution crop imagery and environmental certificates.', icon: <Database className="text-purple-500" /> }
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-100">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 h-24 flex justify-between items-center">
           <button onClick={() => navigate('/')} className="flex items-center gap-3 text-slate-500 hover:text-slate-900 transition-all group">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-50 transition-all">
                <ArrowLeft size={18} />
              </div>
              <span className="font-black uppercase tracking-widest text-[10px]">Back to Hub</span>
           </button>
           <div className="flex items-center gap-3">
              <img src="/favicon.png" alt="AgriTrust" className="w-8 h-8" />
              <span className="text-xl font-black tracking-tighter uppercase">AgriTrust Protocol</span>
           </div>
           <div className="hidden md:flex gap-4">
              <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200">View Whitepaper</button>
           </div>
        </div>
      </nav>

      <main className="pt-48 pb-32">
        <div className="max-w-7xl mx-auto px-8">
           <div className="max-w-3xl mb-32">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-8">
                   <Zap size={14} className="text-emerald-600" />
                   <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest text-emerald-600">v2.4.0 Mainnet</span>
                </div>
                <h1 className="text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
                  Architecting <br/><span className="text-emerald-600 italic">Unbreakable</span> Trust.
                </h1>
                <p className="text-xl text-slate-500 font-medium leading-relaxed">
                  The AgriTrust Protocol is a multi-layered decentralized stack designed specifically for 
                  high-latency, distributed agricultural environments.
                </p>
              </motion.div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-40">
              {layers.map((layer, i) => (
                <div key={i} className="p-12 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
                   <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-10 group-hover:bg-emerald-50 transition-all">
                      {React.cloneElement(layer.icon, { size: 36 })}
                   </div>
                   <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">{layer.title}</h3>
                   <p className="text-slate-500 font-medium leading-relaxed">{layer.desc}</p>
                </div>
              ))}
           </div>

           {/* Code Section / Technical Visual */}
           <div className="bg-slate-900 rounded-[3.5rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-20 opacity-5">
                 <Terminal size={400} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                 <div>
                    <h2 className="text-5xl font-black mb-8 leading-tight tracking-tighter">Byzantine Fault <br/>Tolerant Execution</h2>
                    <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10">
                      Our smart contracts are formally verified to ensure that even under network partitions, 
                      the state of a harvest batch remains consistent across all nodes in the Indian grid.
                    </p>
                    <div className="flex flex-col gap-6">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                             <ShieldCheck size={20} />
                          </div>
                          <p className="font-bold">EVM Compatible Solidity Contracts</p>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                             <Activity size={20} />
                          </div>
                          <p className="font-bold">Real-time Anomaly Detection</p>
                       </div>
                    </div>
                 </div>
                 <div className="bg-white/5 rounded-3xl p-8 font-mono text-sm border border-white/5 shadow-inner">
                    <p className="text-emerald-400 mb-2">// AgriTrust Consensus Hook</p>
                    <p className="text-slate-400">contract ProvenanceTracker {'{'}</p>
                    <p className="text-slate-400 ml-4">function verifyBatch(bytes32 id) public {'{'}</p>
                    <p className="text-slate-400 ml-8">require(nodes[msg.sender].isVerified);</p>
                    <p className="text-slate-400 ml-8">uint trust = aiEngine.getScore(id);</p>
                    <p className="text-slate-400 ml-8">if (trust &gt; THRESHOLD) {'{'}</p>
                    <p className="text-emerald-400 ml-12">emit BatchVerified(id, trust);</p>
                    <p className="text-slate-400 ml-8">{'}'}</p>
                    <p className="text-slate-400 ml-4">{'}'}</p>
                    <p className="text-slate-400">{'}'}</p>
                 </div>
              </div>
           </div>
        </div>
      </main>

      <footer className="py-32 bg-white border-t border-slate-100 text-center">
         <h2 className="text-4xl font-black mb-6 tracking-tighter">Ready for the Future of AgTech?</h2>
         <p className="text-slate-500 mb-12 font-medium">Join 4,000+ farmers already using the AgriTrust Protocol.</p>
         <button className="px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-emerald-600 transition-all shadow-2xl shadow-slate-200">
            Developer Documentation
         </button>
      </footer>
    </div>
  );
};

export default Protocol;

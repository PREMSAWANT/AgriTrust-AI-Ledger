import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, Activity, Server, AlertCircle, RefreshCw } from 'lucide-react';
import DashboardLayout from '../DashboardLayout';

const SystemLogs = () => {
  const logs = [
    { type: 'Info', event: 'Smart Contract V2.1 Deployed', component: 'Core-Blockchain', time: '12 mins ago', status: 'Success' },
    { type: 'Error', event: 'Node #AF-99 Connection Refused', component: 'P2P-Layer', time: '25 mins ago', status: 'Retrying' },
    { type: 'Warning', msg: 'High latency detected in West Region', component: 'API-Gateway', time: '1 hour ago', status: 'Monitoring' },
    { type: 'Info', event: 'New Batch Indexer Sync', component: 'Data-Layer', time: '2 hours ago', status: 'Success' }
  ];

  return (
    <DashboardLayout role="Admin" userName="Network Admin">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">System Audit Logs</h1>
            <p className="text-slate-500 font-medium">Technical health and security events across the AgriTrust network.</p>
          </div>
          <button className="btn-secondary px-8 py-4 shadow-xl shadow-slate-100 flex items-center gap-3">
            <RefreshCw size={20} /> Force Re-Sync
          </button>
        </div>

        <div className="bg-slate-950 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden border border-slate-800">
           <div className="flex items-center gap-4 mb-10 pb-8 border-b border-slate-800">
              <Terminal className="text-emerald-500" size={28} />
              <h3 className="text-xl font-black text-white uppercase tracking-widest">Network Console</h3>
           </div>

           <div className="space-y-6 font-mono">
              {logs.map((log, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                   <div className="flex items-center gap-4 min-w-[150px]">
                      <span className={`w-2 h-2 rounded-full ${
                        log.type === 'Error' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 
                        log.type === 'Warning' ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 
                        'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                      }`}></span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        log.type === 'Error' ? 'text-red-400' : 
                        log.type === 'Warning' ? 'text-amber-400' : 
                        'text-emerald-400'
                      }`}>{log.type}</span>
                   </div>

                   <div className="flex-1">
                      <p className="text-sm font-bold text-slate-100 mb-1">{log.event || log.msg}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">{log.component} • {log.time}</p>
                   </div>

                   <div className="text-right">
                      <span className="text-[10px] font-black bg-white/10 px-3 py-1 rounded-full text-slate-300 uppercase tracking-widest">{log.status}</span>
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-10 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-4">
              <Activity className="text-emerald-400 animate-pulse" size={24} />
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Live: Listening for P2P heartbeat signals...</p>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SystemLogs;

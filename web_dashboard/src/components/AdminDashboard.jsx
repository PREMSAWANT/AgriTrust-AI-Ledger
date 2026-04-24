import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Users, 
  Database, 
  Activity, 
  AlertCircle, 
  Server, 
  Globe, 
  Cpu,
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const AdminDashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  
  const systemMetrics = [
    { label: 'Network Hashrate', value: '42.8 TH/s', icon: <Cpu />, trend: '+4%' },
    { label: 'Blockchain Height', value: '1,829,401', icon: <Server />, trend: 'Stable' },
    { label: 'Total Verified Farms', value: '5,204', icon: <Globe />, trend: '+122' },
    { label: 'Active Smart Contracts', value: '12', icon: <Database />, trend: 'Active' }
  ];

  const recentAlerts = [
    { type: 'Critical', msg: 'Node #IND-WEST-02 timeout detected', time: '2 mins ago' },
    { type: 'Warning', msg: 'Bulk batch injection from unregistered farm ID', time: '14 mins ago' },
    { type: 'Info', msg: 'Smart Contract V2 migration scheduled', time: '1 hour ago' }
  ];

  return (
    <DashboardLayout role="Admin" userName={user.name}>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Network Control</h1>
            <p className="text-slate-500 font-medium">Monitoring the global AgriTrust decentralized ecosystem.</p>
          </div>
          <div className="flex gap-4">
             <button className="p-4 bg-white rounded-2xl border border-slate-100 text-slate-400 hover:text-emerald-600 transition-all">
                <RefreshCw size={20} />
             </button>
             <button className="btn-primary px-8 py-4 shadow-xl shadow-emerald-100 flex items-center gap-3">
               <ShieldCheck size={20} /> Audit System Logs
             </button>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemMetrics.map((m, i) => (
            <div key={i} className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-all group-hover:scale-110">
                  {React.cloneElement(m.icon, { size: 120 })}
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{m.label}</p>
               <h3 className="text-3xl font-black mb-4">{m.value}</h3>
               <span className="text-[10px] font-black bg-white/10 px-3 py-1 rounded-full">{m.trend}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* User Requests / Verifications */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
             <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xl font-black">Pending Farm Verifications</h3>
                <div className="flex gap-4">
                   <button className="p-3 bg-slate-50 rounded-xl text-slate-400"><Search size={18} /></button>
                   <button className="p-3 bg-slate-50 rounded-xl text-slate-400"><Filter size={18} /></button>
                </div>
             </div>
             <div className="p-8 space-y-6">
                {[
                  { name: 'Suryavanshi Farms', loc: 'Satara, MH', type: 'Organic Wheat', date: 'Today' },
                  { name: 'Kisan Cooperative', loc: 'Ludhiana, PB', type: 'Basmati Rice', date: 'Today' },
                  { name: 'Ratna Exports', loc: 'Ratnagiri, MH', type: 'Alphonso Mango', date: 'Yesterday' }
                ].map((farm, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[1.5rem] hover:bg-emerald-50 transition-all group">
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-emerald-600 shadow-sm">
                           <Globe size={24} />
                        </div>
                        <div>
                           <p className="font-black text-slate-900 text-lg">{farm.name}</p>
                           <p className="text-sm font-bold text-slate-400">{farm.type} • {farm.loc}</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <button className="px-6 py-3 bg-white text-slate-900 text-xs font-black rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm">Review</button>
                        <button className="px-6 py-3 bg-emerald-600 text-white text-xs font-black rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">Verify</button>
                     </div>
                  </div>
                ))}
             </div>
             <div className="p-6 bg-slate-50/50 text-center">
                <button className="text-sm font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest">View All Requests</button>
             </div>
          </div>

          {/* System Alerts Sidebar */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
             <div className="p-8 border-b border-slate-100 flex items-center gap-3">
                <AlertCircle className="text-red-500" size={24} />
                <h3 className="text-xl font-black">Active System Alerts</h3>
             </div>
             <div className="flex-1 p-8 space-y-8">
                {recentAlerts.map((alert, i) => (
                  <div key={i} className="flex gap-4">
                     <div className={`w-1.5 h-auto rounded-full ${
                       alert.type === 'Critical' ? 'bg-red-500' : 
                       alert.type === 'Warning' ? 'bg-amber-500' : 'bg-blue-500'
                     }`}></div>
                     <div>
                        <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${
                          alert.type === 'Critical' ? 'text-red-500' : 
                          alert.type === 'Warning' ? 'text-amber-500' : 'text-blue-500'
                        }`}>{alert.type}</p>
                        <p className="text-sm font-bold text-slate-900 leading-tight mb-2">{alert.msg}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{alert.time}</p>
                     </div>
                  </div>
                ))}
             </div>
             <div className="p-8">
                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-black transition-all hover:bg-slate-800 shadow-xl shadow-slate-200">
                  Open Diagnostic Hub
                </button>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;

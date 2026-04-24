import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  TrendingUp, 
  ShieldCheck, 
  Database, 
  MapPin, 
  Calendar,
  ChevronRight,
  MoreVertical,
  Activity,
  Award,
  QrCode,
  X
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import DashboardLayout from './DashboardLayout';
import { AnimatePresence } from 'framer-motion';

const FarmerDashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [batches, setBatches] = useState([
    { id: 'BATCH-MH-102', crop: 'Alphonso Mango', date: '24 Apr 2026', status: 'Harvested', trust: 98, location: 'Ratnagiri' },
    { id: 'BATCH-MH-105', crop: 'Nagpur Oranges', date: '20 Apr 2026', status: 'In Transit', trust: 99, location: 'Nagpur' },
    { id: 'BATCH-MH-098', crop: 'Basmati Rice', date: '12 Apr 2026', status: 'Verified', trust: 100, location: 'Punjab' }
  ]);

  const stats = [
    { label: 'Active Batches', value: '12', icon: <Database className="text-emerald-600" />, change: '+2' },
    { label: 'AI Trust Score', value: '99.2%', icon: <Award className="text-blue-600" />, change: '+0.5%' },
    { label: 'Total Revenue', value: '₹4.2L', icon: <TrendingUp className="text-purple-600" />, change: '+12%' },
    { label: 'Network Rank', value: '#14', icon: <ShieldCheck className="text-amber-600" />, change: 'Top 1%' }
  ];

  return (
    <DashboardLayout role="Farmer" userName={user.name}>
      <div className="flex flex-col gap-10">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">Farmer Overview</h1>
            <p className="text-slate-500 font-medium text-sm md:text-base">Monitoring your farm's digital provenance.</p>
          </div>
          <button className="btn-primary w-full md:w-auto px-8 py-4 shadow-xl shadow-emerald-100 flex items-center justify-center gap-3">
            <Plus size={20} /> New Harvest Log
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  {stat.icon}
                </div>
                <span className={`text-xs font-black px-3 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Main Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Active Batches Table */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-black tracking-tight">Active Provenance Batches</h3>
              <button className="text-sm font-bold text-emerald-600">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Batch ID</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Crop Type</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Trust Score</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="p-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {batches.map((batch, i) => (
                    <tr key={i} onClick={() => setSelectedBatch(batch)} className="hover:bg-slate-50/50 transition-all cursor-pointer group">
                      <td className="p-6">
                        <p className="font-black text-slate-900 mb-1">{batch.id}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={10} /> {batch.location}</p>
                      </td>
                      <td className="p-6">
                        <p className="font-bold text-slate-700">{batch.crop}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1"><Calendar size={10} /> {batch.date}</p>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2">
                          <div className="w-full max-w-[60px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${batch.trust}%` }}></div>
                          </div>
                          <span className="text-xs font-black text-emerald-600">{batch.trust}%</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                          <Activity size={10} /> {batch.status}
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <button className="p-3 bg-slate-50 rounded-xl text-slate-300 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-all">
                          <QrCode size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions / IoT Card */}
          <div className="flex flex-col gap-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 p-8 opacity-20">
                  <ShieldCheck size={120} />
               </div>
               <h3 className="text-2xl font-black mb-4 relative z-10">Network<br/>Authenticated</h3>
               <p className="text-slate-400 text-sm mb-8 font-medium leading-relaxed relative z-10">
                 Your farm is currently verified on the Ethereum Testnet node. Trust scores are updated every 6 hours.
               </p>
               <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-sm font-bold transition-all relative z-10">
                 View Node Status
               </button>
            </div>

            <div className="bg-emerald-600 rounded-[2.5rem] p-10 text-white shadow-xl shadow-emerald-100">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Activity size={24} />
                 </div>
                 <h3 className="text-xl font-black">AI Forecast</h3>
               </div>
               <p className="text-emerald-100 text-sm mb-8 font-medium leading-relaxed">
                 High humidity detected in Nagpur region. Potential impact on orange batch trust scores. Monitor ventilation.
               </p>
               <button className="w-full py-4 bg-white text-emerald-600 rounded-2xl text-sm font-bold transition-all hover:bg-emerald-50">
                 Check Detailed IoT
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      <AnimatePresence>
        {selectedBatch && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBatch(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative z-10 text-center"
            >
              <button 
                onClick={() => setSelectedBatch(null)}
                className="absolute top-8 right-8 p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-red-500 transition-all"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center">
                 <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600 mb-6">
                    <QrCode size={40} />
                 </div>
                 <h3 className="text-3xl font-black tracking-tighter mb-2">Batch QR Code</h3>
                 <p className="text-slate-500 font-medium mb-8">Scan to verify {selectedBatch.crop} on the ledger.</p>

                 <div className="p-8 bg-white rounded-[2.5rem] border-4 border-slate-50 shadow-inner mb-8">
                    <QRCodeSVG 
                      value={`http://localhost:5176/verify/${selectedBatch.id}`} 
                      size={200}
                      level="H"
                      includeMargin={false}
                    />
                 </div>

                 <div className="w-full p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Decentralized Batch ID</p>
                    <p className="text-sm font-mono font-black text-slate-900">{selectedBatch.id}</p>
                 </div>

                 <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100">
                    Download for Print
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default FarmerDashboard;

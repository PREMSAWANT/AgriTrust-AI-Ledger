import React from 'react';
import { motion } from 'framer-motion';
import { History, ShieldCheck, MapPin, Calendar, ExternalLink, Search } from 'lucide-react';
import DashboardLayout from '../DashboardLayout';

const ScanHistory = () => {
  const history = [
    { id: 'AGRI-IND-992', crop: 'Alphonso Mango', farm: 'Ratna Exports', loc: 'Ratnagiri, MH', date: '24 Apr 2026', trust: 99.2, hash: '0xabc...def' },
    { id: 'AGRI-IND-881', crop: 'Nagpur Oranges', farm: 'Priya Sharma Farms', loc: 'Nagpur, MH', date: '22 Apr 2026', trust: 98.5, hash: '0x123...456' },
    { id: 'AGRI-IND-776', crop: 'Basmati Rice', farm: 'Kisan Cooperative', loc: 'Ludhiana, PB', date: '15 Apr 2026', trust: 100, hash: '0x789...012' }
  ];

  return (
    <DashboardLayout role="Consumer" userName="Priya Sharma">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Scan History</h1>
            <p className="text-slate-500 font-medium">Your personalized journey through the AgriTrust network.</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm w-80">
            <Search size={18} className="text-slate-400" />
            <input type="text" placeholder="Search history..." className="bg-transparent border-none outline-none text-sm font-medium w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {history.map((item, i) => (
            <div key={i} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-all">
                  <ShieldCheck size={120} />
               </div>
               
               <div className="flex flex-col md:flex-row justify-between gap-10 relative z-10">
                  <div className="flex items-center gap-8">
                     <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <History size={32} />
                     </div>
                     <div>
                        <h3 className="text-2xl font-black text-slate-900 mb-1">{item.crop}</h3>
                        <div className="flex flex-wrap items-center gap-4">
                           <p className="text-sm font-black text-emerald-600 uppercase tracking-widest">{item.farm}</p>
                           <span className="text-slate-300">•</span>
                           <p className="text-sm font-bold text-slate-400 flex items-center gap-1"><MapPin size={14} /> {item.loc}</p>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-12">
                     <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Batch ID</p>
                        <p className="text-sm font-black text-slate-900">{item.id}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">AI Trust Score</p>
                        <p className="text-2xl font-black text-emerald-600">{item.trust}%</p>
                     </div>
                     <div className="flex flex-col gap-2">
                        <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                           <Calendar size={20} />
                        </button>
                        <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                           <ExternalLink size={20} />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ScanHistory;

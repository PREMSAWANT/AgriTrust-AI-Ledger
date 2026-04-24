import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  History, 
  Heart, 
  ShieldCheck, 
  Scan, 
  MapPin, 
  Calendar,
  ChevronRight,
  Star,
  Award,
  Search
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const ConsumerDashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  
  const scanHistory = [
    { id: 'AGRI-IND-992', crop: 'Alphonso Mango', farm: 'Ratna Exports', date: '24 Apr 2026', trust: 99.2 },
    { id: 'AGRI-IND-881', crop: 'Nagpur Oranges', farm: 'Priya Sharma Farms', date: '22 Apr 2026', trust: 98.5 },
    { id: 'AGRI-IND-776', crop: 'Basmati Rice', farm: 'Kisan Cooperative', date: '15 Apr 2026', trust: 100 }
  ];

  const consumerMetrics = [
    { label: 'Verified Products', value: '18', icon: <ShieldCheck className="text-emerald-500" /> },
    { label: 'Avg Farm Trust', value: '98.8%', icon: <Award className="text-blue-500" /> },
    { label: 'Favorite Farms', value: '4', icon: <Heart className="text-red-500" /> }
  ];

  return (
    <DashboardLayout role="Consumer" userName={user.name}>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">My AgriTrust</h1>
            <p className="text-slate-500 font-medium">Tracking your personalized food provenance journey.</p>
          </div>
          <button className="btn-primary px-8 py-4 shadow-xl shadow-emerald-100 flex items-center gap-3">
            <Scan size={20} /> Scan New Batch
          </button>
        </div>

        {/* Consumer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {consumerMetrics.map((m, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-8">
               <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center">
                  {React.cloneElement(m.icon, { size: 32 })}
               </div>
               <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
                  <h3 className="text-4xl font-black text-slate-900">{m.value}</h3>
               </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           {/* Recent Scan History */}
           <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="text-xl font-black">Recent Scan History</h3>
                 <button className="text-sm font-bold text-emerald-600">Download Report</button>
              </div>
              <div className="p-8 space-y-6">
                 {scanHistory.map((scan, i) => (
                   <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all cursor-pointer group border border-transparent hover:border-slate-100">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                            <History size={28} />
                         </div>
                         <div>
                            <p className="font-black text-slate-900 text-lg">{scan.crop}</p>
                            <p className="text-sm font-bold text-slate-400">{scan.farm} • {scan.date}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-10">
                         <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">AI Trust</p>
                            <p className="text-lg font-black text-emerald-600">{scan.trust}%</p>
                         </div>
                         <ChevronRight size={20} className="text-slate-300 group-hover:text-emerald-600 transition-all" />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Rewards / Community Card */}
           <div className="flex flex-col gap-6">
              <div className="bg-emerald-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 p-8 opacity-20">
                    <Star size={100} />
                 </div>
                 <h3 className="text-2xl font-black mb-4 relative z-10">Trust Rewards</h3>
                 <p className="text-emerald-100 text-sm mb-8 font-medium leading-relaxed relative z-10">
                   You've earned **420 Tokens** by verifying your purchases. Use them for discounts at partner farms.
                 </p>
                 <button className="w-full py-4 bg-white text-emerald-600 rounded-2xl text-sm font-black transition-all hover:bg-emerald-50 relative z-10">
                   Redeem Tokens
                 </button>
              </div>

              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-xl shadow-slate-200">
                 <h3 className="text-xl font-black mb-6">Discovery</h3>
                 <div className="space-y-4">
                    {[
                      { name: 'Satara Organic Hub', tags: 'Grains, Spices' },
                      { name: 'Ratnagiri Collective', tags: 'Fruits' }
                    ].map((farm, i) => (
                      <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                         <div>
                            <p className="text-sm font-black">{farm.name}</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest">{farm.tags}</p>
                         </div>
                         <button className="p-2 bg-emerald-600 rounded-lg"><Plus size={14} /></button>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConsumerDashboard;

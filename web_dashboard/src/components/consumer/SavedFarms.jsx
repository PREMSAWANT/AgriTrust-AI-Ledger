import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, MapPin, Globe, ShieldCheck, ChevronRight } from 'lucide-react';
import DashboardLayout from '../DashboardLayout';

const SavedFarms = () => {
  const farms = [
    { name: 'Ratna Exports', owner: 'Suhani Singh', loc: 'Ratnagiri, MH', rating: 4.9, trust: 99.2, type: 'Alphonso Mangoes' },
    { name: 'Kisan Cooperative', owner: 'Rajesh Kumar', loc: 'Ludhiana, PB', rating: 4.8, trust: 100, type: 'Basmati Rice' },
    { name: 'Western Ghats Organic', owner: 'Anil Rao', loc: 'Idukki, KL', rating: 5.0, trust: 98.5, type: 'Spices & Coffee' }
  ];

  return (
    <DashboardLayout role="Consumer" userName="Priya Sharma">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Saved Farms</h1>
            <p className="text-slate-500 font-medium">Your curated list of highly-trusted Indian producers.</p>
          </div>
          <button className="btn-primary px-8 py-4 shadow-xl shadow-emerald-100 flex items-center gap-3">
            <Globe size={20} /> Discover New Farms
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {farms.map((farm, i) => (
             <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8">
                   <Heart className="text-red-500 fill-red-500" size={24} />
                </div>
                
                <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-400 mb-8 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                   <Globe size={32} />
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-2">{farm.name}</h3>
                <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-6">{farm.type}</p>

                <div className="space-y-4 mb-8">
                   <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
                      <MapPin size={16} /> {farm.loc}
                   </div>
                   <div className="flex items-center gap-2 text-amber-500 text-sm font-black">
                      <Star size={16} className="fill-amber-500" /> {farm.rating} <span className="text-slate-300 font-bold ml-2">Verified Rating</span>
                   </div>
                </div>

                <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Network Trust</p>
                      <p className="text-lg font-black text-emerald-600">{farm.trust}%</p>
                   </div>
                   <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                      <ChevronRight size={20} />
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SavedFarms;

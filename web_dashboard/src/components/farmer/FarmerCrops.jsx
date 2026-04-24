import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, MoreVertical, Database } from 'lucide-react';
import DashboardLayout from '../DashboardLayout';

const FarmerCrops = () => {
  const crops = [
    { name: 'Alphonso Mango', variety: 'Hapus', acres: '4.5', status: 'Growing', health: 96 },
    { name: 'Basmati Rice', variety: 'Pusa 1121', acres: '12.0', status: 'Ready', health: 99 },
    { name: 'Nagpur Oranges', variety: 'Seedless', acres: '8.2', status: 'Harvested', health: 92 }
  ];

  return (
    <DashboardLayout role="Farmer" userName="Rajesh Kumar">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">My Crops</h1>
            <p className="text-slate-500 font-medium">Detailed inventory of your farm's active produce.</p>
          </div>
          <button className="btn-primary px-8 py-4 shadow-xl shadow-emerald-100 flex items-center gap-3">
            <Plus size={20} /> Add New Crop
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {crops.map((crop, i) => (
            <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <Database size={28} />
                </div>
                <button className="p-2 text-slate-300 hover:text-slate-600 transition-all">
                  <MoreVertical size={20} />
                </button>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">{crop.name}</h3>
              <p className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-widest">{crop.variety} • {crop.acres} Acres</p>
              
              <div className="space-y-6">
                <div>
                   <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                      <span>Crop Health</span>
                      <span className="text-emerald-600">{crop.health}%</span>
                   </div>
                   <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${crop.health}%` }}></div>
                   </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                   <span className="px-4 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">{crop.status}</span>
                   <button className="text-sm font-black text-emerald-600 hover:underline">Manage</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FarmerCrops;

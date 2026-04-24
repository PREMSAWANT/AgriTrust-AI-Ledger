import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, MoreVertical, Database } from 'lucide-react';
import DashboardLayout from '../DashboardLayout';
import { getBatches } from '../../api';

const FarmerCrops = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const { data } = await getBatches();
      setBatches(data.data || []);
    } catch (err) {
      console.error('Failed to fetch batches:', err);
    } finally {
      setLoading(false);
    }
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <DashboardLayout role="Farmer" userName={user.name}>
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
          {batches.map((crop, i) => (
            <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <Database size={28} />
                </div>
                <button className="p-2 text-slate-300 hover:text-slate-600 transition-all">
                  <MoreVertical size={20} />
                </button>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">{crop.productName}</h3>
              <p className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-widest">{crop.location?.farmName || 'Verified Farm'} • {crop.batchId}</p>
              
              <div className="space-y-6">
                <div>
                   <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                      <span>Trust Score</span>
                      <span className="text-emerald-600">{crop.trustScore}%</span>
                   </div>
                   <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${crop.trustScore}%` }}></div>
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

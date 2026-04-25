import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, MoreVertical, Database, X, Leaf, MapPin } from 'lucide-react';
import DashboardLayout from '../DashboardLayout';
import { getBatches, createBatch } from '../../api';
import { useNavigate } from 'react-router-dom';

const FarmerCrops = () => {
  const navigate = useNavigate();
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    farmName: '',
    location: ''
  });

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

  const handleCreateBatch = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const batchPayload = {
        batchId: `BATCH-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        productName: formData.productName,
        farmer: { name: user.name, id: user.id },
        location: { farmName: formData.farmName, description: formData.location },
        harvestDate: new Date().toISOString(),
        trustScore: 99,
        status: 'Harvested'
      };
      await createBatch(batchPayload);
      setIsModalOpen(false);
      setFormData({ productName: '', farmName: '', location: '' });
      fetchBatches();
    } catch (err) {
      alert('Failed to add crop. Please try again.');
    } finally {
      setIsSubmitting(false);
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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary px-8 py-4 shadow-xl shadow-emerald-100 flex items-center gap-3"
          >
            <Plus size={20} /> Add New Crop
          </button>
        </div>

        {/* Add Crop Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white w-full max-w-xl rounded-[3rem] p-10 shadow-2xl relative z-10"
              >
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                      <Leaf size={24} />
                    </div>
                    <h2 className="text-2xl font-black tracking-tighter">Add New Crop</h2>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-red-500 transition-all">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleCreateBatch} className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Crop Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Nagpur Oranges"
                      className="input-premium"
                      value={formData.productName}
                      onChange={e => setFormData({...formData, productName: e.target.value})}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Farm Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Rajesh Farms"
                      className="input-premium"
                      value={formData.farmName}
                      onChange={e => setFormData({...formData, farmName: e.target.value})}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Location (City, State)</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Nagpur, Maharashtra"
                        className="input-premium pl-12"
                        value={formData.location}
                        onChange={e => setFormData({...formData, location: e.target.value})}
                      />
                      <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"
                  >
                    {isSubmitting ? 'Anchoring...' : 'Register Batch'}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

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
                   <button 
                     onClick={() => navigate('/dashboard/farmer/logs')}
                     className="text-sm font-black text-emerald-600 hover:underline"
                   >
                     Manage
                   </button>
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

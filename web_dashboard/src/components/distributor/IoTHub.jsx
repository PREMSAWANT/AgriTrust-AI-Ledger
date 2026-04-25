import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Thermometer, Droplets, Activity, RefreshCw, AlertTriangle, ShieldCheck, X, Package, MapPin, ChevronDown, Truck } from 'lucide-react';
import DashboardLayout from '../DashboardLayout';
import { getBatches, addTracking } from '../../api';

const IoTHub = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateData, setUpdateData] = useState({
    statusUpdate: 'In Transit',
    description: '',
    temperature: '',
    humidity: ''
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedBatchId) return alert('Select a batch first');
    setIsUpdating(true);
    try {
      const payload = {
        batchId: selectedBatchId,
        statusUpdate: updateData.statusUpdate,
        location: { description: updateData.description },
        environmentalData: {
          temperature: parseFloat(updateData.temperature),
          humidity: parseFloat(updateData.humidity)
        }
      };
      await addTracking(payload);
      alert('Tracking updated successfully!');
      setUpdateData({ statusUpdate: 'In Transit', description: '', temperature: '', humidity: '' });
      fetchBatches();
    } catch (err) {
      alert('Failed to update tracking.');
    } finally {
      setIsUpdating(false);
    }
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <DashboardLayout role="Distributor" userName="Priya Sharma">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">IoT Hub</h1>
            <p className="text-slate-500 font-medium">Real-time telemetry from farm to distribution.</p>
          </div>
          <button className="btn-primary px-8 py-4 shadow-xl shadow-emerald-100 flex items-center gap-3">
            <RefreshCw size={20} /> Sync All Sensors
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Update Control Card */}
          <div className="lg:col-span-1 bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm h-full">
            <div className="flex items-center gap-4 mb-8">
               <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                  <Truck size={24} />
               </div>
               <h3 className="text-xl font-black">Logistics Update</h3>
            </div>
            
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Batch</label>
                <div className="relative">
                  <select 
                    className="input-premium appearance-none pr-10"
                    value={selectedBatchId}
                    onChange={e => setSelectedBatchId(e.target.value)}
                    required
                  >
                    <option value="">Choose Batch...</option>
                    {batches.map(b => (
                      <option key={b.batchId} value={b.batchId}>{b.batchId} - {b.productName}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Current Status</label>
                <select 
                  className="input-premium"
                  value={updateData.statusUpdate}
                  onChange={e => setUpdateData({...updateData, statusUpdate: e.target.value})}
                >
                  <option value="In Transit">In Transit</option>
                  <option value="Quality Inspected">Quality Inspected</option>
                  <option value="Handoff to Retail">Handoff to Retail</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Location Description</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="e.g. Mumbai Logistics Hub"
                    className="input-premium pl-12"
                    value={updateData.description}
                    onChange={e => setUpdateData({...updateData, description: e.target.value})}
                  />
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Temp (°C)</label>
                  <input 
                    type="number" 
                    placeholder="4"
                    className="input-premium"
                    value={updateData.temperature}
                    onChange={e => setUpdateData({...updateData, temperature: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Hum (%)</label>
                  <input 
                    type="number" 
                    placeholder="85"
                    className="input-premium"
                    value={updateData.humidity}
                    onChange={e => setUpdateData({...updateData, humidity: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isUpdating}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200"
              >
                {isUpdating ? 'Signing Handoff...' : 'Update IoT Log'}
              </button>
            </form>
          </div>

          {/* Active Sensor Feed */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {batches.slice(0, 4).map((batch, i) => (
                 <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-center mb-6">
                       <div className="p-3 bg-slate-50 rounded-xl text-slate-400">
                          <Package size={24} />
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">Active</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-1">{batch.batchId}</h3>
                    <p className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">{batch.productName}</p>
                    
                    <div className="flex gap-6 pt-6 border-t border-slate-50">
                       <div className="flex items-center gap-2">
                          <Thermometer size={14} className="text-blue-500" />
                          <span className="text-xs font-black text-slate-600">
                            {batch.history?.slice(-1)[0]?.environmentalData?.temperature || '24'}°C
                          </span>
                       </div>
                       <div className="flex items-center gap-2">
                          <Droplets size={14} className="text-emerald-500" />
                          <span className="text-xs font-black text-slate-600">
                            {batch.history?.slice(-1)[0]?.environmentalData?.humidity || '45'}%
                          </span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-12 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-10">
              <ShieldCheck size={140} />
           </div>
           <div className="max-w-xl">
              <h3 className="text-3xl font-black mb-4">Blockchain Handoff Immutability</h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                IoT readings are automatically hashed and signed by the carrier device. 
                Any deviation beyond FSSAI safety thresholds will trigger an automatic provenance alert on the consumer side.
              </p>
           </div>
           <button className="px-10 py-5 bg-emerald-600 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20">
              View Smart Contract
           </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IoTHub;

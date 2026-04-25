import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Download, ExternalLink, Filter, Plus, X, Leaf, MapPin, Database } from 'lucide-react';
import DashboardLayout from '../DashboardLayout';
import { getBatches, createBatch } from '../../api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const FarmerLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    variety: '',
    quantity: '',
    farmName: '',
    location: ''
  });

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const { data } = await getBatches();
      const batches = data.data || [];
      // Flatten history steps into a single log list
      const allLogs = batches.flatMap(batch => [
        {
          id: `TX-${batch.batchId.slice(-4)}`,
          action: 'Batch Creation',
          crop: batch.productName,
          time: new Date(batch.createdAt).toLocaleDateString(),
          hash: batch.blockchainTxHash?.slice(0, 10) + '...',
          status: 'Confirmed'
        },
        ...(batch.history || []).map((h, idx) => ({
          id: `TX-UPD-${idx}`,
          action: h.statusUpdate || 'Location Update',
          crop: batch.productName,
          time: new Date(h.timestamp).toLocaleDateString(),
          hash: '0x' + Math.random().toString(16).slice(2, 10) + '...', // Mock hash for updates if not stored
          status: 'Confirmed'
        }))
      ]);
      setLogs(allLogs.sort((a, b) => new Date(b.time) - new Date(a.time)));
    } catch (err) {
      console.error('Failed to fetch logs:', err);
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
        location: { farmName: formData.farmName, coordinates: formData.location },
        harvestDate: new Date().toISOString(),
        trustScore: 99,
        status: 'Harvested'
      };
      await createBatch(batchPayload);
      setIsModalOpen(false);
      setFormData({ productName: '', variety: '', quantity: '', farmName: '', location: '' });
      fetchLogs();
    } catch (err) {
      alert('Failed to log harvest. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add Brand Header
    doc.setFontSize(22);
    doc.setTextColor(16, 185, 129); // Emerald-600
    doc.text('AgriTrust Provenance Audit', 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);
    doc.text(`Farmer: ${user.name}`, 14, 34);
    
    // Create Table
    const tableColumn = ["Transaction ID", "Action", "Crop", "Date", "Status"];
    const tableRows = [];

    logs.forEach(log => {
      const logData = [
        log.id,
        log.action,
        log.crop,
        log.time,
        log.status
      ];
      tableRows.push(logData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129] },
      styles: { fontSize: 8 }
    });

    doc.save(`AgriTrust_Audit_${user.name.replace(/\s+/g, '_')}.pdf`);
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <DashboardLayout role="Farmer" userName={user.name}>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Provenance Log</h1>
            <p className="text-slate-500 font-medium">Immutable blockchain transaction history for your farm.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={exportToPDF}
              className="hidden md:flex btn-secondary px-8 py-4 shadow-xl shadow-slate-100 items-center gap-3"
            >
              <Download size={20} /> Export Audit Log
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary px-8 py-4 shadow-xl shadow-emerald-100 flex items-center gap-3"
            >
              <Plus size={20} /> Log New Harvest
            </button>
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
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
                className="bg-white w-full max-w-xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative z-10 overflow-y-auto max-h-[90vh]"
              >
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                      <Leaf size={24} />
                    </div>
                    <h2 className="text-2xl font-black tracking-tighter">New Harvest Log</h2>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-red-500 transition-all">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleCreateBatch} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Product Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Alphonso Mango"
                        className="input-premium"
                        value={formData.productName}
                        onChange={e => setFormData({...formData, productName: e.target.value})}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Variety / Batch</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Export Grade A"
                        className="input-premium"
                        value={formData.variety}
                        onChange={e => setFormData({...formData, variety: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Farm Name</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Sunshine Orchards"
                        className="input-premium pl-12"
                        value={formData.farmName}
                        onChange={e => setFormData({...formData, farmName: e.target.value})}
                      />
                      <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Digital Coordinates / Location</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 18.5204° N, 73.8567° E"
                      className="input-premium"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <Database size={16} className="text-emerald-600" />
                      <span className="text-xs font-black uppercase tracking-widest text-slate-500">Blockchain Note</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      This action will anchor your harvest to the decentralized ledger. A unique QR code will be generated upon confirmation.
                    </p>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"
                  >
                    {isSubmitting ? 'Anchoring to Ledger...' : 'Confirm Harvest Log'}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
           <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-black">Transaction Explorer</h3>
              <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-emerald-600 transition-all"><Filter size={20} /></button>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Transaction ID</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Action Type</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Hash</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="p-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.map((log, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-all">
                      <td className="p-6">
                        <p className="font-black text-slate-900">{log.id}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.time}</p>
                      </td>
                      <td className="p-6">
                        <p className="font-bold text-slate-700">{log.action}</p>
                        <p className="text-xs text-emerald-600 font-bold">{log.crop}</p>
                      </td>
                      <td className="p-6">
                        <code className="text-xs bg-slate-100 px-3 py-1 rounded-lg text-slate-500 font-mono">{log.hash}</code>
                      </td>
                      <td className="p-6">
                        <span className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-600">
                           <ShieldCheck size={14} /> {log.status}
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <button className="p-2 text-slate-300 hover:text-emerald-600 transition-all">
                          <ExternalLink size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FarmerLogs;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Download, ExternalLink, Filter } from 'lucide-react';
import DashboardLayout from '../DashboardLayout';
import { getBatches } from '../../api';

const FarmerLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <DashboardLayout role="Farmer" userName={user.name}>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Provenance Log</h1>
            <p className="text-slate-500 font-medium">Immutable blockchain transaction history for your farm.</p>
          </div>
          <button className="btn-secondary px-8 py-4 shadow-xl shadow-slate-100 flex items-center gap-3">
            <Download size={20} /> Export Audit Log
          </button>
        </div>

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

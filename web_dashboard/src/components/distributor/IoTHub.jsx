import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Droplets, Activity, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';
import DashboardLayout from '../DashboardLayout';

const IoTHub = () => {
  const sensors = [
    { id: 'SN-MH-102', loc: 'Cold Storage A', temp: '4°C', hum: '85%', status: 'Stable', lastSeen: '1 min ago' },
    { id: 'SN-MH-105', loc: 'Transit Van #22', temp: '12°C', hum: '40%', status: 'Active', lastSeen: '30 sec ago' },
    { id: 'SN-MH-098', loc: 'Loading Dock', temp: '28°C', hum: '60%', status: 'Warning', lastSeen: '5 min ago' }
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {sensors.map((sensor, i) => (
             <div key={i} className={`p-10 rounded-[2.5rem] border-2 shadow-sm transition-all ${
               sensor.status === 'Warning' ? 'bg-amber-50 border-amber-100' : 'bg-white border-slate-100'
             }`}>
                <div className="flex justify-between items-center mb-10">
                   <div className={`p-4 rounded-2xl ${sensor.status === 'Warning' ? 'bg-amber-100 text-amber-600' : 'bg-slate-50 text-slate-400'}`}>
                      <Activity size={24} />
                   </div>
                   <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                     sensor.status === 'Warning' ? 'bg-amber-200 text-amber-700' : 'bg-emerald-50 text-emerald-600'
                   }`}>{sensor.status}</span>
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 mb-2">{sensor.loc}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">Device: {sensor.id} • {sensor.lastSeen}</p>

                <div className="grid grid-cols-2 gap-6">
                   <div className="p-6 bg-white/50 rounded-3xl border border-slate-100">
                      <div className="flex items-center gap-2 text-blue-500 mb-2">
                         <Thermometer size={16} />
                         <span className="text-[10px] font-black uppercase tracking-widest">Temp</span>
                      </div>
                      <p className="text-2xl font-black text-slate-900">{sensor.temp}</p>
                   </div>
                   <div className="p-6 bg-white/50 rounded-3xl border border-slate-100">
                      <div className="flex items-center gap-2 text-emerald-500 mb-2">
                         <Droplets size={16} />
                         <span className="text-[10px] font-black uppercase tracking-widest">Humidity</span>
                      </div>
                      <p className="text-2xl font-black text-slate-900">{sensor.hum}</p>
                   </div>
                </div>
             </div>
           ))}
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

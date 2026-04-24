import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  MapPin, 
  Activity, 
  Package, 
  Thermometer, 
  Droplets, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  ArrowRightLeft,
  Search
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const DistributorPortal = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const [shipments, setShipments] = useState([
    { id: 'SH-202-01', from: 'Anil Deshmukh Farm', to: 'Mumbai Hub', status: 'In Transit', temp: '24°C', humidity: '45%', priority: 'High' },
    { id: 'SH-202-05', from: 'Priya Sharma Farm', to: 'Exports Gate 4', status: 'Handoff Ready', temp: '18°C', humidity: '40%', priority: 'Normal' },
    { id: 'SH-201-99', from: 'Rajesh Kumar Farm', to: 'Pune Distribution', status: 'Delayed', temp: '30°C', humidity: '60%', priority: 'Critical' }
  ]);

  const metrics = [
    { label: 'Live Shipments', value: '28', icon: <Truck />, status: 'On Track' },
    { label: 'Avg Transit Time', value: '1.4 Days', icon: <Clock />, status: '-12%' },
    { label: 'Active Alerts', value: '2', icon: <AlertTriangle />, status: 'Needs Attention' },
    { label: 'Successful Logs', value: '1,204', icon: <CheckCircle2 />, status: 'Verified' }
  ];

  return (
    <DashboardLayout role="Distributor" userName={user.name}>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Logistics Command</h1>
            <p className="text-slate-500 font-medium">Real-time supply chain monitoring & blockchain handoffs.</p>
          </div>
          <button className="btn-secondary px-8 py-4 shadow-xl shadow-slate-100 flex items-center gap-3">
            <ArrowRightLeft size={20} /> Register Batch Handoff
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between h-48">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-slate-50 rounded-xl text-slate-900">
                  {m.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{m.status}</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 mb-1">{m.label}</p>
                <h3 className="text-3xl font-black text-slate-900">{m.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Shipment Tracking Table */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
           <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-black tracking-tight">Active Shipments & IoT Telemetry</h3>
              <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <Search size={16} className="text-slate-400" />
                <input type="text" placeholder="Filter ID..." className="bg-transparent text-sm font-bold outline-none" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Shipment ID</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Route</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">IoT Status</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Priority</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {shipments.map((ship, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-all cursor-pointer">
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                            <Package size={20} />
                          </div>
                          <div>
                             <p className="font-black text-slate-900">{ship.id}</p>
                             <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">{ship.status}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <p className="text-sm font-bold text-slate-700">{ship.from}</p>
                        <p className="text-xs text-slate-400">to {ship.to}</p>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                             <Thermometer size={14} className={parseInt(ship.temp) > 28 ? 'text-red-500' : 'text-blue-500'} />
                             <span className="text-xs font-black text-slate-600">{ship.temp}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <Droplets size={14} className="text-blue-400" />
                             <span className="text-xs font-black text-slate-600">{ship.humidity}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          ship.priority === 'Critical' ? 'bg-red-50 text-red-600' : 
                          ship.priority === 'High' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-500'
                        }`}>
                          {ship.priority}
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <button className="text-sm font-black text-emerald-600 hover:underline">Update Log</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>

        {/* Map Placeholder / Route Card */}
        <div className="bg-slate-50 rounded-[2.5rem] p-12 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
           <MapPin size={48} className="text-slate-300 mb-6" />
           <h3 className="text-xl font-black text-slate-500 mb-2">Live Fleet Tracking</h3>
           <p className="text-slate-400 text-sm max-w-sm">
             Google Maps integration for live fleet visibility is currently in simulation mode. 
             Click to enable live satellite feed.
           </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DistributorPortal;

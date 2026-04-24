import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, MapPin, Search, Filter, Mail, CheckCircle, XCircle } from 'lucide-react';
import DashboardLayout from '../DashboardLayout';

const UserManagement = () => {
  const pendingUsers = [
    { name: 'Rajesh Kumar', email: 'rajesh@farm.in', role: 'Farmer', farmId: 'GST27ABCDE1234', loc: 'Nashik, MH', date: '2 hours ago' },
    { name: 'Anil Deshmukh', email: 'anil@logistics.co.in', role: 'Distributor', farmId: 'GST19XYZW4321', loc: 'Mumbai, MH', date: '5 hours ago' }
  ];

  return (
    <DashboardLayout role="Admin" userName="Network Admin">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">User Management</h1>
            <p className="text-slate-500 font-medium">Verifying and auditing network participants.</p>
          </div>
          <div className="flex gap-4">
             <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm w-80">
                <Search size={18} className="text-slate-400" />
                <input type="text" placeholder="Search by name, ID, email..." className="bg-transparent border-none outline-none text-sm font-medium w-full" />
             </div>
             <button className="p-3 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-emerald-600 transition-all"><Filter size={20} /></button>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
           <div className="p-8 border-b border-slate-100">
              <h3 className="text-xl font-black">Pending Verifications</h3>
           </div>
           <div className="p-8 space-y-6">
              {pendingUsers.map((u, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-slate-50 rounded-[2rem] hover:bg-emerald-50/50 transition-all group gap-6">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-emerald-600 shadow-sm">
                         <Users size={28} />
                      </div>
                      <div>
                         <p className="font-black text-slate-900 text-xl">{u.name}</p>
                         <div className="flex items-center gap-4 mt-1">
                            <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">{u.role}</p>
                            <span className="text-slate-300">•</span>
                            <p className="text-xs font-bold text-slate-400">{u.email}</p>
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-10">
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Registration ID</p>
                         <p className="text-sm font-black text-slate-900">{u.farmId}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Location</p>
                         <p className="text-sm font-black text-slate-900">{u.loc}</p>
                      </div>
                   </div>

                   <div className="flex gap-3">
                      <button className="p-4 bg-white text-red-500 rounded-2xl hover:bg-red-50 transition-all shadow-sm">
                         <XCircle size={20} />
                      </button>
                      <button className="flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                         <CheckCircle size={18} /> Verify User
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;

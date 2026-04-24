import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-32 h-32 bg-red-50 rounded-[2.5rem] flex items-center justify-center text-red-500 mb-10 shadow-xl shadow-red-100"
      >
        <ShieldAlert size={56} />
      </motion.div>
      
      <h1 className="text-7xl font-black text-slate-900 mb-4 tracking-tighter">404</h1>
      <h2 className="text-2xl font-black text-slate-700 mb-6 uppercase tracking-widest">Page Lost in the Ledger</h2>
      <p className="text-slate-500 max-w-md mb-12 font-medium leading-relaxed">
        The record you are looking for has either been pruned or relocated in our decentralized network.
      </p>

      <Link to="/" className="btn-primary px-10 py-5 shadow-2xl shadow-emerald-100 flex items-center gap-3">
        <ArrowLeft size={20} /> Return to Security Hub
      </Link>
    </div>
  );
};

export default NotFound;

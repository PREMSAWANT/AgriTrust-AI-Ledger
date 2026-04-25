import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, MapPin, Calendar, Thermometer, 
  Droplets, CheckCircle, Search, AlertCircle, ArrowLeft 
} from 'lucide-react';
import { getBatchDetails } from '../api';

const VerifyProduct = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const { data } = await getBatchDetails(id);
      setProduct(data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Batch not found in the decentralized ledger.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Search className="text-emerald-400 w-12 h-12" />
        </motion.div>
        <p className="text-slate-500 font-mono text-xs animate-pulse">Scanning Ethereum Mainnet for Batch {id}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl mb-6">
          <AlertCircle className="text-red-400 w-12 h-12 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Verification Failed</h2>
          <p className="text-slate-400 max-w-md">{error}</p>
        </div>
        <Link to="/" className="text-emerald-400 flex items-center gap-2 hover:underline">
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 flex flex-col items-center justify-start md:justify-center relative overflow-hidden font-sans">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <Link to="/" className="mb-8 mt-4 self-start md:self-center text-slate-400 flex items-center gap-2 hover:text-slate-900 transition-all relative z-10 font-black uppercase tracking-widest text-[10px]">
        <ArrowLeft size={16} /> Hub Home
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden relative z-10"
      >
        {/* Verification Banner */}
        <div className="bg-emerald-50 p-10 md:p-12 flex flex-col items-center gap-6 text-center border-b border-emerald-100">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="w-20 h-20 bg-emerald-500 rounded-3xl shadow-2xl shadow-emerald-200 flex items-center justify-center"
          >
            <ShieldCheck className="text-white w-10 h-10" />
          </motion.div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter mb-2">Batch Verified.</h1>
            <p className="text-emerald-600 text-xs md:text-sm font-black uppercase tracking-widest">Secured by AgriTrust Decentralized Protocol</p>
          </div>
        </div>

        <div className="p-10 md:p-12">
          {/* Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">Product Name</p>
              <h2 className="text-2xl font-black text-slate-900 leading-none">{product.productName}</h2>
              <p className="text-slate-500 font-bold mt-2">{product.farmer?.name}</p>
            </div>
            <div className="md:text-right">
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-4">Trust Analytics</p>
              <div className="flex items-center md:justify-end gap-4">
                <div className="h-3 w-32 bg-slate-50 rounded-full overflow-hidden hidden md:block border border-slate-100">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${product.trustScore}%` }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>
                <h2 className="text-4xl font-black text-emerald-600 leading-none">{product.trustScore}%</h2>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <h3 className="text-lg font-bold mb-8 flex items-center gap-2 text-slate-900">
            <MapPin size={20} className="text-emerald-500" /> Journey Log
          </h3>
          
          <div className="relative border-l-2 border-white/5 ml-3 pl-8 space-y-12">
            {/* Origin Node */}
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-slate-950" />
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-white">Batch Harvested</h4>
                  <p className="text-slate-400 text-sm">{product.location?.farmName}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <Calendar size={12} /> {new Date(product.harvestDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/20">
                  ORIGIN
                </div>
              </div>
            </div>

            {/* Tracking History */}
            {product.history?.map((step, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[41px] top-1 w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-950" />
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white">{step.statusUpdate || 'Location Update'}</h4>
                    <p className="text-slate-400 text-sm">{step.location?.description}</p>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Calendar size={12} /> {new Date(step.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {step.environmentalData && (
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                          <Thermometer size={10} /> {step.environmentalData.temperature}°C
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">
                          <Droplets size={10} /> {step.environmentalData.humidity}%
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Blockchain Footprint */}
          <div className="mt-16 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all">
              <ShieldCheck size={120} />
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Consensus Anchor</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Mainnet Confirmed</span>
                <CheckCircle className="text-emerald-600" size={14} />
              </div>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-3">Cryptographic Trace Hash</p>
              <p className="text-xs font-mono text-slate-500 break-all bg-white p-6 rounded-2xl border border-slate-100 shadow-inner leading-relaxed">
                {product.blockchainTxHash || '0x_awaiting_anchoring'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyProduct;

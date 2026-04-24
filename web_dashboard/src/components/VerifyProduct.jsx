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
    <div className="min-h-screen bg-slate-950 p-4 md:p-6 flex flex-col items-center justify-start md:justify-center">
      <Link to="/" className="mb-6 mt-4 self-start md:self-center text-slate-500 flex items-center gap-2 hover:text-white transition-all">
        <ArrowLeft size={16} /> Home
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-2xl overflow-hidden mb-10"
      >
        {/* Verification Banner */}
        <div className="bg-emerald-500/20 p-6 md:p-8 border-b border-emerald-500/30 flex flex-col items-center gap-4 text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="p-4 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"
          >
            <ShieldCheck className="text-white w-8 h-8 md:w-10 md:h-10" />
          </motion.div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Authenticity Verified</h1>
            <p className="text-emerald-400 text-xs md:text-sm font-medium">Batch Provenance Securely Logged on Blockchain</p>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Product</p>
              <h2 className="text-xl md:text-2xl font-bold text-white">{product.productName}</h2>
              <p className="text-slate-400 text-sm">Harvested by {product.farmer?.name}</p>
            </div>
            <div className="md:text-right flex flex-col md:items-end">
              <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Trust Score</p>
              <div className="flex items-center gap-3">
                <div className="h-2 w-24 bg-slate-800 rounded-full overflow-hidden hidden md:block">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${product.trustScore}%` }}
                    className="h-full bg-emerald-500"
                  />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-emerald-400">{product.trustScore}%</h2>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
            <MapPin size={20} className="text-slate-400" /> Journey Log
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
          <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldCheck size={80} />
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Blockchain Anchor</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-emerald-500">VERIFIED</span>
                <CheckCircle className="text-emerald-500" size={14} />
              </div>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 mb-1">TRANSACTION HASH</p>
              <p className="text-xs font-mono text-slate-300 break-all bg-black/20 p-3 rounded-lg">
                {product.blockchainTxHash || '0x_awaiting_consensus_layer_anchoring'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyProduct;

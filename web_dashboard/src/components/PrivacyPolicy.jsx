import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-12 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/favicon.png" alt="AgriTrust" className="w-10 h-10" />
          <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">AgriTrust Privacy</span>
        </div>

        <div className="glass-card p-12 bg-white">
          <h1 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter">Privacy Policy</h1>
          <p className="text-slate-500 mb-12 font-medium italic">Last Updated: April 24, 2026</p>

          <div className="space-y-12">
            <section>
              <div className="flex items-center gap-4 mb-4 text-emerald-600">
                <ShieldCheck size={24} />
                <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Data Sovereignty</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                At AgriTrust, we believe the data generated on the farm belongs to the farmer. All logistical 
                and provenance data is encrypted before being stored on the blockchain. You have total 
                control over who can access your detailed farm telemetry.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-4 text-blue-600">
                <Eye size={24} />
                <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Transparency & KYC</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                To maintain the integrity of our decentralized ledger, we collect identity verification data 
                (including Aadhar last-4 and Farm IDs). This data is used solely for network validation 
                purposes and is never sold to third-party advertisers.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-4 text-purple-600">
                <Lock size={24} />
                <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Security Standards</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We employ enterprise-grade security protocols including TLS 1.3 encryption, 
                multi-factor authentication for farm admins, and regular smart-contract audits 
                by external decentralized security firms.
              </p>
            </section>
          </div>

          <div className="mt-16 pt-12 border-t border-slate-100 flex justify-between items-center">
            <p className="text-sm text-slate-400 font-bold">© 2026 AgriTrust AI-Ledger Core</p>
            <button onClick={() => navigate('/')} className="btn-secondary px-8 py-3 text-sm">Return Home</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

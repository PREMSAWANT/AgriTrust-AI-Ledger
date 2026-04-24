import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gavel, CheckCircle, Scale } from 'lucide-react';

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-12 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/favicon.png" alt="AgriTrust" className="w-10 h-10" />
          <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">AgriTrust Legal</span>
        </div>

        <div className="glass-card p-12 bg-white">
          <h1 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter">Terms of Service</h1>
          
          <div className="prose prose-slate max-w-none space-y-10">
            <section>
              <h2 className="text-xl font-black uppercase tracking-widest text-emerald-600 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-600 font-medium leading-relaxed">
                By accessing the AgriTrust AI-Ledger, you agree to be bound by these terms. Our platform is 
                a decentralized network designed for agricultural provenance. Users are responsible for 
                the accuracy of the data they anchor to the blockchain.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase tracking-widest text-emerald-600 mb-4">2. Immutable Records</h2>
              <p className="text-slate-600 font-medium leading-relaxed">
                Users acknowledge that once a batch record is signed and hashed onto the ledger, it 
                cannot be deleted or modified. Any corrections must be submitted as a new transaction 
                linked to the original record.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase tracking-widest text-emerald-600 mb-4">3. Network Fees</h2>
              <p className="text-slate-600 font-medium leading-relaxed">
                Certain transactions on the platform (such as bulk batch minting) may require network 
                gas fees. AgriTrust provides a managed wallet service for farmers to simplify this process, 
                but final fees are determined by network congestion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase tracking-widest text-emerald-600 mb-4">4. Compliance</h2>
              <p className="text-slate-600 font-medium leading-relaxed">
                All users must comply with local Indian agricultural regulations and the FSSAI standards 
                where applicable. Misuse of the platform for fraudulent claims will lead to instant 
                revocation of network trust certificates.
              </p>
            </section>
          </div>

          <button onClick={() => navigate('/')} className="btn-primary w-full mt-16 py-4 shadow-emerald-100">
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

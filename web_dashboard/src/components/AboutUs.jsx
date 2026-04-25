import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Target, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <nav className="p-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/favicon.png" alt="AgriTrust" className="w-10 h-10" />
          <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">AgriTrust</span>
        </div>
      </nav>

      <section className="py-20 px-8 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tighter">Our Mission: <br/><span className="text-emerald-500">Transparency in every grain.</span></h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            AgriTrust was born out of a simple necessity: to bridge the trust gap between Indian farmers 
            and global consumers using decentralized technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-10 glass-card">
            <Users className="text-emerald-600 mb-6" size={40} />
            <h3 className="text-2xl font-black mb-4">Empowering Farmers</h3>
            <p className="text-slate-600 leading-relaxed">
              We provide Indian producers with the digital tools to prove their product quality, 
              enabling them to command better prices in both local and international markets.
            </p>
          </div>
          <div className="p-10 glass-card">
            <Target className="text-blue-600 mb-6" size={40} />
            <h3 className="text-2xl font-black mb-4">Data-Driven Trust</h3>
            <p className="text-slate-600 leading-relaxed">
              By combining IoT sensor data with blockchain immutability, we create a "Truth Layer" 
              for agriculture that cannot be tampered with or falsified.
            </p>
          </div>
        </div>

        <div className="mt-32 text-center">
          <h2 className="text-4xl font-black mb-12">The AgriTrust Core Team</h2>
          <div className="flex flex-wrap justify-center gap-20">
            {[
              { name: 'Dr. Arpan Mehta', role: 'Blockchain Architect', loc: 'Mumbai', img: '/team3.png' },
              { name: 'Suhani Singh', role: 'Head of Agronomy', loc: 'Nashik', img: '/team2.png' },
              { name: 'Vikram Rao', role: 'IoT Engineering', loc: 'Bangalore', img: '/team1.png' }
            ].map((member, i) => (
              <div key={i} className="text-center group">
                <div className="w-40 h-40 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-xl group-hover:border-emerald-500 transition-all">
                   <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                </div>
                <h4 className="font-black text-xl text-slate-900">{member.name}</h4>
                <p className="text-emerald-600 font-bold text-sm uppercase tracking-widest">{member.role}</p>
                <p className="text-slate-400 text-xs font-bold mt-1">{member.loc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-slate-100 text-center">
        <button onClick={() => navigate('/')} className="text-slate-400 font-bold hover:text-emerald-600 transition-all">Back to Homepage</button>
      </footer>
    </div>
  );
};

export default AboutUs;

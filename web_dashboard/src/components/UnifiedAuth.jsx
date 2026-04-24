import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LogIn, UserPlus, AlertCircle, Home, ShieldCheck, ArrowLeft, ArrowRight, Phone, MapPin, Fingerprint, Building } from 'lucide-react';
import { loginUser } from '../api';
import axios from 'axios';

const UnifiedAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname === '/login');
  
  useEffect(() => {
    setIsLogin(location.pathname === '/login');
  }, [location.pathname]);

  const toggleMode = () => {
    const newPath = isLogin ? '/register' : '/login';
    navigate(newPath);
  };

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Farmer',
    phone: '',
    farmId: '',
    location: '',
    aadharLast4: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await loginUser({ email: loginEmail, password: loginPassword });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      if (data.user.role === 'Admin') navigate('/dashboard/admin');
      else if (data.user.role === 'Distributor') navigate('/dashboard/distributor');
      else navigate('/dashboard/farmer');
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/register', regData);
      setIsLogin(true);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 overflow-hidden relative">
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 p-4 bg-white rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 text-slate-900 hover:bg-emerald-50 hover:text-emerald-600 transition-all flex items-center gap-2 font-bold z-50"
      >
        <Home size={20} /> Back to Home
      </button>

      <motion.div 
        layout
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={`flex flex-col md:flex-row w-full max-w-5xl glass-card overflow-hidden border-none shadow-2xl min-h-[700px] ${!isLogin ? 'md:flex-row-reverse' : ''}`}
      >
        <motion.div 
          layout
          className="hidden md:flex flex-col justify-between p-12 bg-emerald-600 text-white w-[40%] relative overflow-hidden"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => navigate('/')}>
              <img src="/favicon.png" alt="AgriTrust" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-black tracking-tighter uppercase">AgriTrust</span>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login-text' : 'reg-text'}
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                className="space-y-4"
              >
                <h1 className="text-4xl font-black leading-tight">
                  {isLogin ? "Securing the world's food supply." : "Join the Trusted Network."}
                </h1>
                <p className="text-emerald-100 text-lg font-medium leading-relaxed">
                  {isLogin 
                    ? "Blockchain-powered provenance for modern agriculture." 
                    : "Join 5,000+ Indian producers and start building your immutable trust score."}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10">
            <button onClick={toggleMode} className="group flex items-center gap-2 text-sm text-emerald-100 hover:text-white transition-all font-bold">
              {isLogin ? (
                <>New here? Register Farm <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
              ) : (
                <><ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Already have an account? Login</>
              )}
            </button>
          </div>
        </motion.div>

        <motion.div layout className="flex-1 p-8 md:p-12 bg-white flex flex-col justify-start overflow-y-auto h-[700px]">
          <div className="max-w-md mx-auto w-full py-10">
            <div className="md:hidden flex items-center gap-2 mb-8 text-emerald-600" onClick={() => navigate('/')}>
              <img src="/favicon.png" alt="AgriTrust" className="w-8 h-8 object-contain" />
              <span className="text-2xl font-black tracking-tighter">AGRITRUST</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={isLogin ? 'login-form' : 'reg-form'} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.3 }}>
                <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">
                  {isLogin ? "Welcome Back" : "Registration"}
                </h2>
                <p className="text-slate-500 mb-8 font-medium">
                  {isLogin ? "Sign in to manage your decentralized ledger." : "Provide authenticated details for blockchain verification."}
                </p>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 text-sm">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" /> 
                    <span>{error}</span>
                  </div>
                )}

                {isLogin ? (
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email</label>
                      <input type="email" className="input-premium" placeholder="farmer@agritrust.com" required value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Password</label>
                        <a href="#" className="text-xs font-bold text-emerald-600 hover:underline">Forgot?</a>
                      </div>
                      <input type="password" className="input-premium" placeholder="••••••••" required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full py-4 mt-4">
                      {loading ? 'Authenticating...' : <><LogIn size={20} /> Sign In</>}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                        <input type="text" className="input-premium py-3" placeholder="Rajesh Kumar" required value={regData.name} onChange={e => setRegData({...regData, name: e.target.value})} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input type="tel" className="input-premium py-3 pl-12" placeholder="+91 98765 43210" required value={regData.phone} onChange={e => setRegData({...regData, phone: e.target.value})} />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                      <input type="email" className="input-premium py-3" placeholder="rajesh@farm.in" required value={regData.email} onChange={e => setRegData({...regData, email: e.target.value})} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GSTIN / Farm ID</label>
                        <div className="relative">
                          <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input type="text" className="input-premium py-3 pl-12" placeholder="GST27ABCDE1234" required value={regData.farmId} onChange={e => setRegData({...regData, farmId: e.target.value})} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aadhar (Last 4)</label>
                        <div className="relative">
                          <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input type="text" maxLength="4" className="input-premium py-3 pl-12" placeholder="8899" required value={regData.aadharLast4} onChange={e => setRegData({...regData, aadharLast4: e.target.value})} />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Farm Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="text" className="input-premium py-3 pl-12" placeholder="Nashik, Maharashtra" required value={regData.location} onChange={e => setRegData({...regData, location: e.target.value})} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</label>
                      <select className="input-premium py-3 appearance-none" value={regData.role} onChange={e => setRegData({...regData, role: e.target.value})}>
                        <option value="Farmer">Farmer / Producer</option>
                        <option value="Distributor">Logistics / Distributor</option>
                        <option value="Consumer">Consumer / End User</option>
                        <option value="Admin">Administrator</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                      <input type="password" className="input-premium py-3" placeholder="••••••••" required value={regData.password} onChange={e => setRegData({...regData, password: e.target.value})} />
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary w-full py-4 mt-2">
                      {loading ? 'Creating Account...' : <><UserPlus size={20} /> Complete Registration</>}
                    </button>
                    
                    <p className="text-[10px] text-center text-slate-400 font-bold uppercase mt-2">
                      By registering, you agree to our <Link to="/terms" className="text-emerald-600">Terms</Link> and <Link to="/privacy" className="text-emerald-600">Privacy Policy</Link>
                    </p>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UnifiedAuth;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Database, 
  Truck, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  ChevronRight,
  Menu,
  X,
  User,
  History,
  ShieldCheck
} from 'lucide-react';

const DashboardLayout = ({ children, role, userName }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = {
    Farmer: [
      { name: 'Overview', icon: <LayoutDashboard size={20} />, path: '/dashboard/farmer' },
      { name: 'My Crops', icon: <Database size={20} />, path: '/dashboard/farmer/crops' },
      { name: 'Provenance Log', icon: <ShieldCheck size={20} />, path: '/dashboard/farmer/logs' },
    ],
    Distributor: [
      { name: 'Shipments', icon: <Truck size={20} />, path: '/dashboard/distributor' },
      { name: 'IoT Hub', icon: <Settings size={20} />, path: '/dashboard/distributor/iot' },
      { name: 'Certifications', icon: <ShieldCheck size={20} />, path: '/dashboard/distributor/certs' },
    ],
    Admin: [
      { name: 'Network Health', icon: <LayoutDashboard size={20} />, path: '/dashboard/admin' },
      { name: 'User Management', icon: <Users size={20} />, path: '/dashboard/admin/users' },
      { name: 'System Logs', icon: <Database size={20} />, path: '/dashboard/admin/logs' },
    ],
    Consumer: [
      { name: 'Overview', icon: <LayoutDashboard size={20} />, path: '/dashboard/consumer' },
      { name: 'Scan History', icon: <History size={20} />, path: '/dashboard/consumer/history' },
      { name: 'Saved Farms', icon: <Users size={20} />, path: '/dashboard/consumer/farms' },
    ]
  };

  const currentNav = navItems[role] || [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[45] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative
        bg-white border-r border-slate-100 flex flex-col transition-all duration-500 z-50 h-full
        ${isSidebarOpen ? 'w-72 translate-x-0' : 'w-0 lg:w-24 -translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 flex items-center gap-3 mb-10 overflow-hidden">
          <img src="/favicon.png" alt="AgriTrust" className="w-10 h-10 shrink-0" />
          {isSidebarOpen && <span className="text-xl font-black tracking-tighter uppercase whitespace-nowrap">AgriTrust</span>}
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {currentNav.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                navigate(item.path);
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${
                location.pathname === item.path 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              {isSidebarOpen && <span className="whitespace-nowrap">{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-red-400 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} className="shrink-0" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-all">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden md:flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 w-96">
              <Search size={18} className="text-slate-400" />
              <input type="text" placeholder="Search transactions, batches..." className="bg-transparent border-none outline-none text-sm font-medium w-full" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-900">{userName || 'User'}</p>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{role}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-200 shadow-sm">
                <User size={24} />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

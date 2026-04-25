import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import UnifiedAuth from './components/UnifiedAuth';
import FarmerDashboard from './components/FarmerDashboard';
import AdminDashboard from './components/AdminDashboard';
import VerifyProduct from './components/VerifyProduct';
import DistributorPortal from './components/DistributorPortal';
import ConsumerDashboard from './components/ConsumerDashboard';
import AboutUs from './components/AboutUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Hardware from './components/Hardware';
import Network from './components/Network';
import NotFound from './components/NotFound';

// Farmer Sub-pages
import FarmerCrops from './components/farmer/FarmerCrops';
import FarmerLogs from './components/farmer/FarmerLogs';

// Distributor Sub-pages
import IoTHub from './components/distributor/IoTHub';

// Admin Sub-pages
import UserManagement from './components/admin/UserManagement';
import SystemLogs from './components/admin/SystemLogs';

// Consumer Sub-pages
import ScanHistory from './components/consumer/ScanHistory';
import SavedFarms from './components/consumer/SavedFarms';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<UnifiedAuth />} />
        <Route path="/register" element={<UnifiedAuth />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/hardware" element={<Hardware />} />
        <Route path="/network" element={<Network />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/verify/:id" element={<VerifyProduct />} />
        
        {/* Farmer Routes */}
        <Route path="/dashboard/farmer" element={<FarmerDashboard />} />
        <Route path="/dashboard/farmer/crops" element={<FarmerCrops />} />
        <Route path="/dashboard/farmer/logs" element={<FarmerLogs />} />
        
        {/* Admin Routes */}
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/users" element={<UserManagement />} />
        <Route path="/dashboard/admin/logs" element={<SystemLogs />} />
        
        {/* Distributor Routes */}
        <Route path="/dashboard/distributor" element={<DistributorPortal />} />
        <Route path="/dashboard/distributor/iot" element={<IoTHub />} />
        
        {/* Consumer Routes */}
        <Route path="/dashboard/consumer" element={<ConsumerDashboard />} />
        <Route path="/dashboard/consumer/history" element={<ScanHistory />} />
        <Route path="/dashboard/consumer/farms" element={<SavedFarms />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

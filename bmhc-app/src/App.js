import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { TrendingUp, FileText, Eye } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ObligationMapper from './components/ObligationMapper';
import ReviewGenerator from './components/ReviewGenerator';
import { sampleContract } from './data/sampleData';
import './App.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="logo">BLACK</div>
      <div className="logo-gold">MEN'S HEALTH CLINIC</div>
      <div className="logo-subtitle">Contract-Aligned Performance System • Care You Can Trust</div>

      <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        <TrendingUp size={20} />
        Dashboard
      </Link>

      <Link to="/mapper" className={`nav-item ${location.pathname === '/mapper' ? 'active' : ''}`}>
        <FileText size={20} />
        Map Obligations
      </Link>

      <Link to="/review" className={`nav-item ${location.pathname === '/review' ? 'active' : ''}`}>
        <Eye size={20} />
        Generate Review
      </Link>
    </div>
  );
};

const App = () => {
  const [selectedContractor] = useState(sampleContract);

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard selectedContractor={selectedContractor} />} />
            <Route path="/mapper" element={<ObligationMapper />} />
            <Route path="/review" element={<ReviewGenerator selectedContractor={selectedContractor} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

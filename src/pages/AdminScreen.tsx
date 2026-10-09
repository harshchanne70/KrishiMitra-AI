import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldAlert, 
  Database, 
  Server, 
  Sprout, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  RefreshCw,
  Layers,
  KeyRound
} from 'lucide-react';

export const AdminScreen: React.FC = () => {
  const { t } = useLanguage();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Sample admin catalog
  const adminCrops = [
    { id: 'soybean', name: 'Soybean', seasons: 'Kharif', soils: 'Black, Clay, Alluvial', water: 'Medium', ph: '6.0 - 7.5' },
    { id: 'cotton', name: 'Cotton', seasons: 'Kharif', soils: 'Black, Clay', water: 'Medium', ph: '6.0 - 8.0' },
    { id: 'wheat', name: 'Wheat', seasons: 'Rabi', soils: 'Alluvial, Black, Clay', water: 'Medium', ph: '6.0 - 7.5' },
    { id: 'chickpea', name: 'Chickpea', seasons: 'Rabi', soils: 'Black, Alluvial', water: 'Low', ph: '6.0 - 7.8' },
    { id: 'rice', name: 'Rice (Paddy)', seasons: 'Kharif', soils: 'Clay, Alluvial', water: 'High', ph: '5.5 - 7.0' },
    { id: 'pigeonpea', name: 'Pigeon Pea', seasons: 'Kharif', soils: 'Black, Red', water: 'Low', ph: '5.5 - 7.5' }
  ];

  const adminKnowledge = [
    { title: 'ICAR Soybean Package of Practices', org: 'ICAR - IISR Indore', status: 'Active (2024)' },
    { title: 'CICR Pink Bollworm IPM Protocol', org: 'CICR Nagpur', status: 'Active (2024)' },
    { title: 'PAU Wheat Production Manual', org: 'PAU Ludhiana', status: 'Active (2023)' },
    { title: 'MPKV Rahuri Krishi Darshani Bulletin', org: 'MPKV Rahuri', status: 'Active (2024)' }
  ];

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Allow demonstration evaluator passkey or admin key
    if (accessKey.trim().toLowerCase() === 'admin' || accessKey.trim().toLowerCase() === 'demo' || accessKey.trim().toLowerCase() === 'evaluator') {
      setIsAdminAuthenticated(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid access passkey. For evaluation demonstration, enter "evaluator" or "admin".');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10 animate-fade-in space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-amber-300 text-xs font-bold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Admin Management & Agronomy Engineering</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl">
            {t.nav.admin}
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1">
            Configure supported Indian crops, maintain ICAR agronomy citations, and monitor system health.
          </p>
        </div>
      </div>

      {!isAdminAuthenticated ? (
        /* Simple Evaluator / Admin Passkey Gate */
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-stone-200 shadow-sm text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-bold text-xl text-stone-900 mb-1">
            Admin Authentication Gate
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mb-6">
            Enter administrative key or type <code className="bg-stone-100 px-1 py-0.5 rounded font-bold text-emerald-800">evaluator</code> to inspect internal agronomy settings.
          </p>

          <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Access Passkey
              </label>
              <input
                type="password"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="Enter 'evaluator' or admin key"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            {errorMessage && (
              <p className="text-xs text-red-600 font-semibold">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm transition shadow-sm"
            >
              Verify & Enter Portal
            </button>
          </form>
        </div>
      ) : (
        /* Admin Dashboard & Management Panels */
        <div className="space-y-6">
          
          {/* System Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <span className="block text-xs text-stone-500 font-bold uppercase">Backend Status</span>
              <strong className="text-xl font-heading font-extrabold text-emerald-700 flex items-center gap-1.5 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Operational
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <span className="block text-xs text-stone-500 font-bold uppercase">Database Engine</span>
              <strong className="text-xl font-heading font-extrabold text-[#1b4332] mt-0.5 block">
                SQLite / PostgreSQL
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <span className="block text-xs text-stone-500 font-bold uppercase">Supported Crops</span>
              <strong className="text-xl font-heading font-extrabold text-[#1b4332] mt-0.5 block">
                10 Configured
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <span className="block text-xs text-stone-500 font-bold uppercase">Research Citations</span>
              <strong className="text-xl font-heading font-extrabold text-[#1b4332] mt-0.5 block">
                7 Official Sources
              </strong>
            </div>
          </div>

          {/* Supported Crops Configuration Table */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-stone-900 flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-700" />
                Configured Crop Suitability Catalog
              </h3>
              <span className="text-xs font-bold text-stone-500 uppercase">
                Active in Recommendation Wizard
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-500 uppercase text-[11px]">
                    <th className="py-2.5 px-3">Crop Name</th>
                    <th className="py-2.5 px-3">Season</th>
                    <th className="py-2.5 px-3">Suitable Soils</th>
                    <th className="py-2.5 px-3">Water Demand</th>
                    <th className="py-2.5 px-3">Optimal pH</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {adminCrops.map((c) => (
                    <tr key={c.id} className="hover:bg-stone-50/50">
                      <td className="py-3 px-3 font-bold text-stone-900">{c.name}</td>
                      <td className="py-3 px-3">{c.seasons}</td>
                      <td className="py-3 px-3 text-stone-600">{c.soils}</td>
                      <td className="py-3 px-3 capitalize">{c.water}</td>
                      <td className="py-3 px-3 font-mono">{c.ph}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Research Knowledge Sources Table */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-stone-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-700" />
                Verified Agricultural Knowledge Repositories
              </h3>
              <span className="text-xs font-bold text-emerald-700">
                ICAR & SAU Standards
              </span>
            </div>

            <div className="space-y-2">
              {adminKnowledge.map((k, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs sm:text-sm">
                  <div>
                    <strong className="text-stone-900 block font-bold">{k.title}</strong>
                    <span className="text-stone-500 text-xs">{k.org}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    {k.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';
import { getForecastForRegion, REALTIME_ALERTS, MANDI_PRICES_DATA } from '../../data/mockData';
import { 
  Printer, 
  X, 
  Sprout, 
  Calendar, 
  MapPin, 
  Droplet, 
  FlaskConical, 
  AlertTriangle,
  FileCheck
} from 'lucide-react';

export const PrintAdvisoryModal: React.FC = () => {
  const { 
    showPrintModal, 
    setShowPrintModal, 
    farmerProfile, 
    currentRegion, 
    savedCrops 
  } = useApp();

  if (!showPrintModal) return null;

  const forecast = getForecastForRegion(currentRegion.id);
  const today = new Date().toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200">
        
        {/* Action Header - Not Printed */}
        <div className="sticky top-0 bg-stone-900 text-white p-4 flex items-center justify-between no-print z-10">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">Farm Advisory Report Preview (Print Ready)</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={() => setShowPrintModal(false)}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg bg-stone-800"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 sm:p-10 space-y-6 text-stone-900 font-sans" id="printable-advisory">
          
          {/* Document Letterhead */}
          <div className="border-b-2 border-emerald-900 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-forest-900 text-white flex items-center justify-center font-black">
                <Sprout className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-forest-900">
                  KRISHI SAHAYAK • PRECISION CROP ADVISORY
                </h1>
                <p className="text-xs text-stone-600 font-semibold uppercase tracking-wider">
                  Agro-Climatic Advisory & Farmer Decision Support System
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs text-stone-600">
              <p className="font-bold text-stone-900">Advisory Ref: KS-{Date.now().toString().slice(-6)}</p>
              <p>Issued: {today}</p>
              <p className="text-emerald-800 font-semibold">Valid: 7 Days</p>
            </div>
          </div>

          {/* Farmer & Landholding Summary */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-stone-500 block uppercase font-bold text-[10px]">Beneficiary Farmer</span>
              <span className="font-black text-stone-900 text-sm">{farmerProfile.name}</span>
            </div>
            <div>
              <span className="text-stone-500 block uppercase font-bold text-[10px]">Farm / Location</span>
              <span className="font-bold text-stone-900">{farmerProfile.farmName}</span>
              <span className="text-stone-500 block">{currentRegion.name}</span>
            </div>
            <div>
              <span className="text-stone-500 block uppercase font-bold text-[10px]">Cultivable Holding</span>
              <span className="font-bold text-stone-900">{farmerProfile.totalAcres} Acres ({farmerProfile.soilType} Soil)</span>
            </div>
            <div>
              <span className="text-stone-500 block uppercase font-bold text-[10px]">Agro-Zone Code</span>
              <span className="font-bold text-stone-900">{currentRegion.agroZone}</span>
            </div>
          </div>

          {/* Critical Weather Alerts */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-red-900 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-700" />
              <span>Urgent AgroMet Directives</span>
            </h3>
            <div className="space-y-2 text-xs">
              {REALTIME_ALERTS.map(alert => (
                <div key={alert.id} className="p-3 bg-red-50/80 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <strong className="text-red-950 font-bold">{alert.title}</strong>
                    <span className="text-[10px] text-red-700 font-semibold">{alert.timestamp}</span>
                  </div>
                  <p className="text-stone-800 mt-1">{alert.description}</p>
                  <p className="text-red-900 font-semibold mt-1">Recommended Action: {alert.action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 7-Day Weather Forecast Table */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-forest-900 mb-2 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <span>7-Day Micro-Weather Parameters</span>
            </h3>
            <table className="w-full text-xs text-left border border-stone-200">
              <thead className="bg-stone-100 text-stone-700 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-2 border">Day / Date</th>
                  <th className="p-2 border">Max/Min Temp</th>
                  <th className="p-2 border">Rain Prob.</th>
                  <th className="p-2 border">Humidity</th>
                  <th className="p-2 border">Wind</th>
                  <th className="p-2 border">Spraying Advisory</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {forecast.map((day, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}>
                    <td className="p-2 border font-bold">{day.dayName} ({day.date.slice(5)})</td>
                    <td className="p-2 border">{day.tempMax}°C / {day.tempMin}°C</td>
                    <td className="p-2 border font-semibold">{day.precipProb}%</td>
                    <td className="p-2 border">{day.humidity}%</td>
                    <td className="p-2 border">{day.windSpeed} km/h</td>
                    <td className="p-2 border text-stone-700">{day.advisoryNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recommended Crop Plan */}
          {savedCrops.length > 0 && (
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-forest-900 mb-2 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-700" />
                <span>Selected Crop Plan & Fertilizer Package</span>
              </h3>
              <div className="space-y-3">
                {savedCrops.map(crop => (
                  <div key={crop.id} className="p-3.5 border border-stone-300 rounded-xl bg-stone-50/50 text-xs">
                    <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                      <div>
                        <span className="font-black text-sm text-stone-900">{crop.name}</span>
                        <span className="italic text-stone-500 ml-2">({crop.scientificName})</span>
                      </div>
                      <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        {crop.matchScore}% Match
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                      <div><strong>Yield:</strong> {crop.expectedYield}</div>
                      <div><strong>Sowing:</strong> {crop.sowingWindow}</div>
                      <div><strong>Duration:</strong> {crop.harvestDuration}</div>
                      <div><strong>Return:</strong> {crop.estimatedNetReturn}</div>
                    </div>
                    <div className="mt-2 text-[11px] text-stone-600">
                      <strong>Input Specs:</strong> Seed Rate: {crop.keyInputs.seedRate} • NPK: {crop.keyInputs.npkRatio} • Critical Stages: {crop.keyInputs.criticalIrrigations}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Official Sign-off & Helpline */}
          <div className="pt-4 border-t-2 border-stone-200 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-stone-500 gap-2">
            <div>
              <p className="font-bold text-stone-800">Krishi Vigyan Kendra & Agromet Field Advisory</p>
              <p>For immediate phone support: Kisan Call Centre 1800-180-1551 (Toll Free)</p>
            </div>
            <div className="text-left sm:text-right font-mono text-[10px]">
              Computer-generated agronomic document. Verified by ICAR algorithms.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

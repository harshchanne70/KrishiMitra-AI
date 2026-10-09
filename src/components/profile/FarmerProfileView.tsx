import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AGRICULTURAL_REGIONS, PEST_DISEASE_DATA } from '../../data/mockData';
import { SoilType, IrrigationType } from '../../types';
import { 
  UserCheck, 
  MapPin, 
  Tractor, 
  Sprout, 
  Droplet, 
  Save, 
  Trash2, 
  Printer, 
  Bookmark, 
  Layers,
  Sparkles
} from 'lucide-react';

export const FarmerProfileView: React.FC = () => {
  const { 
    farmerProfile, 
    updateFarmerProfile, 
    savedCrops, 
    removeCropFromPlan,
    savedDiseases,
    toggleBookmarkDisease,
    setShowPrintModal,
    setActiveTab
  } = useApp();

  const [name, setName] = useState(farmerProfile.name);
  const [farmName, setFarmName] = useState(farmerProfile.farmName);
  const [regionId, setRegionId] = useState(farmerProfile.regionId);
  const [totalAcres, setTotalAcres] = useState(farmerProfile.totalAcres);
  const [soilType, setSoilType] = useState<SoilType>(farmerProfile.soilType);
  const [primaryCrop, setPrimaryCrop] = useState(farmerProfile.primaryCrop);
  const [irrigationType, setIrrigationType] = useState<IrrigationType>(farmerProfile.irrigationType);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateFarmerProfile({
      name,
      farmName,
      regionId,
      totalAcres,
      soilType,
      primaryCrop,
      irrigationType
    });
  };

  const bookmarkedDiseaseObjects = PEST_DISEASE_DATA.filter(d => savedDiseases.includes(d.id));

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <Sparkles className="w-4 h-4" />
              <span>Offline Local Farm Dossier</span>
            </div>
            <h2 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
              My Farm Profile & Land Registry
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Customize your agricultural holding parameters. These details are stored securely in your browser and automatically calibrate all advisory models.
            </p>
          </div>

          <button
            onClick={() => setShowPrintModal(true)}
            className="flex items-center gap-2 bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition self-start sm:self-auto"
          >
            <Printer className="w-4 h-4" />
            <span>Generate Farm PDF Dossier</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Farm Config Form */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-card">
          <h3 className="text-base font-black text-stone-900 mb-4 pb-2 border-b border-stone-100 flex items-center gap-2">
            <Tractor className="w-5 h-5 text-emerald-700" />
            <span>Farm Operational Details</span>
          </h3>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Farmer Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-semibold text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Farm / Estate Name</label>
                <input
                  type="text"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-semibold text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Agricultural Region</label>
                <select
                  value={regionId}
                  onChange={(e) => setRegionId(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-semibold text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {AGRICULTURAL_REGIONS.map(reg => (
                    <option key={reg.id} value={reg.id}>{reg.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Total Cultivated Area (Acres)</label>
                <input
                  type="number"
                  step="0.5"
                  value={totalAcres}
                  onChange={(e) => setTotalAcres(Number(e.target.value))}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-semibold text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Primary Soil Type</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value as SoilType)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-semibold text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Alluvial">Alluvial Soil</option>
                  <option value="Black">Black Soil (Regur)</option>
                  <option value="Red">Red Loam</option>
                  <option value="Sandy">Sandy Loam</option>
                  <option value="Clay">Clayey Soil</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Primary Standing Crop</label>
                <input
                  type="text"
                  value={primaryCrop}
                  onChange={(e) => setPrimaryCrop(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-semibold text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Irrigation System</label>
                <select
                  value={irrigationType}
                  onChange={(e) => setIrrigationType(e.target.value as IrrigationType)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-semibold text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Well">Tube-well / Borewell</option>
                  <option value="Canal">Canal System</option>
                  <option value="Drip">Drip Irrigation</option>
                  <option value="Sprinkler">Sprinklers</option>
                  <option value="Rainfed">Rainfed (Barani)</option>
                </select>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-xs transition"
              >
                <Save className="w-4 h-4" />
                <span>Save Farm Profile Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Saved Farm Plan Itinerary */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-card" id="farm-plan-summary">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 mb-3">
              <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-700" />
                <span>Saved Farm Plan Itinerary</span>
              </h3>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                {savedCrops.length} Active
              </span>
            </div>

            {savedCrops.length === 0 ? (
              <div className="text-center py-6 text-stone-500 text-xs">
                <p>No crops saved to your farm plan yet.</p>
                <button
                  onClick={() => setActiveTab('crops')}
                  className="mt-2 font-bold text-emerald-700 hover:underline"
                >
                  Open Crop Recommender to add →
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {savedCrops.map(crop => (
                  <div key={crop.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-stone-900">{crop.name}</h4>
                        <p className="text-[11px] text-stone-500">{crop.sowingWindow} • {crop.expectedYield}</p>
                      </div>
                      <button
                        onClick={() => removeCropFromPlan(crop.id)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                        title="Remove crop"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-2 text-[11px] font-semibold text-emerald-800">
                      Est. Return: {crop.estimatedNetReturn}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bookmarked Diagnoses */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-card">
            <h3 className="text-base font-black text-stone-900 mb-3 pb-2 border-b border-stone-100 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-600" />
              <span>Bookmarked Disease Guides ({bookmarkedDiseaseObjects.length})</span>
            </h3>

            {bookmarkedDiseaseObjects.length === 0 ? (
              <p className="text-xs text-stone-500 py-3">No diseases bookmarked for quick reference.</p>
            ) : (
              <div className="space-y-2">
                {bookmarkedDiseaseObjects.map(d => (
                  <div key={d.id} className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-200 text-xs flex justify-between items-center">
                    <div>
                      <span className="font-bold text-stone-900">{d.diseaseName}</span>
                      <span className="text-[10px] text-stone-500 block">Crop: {d.crop}</span>
                    </div>
                    <button
                      onClick={() => toggleBookmarkDisease(d.id)}
                      className="text-amber-700 hover:text-stone-900 text-xs font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

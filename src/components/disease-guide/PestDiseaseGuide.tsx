import React, { useState } from 'react';
import { PEST_DISEASE_DATA } from '../../data/mockData';
import { PlantPart, DiseaseRecord } from '../../types';
import { DiseaseCard } from './DiseaseCard';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Filter, 
  Camera, 
  Sparkles, 
  Scan, 
  CheckCircle, 
  AlertCircle, 
  X,
  FileQuestion,
  Layers,
  Leaf
} from 'lucide-react';

export const PestDiseaseGuide: React.FC = () => {
  const { addToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [selectedPart, setSelectedPart] = useState<PlantPart>('All');
  const [severityFilter, setSeverityFilter] = useState('All');

  // AI Scanner Simulation State
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<{
    disease: DiseaseRecord;
    confidence: number;
    sampleName: string;
  } | null>(null);

  const sampleImages = [
    { name: 'Wheat Leaf (Yellow Stripe Powder)', diseaseId: 'wheat-yellow-rust', crop: 'Wheat' },
    { name: 'Paddy Leaf (Spindle Diamond Lesion)', diseaseId: 'paddy-blast', crop: 'Rice (Paddy)' },
    { name: 'Cotton Boll (Rosette Flower / Larva)', diseaseId: 'cotton-pink-bollworm', crop: 'Cotton' },
    { name: 'Tomato Leaf (Concentric Target Spot)', diseaseId: 'tomato-early-blight', crop: 'Tomato' },
    { name: 'Chilli Foliage (Boat-Shaped Leaf Curl)', diseaseId: 'chilli-thrips-mites', crop: 'Chilli' },
    { name: 'Maize Whorl (Sawdust Frass & Shot-Holes)', diseaseId: 'maize-fall-armyworm', crop: 'Maize' }
  ];

  const handleSimulateScan = (sample: typeof sampleImages[0]) => {
    setScanning(true);
    setScannedResult(null);

    setTimeout(() => {
      const match = PEST_DISEASE_DATA.find(d => d.id === sample.diseaseId) || PEST_DISEASE_DATA[0];
      setScannedResult({
        disease: match,
        confidence: 96.4 + Math.round(Math.random() * 30) / 10,
        sampleName: sample.name
      });
      setScanning(false);
      addToast({
        type: 'success',
        title: 'Diagnostic Match Detected',
        message: `Identified ${match.diseaseName} with high confidence.`
      });
    }, 1200);
  };

  const crops = ['All', 'Wheat', 'Rice (Paddy)', 'Cotton', 'Tomato', 'Chilli', 'Potato', 'Soybean', 'Maize'];
  const plantParts: PlantPart[] = ['All', 'Leaves', 'Stem', 'Roots', 'Fruit'];

  const filteredDiseases = PEST_DISEASE_DATA.filter(item => {
    const matchesSearch = 
      item.diseaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.symptoms.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCrop = selectedCrop === 'All' || item.crop.toLowerCase().includes(selectedCrop.toLowerCase());
    const matchesPart = selectedPart === 'All' || item.affectedPart === selectedPart;
    const matchesSeverity = severityFilter === 'All' || item.severity === severityFilter;

    return matchesSearch && matchesCrop && matchesPart && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <Sparkles className="w-4 h-4" />
              <span>Plant Pathology & Integrated Pest Management (IPM)</span>
            </div>
            <h2 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
              Pest & Disease Diagnosis Guide
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              Rapid visual diagnosis with scientifically validated chemical, biological, and organic remediation regimens.
            </p>
          </div>

          {/* AI Vision Scanner trigger */}
          <button
            onClick={() => setScannerOpen(true)}
            className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-black px-4 py-3 rounded-xl shadow-md transition transform active:scale-95"
          >
            <Camera className="w-4 h-4 text-emerald-300" />
            <span>Launch AI Symptom Scanner</span>
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-6 pt-5 border-t border-stone-100 grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search diseases, crops, pathogen (e.g., Rust, Blight)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-stone-400 hover:text-stone-700 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter by Crop */}
          <div className="md:col-span-3">
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              aria-label="Filter by Crop"
            >
              {crops.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Crops' : c}</option>
              ))}
            </select>
          </div>

          {/* Filter by Affected Plant Part */}
          <div className="md:col-span-2">
            <select
              value={selectedPart}
              onChange={(e) => setSelectedPart(e.target.value as PlantPart)}
              className="w-full py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              aria-label="Filter by Plant Part"
            >
              {plantParts.map(p => (
                <option key={p} value={p}>{p === 'All' ? 'All Plant Parts' : p}</option>
              ))}
            </select>
          </div>

          {/* Filter by Severity */}
          <div className="md:col-span-2">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="w-full py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              aria-label="Filter by Severity"
            >
              <option value="All">All Threat Levels</option>
              <option value="High">High Threat Only</option>
              <option value="Medium">Medium Threat</option>
              <option value="Low">Low Threat</option>
            </select>
          </div>

        </div>
      </div>

      {/* AI Vision Scanner Modal / Drawer */}
      {scannerOpen && (
        <div className="bg-forest-950 text-white rounded-2xl p-6 border border-emerald-800/60 shadow-xl animate-fade-in relative overflow-hidden">
          
          <button
            onClick={() => {
              setScannerOpen(false);
              setScannedResult(null);
            }}
            className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg bg-white/10"
            aria-label="Close scanner"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Scan className="w-4 h-4 animate-pulse" />
              <span>Deep Learning Leaf Diagnostic Simulator</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Select or Upload Leaf Symptom Specimen
            </h3>
            <p className="text-xs text-stone-300 mt-1">
              Simulates real-time computer vision inference trained on over 50,000+ agricultural field images.
            </p>

            {/* Specimen choices */}
            <div className="mt-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">
                Click a field specimen sample to scan:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {sampleImages.map((sample, idx) => (
                  <button
                    key={idx}
                    disabled={scanning}
                    onClick={() => handleSimulateScan(sample)}
                    className="p-3 bg-white/10 hover:bg-emerald-900/60 border border-white/15 rounded-xl text-left transition disabled:opacity-50 group"
                  >
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition" />
                      <span className="text-xs font-bold text-white truncate">{sample.name}</span>
                    </div>
                    <span className="text-[10px] text-stone-300 mt-1 block">Crop: {sample.crop}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Scanning Animation */}
            {scanning && (
              <div className="mt-6 p-6 bg-forest-900/80 border border-emerald-500/50 rounded-2xl text-center space-y-3 relative overflow-hidden">
                <div className="w-16 h-16 mx-auto rounded-2xl border-2 border-emerald-400 flex items-center justify-center relative">
                  <Scan className="w-8 h-8 text-emerald-300 animate-pulse" />
                  <div className="absolute inset-x-0 h-1 bg-emerald-400 animate-bounce" />
                </div>
                <p className="text-sm font-bold text-emerald-200">
                  Processing convolutional neural network feature maps...
                </p>
                <p className="text-xs text-stone-400">
                  Detecting leaf chlorosis, pustule shape, lesion perimeter & fungal spore density
                </p>
              </div>
            )}

            {/* Diagnostic Result */}
            {scannedResult && !scanning && (
              <div className="mt-6 p-5 bg-emerald-900/40 border border-emerald-500 rounded-2xl animate-fade-in space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500 text-stone-950">
                        Inference Verified
                      </span>
                      <span className="text-xs text-emerald-300 font-mono">
                        Confidence: {scannedResult.confidence.toFixed(1)}%
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-white mt-1">
                      {scannedResult.disease.diseaseName}
                    </h4>
                    <p className="text-xs text-stone-300 italic">{scannedResult.disease.scientificName}</p>
                  </div>

                  <span className="text-xs bg-red-950 text-red-200 px-3 py-1 rounded-lg border border-red-800 self-start">
                    {scannedResult.disease.severity} Severity Threat
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-black/30 p-3 rounded-xl border border-white/10">
                    <span className="font-bold text-emerald-300 block mb-1">Immediate Biological Cure:</span>
                    <p className="text-stone-200">{scannedResult.disease.organicTreatment[0]}</p>
                  </div>
                  <div className="bg-black/30 p-3 rounded-xl border border-white/10">
                    <span className="font-bold text-blue-300 block mb-1">Approved Chemical Action:</span>
                    <p className="text-stone-200">{scannedResult.disease.chemicalTreatment[0]}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSearchTerm(scannedResult.disease.crop);
                    setScannerOpen(false);
                  }}
                  className="w-full text-center text-xs font-bold text-emerald-200 hover:text-white py-2 bg-white/10 hover:bg-white/20 rounded-xl transition"
                >
                  View Complete Full Dossier & Preventive Protocol Below ↓
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Disease Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Displaying {filteredDiseases.length} Identified Pathologies
          </p>
          {(searchTerm || selectedCrop !== 'All' || selectedPart !== 'All' || severityFilter !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCrop('All');
                setSelectedPart('All');
                setSeverityFilter('All');
              }}
              className="text-xs font-bold text-emerald-800 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredDiseases.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-stone-200">
            <FileQuestion className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-stone-800">No diseases matching your query</h4>
            <p className="text-xs text-stone-500 mt-1">Try selecting another crop, plant part, or clear the search keyword.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredDiseases.map(disease => (
              <DiseaseCard key={disease.id} disease={disease} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

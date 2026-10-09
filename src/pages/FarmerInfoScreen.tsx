import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAdvisoryWorkflow } from '../context/AdvisoryWorkflowContext';
import { FurrowStepper } from '../components/common/FurrowStepper';
import { StepNavigation } from '../components/common/StepNavigation';
import { VoiceInputButton } from '../components/common/VoiceInputButton';
import { User, MapPin, Phone, Globe, AlertCircle } from 'lucide-react';

const POPULAR_STATES = [
  'Maharashtra',
  'Punjab',
  'Madhya Pradesh',
  'Uttar Pradesh',
  'Gujarat',
  'Rajasthan',
  'Karnataka',
  'Haryana',
  'Telangana',
  'Andhra Pradesh',
  'Bihar'
];

export const FarmerInfoScreen: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { farmerInfo, setFarmerInfo } = useAdvisoryWorkflow();

  const [errors, setErrors] = useState<{ name?: string; village?: string; phone?: string }>({});

  const validate = (): boolean => {
    const newErrors: { name?: string; village?: string; phone?: string } = {};
    if (!farmerInfo.name.trim()) {
      newErrors.name = t.farmerInfo.errName;
    }
    if (!farmerInfo.village.trim()) {
      newErrors.village = t.farmerInfo.errVillage;
    }
    if (farmerInfo.phone.trim() && !/^\d{10}$/.test(farmerInfo.phone.trim())) {
      newErrors.phone = t.farmerInfo.errPhone;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      navigate('/advisory/farm-soil');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8 animate-fade-in">
      {/* Furrow Progress Stepper */}
      <FurrowStepper currentStepId={1} maxReachedId={1} />

      {/* Main Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm mt-4">
        
        {/* Header */}
        <div className="border-b border-stone-200 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <User className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1b4332]">
                {t.farmerInfo.title}
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
                {t.farmerInfo.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          
          {/* Farmer Full Name with Voice Input Button */}
          <div>
            <label className="block text-sm font-bold text-stone-900 mb-1.5">
              {t.farmerInfo.fullName} <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={farmerInfo.name}
                  onChange={(e) => {
                    setFarmerInfo({ ...farmerInfo, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  placeholder={t.farmerInfo.namePlaceholder}
                  className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base bg-stone-50/60 focus:bg-white transition focus:outline-none focus:ring-2 focus:ring-emerald-700 ${
                    errors.name ? 'border-red-500 ring-1 ring-red-400' : 'border-stone-300'
                  }`}
                />
              </div>
              <VoiceInputButton
                onTranscript={(transcript) => {
                  setFarmerInfo({ ...farmerInfo, name: transcript });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                sampleFallbackText="Ramesh Patil"
              />
            </div>
            {errors.name && (
              <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Location Row: State & District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-1.5">
                {t.farmerInfo.state} <span className="text-red-500">*</span>
              </label>
              <select
                value={farmerInfo.state}
                onChange={(e) => setFarmerInfo({ ...farmerInfo, state: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm sm:text-base bg-stone-50/60 focus:bg-white transition focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                {POPULAR_STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-900 mb-1.5">
                {t.farmerInfo.district} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={farmerInfo.district}
                onChange={(e) => setFarmerInfo({ ...farmerInfo, district: e.target.value })}
                placeholder="e.g. Nagpur / Pune / Ludhiana"
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm sm:text-base bg-stone-50/60 focus:bg-white transition focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          {/* Village & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-1.5">
                {t.farmerInfo.village} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={farmerInfo.village}
                onChange={(e) => {
                  setFarmerInfo({ ...farmerInfo, village: e.target.value });
                  if (errors.village) setErrors({ ...errors, village: undefined });
                }}
                placeholder={t.farmerInfo.villagePlaceholder}
                className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base bg-stone-50/60 focus:bg-white transition focus:outline-none focus:ring-2 focus:ring-emerald-700 ${
                  errors.village ? 'border-red-500 ring-1 ring-red-400' : 'border-stone-300'
                }`}
              />
              {errors.village && (
                <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.village}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-900 mb-1.5">
                {t.farmerInfo.phone}{' '}
                <span className="text-stone-500 font-normal text-xs">{t.farmerInfo.phoneOptional}</span>
              </label>
              <input
                type="tel"
                value={farmerInfo.phone}
                maxLength={10}
                onChange={(e) => {
                  setFarmerInfo({ ...farmerInfo, phone: e.target.value.replace(/\D/g, '') });
                  if (errors.phone) setErrors({ ...errors, phone: undefined });
                }}
                placeholder="9876543210"
                className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base bg-stone-50/60 focus:bg-white transition focus:outline-none focus:ring-2 focus:ring-emerald-700 ${
                  errors.phone ? 'border-red-500 ring-1 ring-red-400' : 'border-stone-300'
                }`}
              />
              {errors.phone && (
                <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Preferred Language Radio */}
          <div>
            <label className="block text-sm font-bold text-stone-900 mb-2">
              {t.farmerInfo.preferredLang}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { code: 'hi', label: 'हिंदी (Hindi)' },
                { code: 'mr', label: 'मराठी (Marathi)' },
                { code: 'en', label: 'English' }
              ].map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setFarmerInfo({ ...farmerInfo, preferredLang: item.code })}
                  className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
                    farmerInfo.preferredLang === item.code
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Navigation Controls */}
        <StepNavigation
          onBack={() => navigate('/')}
          onNext={handleNext}
          onSaveDraft={() => alert('Draft saved safely in your browser storage!')}
        />
      </div>
    </div>
  );
};

import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAdvisoryWorkflow } from '../context/AdvisoryWorkflowContext';
import { FurrowStepper } from '../components/common/FurrowStepper';
import { StepNavigation } from '../components/common/StepNavigation';
import { Camera, Upload, Trash2, RefreshCw, AlertCircle, Sparkles, Check } from 'lucide-react';

const MAX_FILE_SIZE_MB = 10;

export const LeafUploadScreen: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { 
    leafImage, 
    setLeafImage, 
    leafFile, 
    setLeafFile, 
    analyzeLeaf, 
    isLoading 
  } = useAdvisoryWorkflow();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (JPG, PNG, or WebP).');
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setErrorMessage(`Image file exceeds ${MAX_FILE_SIZE_MB} MB limit.`);
      return;
    }

    setErrorMessage(null);
    setLeafFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setLeafImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setLeafImage(null);
    setLeafFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNext = async () => {
    if (leafFile) {
      await analyzeLeaf();
    }
    navigate('/advisory/disease-result');
  };

  const handleSkip = () => {
    setLeafImage(null);
    setLeafFile(null);
    navigate('/advisory/disease-result');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8 animate-fade-in">
      <FurrowStepper currentStepId={7} maxReachedId={7} />

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm mt-4">
        {/* Header */}
        <div className="border-b border-stone-200 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Camera className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1b4332]">
                {t.leafUpload.title}
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
                {t.leafUpload.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
          id="leaf-upload-input"
        />

        {/* Upload Zone / Preview Area */}
        {leafImage ? (
          <div className="space-y-4">
            <div className="p-4 sm:p-6 rounded-2xl border-2 border-emerald-600 bg-emerald-50/40 flex flex-col sm:flex-row items-center gap-6">
              <img
                src={leafImage}
                alt="Leaf Upload Preview"
                className="w-48 h-48 object-cover rounded-xl border-2 border-white shadow-md"
              />

              <div className="space-y-3 text-center sm:text-left flex-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  <Check className="w-3.5 h-3.5" /> Photo Loaded Successfully
                </div>
                <h4 className="font-bold text-stone-900 text-base">
                  {leafFile?.name || 'leaf_sample.jpg'}
                </h4>
                <p className="text-xs text-stone-500">
                  Size: {((leafFile?.size || 0) / 1024 / 1024).toFixed(2)} MB · Format: {leafFile?.type || 'image/jpeg'}
                </p>

                {/* Actions: Replace / Remove */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-stone-800 border border-stone-300 hover:bg-stone-50 transition shadow-2xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{t.leafUpload.changePhoto}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition shadow-2xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t.leafUpload.removePhoto}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-stone-300 hover:border-emerald-600 rounded-3xl p-8 sm:p-14 text-center cursor-pointer transition bg-stone-50/50 hover:bg-emerald-50/30 group"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition shadow-sm">
              <Upload className="w-8 h-8 stroke-[2.2]" />
            </div>

            <h3 className="font-heading font-bold text-lg text-stone-900 mb-1">
              {t.leafUpload.tapUpload}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto mb-4">
              Take a photo using mobile camera or browse phone gallery. Focus closely on leaf spots or discolored areas.
            </p>

            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-stone-200/80 text-stone-700">
              {t.leafUpload.supports}
            </span>
          </div>
        )}

        {errorMessage && (
          <p className="mt-3 text-xs font-bold text-red-600 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </p>
        )}

        {/* Skip Note */}
        {!leafImage && (
          <p className="mt-4 text-xs text-stone-500 text-center">
            {t.leafUpload.skipNote}
          </p>
        )}

        <StepNavigation
          onBack={() => navigate('/advisory/irrigation')}
          onNext={handleNext}
          onSkip={!leafImage ? handleSkip : undefined}
          skipLabel={t.leafUpload.skipStep}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

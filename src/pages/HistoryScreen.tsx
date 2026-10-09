import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAdvisoryWorkflow } from '../context/AdvisoryWorkflowContext';
import { History, Trash2, Eye, PlusCircle, Calendar, MapPin, AlertCircle, ArrowRight } from 'lucide-react';

export const HistoryScreen: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { historyList, deleteHistoryItem, resetWorkflow } = useAdvisoryWorkflow();

  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const confirmDelete = async () => {
    if (deleteTargetId) {
      await deleteHistoryItem(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  const handleStartNew = () => {
    resetWorkflow();
    navigate('/advisory/farmer-info');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <History className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1b4332]">
                {t.history.title}
              </h1>
              <p className="text-stone-600 text-xs sm:text-sm">
                {t.history.subtitle}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleStartNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-sm transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.nav.startNew}</span>
        </button>
      </div>

      {/* Confirmation Modal for Delete */}
      {deleteTargetId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-stone-200 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-center text-stone-900 mb-2">
              {t.history.deleteRecord}
            </h3>
            <p className="text-xs text-stone-600 text-center mb-6">
              {t.history.confirmDelete}
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTargetId(null)}
                className="px-4 py-2 rounded-xl text-stone-700 bg-stone-100 hover:bg-stone-200 font-semibold text-xs transition"
              >
                {t.nav.cancel}
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl text-white bg-red-600 hover:bg-red-700 font-bold text-xs transition shadow-sm"
              >
                {t.nav.confirm}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History List */}
      {historyList.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/90 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto text-3xl">
            🗂️
          </div>
          <h3 className="font-heading font-bold text-lg text-stone-800">
            {t.history.empty}
          </h3>
          <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto">
            Once you complete a crop advisory, records are persisted here on your device and the local database.
          </p>
          <button
            type="button"
            onClick={handleStartNew}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-900 transition shadow-sm"
          >
            <span>{t.welcome.btnStart}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider px-1">
            {t.history.totalRecords}: {historyList.length}
          </div>

          {historyList.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-emerald-300 transition shadow-2xs hover:shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-base text-stone-900">
                    {item.farmer_name || 'Farmer'}
                  </span>
                  <span className="text-xs text-stone-400">•</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    🌾 {item.crop_name}
                  </span>
                  {item.growth_stage && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                      {item.growth_stage}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(item.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                  {item.village && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.village}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/advisory/summary')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/80 transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t.history.viewDetails}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeleteTargetId(item.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 transition"
                  title="Delete Record"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.history.deleteRecord}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

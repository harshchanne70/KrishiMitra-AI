import React, { useState } from 'react';
import { REALTIME_ALERTS } from '../../data/mockData';
import { AlertTriangle, AlertCircle, Info, ChevronDown, ChevronUp, BellRing, ShieldAlert, CheckCircle } from 'lucide-react';

export const AdvisoryAlertsBanner: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);

  const currentAlert = REALTIME_ALERTS[activeAlertIndex];

  const severityConfigs = {
    critical: {
      border: 'border-red-300',
      bg: 'bg-gradient-to-r from-red-50/90 via-orange-50/60 to-red-50/90',
      badge: 'bg-red-700 text-white',
      badgeText: 'CRITICAL WARNING',
      icon: <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 animate-bounce" />,
      actionBg: 'bg-red-100 text-red-900 border-red-200'
    },
    warning: {
      border: 'border-amber-300',
      bg: 'bg-gradient-to-r from-amber-50/90 via-yellow-50/60 to-amber-50/90',
      badge: 'bg-amber-600 text-white',
      badgeText: 'AGROMET ALERT',
      icon: <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
      actionBg: 'bg-amber-100 text-amber-900 border-amber-200'
    },
    info: {
      border: 'border-emerald-300',
      bg: 'bg-gradient-to-r from-emerald-50/90 via-teal-50/60 to-emerald-50/90',
      badge: 'bg-emerald-700 text-white',
      badgeText: 'SEASON ADVISORY',
      icon: <Info className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
      actionBg: 'bg-emerald-100 text-emerald-900 border-emerald-200'
    }
  };

  const config = severityConfigs[currentAlert.severity];

  return (
    <div className={`rounded-2xl border shadow-sm transition-all duration-300 ${config.bg} ${config.border} p-4 sm:p-5 mb-6`}>
      <div className="flex items-start justify-between gap-3">
        
        {/* Left header */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{config.icon}</div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-full ${config.badge}`}>
                {config.badgeText}
              </span>
              <span className="text-xs font-semibold text-stone-500">
                {currentAlert.timestamp}
              </span>
              <div className="flex items-center gap-1 ml-2">
                {REALTIME_ALERTS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveAlertIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeAlertIndex === idx ? 'w-5 bg-stone-800' : 'bg-stone-300 hover:bg-stone-400'
                    }`}
                    aria-label={`View alert ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-stone-900 mt-1">
              {currentAlert.title}
            </h3>
          </div>
        </div>

        {/* Expand / Minimize button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-stone-500 hover:text-stone-800 p-1 rounded-lg bg-white/60 border border-stone-200 shadow-xs"
          aria-label={collapsed ? 'Expand advisory' : 'Collapse advisory'}
        >
          {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {/* Alert Content */}
      {!collapsed && (
        <div className="mt-3 pt-3 border-t border-stone-200/70 sm:pl-8 space-y-3 animate-fade-in">
          <p className="text-sm text-stone-700 leading-relaxed font-normal">
            {currentAlert.description}
          </p>

          {/* Action Callout */}
          <div className={`p-3 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 ${config.actionBg}`}>
            <div className="flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wide block sm:inline mr-2">
                  Immediate Action:
                </span>
                <span className="text-xs font-medium">{currentAlert.action}</span>
              </div>
            </div>
          </div>

          {/* Affected Crops Tags */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-semibold text-stone-600">Affected Crops:</span>
            {currentAlert.affectedCrops.map(crop => (
              <span
                key={crop}
                className="bg-white/80 border border-stone-200/90 text-stone-800 px-2 py-0.5 rounded-md font-medium text-[11px]"
              >
                {crop}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

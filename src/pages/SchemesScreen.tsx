import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api, SchemeItem } from '../services/api';
import { ShieldCheck, ExternalLink, Calendar, CheckCircle2, Building, Info } from 'lucide-react';

export const SchemesScreen: React.FC = () => {
  const { t, language } = useLanguage();
  const [schemes, setSchemes] = useState<SchemeItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await api.getSchemes();
        setSchemes(data);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10 animate-fade-in space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-amber-300 text-xs font-bold mb-2">
            <span>🏛️ Official Government Agriculture Schemes</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl">
            {t.nav.schemes} (शासकीय कृषी योजना)
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1">
            Direct Income Support, Crop Insurance (PMFBY), Soil Health Testing, and Institutional Credit programs for Indian farmers.
          </p>
        </div>
      </div>

      {/* Schemes Grid */}
      {isLoading ? (
        <div className="text-center py-12 text-stone-500">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-semibold">Retrieving verified government portals…</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schemes.map((item) => {
            const schemeTitle = language === 'hi' ? item.name_hi : language === 'mr' ? item.name_mr : item.name_en;
            const description = language === 'hi' ? item.brief_description_hi : language === 'mr' ? item.brief_description_mr : item.brief_description_en;

            return (
              <div
                key={item.id}
                className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-2xs hover:shadow-sm hover:border-emerald-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                      Verified Government Scheme
                    </span>
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Verified: {item.last_verified_date}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-stone-900 leading-snug mb-2">
                    {schemeTitle}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-3">
                    <Building className="w-3.5 h-3.5 shrink-0 text-stone-400" />
                    <span>{item.ministry}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
                    {description}
                  </p>

                  {/* Highlights Box */}
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2 mb-4">
                    <div>
                      <strong className="text-emerald-900 block font-bold mb-0.5">
                        Key Financial Benefits:
                      </strong>
                      <span className="text-stone-700">{item.key_benefits}</span>
                    </div>

                    <div className="pt-2 border-t border-stone-200">
                      <strong className="text-stone-900 block font-bold mb-0.5">
                        Eligibility Criteria:
                      </strong>
                      <span className="text-stone-600">{item.eligibility_criteria}</span>
                    </div>
                  </div>
                </div>

                {/* External Portal Link */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400">Target: {item.target_beneficiaries}</span>
                  <a
                    href={item.official_portal_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white transition shadow-2xs shrink-0"
                  >
                    <span>Visit Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Official Government Disclaimer */}
      <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Official Link Disclaimer:</strong> All links above direct to official .gov.in and state agriculture portals. KrishiMitra AI does not collect application processing fees or intermediate DBT payments.
        </p>
      </div>

    </div>
  );
};

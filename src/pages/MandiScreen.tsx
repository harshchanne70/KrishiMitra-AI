import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api, MandiPriceItem } from '../services/api';
import { TrendingUp, Search, MapPin, Calendar, Info, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export const MandiScreen: React.FC = () => {
  const { t, language } = useLanguage();
  const [prices, setPrices] = useState<MandiPriceItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadPrices();
  }, [searchTerm, selectedState]);

  const loadPrices = async () => {
    setIsLoading(true);
    try {
      const data = await api.getMandiPrices(searchTerm, selectedState);
      setPrices(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10 animate-fade-in space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-amber-300 text-xs font-bold mb-2">
            <span>📈 AGMARKNET Mandi Price Index</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl">
            {t.nav.mandi} (APMC Market Prices)
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1">
            Daily modal prices, minimum/maximum trading range, and market yard locations across major Indian agricultural mandis.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search crop (e.g. Soybean, Cotton, Wheat, Chana)…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-stone-50/50"
          />
        </div>

        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full sm:w-56 px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-stone-50/50"
        >
          <option value="">All States (सभी राज्य)</option>
          <option value="Maharashtra">Maharashtra (महाराष्ट्र)</option>
          <option value="Madhya Pradesh">Madhya Pradesh (मध्य प्रदेश)</option>
        </select>
      </div>

      {/* Prices Table / Card Grid */}
      {isLoading ? (
        <div className="text-center py-12 text-stone-500">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-semibold">Updating APMC Mandi price streams…</p>
        </div>
      ) : prices.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-stone-200 shadow-sm text-stone-500">
          <p className="font-bold text-base">No commodity records matched your filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prices.map((item) => {
            const cropTitle = language === 'hi' ? item.commodity_hi : language === 'mr' ? item.commodity_mr : item.commodity;

            return (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-xs hover:border-emerald-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                      {cropTitle}
                    </span>
                    <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.price_date}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-stone-900 leading-tight">
                    {item.variety}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-1 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{item.market_name}, {item.district} ({item.state})</span>
                  </div>

                  {/* Modal Price Box */}
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 mb-3">
                    <span className="block text-[11px] font-bold text-stone-500 uppercase">
                      Modal Wholesale Price (मोडल भाव)
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-heading font-extrabold text-2xl text-[#1b4332]">
                        ₹{item.modal_price.toLocaleString()}
                      </span>
                      <span className="text-xs text-stone-500 font-semibold">/ Quintal</span>

                      {item.trend === 'up' && (
                        <span className="ml-auto inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <ArrowUpRight className="w-3.5 h-3.5" /> High Demand
                        </span>
                      )}
                      {item.trend === 'down' && (
                        <span className="ml-auto inline-flex items-center text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                          <ArrowDownRight className="w-3.5 h-3.5" /> Easing
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between text-[11px] text-stone-600 border-t border-stone-200 mt-2 pt-1.5">
                      <span>Min: ₹{item.min_price}</span>
                      <span>Max: ₹{item.max_price}</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-stone-500 flex items-center justify-between border-t border-stone-100 pt-2">
                  <span>Source: {item.source}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Agmarknet Citation Box */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-stone-700 text-xs flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Official Source Notice:</strong> Prices standardized under AGMARKNET (Directorate of Marketing & Inspection, Ministry of Agriculture & Farmers Welfare, GoI). Prices refer to fair average quality (FAQ) standard quintals (100 kg).
        </p>
      </div>

    </div>
  );
};

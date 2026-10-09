import React, { useState } from 'react';
import { MANDI_PRICES_DATA } from '../../data/mockData';
import { MandiPriceItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Bell, 
  CheckCircle2, 
  Building2, 
  Sparkles,
  Layers,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export const MandiPriceTracker: React.FC = () => {
  const { addToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [trendFilter, setTrendFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'priceDesc' | 'priceAsc' | 'arrivalDesc' | 'name'>('priceDesc');
  const [alertSubscribed, setAlertSubscribed] = useState<Record<string, boolean>>({});

  const states = ['All', 'Punjab', 'Haryana', 'Maharashtra', 'Madhya Pradesh', 'Gujarat', 'Karnataka', 'Andhra Pradesh', 'Rajasthan', 'Uttar Pradesh'];

  const toggleAlert = (itemId: string, commodity: string) => {
    setAlertSubscribed(prev => {
      const nextState = !prev[itemId];
      addToast({
        type: nextState ? 'success' : 'info',
        title: nextState ? 'SMS / WhatsApp Alert Activated' : 'Alert Deactivated',
        message: nextState 
          ? `You will receive daily 8 AM APMC rate updates for ${commodity}.`
          : `Unsubscribed from price alerts for ${commodity}.`
      });
      return { ...prev, [itemId]: nextState };
    });
  };

  // Sparkline SVG generator
  const renderSparkline = (points: number[], trend: 'up' | 'down' | 'stable') => {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 80;
    const height = 24;

    const coordinates = points.map((p, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    }).join(' ');

    const strokeColor = trend === 'up' ? '#16a34a' : trend === 'down' ? '#dc2626' : '#64748b';

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={coordinates}
        />
      </svg>
    );
  };

  // Filtering & Sorting
  const filteredItems = MANDI_PRICES_DATA.filter(item => {
    const matchesSearch = 
      item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.state.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesState = selectedState === 'All' || item.state === selectedState;
    const matchesTrend = 
      trendFilter === 'All' ||
      (trendFilter === 'up' && item.trend === 'up') ||
      (trendFilter === 'down' && item.trend === 'down') ||
      (trendFilter === 'aboveMSP' && item.msp > 0 && item.modalPrice > item.msp);

    return matchesSearch && matchesState && matchesTrend;
  }).sort((a, b) => {
    if (sortBy === 'priceDesc') return b.modalPrice - a.modalPrice;
    if (sortBy === 'priceAsc') return a.modalPrice - b.modalPrice;
    if (sortBy === 'arrivalDesc') return b.arrivalTons - a.arrivalTons;
    return a.commodity.localeCompare(b.commodity);
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <Sparkles className="w-4 h-4" />
              <span>Real-Time Agmarknet & APMC Gateway</span>
            </div>
            <h2 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
              Live Mandi Commodity Price Tracker
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              Track real-time modal prices, 7-day volatility trends, daily market arrivals, and statutory MSP comparisons across agricultural terminal markets.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Live APMC Feed Active (Updated Today)</span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-6 pt-5 border-t border-stone-100 grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search commodity or market..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>

          {/* State Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              aria-label="Filter by State"
            >
              {states.map(s => (
                <option key={s} value={s}>{s === 'All' ? 'All Indian States' : s}</option>
              ))}
            </select>
          </div>

          {/* Trend Filter */}
          <div className="md:col-span-3">
            <select
              value={trendFilter}
              onChange={(e) => setTrendFilter(e.target.value)}
              className="w-full py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              aria-label="Filter by Trend"
            >
              <option value="All">All Trends</option>
              <option value="up">Price Gaining (Bullish)</option>
              <option value="down">Price Softening (Bearish)</option>
              <option value="aboveMSP">Trading Above Gov. MSP</option>
            </select>
          </div>

          {/* Sorting */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              aria-label="Sort By"
            >
              <option value="priceDesc">Price: High to Low</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="arrivalDesc">Arrival Volume</option>
              <option value="name">Commodity Name</option>
            </select>
          </div>

        </div>
      </div>

      {/* Main Mandi Price Table */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 uppercase font-bold text-[11px] border-b border-stone-200">
              <tr>
                <th className="py-3.5 px-4">Commodity & Variety</th>
                <th className="py-3.5 px-4">APMC Market / State</th>
                <th className="py-3.5 px-4">Modal Price (₹ / Qtl)</th>
                <th className="py-3.5 px-4">Min - Max Range</th>
                <th className="py-3.5 px-4">7-Day Trend</th>
                <th className="py-3.5 px-4">Gov. MSP</th>
                <th className="py-3.5 px-4">Arrivals</th>
                <th className="py-3.5 px-4 text-center">Alert</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredItems.map(item => {
                const isSubscribed = alertSubscribed[item.id];
                const isAboveMsp = item.msp > 0 && item.modalPrice > item.msp;

                return (
                  <tr key={item.id} className="hover:bg-stone-50/70 transition">
                    
                    {/* Commodity */}
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-stone-900 block text-sm">
                          {item.commodity}
                        </span>
                        <span className="text-[11px] text-stone-500 font-medium">
                          {item.variety}
                        </span>
                      </div>
                    </td>

                    {/* Mandi & State */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-stone-800 block">{item.market}</span>
                          <span className="text-[10px] text-stone-500">{item.state}</span>
                        </div>
                      </div>
                    </td>

                    {/* Modal Price */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-black text-stone-900">
                          ₹{item.modalPrice.toLocaleString()}
                        </span>
                        <span className={`text-[11px] font-bold flex items-center ${
                          item.trend === 'up' ? 'text-emerald-700' : item.trend === 'down' ? 'text-rose-700' : 'text-stone-500'
                        }`}>
                          {item.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                          {item.trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
                          {item.changePercent > 0 ? `+${item.changePercent}%` : `${item.changePercent}%`}
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-400 block">{item.updatedDate}</span>
                    </td>

                    {/* Min - Max Range */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-stone-600">
                      ₹{item.minPrice} - ₹{item.maxPrice}
                    </td>

                    {/* 7-Day Trend Sparkline */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {renderSparkline(item.sevenDayHistory, item.trend)}
                      </div>
                    </td>

                    {/* Gov. MSP Status */}
                    <td className="py-3.5 px-4">
                      {item.msp > 0 ? (
                        <div>
                          <span className="font-mono text-stone-700 font-bold block">₹{item.msp}</span>
                          {isAboveMsp ? (
                            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                              +₹{item.modalPrice - item.msp} above MSP
                            </span>
                          ) : (
                            <span className="text-[10px] text-rose-700 font-bold bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                              Below MSP
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-stone-400 italic text-[11px]">No MSP</span>
                      )}
                    </td>

                    {/* Arrivals */}
                    <td className="py-3.5 px-4 font-mono font-medium text-stone-700">
                      {item.arrivalTons} MT
                    </td>

                    {/* Alert Subscribe */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => toggleAlert(item.id, item.commodity)}
                        className={`p-2 rounded-xl border transition ${
                          isSubscribed 
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-800' 
                            : 'bg-stone-50 border-stone-200 text-stone-400 hover:text-stone-700'
                        }`}
                        title={isSubscribed ? 'Subscribed to daily SMS alerts' : 'Set daily price SMS alert'}
                      >
                        <Bell className={`w-3.5 h-3.5 ${isSubscribed ? 'fill-emerald-700' : ''}`} />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="p-8 text-center text-xs text-stone-500">
            No mandi prices match your current search criteria.
          </div>
        )}
      </div>

      {/* APMC Advisory Footnote */}
      <div className="p-4 bg-stone-100/80 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span>
            Prices are published daily by regulated Agricultural Produce Market Committees (APMCs) under Ministry of Agriculture guidelines.
          </span>
        </div>
        <span className="font-semibold text-stone-700">1 Quintal = 100 kg</span>
      </div>

    </div>
  );
};

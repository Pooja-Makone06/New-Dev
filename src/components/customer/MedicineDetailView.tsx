import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  ShoppingCart, 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  Clock, 
  Star, 
  Info, 
  FileCheck, 
  ChevronRight,
  Share2,
  Heart,
  TrendingDown,
  ArrowRight,
  FileText
} from 'lucide-react';
import { ASSETS } from '../../data/mockData';

interface MedicineDetailViewProps {
  onBack: () => void;
  onAddToCart: () => void;
}

export const MedicineDetailView: React.FC<MedicineDetailViewProps> = ({ onBack, onAddToCart }) => {
  const [selectedPack, setSelectedPack] = useState<'10' | '20' | '30'>('10');
  const [isSaved, setIsSaved] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Medicine details for Atorvastatin 10mg
  const innovatorPrice = 142.50; // Lipitor 10mg
  const genericPrice = selectedPack === '10' ? 12.80 : selectedPack === '20' ? 24.50 : 35.00;
  const savingsAmount = (innovatorPrice * (parseInt(selectedPack) / 10)) - genericPrice;
  const savingsPercent = Math.round((savingsAmount / (innovatorPrice * (parseInt(selectedPack) / 10))) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 text-slate-100 font-sans">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white shadow-xl text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Search</span>
          </button>
          <div>
            <span className="text-xs font-mono text-sky-400">CDSCO MONOGRAPH · FORMULATION SPECIFICATION</span>
            <h1 className="text-xl font-bold text-white font-display-heading">
              Atorvastatin Tablets IP 10mg
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              setIsSaved(!isSaved);
              showToast(!isSaved ? 'Added to Saved Medicines' : 'Removed from Saved Medicines');
            }}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
          <button 
            onClick={() => showToast('Medicine link copied to clipboard!')}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* 2-Column Responsive Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Product Hero & Lab Assay */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Hero Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 text-xs font-mono font-semibold border border-sky-500/20">
                CDSCO APPROVED · SCHEDULE H PRESCRIPTION
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
                99.4% BIOEQUIVALENT ASSAYED
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white font-display-heading">
                Atorvastatin Calcium Tablets IP 10mg
              </h2>
              <p className="text-sm text-slate-400 font-mono mt-1">
                Generic equivalent of <span className="text-rose-400 font-semibold line-through">Lipitor 10mg (Pfizer)</span>
              </p>
            </div>

            {/* Pricing Comparison Bar */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 font-mono block uppercase">JAN AUSHADHI SUBSIDIZED PRICE</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-bold text-emerald-400 font-mono">₹{genericPrice.toFixed(2)}</span>
                  <span className="text-sm text-slate-500 line-through">
                    Innovator MRP: ₹{(innovatorPrice * (parseInt(selectedPack) / 10)).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="sm:text-right">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs inline-block">
                  YOU SAVE {savingsPercent}%
                </span>
                <p className="text-xs text-slate-300 font-mono mt-1">
                  Total Consumer Savings: ₹{savingsAmount.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Pack Size Selector */}
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-2 font-bold uppercase">
                Select Strip Size / Pack
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setSelectedPack('10')}
                  className={`py-3 px-4 rounded-xl text-xs font-mono text-center border transition-all ${
                    selectedPack === '10'
                      ? 'bg-sky-950/60 border-sky-500 text-sky-300 font-bold ring-1 ring-sky-500'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-sm block">10 Tablets</span>
                  <span className="text-xs text-emerald-400 mt-0.5 block">₹12.80</span>
                </button>

                <button
                  onClick={() => setSelectedPack('20')}
                  className={`py-3 px-4 rounded-xl text-xs font-mono text-center border transition-all ${
                    selectedPack === '20'
                      ? 'bg-sky-950/60 border-sky-500 text-sky-300 font-bold ring-1 ring-sky-500'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-sm block">20 Tablets</span>
                  <span className="text-xs text-emerald-400 mt-0.5 block">₹24.50</span>
                </button>

                <button
                  onClick={() => setSelectedPack('30')}
                  className={`py-3 px-4 rounded-xl text-xs font-mono text-center border transition-all ${
                    selectedPack === '30'
                      ? 'bg-sky-950/60 border-sky-500 text-sky-300 font-bold ring-1 ring-sky-500'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-sm block">30 Tablets</span>
                  <span className="text-xs text-emerald-400 mt-0.5 block">₹35.00 (Best Value)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Molecule & Clinical Bioequivalence Details */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <div className="flex items-center gap-2 text-sky-400 font-mono">
              <FileCheck className="w-5 h-5" />
              <span className="font-bold text-sm uppercase">Clinical Bioequivalence & Pharmacokinetics</span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Atorvastatin is an HMG-CoA reductase inhibitor used to lower blood LDL-cholesterol and triglycerides. The Jan Aushadhi generic formulation contains the exact therapeutic salt molecule with matched in-vivo dissolution rates and bioavailability conforming to Indian Pharmacopoeia (IP) standards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-2">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block uppercase">MANUFACTURER</span>
                <span className="text-slate-200 font-semibold mt-1 block">BPPI Govt PSU Labs</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block uppercase">CDL LAB ASSAY</span>
                <span className="text-emerald-400 font-semibold mt-1 block">99.8% Bioequivalence Passed</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block uppercase">BATCH NUMBER</span>
                <span className="text-sky-400 font-semibold mt-1 block">PMBI-2401 (Exp: 11/2026)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Pharmacy Availability & Order Web Form CTA */}
        <div className="space-y-6">
          {/* Multi-Pharmacy Price Ladder */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 font-mono uppercase">
                Available at 3 Partner Kendra Pharmacies
              </span>
              <span className="text-[10px] font-mono text-emerald-400">FEFO VERIFIED</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Jan Aushadhi Seva Kendra #0482</p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mt-0.5">
                    <span>1.2 km away</span>
                    <span>·</span>
                    <span className="text-emerald-400 font-semibold">Delivery in 24 mins</span>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className="text-base font-bold text-emerald-400">₹{genericPrice.toFixed(2)}</span>
                  <span className="block text-[10px] text-emerald-300 font-semibold">Lowest Price</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-300">Arogya Medico Care #112</p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono mt-0.5">
                    <span>2.8 km away</span>
                    <span>·</span>
                    <span>Delivery in 45 mins</span>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className="text-sm font-semibold text-slate-300">₹14.20</span>
                </div>
              </div>
            </div>

            {/* Prescription Warning */}
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Schedule H Prescription Required</strong>
                <span className="text-amber-300/80 text-[11px]">
                  Under Drugs & Cosmetics Act Rule 65(11A), your prescription will be validated by a registered pharmacist before dispatch.
                </span>
              </div>
            </div>

            {/* Add to Prescription Cart CTA Button */}
            <button
              onClick={() => {
                onAddToCart();
                showToast('Added Atorvastatin 10mg to Prescription Web Form!');
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Proceed to Order Web Form (₹{genericPrice.toFixed(2)})</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

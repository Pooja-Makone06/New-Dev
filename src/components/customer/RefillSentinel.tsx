import React, { useState } from 'react';
import { 
  Repeat, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  Heart, 
  TrendingUp, 
  ExternalLink,
  Sparkles,
  Truck
} from 'lucide-react';
import { ASSETS } from '../../data/mockData';

interface RefillSentinelProps {
  onNavigateToTracking: () => void;
}

export const RefillSentinel: React.FC<RefillSentinelProps> = ({ onNavigateToTracking }) => {
  const [autoRefillActive, setAutoRefillActive] = useState<boolean>(true);
  const [refillOrdered, setRefillOrdered] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleExpressRefill = () => {
    setRefillOrdered(true);
    showToast('Express Refill Order placed! Routed to Kendra #0482.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 text-slate-100 font-sans">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white shadow-xl text-sm font-medium animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold mb-1">
            <span>ABHA: 91-8402-9912-40</span>
            <span>·</span>
            <span>CHRONIC THERAPY CARE SENTINEL</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display-heading">
            Medicine Review & Refill Sentinel
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Adherence metrics, predictive refill timing, and duty pharmacist consultation under Rule 65(11A).
          </p>
        </div>

        <button
          onClick={onNavigateToTracking}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-mono border border-slate-700 transition-all self-start md:self-auto"
        >
          <Truck className="w-4 h-4" />
          <span>Track Active Delivery (#892401)</span>
        </button>
      </div>

      {/* 2-Column Responsive Web Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Adherence & Medication Regimen */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Chronic Care Adherence Scorecard */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
                CHRONIC CARE ADHERENCE PULSE
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
                OPTIMAL
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 font-mono">ADHERENCE RATE</span>
                <p className="text-3xl font-bold font-display-heading text-emerald-400 mt-1">96%</p>
                <p className="text-xs text-slate-500 mt-1">Zero missed doses this month</p>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 font-mono">STOCK COVERAGE</span>
                <p className="text-3xl font-bold font-display-heading text-sky-400 mt-1">12 Days</p>
                <p className="text-xs text-slate-500 mt-1">Medication pills left</p>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 font-mono">ANNUAL SAVING</span>
                <p className="text-3xl font-bold font-display-heading text-emerald-400 mt-1">₹8,416</p>
                <p className="text-xs text-slate-500 mt-1">via PMBI Kendra Subsidies</p>
              </div>
            </div>
          </div>

          {/* 1-Tap Express Refill Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/50 via-slate-900 to-slate-900 border border-sky-500/40 space-y-4 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-sky-400 uppercase tracking-wider font-semibold">
                  CHRONIC 30-DAY REFILL WINDOW
                </span>
                <h2 className="text-lg font-bold text-white mt-1">
                  Next Scheduled Refill in 5 Days
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pre-configured at Jan Aushadhi Kendra #0482 using your registered active prescription (#RX-89241).
                </p>
              </div>
              <span className="font-mono text-xl font-bold text-emerald-400">₹109.00</span>
            </div>

            {!refillOrdered ? (
              <button
                onClick={handleExpressRefill}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Repeat className="w-4 h-4" />
                <span>1-Tap Express Refill Order Now (₹109.00)</span>
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs text-center font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Refill Dispatched · Arriving Tomorrow 10:00 AM IST</span>
              </div>
            )}
          </div>

          {/* Current Dispensed Formulations Review */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
                Active Regimen & Salt Monograph
              </h3>
              <span className="text-xs text-sky-400 font-mono">CHRONIC THERAPY</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <img 
                  src={ASSETS.blisterPack} 
                  alt="Atorvastatin Pack" 
                  className="w-20 h-20 rounded-xl object-cover border border-slate-700 shrink-0"
                />
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    BIOEQUIVALENCE CONFIRMED
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    Generic Atorvastatin + Ezetimibe Tablets IP (10/10mg)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Daily dose: 1 Tablet at Night after food · Prescribed by Dr. Aris Thorne (MD, Cardiology)
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Government Procurement:</span>
                  <span className="font-mono text-slate-200">PMBI Janaushadhi Kendra #0482</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Laboratory Assay:</span>
                  <span className="font-mono text-emerald-400">99.8% Passed (CDL Kolkata Form 13)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Adverse Interaction Screen:</span>
                  <span className="font-mono text-emerald-400">Zero Clinical Flags Detected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Automation & Assigned Duty Pharmacist */}
        <div className="space-y-6">
          {/* Refill Automation Settings */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
              Refill Rhythm Sentinel Settings
            </h3>

            <div className="flex items-center justify-between py-1 text-xs">
              <div>
                <p className="font-semibold text-white">Auto-Refill Dispatch Guard</p>
                <p className="text-xs text-slate-400 mt-0.5">Automatically prepare delivery 5 days before stock depletion</p>
              </div>
              <button
                onClick={() => {
                  setAutoRefillActive(!autoRefillActive);
                  showToast(autoRefillActive ? 'Auto-refill paused' : 'Auto-refill active');
                }}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                  autoRefillActive ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  autoRefillActive ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

          {/* Assigned Duty Pharmacist Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-sky-400 uppercase font-semibold">ASSIGNED CLINICAL PHARMACIST</span>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">● ONLINE</span>
            </div>

            <div className="flex items-center gap-3">
              <img 
                src={ASSETS.pharmacistPriya} 
                alt="Priya Sharma" 
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-400/50"
              />
              <div>
                <h4 className="text-sm font-bold text-white">Priya Sharma, M.Pharm</h4>
                <p className="text-xs text-slate-400">Pharmacist Reg #DL-39012</p>
                <p className="text-xs text-emerald-400 mt-0.5">Jan Aushadhi Kendra #0482</p>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => showToast('Connecting to Pharmacist Priya Sharma via secure audio call...')}
                className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span>Call Pharmacist (+91 98102 39012)</span>
              </button>

              <button
                onClick={() => showToast('Opening clinical chat with Kendra duty pharmacist...')}
                className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Ask Medication Query</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

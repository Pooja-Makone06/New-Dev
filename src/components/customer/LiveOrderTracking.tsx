import React, { useState } from 'react';
import { 
  Truck, 
  Thermometer, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  Clock, 
  FileText, 
  MapPin, 
  Package, 
  Lock, 
  Download,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { ASSETS } from '../../data/mockData';

interface LiveOrderTrackingProps {
  onNavigateToRefill: () => void;
}

export const LiveOrderTracking: React.FC<LiveOrderTrackingProps> = ({ onNavigateToRefill }) => {
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
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
          <div className="flex items-center gap-2 text-sky-400 text-xs font-mono font-semibold mb-1">
            <span>ORDER #GM-892401-DL</span>
            <span>·</span>
            <span>PRESCRIPTION APPROVED</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display-heading">
            Live Order Tracking & Cold-Chain Telemetry
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Real-time GPS dispatch route, IoT sealed pouch temperature telemetry, and chain-of-custody audit.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs">
            <span className="text-[10px] text-slate-400 block uppercase">Estimated Arrival</span>
            <span className="text-base font-bold">14:48 IST (24 mins)</span>
          </div>
          <button
            onClick={onNavigateToRefill}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <span>Refill Sentinel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2-Column Responsive Web Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Live Status & Transit Data */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Big ETA Callout Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/30 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 font-mono text-xs font-semibold border border-sky-500/30 inline-block">
                OUT FOR DELIVERY · BIOMETRICALLY SEALED
              </span>
              <span className="text-xs font-mono text-emerald-400 animate-pulse">● LIVE GPS ACTIVE</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pt-2">
              <div>
                <h2 className="text-3xl font-extrabold font-display-heading text-white">
                  Arriving in 24 minutes
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Dispatched from PM Bhartiya Janaushadhi Kendra #0482 (Safdarjung Enclave, New Delhi)
                </p>
              </div>

              <button
                onClick={() => setShowOtp(!showOtp)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono flex items-center gap-2 self-start sm:self-auto"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>{showOtp ? 'Delivery OTP: 4092' : 'Show Delivery OTP'}</span>
              </button>
            </div>
          </div>

          {/* Transit Temperature & Cold Pouch Sentinel */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white font-mono">
                  Transit Temperature Guard (#IOT-DL-8924)
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                SAFE STORAGE BAND
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-slate-400 text-[11px]">Current Pouch Temp</p>
                <p className="text-2xl font-bold font-mono text-emerald-400 mt-0.5">18.4°C</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-slate-400 text-[11px]">Permissible Safe Band</p>
                <p className="text-base font-bold font-mono text-white mt-1">15.0°C - 25.0°C</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-slate-400 text-[11px]">Tamper Hologram Seal</p>
                <p className="text-xs font-mono text-slate-200 mt-1 font-bold">#SEAL-90821-DEL</p>
              </div>
            </div>
          </div>

          {/* Delivery Partner Profile Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-4">
              <img 
                src={ASSETS.riderVikram} 
                alt="Vikram Singh" 
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-sky-500/40"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">Vikram Singh</h3>
                  <span className="text-xs px-2 py-0.5 bg-slate-800 text-amber-400 rounded-md font-mono">★ 4.9</span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Partner ID: DL-RID-4089 · Insulated Carrier Pouch</p>
                <p className="text-xs text-emerald-400 mt-0.5">✓ Biometrically Verified & Cold-Chain Trained</p>
              </div>
            </div>

            <button
              onClick={() => showToast('Calling delivery partner Vikram Singh at +91 98710 49182...')}
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold font-mono shadow transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Delivery Partner</span>
            </button>
          </div>

          {/* Prescribed Items in Order */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
              Dispatched Medications (2 Formulations)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-sky-400">BATCH: PMBI-2401 · EXP: 11/2026</span>
                <p className="text-xs font-bold text-white">Generic Atorvastatin + Ezetimibe 10/10mg</p>
                <p className="text-[11px] text-slate-400">1 Strip (10 Tabs) · Kendra Price: ₹24.00</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-sky-400">BATCH: MET-9921 · EXP: 08/2026</span>
                <p className="text-xs font-bold text-white">Generic Metformin HCl PR 500mg</p>
                <p className="text-[11px] text-slate-400">2 Strips (20 Tabs) · Kendra Price: ₹36.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Chain of Custody & Statutory Audit Timeline */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl text-xs">
            <h3 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
              Chain of Custody & Statutory Audit
            </h3>

            <div className="space-y-4 font-sans">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="w-0.5 h-10 bg-slate-800 my-1"></div>
                </div>
                <div>
                  <p className="font-bold text-white">13:42 IST · Rx Digitally Signed</p>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Verified by Pharmacist Priya Sharma (Reg #DL-39012) under Rule 65(11A).
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="w-0.5 h-10 bg-slate-800 my-1"></div>
                </div>
                <div>
                  <p className="font-bold text-white">14:05 IST · Batch Optical Scanned</p>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    GS1 DataMatrix barcode scanned and FEFO verified against CDSCO master.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center animate-pulse">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <div className="w-0.5 h-10 bg-slate-800 my-1"></div>
                </div>
                <div>
                  <p className="font-bold text-sky-400">14:18 IST · Dispatched with Rider</p>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Insulated thermal carrier locked with biometric seal #SEAL-90821-DEL.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-slate-500">14:48 IST · Doorstep Delivery & OTP</p>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Handover requires 4-digit OTP verification upon temperature check.
                  </p>
                </div>
              </div>
            </div>

            {/* Invoices & Compliance Downloads */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <button
                onClick={() => showToast('Downloading Tax Invoice (GST Form)...')}
                className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-mono border border-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-sky-400" />
                <span>Download Tax Invoice (GST Form)</span>
              </button>

              <button
                onClick={() => showToast('Downloading CDL Form 13 Bioequivalence Certificate...')}
                className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-mono border border-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>CDL Kolkata Form 13 Report</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

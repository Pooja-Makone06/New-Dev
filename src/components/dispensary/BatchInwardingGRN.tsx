import React, { useState } from 'react';
import { 
  PackageCheck, 
  Scan, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  Thermometer, 
  FileText, 
  Printer, 
  ArrowRight, 
  Barcode, 
  Boxes, 
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const BatchInwardingGRN: React.FC = () => {
  const [activeScan, setActiveScan] = useState(true);
  const [grnCommitted, setGrnCommitted] = useState(false);
  const [labelPrinted, setLabelPrinted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handlePrintLabel = () => {
    setLabelPrinted(true);
    showToast('Putaway Label Printed (Aisle A · Shelf 04 · Bin R2)');
  };

  const handleCommitGRN = () => {
    setGrnCommitted(true);
    showToast('GRN #GRN-DEL-0482-9931 committed to National Inventory Ledger');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16 font-sans">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white shadow-xl text-sm font-medium animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-5">
        
        {/* GRN Top Consignment Banner */}
        <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-1">
                <span>CENTRAL PROCUREMENT DISPATCH</span>
                <span>/</span>
                <span>KENDRA INWARDING DOCKET</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl sm:text-2xl font-bold text-white font-display-heading">
                  Draft GRN #GRN-DEL-0482-9931
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono border border-amber-500/20">
                  INSPECTION IN PROGRESS (66.7%)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Consignment from PMBI Central Logistics Hub (Gurugram) · Carrier: BlueDart HealthSafe #BD-88401
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px]">CONSIGNMENT VALUE</span>
                <p className="text-base font-bold text-white">₹1,42,850.00</p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px]">COLD-CHAIN BOX A-12</span>
                <p className="text-base font-bold text-emerald-400 flex items-center gap-1">
                  <Thermometer className="w-4 h-4" />
                  <span>4.4°C</span>
                </p>
              </div>
            </div>
          </div>

          {/* Variance / Shortage Notice */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Physical Shortage Flagged:</strong> 2 strips missing in Cefixime 200 DT Shipper Box. Automated Debit Note 
                <span className="font-mono font-bold text-white"> #DN-0482-019 (₹76.00)</span> queued for PMBI central reconciliation.
              </span>
            </div>
            <span className="font-mono text-amber-400 text-[11px] shrink-0 hidden sm:inline">Sec 32 Rulebook</span>
          </div>
        </div>

        {/* 2-Column Grid: Optical Scanner & Dossier / Inward Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left Column: Optical Station & Live Barcode Stream (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-sky-400" />
                  <h2 className="text-sm font-bold text-white font-display-heading">
                    GS1-128 & 2D DataMatrix OCR Optical Station
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>CAM FEED ACTIVE (60 FPS)</span>
                </div>
              </div>

              {/* Viewfinder simulation */}
              <div className="relative aspect-video rounded-xl bg-slate-950 border-2 border-slate-800 overflow-hidden flex flex-col items-center justify-center p-4">
                {/* Laser scan line animation */}
                <div className="absolute inset-x-0 h-0.5 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] animate-bounce" style={{ animationDuration: '2.5s' }} />

                {/* Target box */}
                <div className="w-56 h-36 border-2 border-dashed border-sky-400/70 rounded-lg flex flex-col justify-between p-2 relative bg-sky-950/20">
                  <div className="flex justify-between text-[10px] text-sky-400 font-mono">
                    <span>LOCK: 99.4%</span>
                    <span>2D-DATAMATRIX</span>
                  </div>

                  <div className="text-center">
                    <Barcode className="w-12 h-12 text-slate-300 mx-auto opacity-70" />
                    <span className="text-[10px] font-mono text-emerald-300 font-bold bg-slate-950/80 px-2 py-0.5 rounded">
                      (01) 08901234567890 (17) 261130
                    </span>
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>PMBI-2401</span>
                    <span>SN-94820148</span>
                  </div>
                </div>

                <div className="absolute bottom-2 left-3 text-[10px] text-slate-500 font-mono">
                  Optical Engine: GS1 Healthcare Monograph · ISO/IEC 15415 Verified
                </div>
              </div>

              {/* Scanned Breakdown Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      IDENTIFIED FORMULATION
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1">
                      Atorvastatin Calcium + Ezetimibe Tablets IP (10mg + 10mg)
                    </h3>
                    <p className="text-[11px] text-slate-400">Jan Aushadhi Central Procurement · Strips of 10</p>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-slate-400 text-[10px]">DPCO STATUS</span>
                    <p className="text-emerald-400 font-bold">₹24.00 (Capped)</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                  <div>
                    <span className="text-slate-500">BATCH ID</span>
                    <p className="font-bold text-sky-400">PMBI-2401</p>
                  </div>
                  <div>
                    <span className="text-slate-500">EXPIRY</span>
                    <p className="font-bold text-slate-200">30-NOV-2026</p>
                  </div>
                  <div>
                    <span className="text-slate-500">QTY IN SHIPPER</span>
                    <p className="font-bold text-slate-200">480 Strips</p>
                  </div>
                  <div>
                    <span className="text-slate-500">SERIAL NO.</span>
                    <p className="font-bold text-slate-400">SN-94820148</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-slate-300 font-mono text-[11px]">
                    <Layers className="w-3.5 h-3.5 text-sky-400" />
                    <span>Putaway Bin: <strong className="text-white">Aisle A · Shelf 04 · Bin R2</strong></span>
                  </div>

                  <button
                    onClick={handlePrintLabel}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-sky-400" />
                    <span>{labelPrinted ? 'Label Printed OK' : 'Print Putaway Barcode'}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Inward Ledger & Transit Logger (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Transit Data Logger Card */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                    Cold-Chain Transit Data Logger (#TL-9812-BD)
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">ZERO TEMPERATURE EXCURSION</span>
              </div>

              {/* Temperature Curve Visualization */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Transit Duration: 6h 40m</span>
                  <span>Mean Kinetic Temp: 4.3°C</span>
                  <span className="text-emerald-400">Safe: 2.0°C - 8.0°C</span>
                </div>

                {/* SVG Mini Waveform */}
                <div className="h-14 w-full flex items-end">
                  <svg className="w-full h-full text-emerald-500" preserveAspectRatio="none" viewBox="0 0 100 30">
                    <path
                      d="M0,15 Q10,12 20,16 T40,14 T60,18 T80,15 T100,16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line x1="0" y1="5" x2="100" y2="5" stroke="#ef4444" strokeDasharray="2,2" strokeWidth="0.8" />
                    <line x1="0" y1="26" x2="100" y2="26" stroke="#3b82f6" strokeDasharray="2,2" strokeWidth="0.8" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Consignment Inward Ledger Table */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Boxes className="w-4 h-4 text-sky-400" />
                  <h3 className="text-sm font-bold text-white font-display-heading">
                    Consignment Inward Ledger
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">6 Formulations Total</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-mono">
                      <th className="pb-2">DRUG & BATCH</th>
                      <th className="pb-2">EXPECTED / RECEIVED</th>
                      <th className="pb-2">STATUS</th>
                      <th className="pb-2 text-right">PUTAWAY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    <tr>
                      <td className="py-2.5">
                        <p className="font-semibold text-white">Atorvastatin + Ezetimibe 10/10</p>
                        <p className="text-[10px] text-slate-400 font-mono">Batch: PMBI-2401 · CDL Kolkata CoA</p>
                      </td>
                      <td className="py-2.5 font-mono">480 / 480 Strips</td>
                      <td className="py-2.5">
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">
                          VERIFIED
                        </span>
                      </td>
                      <td className="py-2.5 text-right font-mono text-slate-300">Bin A-04-R2</td>
                    </tr>

                    <tr>
                      <td className="py-2.5">
                        <p className="font-semibold text-white">Metformin HCl PR 500mg</p>
                        <p className="text-[10px] text-slate-400 font-mono">Batch: MET-9921 · NABL Tested</p>
                      </td>
                      <td className="py-2.5 font-mono">240 / 240 Strips</td>
                      <td className="py-2.5">
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">
                          VERIFIED
                        </span>
                      </td>
                      <td className="py-2.5 text-right font-mono text-slate-300">Bin B-02-L1</td>
                    </tr>

                    <tr className="bg-amber-500/5">
                      <td className="py-2.5">
                        <p className="font-semibold text-amber-300">Cefixime Dispersible 200mg</p>
                        <p className="text-[10px] text-amber-400/80 font-mono">Batch: CFX-4491 · Shortage -2</p>
                      </td>
                      <td className="py-2.5 font-mono text-amber-400">80 / 78 Strips</td>
                      <td className="py-2.5">
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px]">
                          DEBIT NOTE
                        </span>
                      </td>
                      <td className="py-2.5 text-right font-mono text-slate-300">Bin D-01-M4</td>
                    </tr>

                    <tr>
                      <td className="py-2.5">
                        <p className="font-semibold text-white">Telmisartan 40mg</p>
                        <p className="text-[10px] text-slate-400 font-mono">Batch: TEL-8812 · Passed</p>
                      </td>
                      <td className="py-2.5 font-mono">920 / 920 Strips</td>
                      <td className="py-2.5">
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">
                          VERIFIED
                        </span>
                      </td>
                      <td className="py-2.5 text-right font-mono text-slate-300">Bin A-08-R1</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Commit Action Button */}
              <div className="pt-2 border-t border-slate-800">
                {!grnCommitted ? (
                  <button
                    onClick={handleCommitGRN}
                    className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <PackageCheck className="w-4 h-4" />
                    <span>Authorize & Commit GRN to Inventory Ledger</span>
                  </button>
                ) : (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-center font-mono text-xs text-emerald-300 font-bold">
                    ✓ GRN COMMITTED · STOCK LIVE ON CUSTOMER MARKETPLACE
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

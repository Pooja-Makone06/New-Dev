import React, { useState } from 'react';
import { 
  Settings, 
  Percent, 
  ShieldAlert, 
  Save, 
  CheckCircle2, 
  RefreshCw, 
  Database, 
  Sliders, 
  Lock,
  AlertCircle
} from 'lucide-react';

export const PlatformSettings: React.FC = () => {
  const [genericCommission, setGenericCommission] = useState(5.0);
  const [coldChainCommission, setColdChainCommission] = useState(7.0);
  const [brandedCommission, setBrandedCommission] = useState(8.0);
  const [expiryThresholdDays, setExpiryThresholdDays] = useState(45);
  const [priceVarianceThreshold, setPriceVarianceThreshold] = useState(25);
  const [biometricRequired, setBiometricRequired] = useState(true);
  const [autoDpcoSync, setAutoDpcoSync] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    showToast('Platform commission rates & regulatory guardrails successfully persisted!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 text-slate-100">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white shadow-2xl text-xs font-semibold animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 text-xs font-mono font-semibold border border-sky-500/20">
              CDSCO / NPPA CONFIGURATION · STATUTORY POLICY SPEC
            </span>
            <span className="text-xs text-slate-500 font-mono">STATUTORY POLICY ENGINE</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display-heading mt-1">
            Platform Commission & Regulatory Policy Controls
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Configure marketplace commission tiers, DPCO price-ceiling guardrails, and algorithmic safety thresholds.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-900/30 transition-all self-start md:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Marketplace Commission Structure */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-bold uppercase border-b border-slate-800 pb-2">
            <Percent className="w-4 h-4" />
            <span>Marketplace Commission Configuration (FR-PAY-02)</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-mono mb-1.5">
                <span className="text-slate-300">Jan Aushadhi Generic Subsidy Commission</span>
                <span className="text-emerald-400 font-bold">{genericCommission.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={genericCommission}
                onChange={(e) => setGenericCommission(parseFloat(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">Capped at 5% to maximize affordability under PMBI guidelines.</p>
            </div>

            <div>
              <div className="flex justify-between font-mono mb-1.5">
                <span className="text-slate-300">Cold-Chain & Biologicals Fee</span>
                <span className="text-sky-400 font-bold">{coldChainCommission.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="3"
                max="15"
                step="0.5"
                value={coldChainCommission}
                onChange={(e) => setColdChainCommission(parseFloat(e.target.value))}
                className="w-full accent-sky-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">Includes calibrated IoT telemetry sensor logger subsidy.</p>
            </div>

            <div>
              <div className="flex justify-between font-mono mb-1.5">
                <span className="text-slate-300">Branded Equivalent Commission</span>
                <span className="text-amber-400 font-bold">{brandedCommission.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                step="0.5"
                value={brandedCommission}
                onChange={(e) => setBrandedCommission(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">Standard rate for non-subsidized commercial brands.</p>
            </div>
          </div>
        </div>

        {/* Safety & Algorithmic Guardrails */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase border-b border-slate-800 pb-2">
            <ShieldAlert className="w-4 h-4" />
            <span>Automated Safety Guardrails & Thresholds</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-mono mb-1.5">
                <span className="text-slate-300">FEFO Expiry Rejection Threshold</span>
                <span className="text-rose-400 font-bold">{expiryThresholdDays} Days</span>
              </div>
              <input
                type="range"
                min="15"
                max="90"
                step="5"
                value={expiryThresholdDays}
                onChange={(e) => setExpiryThresholdDays(parseInt(e.target.value))}
                className="w-full accent-rose-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">Batches expiring within this window are quarantined from patient search.</p>
            </div>

            <div>
              <div className="flex justify-between font-mono mb-1.5">
                <span className="text-slate-300">Price Variance Algorithmic Hold Trigger</span>
                <span className="text-amber-400 font-bold">±{priceVarianceThreshold}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={priceVarianceThreshold}
                onChange={(e) => setPriceVarianceThreshold(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">Automatically freezes orders if seller price deviates from NPPA median.</p>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={biometricRequired}
                  onChange={(e) => setBiometricRequired(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-sky-500 focus:ring-0"
                />
                <span className="text-slate-200 font-medium">Enforce Biometric Pharmacist Verification on Sched H</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoDpcoSync}
                  onChange={(e) => setAutoDpcoSync(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-sky-500 focus:ring-0"
                />
                <span className="text-slate-200 font-medium">Daily Automated NPPA DPCO Ceiling Price Resynchronization</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

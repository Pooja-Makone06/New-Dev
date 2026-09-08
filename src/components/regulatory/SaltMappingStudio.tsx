import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Sparkles, 
  ShieldCheck, 
  TrendingDown, 
  ArrowRight,
  Beaker,
  FileBadge,
  Sliders,
  X
} from 'lucide-react';
import { GENERIC_SUBSTITUTES, ASSETS } from '../../data/mockData';
import { GenericSubstitute } from '../../types';

export const SaltMappingStudio: React.FC = () => {
  const [substitutes, setSubstitutes] = useState<GenericSubstitute[]>(GENERIC_SUBSTITUTES);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Schedule H' | 'In-Review' | 'DPCO Capped'>('All');
  const [autoSubEnabled, setAutoSubEnabled] = useState(true);
  const [mandatoryTokenEnabled, setMandatoryTokenEnabled] = useState(true);
  const [whoGmpOnly, setWhoGmpOnly] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [flaggedHoldActive, setFlaggedHoldActive] = useState(true);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16 font-sans">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white shadow-xl text-sm font-medium animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-mono mb-1">
              <span>CDSCO EQUIVALENCE REPOSITORY</span>
              <span>/</span>
              <span>STANDARDIZED SALT ONTOLOGY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display-heading">
              Catalog & Salt Mapping Studio
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Bioequivalence indexing, standard salt composition matrices, and automated cross-brand generic substitution.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Propose New Molecule</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3 bg-slate-900/90 rounded-xl border border-slate-800">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search salt, chemical code, or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs scrollbar-none">
            {(['All', 'Schedule H', 'In-Review', 'DPCO Capped'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  activeFilter === filter
                    ? 'bg-sky-600 text-white font-medium'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Molecule Main Studio Container */}
        <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-6 space-y-6 shadow-sm">
          
          {/* Salt Title & Statutory Badges */}
          <div className="space-y-3 border-b border-slate-800 pb-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider">
                  CANONICAL MOLECULE ID: MOL-ATV-EZT-2026
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display-heading mt-0.5">
                  Atorvastatin Calcium + Ezetimibe Tablets IP (10mg + 10mg)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Fixed-Dose Combination (FDC) · HMG-CoA Reductase Inhibitor + Cholesterol Absorption Inhibitor
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Bioequivalence Passed (100% CDSCO Match)
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-medium font-mono">
                  DPCO Ceiling: ₹18.40/Tab
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-medium">
                  Schedule H · Rx Mandated
                </span>
              </div>
            </div>

            {/* Clinical Warning Callout */}
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
              <p>
                <strong className="font-semibold">Clinical Warning & FDC Regulatory Protocol:</strong> Fixed-dose combination requires baseline liver transaminase profiling. Prescriptions valid only with doctor registration number. CDSCO FDC Gazette Notification #412 compliant.
              </p>
            </div>
          </div>

          {/* Standard Salt Composition Matrix */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Beaker className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold text-white font-display-heading">
                  Standard Salt Composition Matrix (Canonical Monograph)
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">Indian Pharmacopoeia (IP) 2022</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs bg-slate-950 rounded-lg border border-slate-800">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="p-3">ACTIVE PHARMACEUTICAL INGREDIENT (API)</th>
                    <th className="p-3">STRENGTH</th>
                    <th className="p-3">MOL. WEIGHT</th>
                    <th className="p-3">TOLERANCE (ASSAY)</th>
                    <th className="p-3">DISSOLUTION PARAMETERS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-200">
                  <tr>
                    <td className="p-3">
                      <span className="font-semibold text-white">Atorvastatin Calcium Trihydrate IP</span>
                      <p className="text-[10px] text-slate-400 font-mono">CAS: 344423-98-9 · Statin Class</p>
                    </td>
                    <td className="p-3 font-mono font-bold text-sky-400">10.00 mg</td>
                    <td className="p-3 font-mono text-slate-400">1209.4 g/mol</td>
                    <td className="p-3 font-mono text-emerald-400">90.0% - 110.0% (IP Std)</td>
                    <td className="p-3 text-slate-300">Q &gt; 80% at 30 min in 0.05M Phosphate Buffer pH 6.8</td>
                  </tr>
                  <tr>
                    <td className="p-3">
                      <span className="font-semibold text-white">Ezetimibe IP</span>
                      <p className="text-[10px] text-slate-400 font-mono">CAS: 163222-33-1 · Azetidinone Class</p>
                    </td>
                    <td className="p-3 font-mono font-bold text-sky-400">10.00 mg</td>
                    <td className="p-3 font-mono text-slate-400">409.4 g/mol</td>
                    <td className="p-3 font-mono text-emerald-400">90.0% - 110.0% (IP Std)</td>
                    <td className="p-3 text-slate-300">Q &gt; 80% at 30 min in 0.45% Sodium Lauryl Sulfate</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Innovator Reference vs Verified Generic Substitutes */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white font-display-heading">
                  Equivalence & Automated Substitution Engine
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400">
                Max Patient Saving: 90.3% vs Innovator Reference
              </span>
            </div>

            {/* Innovator Reference Banner */}
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  INNOVATOR REFERENCE DRUG (ORIGINATOR BENCHMARK)
                </span>
                <p className="text-sm font-bold text-slate-100 mt-0.5">
                  Atorva-E 10/10 <span className="text-slate-400 font-normal">· Zydus Cadila Pharmaceuticals</span>
                </p>
              </div>

              <div className="text-right font-mono">
                <span className="text-xs text-slate-400">Innovator MRP</span>
                <p className="text-base font-bold text-rose-400">₹248.00 <span className="text-xs text-slate-400 font-normal">/ strip of 10</span></p>
              </div>
            </div>

            {/* Substitute Cards List */}
            <div className="space-y-3">
              {substitutes.map((sub) => (
                <div 
                  key={sub.rank}
                  className={`p-4 rounded-xl border transition-all ${
                    sub.rank === '01'
                      ? 'bg-emerald-950/20 border-emerald-500/40 shadow-sm'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5 ${
                        sub.rank === '01'
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {sub.rank}
                      </span>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{sub.brandName}</h4>
                          {sub.tag && (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                              {sub.tag}
                            </span>
                          )}
                          <span className="px-1.5 py-0.2 rounded bg-sky-500/10 text-sky-400 text-[10px] font-mono">
                            {sub.bioEquivalenceScore}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{sub.manufacturer}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 text-right">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-mono font-bold text-emerald-400">
                            Save {sub.savingsPercentage}%
                          </span>
                          <span className="text-base font-bold font-mono text-white">
                            ₹{sub.pricePerUnit.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-mono">MRP: ₹248.00</p>
                      </div>

                      <button
                        onClick={() => showToast(`Selected ${sub.brandName} as preferred substitute`)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flagged Formulation Variance In-Review */}
          <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Flagged Formulation Variance In-Review
                </h4>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                CDSCO Lab Reference #LAB-771
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-semibold text-slate-200">Atozet-Micro 10/10 (Micro Labs)</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Dissolution delay of 14% identified in Phase 2 clinical bio-waiver testing. Non-standard 5:1 binding agent detected.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {flaggedHoldActive ? (
                  <button
                    onClick={() => {
                      setFlaggedHoldActive(false);
                      showToast('Assay re-test requested from CDL Kolkata');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-colors"
                  >
                    Hold & Request Lab Assay
                  </button>
                ) : (
                  <span className="text-xs text-amber-400 font-mono">Assay Dispatched</span>
                )}
              </div>
            </div>
          </div>

          {/* Algorithmic Guardrails & Configuration Toggles */}
          <div className="pt-2 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">Auto-Substitution Protocol</p>
                <p className="text-[10px] text-slate-400">Requires verified patient consent</p>
              </div>
              <button
                onClick={() => {
                  setAutoSubEnabled(!autoSubEnabled);
                  showToast(autoSubEnabled ? 'Auto-substitution turned off' : 'Auto-substitution enabled');
                }}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                  autoSubEnabled ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  autoSubEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">Mandatory Salt Token Gate</p>
                <p className="text-[10px] text-slate-400">Hard-blocks non-matching salts</p>
              </div>
              <button
                onClick={() => {
                  setMandatoryTokenEnabled(!mandatoryTokenEnabled);
                  showToast('Mandatory salt token gate updated');
                }}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                  mandatoryTokenEnabled ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  mandatoryTokenEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">WHO-GMP Plant Filter</p>
                <p className="text-[10px] text-slate-400">Only tier-1 certified manufacturing</p>
              </div>
              <button
                onClick={() => {
                  setWhoGmpOnly(!whoGmpOnly);
                  showToast('WHO-GMP filter updated');
                }}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                  whoGmpOnly ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  whoGmpOnly ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

          {/* Statutory Sign-off Box */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={ASSETS.drRajeshVarma} 
                alt="Dr. Rajesh Varma" 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-500/40"
              />
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-white">Dr. Rajesh Varma, MD (Pharmacology)</p>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                    CRO SIGNED
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Chief Regulatory Officer · Central Drugs Standard Control Organisation (CDSCO) Liaison
                </p>
              </div>
            </div>

            <div className="text-right font-mono text-[10px] text-slate-500">
              <p>STAMP: 0x8a92f00...d182</p>
              <p>VERIFIED: 08-MAR-2026 14:15 IST</p>
            </div>
          </div>

        </div>

      </div>

      {/* Modal: Propose New Molecule */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileBadge className="w-5 h-5 text-sky-400" />
                <h3 className="text-base font-bold text-white">Propose New Salt Molecule</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Generic Salt Name (IP / BP / USP)</label>
                <input 
                  type="text" 
                  defaultValue="Telmisartan + Chlorthalidone (40mg + 12.5mg)"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Therapeutic Class</label>
                  <input 
                    type="text" 
                    defaultValue="Antihypertensive"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Statutory Schedule</label>
                  <select className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white">
                    <option>Schedule H</option>
                    <option>Schedule H1</option>
                    <option>Schedule G</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Target Innovator Brand & MRP</label>
                <input 
                  type="text" 
                  defaultValue="Telma-CT 40/12.5 (Glenmark) - ₹195.00"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  showToast('Dossier submitted for CDSCO Scientific Advisory Committee review');
                }}
                className="px-4 py-2 rounded-lg bg-sky-600 text-white font-bold text-xs"
              >
                Submit Dossier
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

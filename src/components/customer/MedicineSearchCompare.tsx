import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShoppingCart, 
  ShieldCheck, 
  TrendingDown, 
  Building2, 
  Clock, 
  Star,
  FileUp,
  FileText,
  Percent
} from 'lucide-react';
import { SEARCHABLE_MEDICINES } from '../../data/mockData';

interface MedicineSearchCompareProps {
  onAddToCart: () => void;
  onViewDetail?: () => void;
}

export const MedicineSearchCompare: React.FC<MedicineSearchCompareProps> = ({ onAddToCart, onViewDetail }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMed, setSelectedMed] = useState(SEARCHABLE_MEDICINES[0]);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const filteredMeds = SEARCHABLE_MEDICINES.filter(m => 
    m.brandedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.saltName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 text-slate-100 font-sans">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white shadow-xl text-sm font-medium animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Banner & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold mb-1">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              NATIONAL ESSENTIAL MEDICINES LIST (NLEM)
            </span>
            <span>·</span>
            <span>UP TO 90% CONSUMER SAVINGS</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display-heading">
            Generic vs Branded Medicine Price Comparison
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Search branded innovator formulations to discover bioequivalent PMBI Jan Aushadhi generic substitutes.
          </p>
        </div>

        <button
          onClick={onAddToCart}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-all flex items-center gap-2 whitespace-nowrap self-start md:self-auto"
        >
          <FileText className="w-4 h-4 text-emerald-300" />
          <span>Go to Order Web Form</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-2xl">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search branded medicine (e.g. Lipitor, Glycomet, Augmentin, Telma, Crestor)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 shadow-sm"
        />
      </div>

      {/* Quick Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 text-xs font-mono mr-1">Popular:</span>
        {SEARCHABLE_MEDICINES.map((med, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedMed(med)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              selectedMed.brandedName === med.brandedName
                ? 'bg-sky-600 text-white font-semibold'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
            }`}
          >
            {med.brandedName.split('/')[0].trim()}
          </button>
        ))}
      </div>

      {/* 2-Column Responsive Web Comparison Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Selected Medicine & Generic Alternatives */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Active Innovator Formulation Summary */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-sky-400 uppercase font-semibold">
                  {selectedMed.category}
                </span>
                <h2 className="text-xl font-bold text-white font-display-heading mt-0.5">
                  {selectedMed.brandedName}
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Active Salt Composition: <strong className="text-slate-200">{selectedMed.saltName}</strong>
                </p>
              </div>

              <div className="sm:text-right font-mono p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">INNOVATOR BRANDED MRP</span>
                <p className="text-xl font-bold text-rose-400 mt-0.5">₹{selectedMed.innovatorPrice.toFixed(2)}</p>
                <p className="text-[10px] text-slate-400">{selectedMed.innovatorCompany}</p>
              </div>
            </div>

            {onViewDetail && (
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-emerald-400 font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> 99.4% Bioequivalent Assayed by CDL Kolkata
                </span>
                <button
                  onClick={onViewDetail}
                  className="text-sky-400 hover:text-sky-300 font-semibold font-mono flex items-center gap-1 text-xs"
                >
                  <span>View Lab Assay & Chemical Certificates</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Bioequivalent Generic Substitutes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
                Government Verified Generic Substitutes ({selectedMed.genericAlternatives.length})
              </h3>
              <span className="text-xs font-mono text-emerald-400">CDSCO RULE 65 COMPLIANT</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {selectedMed.genericAlternatives.map((alt, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all ${
                    alt.recommended
                      ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/40 shadow-lg'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-bold text-white">{alt.brandName}</h4>
                        {alt.recommended && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                            PMBI Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300">{alt.pharmacyName}</p>

                      <div className="flex items-center gap-4 pt-1 text-xs text-slate-400 font-mono">
                        <span className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{alt.rating}</span>
                        </span>
                        <span className="flex items-center gap-1 text-slate-300">
                          <Clock className="w-3.5 h-3.5 text-sky-400" />
                          <span>{alt.deliveryTime}</span>
                        </span>
                        <span className="text-emerald-400 font-bold">In Stock at Kendra</span>
                      </div>
                    </div>

                    <div className="sm:text-right border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
                      <div className="flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-start gap-1.5">
                        <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          Save {alt.savingsPercent}%
                        </span>
                        <span className="text-2xl font-bold font-mono text-white mt-1">
                          ₹{alt.price.toFixed(2)}
                        </span>
                        <p className="text-xs line-through text-slate-500 font-mono">
                          Innovator MRP: ₹{alt.mrp.toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          showToast(`Selected ${alt.brandName}. Opening Order Web Form...`);
                          onAddToCart();
                        }}
                        className="mt-3 w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Select & Proceed to Order Form</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Prescription Upload Prompt & Why Choose PMBI */}
        <div className="space-y-6">
          {/* Direct Prescription Web Form Prompt Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto">
              <FileUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display-heading">
                Upload Doctor's Prescription
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Already have an active prescription? Skip manual searching and submit our comprehensive Order Web Form for automatic generic concordance matching.
              </p>
            </div>
            
            <button
              onClick={() => {
                showToast('Opening Patient Prescription Web Form...');
                onAddToCart();
              }}
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Fill Prescription Web Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quality & Bioequivalence Guarantee */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>Quality Assurance Standards</span>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Assayed by Central Drug Laboratory (CDL Kolkata)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>100% bioequivalent pharmacokinetic rate & absorption</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Regulated ceiling pricing under NPPA DPCO 2013</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Dispensed only by registered M.Pharm / B.Pharm pharmacists</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

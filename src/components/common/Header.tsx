import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Store, 
  Smartphone, 
  Search, 
  Clock, 
  AlertTriangle, 
  Activity,
  Layers,
  FileCheck2,
  PackageCheck,
  Boxes,
  Microscope,
  ShoppingCart,
  FileText,
  Truck,
  Repeat,
  DollarSign,
  ShieldAlert,
  Settings,
  User,
  Info,
  Globe,
  Command
} from 'lucide-react';
import { PortalView, PortalSection } from '../../types';
import { ASSETS } from '../../data/mockData';

interface HeaderProps {
  currentView: PortalView;
  onSelectView: (view: PortalView) => void;
  onOpenCommandPalette?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onSelectView, onOpenCommandPalette }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata'
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getSection = (view: PortalView): PortalSection => {
    if (view.startsWith('regulatory')) return 'regulatory';
    if (view.startsWith('dispensary')) return 'dispensary';
    return 'customer';
  };

  const activeSection = getSection(currentView);

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white shadow-lg">
      {/* Top Banner with System Telemetry */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            SURVEILLANCE: ACTIVE
          </div>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-slate-300 font-mono hidden md:inline">
            NODE: <span className="text-sky-400">REG-DELHI-NODE-04</span>
          </span>
          <span className="text-slate-400 hidden md:inline">|</span>
          <span className="text-slate-300 font-mono hidden sm:inline">
            CDSCO MASTER DB: <span className="text-emerald-400">SYNCED (0.4s ago)</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-300 font-mono">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>{currentTime || '14:24:10 IST'}</span>
          </div>

          <div className="flex items-center gap-2 pl-3 border-l border-slate-700">
            <img 
              src={ASSETS.drRajeshVarma} 
              alt="Dr. Rajesh Varma" 
              className="w-6 h-6 rounded-full ring-1 ring-sky-400 object-cover"
            />
            <div className="hidden lg:block text-left">
              <p className="text-[11px] font-semibold text-slate-200 leading-none">Dr. Rajesh Varma</p>
              <p className="text-[10px] text-slate-400 leading-none mt-0.5">CRO · CDSCO Oversight</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand & Section Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onSelectView('regulatory-overview')}>
            <img 
              src={ASSETS.logo} 
              alt="GenericMed Logo" 
              className="h-8 w-auto rounded object-contain bg-white/5 p-1"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight font-display-heading text-white">
                  Generic<span className="text-sky-400">Med</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  National Grid
                </span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-0.5">
                Drugs & Cosmetics Act 1940 · Schedule H / Rule 65 Compliant
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Role Switcher & Command Palette Trigger */}
        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-all group shadow-sm"
              title="Open Screen Command Palette (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-slate-300">Quick Jump...</span>
              <kbd className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-750 text-[10px] text-slate-400 font-semibold shadow-inner group-hover:text-sky-300 group-hover:border-sky-500/40">
                <Command className="w-2.5 h-2.5" />
                <span>K</span>
              </kbd>
            </button>
          )}

          {/* Primary Role Switcher Pills */}
          <div className="flex items-center p-1 bg-slate-950/80 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
            <button
              onClick={() => onSelectView('regulatory-overview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeSection === 'regulatory'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Central Regulatory</span>
            </button>

            <button
              onClick={() => onSelectView('dispensary-fulfillment')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeSection === 'dispensary'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Dispensary OS (Kendra #0482)</span>
            </button>

            <button
              onClick={() => onSelectView('customer-search')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeSection === 'customer'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Patient Web Portal & Form</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs based on Active Section */}
      <div className="bg-slate-950/90 border-t border-slate-800/80 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1.5 scrollbar-none text-xs">
          {activeSection === 'regulatory' && (
            <>
              <button
                onClick={() => onSelectView('regulatory-overview')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium whitespace-nowrap transition-colors ${
                  currentView === 'regulatory-overview'
                    ? 'bg-slate-800 text-sky-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Governance & Operations</span>
                <span className="ml-1 px-1.5 py-0.2 bg-rose-500/20 text-rose-300 text-[10px] rounded-full border border-rose-500/30">
                  4 Alerts
                </span>
              </button>

              <button
                onClick={() => onSelectView('regulatory-salt-mapping')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium whitespace-nowrap transition-colors ${
                  currentView === 'regulatory-salt-mapping'
                    ? 'bg-slate-800 text-sky-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Salt Mapping & Bioequivalence</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  90.3%
                </span>
              </button>

              <button
                onClick={() => onSelectView('regulatory-orders-audit')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium whitespace-nowrap transition-colors ${
                  currentView === 'regulatory-orders-audit'
                    ? 'bg-slate-800 text-sky-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>Order Interventions & Audit Logs</span>
              </button>

              <button
                onClick={() => onSelectView('regulatory-settings')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium whitespace-nowrap transition-colors ${
                  currentView === 'regulatory-settings'
                    ? 'bg-slate-800 text-sky-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Commission & DPCO Guardrails</span>
              </button>
            </>
          )}

          {activeSection === 'dispensary' && (
            <>
              <button
                onClick={() => onSelectView('dispensary-fulfillment')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium whitespace-nowrap transition-colors ${
                  currentView === 'dispensary-fulfillment'
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Fulfillment Queue</span>
                <span className="ml-1 px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[10px] rounded-full">
                  3 In-Review
                </span>
              </button>

              <button
                onClick={() => onSelectView('dispensary-catalogue')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium whitespace-nowrap transition-colors ${
                  currentView === 'dispensary-catalogue'
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Boxes className="w-3.5 h-3.5" />
                <span>Store Catalogue & SKU Pricing</span>
              </button>

              <button
                onClick={() => onSelectView('dispensary-grn')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium whitespace-nowrap transition-colors ${
                  currentView === 'dispensary-grn'
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <PackageCheck className="w-3.5 h-3.5" />
                <span>Batch Inwarding & GRN Optical Scanner</span>
              </button>

              <button
                onClick={() => onSelectView('dispensary-inventory')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium whitespace-nowrap transition-colors ${
                  currentView === 'dispensary-inventory'
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Boxes className="w-3.5 h-3.5" />
                <span>Inventory & FEFO Risk</span>
              </button>

              <button
                onClick={() => onSelectView('dispensary-form13')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium whitespace-nowrap transition-colors ${
                  currentView === 'dispensary-form13'
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Microscope className="w-3.5 h-3.5" />
                <span>Form 13 Lab Reports</span>
              </button>

              <button
                onClick={() => onSelectView('dispensary-earnings')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium whitespace-nowrap transition-colors ${
                  currentView === 'dispensary-earnings'
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>Earnings & Settlements</span>
              </button>
            </>
          )}

          {activeSection === 'customer' && (
            <>
              <button
                onClick={() => onSelectView('customer-search')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium whitespace-nowrap transition-colors ${
                  currentView === 'customer-search'
                    ? 'bg-slate-800 text-indigo-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Generic vs Branded Comparison</span>
              </button>

              <button
                onClick={() => onSelectView('customer-detail')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium whitespace-nowrap transition-colors ${
                  currentView === 'customer-detail'
                    ? 'bg-slate-800 text-indigo-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>Medicine Profile & Assay</span>
              </button>

              <button
                onClick={() => onSelectView('customer-cart')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium whitespace-nowrap transition-colors ${
                  currentView === 'customer-cart'
                    ? 'bg-slate-800 text-indigo-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Order & Prescription Web Form</span>
              </button>

              <button
                onClick={() => onSelectView('customer-tracking')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium whitespace-nowrap transition-colors ${
                  currentView === 'customer-tracking'
                    ? 'bg-slate-800 text-indigo-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Live Order Tracking</span>
              </button>

              <button
                onClick={() => onSelectView('customer-refill')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium whitespace-nowrap transition-colors ${
                  currentView === 'customer-refill'
                    ? 'bg-slate-800 text-indigo-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Repeat className="w-3.5 h-3.5" />
                <span>Refill Sentinel</span>
              </button>

              <button
                onClick={() => onSelectView('customer-account')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium whitespace-nowrap transition-colors ${
                  currentView === 'customer-account'
                    ? 'bg-slate-800 text-indigo-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Account & Saved Rx Vault</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};


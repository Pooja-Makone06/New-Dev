import React from 'react';
import { 
  FileText, 
  Search, 
  Truck, 
  ShoppingCart, 
  Repeat, 
  User, 
  Info,
  ShieldCheck
} from 'lucide-react';
import { PortalView } from '../../types';
import { PrescriptionCart } from './PrescriptionCart';
import { LiveOrderTracking } from './LiveOrderTracking';
import { RefillSentinel } from './RefillSentinel';
import { MedicineSearchCompare } from './MedicineSearchCompare';
import { MedicineDetailView } from './MedicineDetailView';
import { CustomerAccountHistory } from './CustomerAccountHistory';

interface CustomerAppContainerProps {
  currentView: PortalView;
  onSelectView: (view: PortalView) => void;
}

export const CustomerAppContainer: React.FC<CustomerAppContainerProps> = ({ 
  currentView, 
  onSelectView 
}) => {
  return (
    <div className="w-full bg-slate-950 text-slate-100 min-h-[calc(100vh-70px)]">
      {/* Sub-header Web Navigation Bar */}
      <div className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono font-semibold border border-indigo-500/20">
              PATIENT WEB PORTAL
            </span>
            <span className="hidden sm:inline-block text-slate-500 font-mono">·</span>
            <span className="hidden sm:inline-block text-slate-400 font-mono">
              CDSCO RULE 65(11A) COMPLIANT
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              id="nav-tab-search"
              onClick={() => onSelectView('customer-search')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                currentView === 'customer-search'
                  ? 'bg-sky-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Generic Search & Compare</span>
            </button>

            <button
              id="nav-tab-webform"
              onClick={() => onSelectView('customer-cart')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                currentView === 'customer-cart'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Order & Prescription Web Form</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                87.5% OFF
              </span>
            </button>

            <button
              id="nav-tab-detail"
              onClick={() => onSelectView('customer-detail')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                currentView === 'customer-detail'
                  ? 'bg-sky-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Medicine Profile & Lab Assay</span>
            </button>

            <button
              id="nav-tab-tracking"
              onClick={() => onSelectView('customer-tracking')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                currentView === 'customer-tracking'
                  ? 'bg-sky-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Live Delivery & IoT Tracker</span>
            </button>

            <button
              id="nav-tab-refill"
              onClick={() => onSelectView('customer-refill')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                currentView === 'customer-refill'
                  ? 'bg-sky-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Repeat className="w-3.5 h-3.5" />
              <span>Refill Sentinel</span>
            </button>

            <button
              id="nav-tab-account"
              onClick={() => onSelectView('customer-account')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                currentView === 'customer-account'
                  ? 'bg-sky-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Account & Saved Rx Vault</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Responsive Web Content */}
      <div className="w-full">
        {currentView === 'customer-cart' && (
          <PrescriptionCart onNavigateToTracking={() => onSelectView('customer-tracking')} />
        )}
        {currentView === 'customer-tracking' && (
          <LiveOrderTracking onNavigateToRefill={() => onSelectView('customer-refill')} />
        )}
        {currentView === 'customer-refill' && (
          <RefillSentinel onNavigateToTracking={() => onSelectView('customer-tracking')} />
        )}
        {currentView === 'customer-search' && (
          <MedicineSearchCompare 
            onAddToCart={() => onSelectView('customer-cart')} 
            onViewDetail={() => onSelectView('customer-detail')}
          />
        )}
        {currentView === 'customer-detail' && (
          <MedicineDetailView 
            onBack={() => onSelectView('customer-search')} 
            onAddToCart={() => onSelectView('customer-cart')} 
          />
        )}
        {currentView === 'customer-account' && (
          <CustomerAccountHistory onReorder={() => onSelectView('customer-cart')} />
        )}
      </div>
    </div>
  );
};

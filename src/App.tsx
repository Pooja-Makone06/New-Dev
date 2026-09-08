/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PortalView } from './types';
import { Header } from './components/common/Header';
import { MarketplaceOverview } from './components/regulatory/MarketplaceOverview';
import { SaltMappingStudio } from './components/regulatory/SaltMappingStudio';
import { AdminOrdersAudit } from './components/regulatory/AdminOrdersAudit';
import { PlatformSettings } from './components/regulatory/PlatformSettings';
import { FulfillmentQueue } from './components/dispensary/FulfillmentQueue';
import { BatchInwardingGRN } from './components/dispensary/BatchInwardingGRN';
import { InventoryStock } from './components/dispensary/InventoryStock';
import { Form13LabReports } from './components/dispensary/Form13LabReports';
import { PharmacyCatalogue } from './components/pharmacy/PharmacyCatalogue';
import { PharmacyEarnings } from './components/pharmacy/PharmacyEarnings';
import { CustomerAppContainer } from './components/customer/CustomerAppContainer';
import { CommandPalette } from './components/common/CommandPalette';
import { SCREENS } from './data/screensData';
import { 
  ShieldCheck, 
  Store, 
  Globe, 
  Compass, 
  X,
  ExternalLink,
  FileText,
  Search,
  Command
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<PortalView>('regulatory-overview');
  const [showNavDrawer, setShowNavDrawer] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const screens = SCREENS;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Main Navigation Header */}
      <Header 
        currentView={currentView} 
        onSelectView={setCurrentView} 
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Viewport Content */}
      <main className="flex-1">
        {currentView === 'regulatory-overview' && <MarketplaceOverview />}
        {currentView === 'regulatory-salt-mapping' && <SaltMappingStudio />}
        {currentView === 'regulatory-orders-audit' && <AdminOrdersAudit />}
        {currentView === 'regulatory-settings' && <PlatformSettings />}
        {currentView === 'dispensary-fulfillment' && <FulfillmentQueue />}
        {currentView === 'dispensary-catalogue' && <PharmacyCatalogue />}
        {currentView === 'dispensary-grn' && <BatchInwardingGRN />}
        {currentView === 'dispensary-inventory' && <InventoryStock />}
        {currentView === 'dispensary-form13' && <Form13LabReports />}
        {currentView === 'dispensary-earnings' && <PharmacyEarnings />}
        {currentView.startsWith('customer-') && (
          <CustomerAppContainer currentView={currentView} onSelectView={setCurrentView} />
        )}
      </main>

      {/* Floating Screen Navigator & Command Palette Launchers */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/95 hover:bg-slate-800 text-slate-100 border border-slate-700 shadow-2xl backdrop-blur-md text-xs font-mono transition-all hover:scale-105 group"
          title="Open Command Palette (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-12 transition-transform" />
          <span className="font-semibold">Quick Jump</span>
          <kbd className="px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 text-[10px] text-sky-300 font-bold">
            ⌘K
          </kbd>
        </button>

        <button
          onClick={() => setShowNavDrawer(!showNavDrawer)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/95 hover:bg-slate-800 text-slate-200 border border-slate-700 shadow-2xl backdrop-blur-md text-xs font-mono transition-all hover:scale-105"
        >
          <Compass className="w-4 h-4 text-sky-400" />
          <span className="font-semibold hidden sm:inline">All Screens Directory</span>
          <span className="font-semibold sm:hidden">Screens</span>
          <span className="px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 text-[10px]">
            {screens.length}
          </span>
        </button>
      </div>

      {/* Global Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        currentView={currentView}
        onSelectView={setCurrentView}
      />

      {/* Quick Screens Directory Modal/Drawer */}
      {showNavDrawer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-5 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-sky-400" />
                  <h3 className="text-base font-bold text-white font-display-heading">
                    GenericMed Complete Screens & Slides Directory
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Direct one-click access to all 16 screens across Central Regulatory, Dispensary OS, and Patient Web Portal.
                </p>
              </div>
              <button onClick={() => setShowNavDrawer(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
              {screens.map((screen) => {
                const isActive = currentView === screen.id;
                return (
                  <div
                    key={screen.id}
                    onClick={() => {
                      setCurrentView(screen.id);
                      setShowNavDrawer(false);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isActive
                        ? 'bg-sky-950/50 border-sky-500 ring-1 ring-sky-500 shadow-md'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 text-[10px] font-mono">
                      <span className="text-sky-400">{screen.category}</span>
                      <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-bold">
                        {screen.imageRef}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white mt-1">
                      {screen.name}
                    </h4>

                    <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>{screen.badge}</span>
                      {isActive && <span className="text-emerald-400 font-bold">ACTIVE</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

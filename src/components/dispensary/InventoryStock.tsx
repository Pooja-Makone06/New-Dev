import React, { useState } from 'react';
import { 
  Boxes, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Thermometer, 
  ShieldAlert, 
  Clock, 
  Filter, 
  Layers, 
  ExternalLink,
  Ban,
  ArrowDownUp,
  X
} from 'lucide-react';
import { INVENTORY_BATCHES } from '../../data/mockData';
import { InventoryBatch } from '../../types';

export const InventoryStock: React.FC = () => {
  const [batches, setBatches] = useState<InventoryBatch[]>(INVENTORY_BATCHES);
  const [filterType, setFilterType] = useState<'all' | 'critical' | 'warning' | 'optimal' | 'quarantined'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<InventoryBatch>(INVENTORY_BATCHES[0]);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleQuarantineAllCritical = () => {
    setBatches(prev => 
      prev.map(b => b.daysToExpiry < 30 ? { ...b, expiryStatus: 'quarantined', fefoRank: 'LOCKED / QUARANTINED' } : b)
    );
    showToast('All 3 critical batches quarantined under D&C Act Section 18B');
  };

  const handleQuarantineSingle = (id: string) => {
    setBatches(prev => 
      prev.map(b => b.id === id ? { ...b, expiryStatus: 'quarantined', fefoRank: 'LOCKED / QUARANTINED' } : b)
    );
    showToast(`Batch quarantined and locked from order cart`);
  };

  const filteredBatches = batches.filter(b => {
    if (filterType !== 'all' && b.expiryStatus !== filterType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return b.drugName.toLowerCase().includes(q) || b.batchId.toLowerCase().includes(q) || b.binId.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16 font-sans">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white shadow-xl text-sm font-medium animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-mono mb-1">
              <span>DISPENSARY OS</span>
              <span>/</span>
              <span>INVENTORY MANAGEMENT & FEFO</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display-heading">
              Inventory & Stock Management
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              PM Bhartiya Janaushadhi Kendra #0482 · Real-time FEFO queue, expiry surveillance, and IoT cold-chain nodes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
              1,419 Batches Tracked
            </span>
          </div>
        </div>

        {/* Expiry Horizon Risk Segmentation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div 
            onClick={() => setFilterType('critical')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              filterType === 'critical'
                ? 'bg-rose-950/40 border-rose-500 ring-1 ring-rose-500/40'
                : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400">&lt; 30 Days Critical</span>
              <span className="p-1 rounded bg-rose-500/20 text-rose-400 font-mono text-[11px]">FEFO 01</span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display-heading text-white">03</span>
              <span className="text-xs text-slate-400">Batches</span>
            </div>
            <p className="text-xs font-mono text-rose-400 mt-1">Value: ₹14,800.00</p>
            <div className="mt-2 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-rose-500 h-full w-[12%]"></div>
            </div>
          </div>

          <div 
            onClick={() => setFilterType('warning')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              filterType === 'warning'
                ? 'bg-amber-950/40 border-amber-500 ring-1 ring-amber-500/40'
                : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">30 - 90 Days Warning</span>
              <span className="p-1 rounded bg-amber-500/20 text-amber-400 font-mono text-[11px]">FEFO 02</span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display-heading text-white">18</span>
              <span className="text-xs text-slate-400">Batches</span>
            </div>
            <p className="text-xs font-mono text-amber-400 mt-1">Value: ₹68,400.00</p>
            <div className="mt-2 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full w-[28%]"></div>
            </div>
          </div>

          <div 
            onClick={() => setFilterType('optimal')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              filterType === 'optimal'
                ? 'bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500/40'
                : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">&gt; 90 Days Optimal</span>
              <span className="p-1 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[11px]">OK</span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display-heading text-white">1,398</span>
              <span className="text-xs text-slate-400">Batches</span>
            </div>
            <p className="text-xs font-mono text-emerald-400 mt-1">Value: ₹7,57,530.00</p>
            <div className="mt-2 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[94%]"></div>
            </div>
          </div>

          <div 
            onClick={() => setFilterType('quarantined')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              filterType === 'quarantined'
                ? 'bg-purple-950/40 border-purple-500 ring-1 ring-purple-500/40'
                : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400">Quarantined Hold</span>
              <span className="p-1 rounded bg-purple-500/20 text-purple-400 font-mono text-[11px]">LOCKED</span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display-heading text-white">01</span>
              <span className="text-xs text-slate-400">Batch</span>
            </div>
            <p className="text-xs font-mono text-purple-400 mt-1">Value: ₹14,500.00</p>
            <div className="mt-2 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full w-[5%]"></div>
            </div>
          </div>

        </div>

        {/* Urgent Critical Alert Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/80 via-slate-900 to-slate-900 border border-rose-500/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                3 Batches Expiring in &lt;30 Days (Statutory Protocol Active)
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Under CDSCO Rule 65(17), these formulations are auto-suppressed from chronic 60-day auto-refill orders to prevent patient medication expiry.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleQuarantineAllCritical}
              className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors"
            >
              Quarantine All 3
            </button>
            <button
              onClick={() => showToast('PMBI Return Order #RO-DEL-0482-12 initiated with courier pickup')}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              Initiate PMBI Return
            </button>
          </div>
        </div>

        {/* Main Grid: Shelf Inventory Table & Batch Inspector Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Table (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search drug, batch, or shelf bin..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`px-2.5 py-1 rounded-md ${filterType === 'all' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    All Batches
                  </button>
                  <button
                    onClick={() => setFilterType('critical')}
                    className={`px-2.5 py-1 rounded-md ${filterType === 'critical' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Critical
                  </button>
                </div>
              </div>

              {/* Batches Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-mono">
                      <th className="pb-2.5 font-medium">DRUG & SALT CODE</th>
                      <th className="pb-2.5 font-medium">BATCH & BIN</th>
                      <th className="pb-2.5 font-medium">EXPIRY HORIZON</th>
                      <th className="pb-2.5 font-medium">STOCK & PRICE</th>
                      <th className="pb-2.5 font-medium text-right">FEFO ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredBatches.map((b) => (
                      <tr 
                        key={b.id}
                        onClick={() => setSelectedBatch(b)}
                        className={`hover:bg-slate-800/40 transition-colors cursor-pointer ${
                          selectedBatch.id === b.id ? 'bg-slate-800/50' : ''
                        }`}
                      >
                        <td className="py-3">
                          <p className="font-semibold text-white">{b.drugName}</p>
                          <p className="text-[10px] text-sky-400 font-mono">{b.saltCode}</p>
                          <span className="text-[10px] text-slate-400">{b.scheduleType}</span>
                        </td>

                        <td className="py-3 font-mono">
                          <span className="text-white font-bold">{b.batchId}</span>
                          <p className="text-slate-400 text-[10px]">{b.binId}</p>
                        </td>

                        <td className="py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                            b.expiryStatus === 'critical'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : b.expiryStatus === 'warning'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : b.expiryStatus === 'quarantined'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {b.expiryDate} ({b.daysToExpiry}d)
                          </span>
                        </td>

                        <td className="py-3">
                          <p className="text-white font-medium">{b.availableQty}</p>
                          <div className="flex items-center gap-1 font-mono text-[11px]">
                            <span className="line-through text-slate-500">₹{b.mrp.toFixed(2)}</span>
                            <span className="font-bold text-emerald-400">₹{b.kendraPrice.toFixed(2)}</span>
                          </div>
                        </td>

                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {b.expiryStatus !== 'quarantined' ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuarantineSingle(b.id);
                                }}
                                className="px-2 py-1 rounded bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 border border-slate-700 text-[11px] transition-colors"
                              >
                                Quarantine
                              </button>
                            ) : (
                              <span className="text-[11px] font-mono text-purple-400 font-bold">LOCKED</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Selected Batch Inspector & IoT Node (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Batch Inspector Card */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-sky-400 uppercase">BATCH INSPECTOR</span>
                <span className="text-xs font-mono text-slate-400">ID: {selectedBatch.id}</span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{selectedBatch.drugName}</h3>
                <p className="text-xs text-sky-400 font-mono mt-0.5">{selectedBatch.saltCode}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Physical Location:</span>
                  <span className="text-white font-mono">{selectedBatch.binId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Available Stock:</span>
                  <span className="text-white font-mono">{selectedBatch.availableQty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">FIFO/FEFO Line:</span>
                  <span className="text-emerald-400 font-mono font-bold">{selectedBatch.fefoRank}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">NABL Certificate:</span>
                  <span className="text-sky-400 font-mono underline cursor-pointer">CDL-KOL-2026-F13</span>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => showToast(`Relocation task for ${selectedBatch.batchId} sent to dispensary scanner`)}
                  className="w-1/2 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700"
                >
                  Relocate Bin
                </button>
                <button
                  onClick={() => handleQuarantineSingle(selectedBatch.id)}
                  className="w-1/2 py-2 rounded-lg bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-semibold"
                >
                  Quarantine Hold
                </button>
              </div>
            </div>

            {/* IoT Cold-Chain Fridge Node */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                    Fridge-01 IoT Node (Insulin & Vaccines)
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  ONLINE
                </span>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono">INTERNAL TEMPERATURE</span>
                  <p className="text-2xl font-bold font-display-heading text-emerald-400 mt-0.5">
                    4.2°C
                  </p>
                  <span className="text-[10px] text-slate-500 font-mono">Target: 2.0°C - 8.0°C</span>
                </div>

                <div className="text-right text-xs font-mono space-y-1">
                  <p className="text-slate-300">Battery: <strong className="text-emerald-400">94%</strong></p>
                  <p className="text-slate-400">Sync: 12s ago</p>
                  <p className="text-slate-400">Compressor: Normal</p>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Dual temperature sensors in cold-chain shelf ensure non-interrupted compliance with Central Drugs Standard Control guidelines.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

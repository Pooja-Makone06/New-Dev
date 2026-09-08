import React, { useState } from 'react';
import { 
  Boxes, 
  Search, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpDown, 
  DollarSign, 
  Tag, 
  Building2, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck, 
  SlidersHorizontal,
  Edit2,
  Save,
  X
} from 'lucide-react';
import { CatalogueDrugItem } from '../../types';

const INITIAL_CATALOGUE: CatalogueDrugItem[] = [
  {
    id: 'CAT-01',
    sku: 'SKU-ATOR-10',
    brandName: 'Atorvastatin 10mg (Jan Aushadhi)',
    saltComposition: 'Atorvastatin Calcium IP 10mg',
    manufacturer: 'Bureau of Pharma PSUs of India (BPPI)',
    innovatorBrand: 'Lipitor 10mg (Pfizer)',
    mrp: 14.50,
    kendraPrice: 8.50,
    dpcoCeiling: 18.20,
    marginPercent: 22.4,
    packSize: '10 Tablets / Strip',
    inStock: true,
    stockCount: 420,
    scheduleType: 'Schedule H',
    category: 'Cardiovascular / Statin',
    bioequivalencePercent: 99.4
  },
  {
    id: 'CAT-02',
    sku: 'SKU-MET-500SR',
    brandName: 'Metformin SR 500mg (Kendra Generic)',
    saltComposition: 'Metformin Hydrochloride IP Sustained Release 500mg',
    manufacturer: 'Karnataka Antibiotics & Pharmaceuticals Ltd (KAPL)',
    innovatorBrand: 'Glycomet 500 SR (USV)',
    mrp: 22.00,
    kendraPrice: 6.20,
    dpcoCeiling: 24.80,
    marginPercent: 25.0,
    packSize: '20 Tablets / Strip',
    inStock: true,
    stockCount: 850,
    scheduleType: 'Schedule H',
    category: 'Antidiabetic',
    bioequivalencePercent: 98.7
  },
  {
    id: 'CAT-03',
    sku: 'SKU-AMOX-625',
    brandName: 'Amoxicillin & Potassium Clavulanate 625mg',
    saltComposition: 'Amoxicillin 500mg + Potassium Clavulanate 125mg',
    manufacturer: 'Hindustan Antibiotics Limited (HAL)',
    innovatorBrand: 'Augmentin 625 (GSK)',
    mrp: 88.00,
    kendraPrice: 42.00,
    dpcoCeiling: 104.50,
    marginPercent: 18.5,
    packSize: '6 Tablets / Strip',
    inStock: true,
    stockCount: 160,
    scheduleType: 'Schedule H1',
    category: 'Antibiotic',
    bioequivalencePercent: 99.1
  },
  {
    id: 'CAT-04',
    sku: 'SKU-TELMA-40',
    brandName: 'Telmisartan Tablets IP 40mg',
    saltComposition: 'Telmisartan 40mg',
    manufacturer: 'Bengal Chemicals & Pharmaceuticals Ltd',
    innovatorBrand: 'Telma 40 (Glenmark)',
    mrp: 28.50,
    kendraPrice: 11.00,
    dpcoCeiling: 32.00,
    marginPercent: 26.2,
    packSize: '15 Tablets / Strip',
    inStock: false,
    stockCount: 0,
    scheduleType: 'Schedule H',
    category: 'Antihypertensive',
    bioequivalencePercent: 98.2
  },
  {
    id: 'CAT-05',
    sku: 'SKU-PANT-40',
    brandName: 'Pantoprazole Gastro-Resistant 40mg',
    saltComposition: 'Pantoprazole Sodium IP eq to Pantoprazole 40mg',
    manufacturer: 'Jan Aushadhi Partner Labs',
    innovatorBrand: 'Pan 40 (Alkem)',
    mrp: 18.00,
    kendraPrice: 7.20,
    dpcoCeiling: 21.50,
    marginPercent: 21.0,
    packSize: '10 Tablets / Strip',
    inStock: true,
    stockCount: 340,
    scheduleType: 'Schedule H',
    category: 'Gastrointestinal',
    bioequivalencePercent: 99.8
  },
  {
    id: 'CAT-06',
    sku: 'SKU-MONT-LC',
    brandName: 'Montelukast & Levocetirizine 10mg/5mg',
    saltComposition: 'Montelukast Sodium 10mg + Levocetirizine HCl 5mg',
    manufacturer: 'Medipol Pharmaceutical India',
    innovatorBrand: 'Montair LC (Cipla)',
    mrp: 45.00,
    kendraPrice: 19.50,
    dpcoCeiling: 52.00,
    marginPercent: 24.5,
    packSize: '10 Tablets / Strip',
    inStock: true,
    stockCount: 210,
    scheduleType: 'Schedule H',
    category: 'Respiratory / Allergy',
    bioequivalencePercent: 97.9
  }
];

export const PharmacyCatalogue: React.FC = () => {
  const [catalogue, setCatalogue] = useState<CatalogueDrugItem[]>(INITIAL_CATALOGUE);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggleStock = (id: string) => {
    setCatalogue(prev => prev.map(item => {
      if (item.id === id) {
        const nextInStock = !item.inStock;
        return {
          ...item,
          inStock: nextInStock,
          stockCount: nextInStock ? (item.stockCount === 0 ? 50 : item.stockCount) : 0
        };
      }
      return item;
    }));
    showToast('Stock availability updated in marketplace');
  };

  const startEdit = (item: CatalogueDrugItem) => {
    setEditingId(item.id);
    setEditPrice(item.kendraPrice);
    setEditStock(item.stockCount);
  };

  const saveEdit = (id: string) => {
    setCatalogue(prev => prev.map(item => {
      if (item.id === id) {
        if (editPrice > item.dpcoCeiling) {
          showToast(`Error: Price ₹${editPrice} exceeds DPCO Ceiling of ₹${item.dpcoCeiling}`);
          return item;
        }
        return {
          ...item,
          kendraPrice: editPrice,
          stockCount: editStock,
          inStock: editStock > 0
        };
      }
      return item;
    }));
    setEditingId(null);
    showToast('Pricing and inventory updated successfully!');
  };

  const categories = ['all', ...new Set(catalogue.map(c => c.category))];

  const filteredItems = catalogue.filter(item => {
    const matchesSearch = item.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.saltComposition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalInStock = catalogue.filter(i => i.inStock).length;
  const outOfStock = catalogue.filter(i => !i.inStock).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 text-slate-100">
      {/* Toast Notification */}
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
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono font-semibold border border-emerald-500/20">
              KENDRA #0482 · PRICING & SKU STUDIO
            </span>
            <span className="text-xs text-slate-500 font-mono">FR-ORD-01 / DPCO CEILING SPEC</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display-heading mt-1">
            Store Catalogue & Real-Time Price Manager
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Configure local store inventory, manage Kendra discounts, and enforce DPCO legal price caps before customer publishing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => showToast('Master NLEM Catalogue synced with CDSCO Database')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
            <span>Sync Master DPCO</span>
          </button>
          <button 
            onClick={() => showToast('Bulk SKU Inwarding template downloaded')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-900/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Medicine SKU</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400 font-mono">LISTED SKUS</span>
          <p className="text-2xl font-bold text-white font-mono mt-1">{catalogue.length}</p>
          <span className="text-[11px] text-emerald-400">100% Salt Mapped</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400 font-mono">ACTIVE IN-STOCK</span>
          <p className="text-2xl font-bold text-emerald-400 font-mono mt-1">{totalInStock}</p>
          <span className="text-[11px] text-slate-400">Published to Patients</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400 font-mono">OUT OF STOCK</span>
          <p className="text-2xl font-bold text-amber-400 font-mono mt-1">{outOfStock}</p>
          <span className="text-[11px] text-amber-400/80">Refill Alert Armed</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400 font-mono">AVG DISPENSARY MARGIN</span>
          <p className="text-2xl font-bold text-sky-400 font-mono mt-1">22.9%</p>
          <span className="text-[11px] text-sky-400/80">Protected under PMBI</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search medicine brand, active salt, SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap capitalize transition-colors ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white font-semibold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Catalogue Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">MEDICINE & COMPOSITION</th>
                <th className="py-3 px-3">INNOVATOR EQUIVALENT</th>
                <th className="py-3 px-3">DPCO CEILING</th>
                <th className="py-3 px-3">STORE PRICE (₹)</th>
                <th className="py-3 px-3">STOCK UNITS</th>
                <th className="py-3 px-3">STORE STATUS</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredItems.map((item) => {
                const isEditing = editingId === item.id;
                const savingsVsInnovator = Math.round(((item.mrp - item.kendraPrice) / item.mrp) * 100);

                return (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-start gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white text-sm">{item.brandName}</span>
                            <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                              {item.scheduleType}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5">{item.saltComposition}</p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                            <span>{item.manufacturer}</span>
                            <span>·</span>
                            <span className="text-emerald-400 font-semibold">{item.bioequivalencePercent}% Bioeq</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="text-slate-300">
                        <p className="font-medium text-xs text-rose-300">{item.innovatorBrand}</p>
                        <p className="text-[10px] text-slate-500 font-mono">MRP: ₹{item.mrp.toFixed(2)}</p>
                        <span className="text-[10px] text-emerald-400 font-mono">
                          Save {savingsVsInnovator}%
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 font-mono">
                      <span className="text-amber-400 font-semibold">₹{item.dpcoCeiling.toFixed(2)}</span>
                      <p className="text-[10px] text-slate-500">Govt Cap</p>
                    </td>

                    <td className="py-3.5 px-3 font-mono">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <span className="text-slate-400">₹</span>
                          <input
                            type="number"
                            step="0.1"
                            value={editPrice}
                            onChange={(e) => setEditPrice(parseFloat(e.target.value) || 0)}
                            className="w-20 px-2 py-1 bg-slate-950 border border-sky-500 rounded text-white text-xs"
                          />
                        </div>
                      ) : (
                        <div>
                          <span className="text-base font-bold text-emerald-400">₹{item.kendraPrice.toFixed(2)}</span>
                          <p className="text-[10px] text-slate-400">{item.packSize}</p>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-3 font-mono">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editStock}
                          onChange={(e) => setEditStock(parseInt(e.target.value) || 0)}
                          className="w-20 px-2 py-1 bg-slate-950 border border-sky-500 rounded text-white text-xs"
                        />
                      ) : (
                        <div>
                          <span className={`font-semibold ${item.stockCount > 0 ? 'text-slate-200' : 'text-rose-400'}`}>
                            {item.stockCount} units
                          </span>
                          <p className="text-[10px] text-slate-500">{item.stockCount > 50 ? 'Ample Reserve' : 'Low Qty'}</p>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-3">
                      <button
                        onClick={() => handleToggleStock(item.id)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold transition-all ${
                          item.inStock
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20'
                        }`}
                      >
                        {item.inStock ? '● Live Online' : '○ Paused'}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => saveEdit(item.id)}
                            className="p-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                            title="Save Changes"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(item)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-mono ml-auto"
                        >
                          <Edit2 className="w-3 h-3 text-sky-400" />
                          <span>Edit</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

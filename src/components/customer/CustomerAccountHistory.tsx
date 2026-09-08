import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  FileText, 
  Clock, 
  Repeat, 
  Download, 
  CheckCircle2, 
  Plus, 
  ShieldCheck, 
  ChevronRight, 
  Trash2, 
  AlertCircle,
  Phone,
  Mail,
  CreditCard,
  QrCode,
  ArrowRight
} from 'lucide-react';
import { SavedPrescription } from '../../types';
import { ASSETS } from '../../data/mockData';

interface CustomerAccountHistoryProps {
  onReorder: () => void;
}

const MOCK_PRESCRIPTIONS: SavedPrescription[] = [
  {
    id: 'RX-VAULT-01',
    doctorName: 'Dr. Vikramaditya Sen, MD (Cardiology)',
    clinicHospital: 'Fortis Escorts Heart Institute, New Delhi',
    registrationNumber: 'DMC-2014-98124',
    uploadedDate: '12 Jan 2026',
    validUntil: '12 Jul 2026',
    status: 'VALID',
    medications: ['Atorvastatin 10mg', 'Metformin SR 500mg', 'Telmisartan 40mg'],
    imageUrl: ASSETS.prescriptionSample
  },
  {
    id: 'RX-VAULT-02',
    doctorName: 'Dr. Neha Kulkarni, MBBS, DGO',
    clinicHospital: 'Apollo Cradle Maternity Hospital',
    registrationNumber: 'KMC-1998-33102',
    uploadedDate: '04 Oct 2025',
    validUntil: '04 Apr 2026',
    status: 'EXPIRING_SOON',
    medications: ['Calcium & Vit D3 Tablets', 'Iron Folic Acid IP'],
    imageUrl: ASSETS.prescriptionSample
  }
];

export const CustomerAccountHistory: React.FC<CustomerAccountHistoryProps> = ({ onReorder }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'prescriptions' | 'addresses'>('orders');
  const [prescriptions] = useState<SavedPrescription[]>(MOCK_PRESCRIPTIONS);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 text-slate-100 font-sans">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white shadow-xl text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Profile Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl ring-2 ring-sky-400">
            AR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white font-display-heading">Ananya Roy</h1>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono font-semibold">
                ABHA LINKED
              </span>
            </div>
            <p className="text-xs text-slate-300 font-mono mt-0.5">+91 98712 34091 · ananya.roy@delhi.gov.in</p>
            <p className="text-xs text-sky-400 font-mono mt-0.5">ABHA Health ID: 91-8271-9920-1402</p>
          </div>
        </div>

        {/* Savings & Order Metrics */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">LIFETIME GENERIC SAVINGS</span>
            <p className="text-xl font-bold text-emerald-400 mt-0.5">₹4,890.00</p>
            <span className="text-[10px] text-slate-400">84% vs branded MRP</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">TOTAL FULFILLED ORDERS</span>
            <p className="text-xl font-bold text-white mt-0.5">7 Orders</p>
            <span className="text-[10px] text-emerald-400">100% On-Time</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-mono">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-2 px-3 font-semibold transition-all ${
            activeTab === 'orders'
              ? 'text-sky-400 border-b-2 border-sky-400 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Past Order History (3)
        </button>
        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`pb-2 px-3 font-semibold transition-all ${
            activeTab === 'prescriptions'
              ? 'text-sky-400 border-b-2 border-sky-400 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Saved Prescription Vault (2)
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-2 px-3 font-semibold transition-all ${
            activeTab === 'addresses'
              ? 'text-sky-400 border-b-2 border-sky-400 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Saved Delivery Addresses (2)
        </button>
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Order 1 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                    DELIVERED · 01 MAR 2026
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5 font-mono">Order #GM-DEL-99214</h3>
                  <p className="text-xs text-slate-400">Jan Aushadhi Seva Kendra #0482 (Lajpat Nagar)</p>
                </div>
                <div className="text-right font-mono">
                  <span className="text-base font-bold text-white">₹88.50</span>
                  <span className="block text-xs text-emerald-400 font-semibold">Saved ₹612.00</span>
                </div>
              </div>

              <div className="text-xs text-slate-300 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <p>• Atorvastatin 10mg (10 tabs) × 1</p>
                <p>• Metformin SR 500mg (20 tabs) × 2</p>
                <p>• Telmisartan 40mg (15 tabs) × 1</p>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  onClick={() => showToast('Official GST Tax Invoice downloaded (PDF)')}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-mono"
                >
                  <Download className="w-4 h-4 text-sky-400" />
                  <span>Download Invoice (PDF)</span>
                </button>

                <button
                  onClick={() => {
                    onReorder();
                    showToast('Items added to Prescription Web Form for 1-Click Reorder!');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow transition-all"
                >
                  <Repeat className="w-3.5 h-3.5" />
                  <span>1-Click Reorder via Web Form</span>
                </button>
              </div>
            </div>

            {/* Order 2 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono text-slate-400 font-bold bg-slate-800 px-2 py-0.5 rounded">
                    DELIVERED · 28 JAN 2026
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5 font-mono">Order #GM-DEL-88120</h3>
                  <p className="text-xs text-slate-400">Jan Aushadhi Seva Kendra #0482</p>
                </div>
                <div className="text-right font-mono">
                  <span className="text-base font-bold text-white">₹142.00</span>
                  <span className="block text-xs text-emerald-400 font-semibold">Saved ₹840.00</span>
                </div>
              </div>

              <div className="text-xs text-slate-300 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <p>• Atorvastatin + Ezetimibe 10/10mg × 2</p>
                <p>• Calcium 500mg + D3 Strips × 2</p>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  onClick={() => showToast('Official GST Tax Invoice downloaded (PDF)')}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-mono"
                >
                  <Download className="w-4 h-4 text-sky-400" />
                  <span>Download Invoice (PDF)</span>
                </button>

                <button
                  onClick={() => {
                    onReorder();
                    showToast('Items added to Prescription Web Form for 1-Click Reorder!');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-all"
                >
                  <Repeat className="w-3.5 h-3.5 text-sky-400" />
                  <span>Re-Order Medicines</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Prescriptions Tab */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">ENCRYPTED PATIENT VAULT · SHA-256 HASHED</span>
              <button
                onClick={() => {
                  onReorder();
                  showToast('Opening Prescription Web Form to upload new prescription...');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono font-semibold shadow transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload New Prescription via Web Form</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prescriptions.map((rx) => (
                <div key={rx.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                        rx.status === 'VALID' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {rx.status === 'VALID' ? 'VALID CLINICAL PRESCRIPTION' : 'EXPIRING IN 28 DAYS'}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1.5">{rx.doctorName}</h3>
                      <p className="text-xs text-slate-400">{rx.clinicHospital}</p>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">MCI Reg #{rx.registrationNumber}</p>
                    </div>

                    <img 
                      src={rx.imageUrl} 
                      alt="Prescription" 
                      className="w-16 h-16 rounded-xl object-cover border border-slate-700 cursor-pointer"
                      onClick={() => showToast('Viewing decrypted Prescription Full Document')}
                    />
                  </div>

                  <div className="text-xs text-slate-300 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block mb-1 text-[11px] font-bold">PRESCRIBED MEDICINES:</span>
                    {rx.medications.join(' · ')}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-1">
                    <span>Uploaded: {rx.uploadedDate}</span>
                    <span className="text-emerald-400 font-semibold">Valid Till: {rx.validUntil}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-sky-400" />
                  <h3 className="text-base font-bold text-white">Home Residence (Primary)</h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-xs font-mono">DEFAULT</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Flat 402, Block B, Silver Oak Apartments, Ring Road, Lajpat Nagar IV, New Delhi – 110024
              </p>
              <p className="text-xs text-slate-400 font-mono">Recipient: Ananya Roy (+91 98102 94821)</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-slate-400" />
                  <h3 className="text-base font-bold text-slate-300">Parents Residence</h3>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                House #24, Pocket B, Mayur Vihar Phase II, East Delhi – 110091
              </p>
              <p className="text-xs text-slate-500 font-mono">Recipient: Subhash Roy (+91 98110 55412)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

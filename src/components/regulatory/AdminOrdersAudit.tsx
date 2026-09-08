import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Ban, 
  RefreshCcw, 
  FileText, 
  Lock, 
  ChevronRight,
  Eye,
  Hash,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { CentralOrderAuditItem } from '../../types';

const INITIAL_ORDERS: CentralOrderAuditItem[] = [
  {
    id: 'ORD-INT-991',
    orderNumber: 'GM-DEL-99214',
    patientName: 'Ananya Roy',
    patientCity: 'South Delhi, DL',
    pharmacyName: 'Jan Aushadhi Seva Kendra #0482',
    pharmacyLicense: 'DL-SW-20B-98412',
    orderDate: '01 Mar 2026, 14:10 IST',
    totalAmount: 88.50,
    genericSavings: 612.00,
    status: 'DELIVERED',
    scheduleHVerified: true,
    prescribingDoctor: 'Dr. Vikramaditya Sen (DMC-2014-98124)',
    riskScore: 4,
    interventions: []
  },
  {
    id: 'ORD-INT-992',
    orderNumber: 'GM-BLR-40291',
    patientName: 'Kavita Sundaram',
    patientCity: 'Indiranagar, Bangalore',
    pharmacyName: 'Balaji Healthcare Hub #112',
    pharmacyLicense: 'KA-BNG-20C-10294',
    orderDate: '01 Mar 2026, 15:45 IST',
    totalAmount: 480.00,
    genericSavings: 1840.00,
    status: 'FLAGGED_SAFETY_HOLD',
    scheduleHVerified: false,
    prescribingDoctor: 'Unverified Provider (MCI-UNCONFIRMED)',
    riskScore: 88,
    interventions: [
      {
        timestamp: '01 Mar 2026, 15:52 IST',
        officer: 'Dr. Rajesh Varma (CRO)',
        action: 'EMERGENCY_HOLD_SUSPENDED',
        reason: 'Prescription MCI registration invalid on National Medical Commission registry',
        hash: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
      }
    ]
  },
  {
    id: 'ORD-INT-993',
    orderNumber: 'GM-MUM-88120',
    patientName: 'Sameer Merchant',
    patientCity: 'Bandra West, Mumbai',
    pharmacyName: 'Apollo Generic Care #44',
    pharmacyLicense: 'MH-MUM-20-449182',
    orderDate: '01 Mar 2026, 16:20 IST',
    totalAmount: 340.00,
    genericSavings: 420.00,
    status: 'DISPATCHED',
    scheduleHVerified: true,
    prescribingDoctor: 'Dr. Amit Trivedi (MMC-44109)',
    riskScore: 12,
    interventions: []
  },
  {
    id: 'ORD-INT-994',
    orderNumber: 'GM-DEL-77401',
    patientName: 'Deepak Chopra',
    patientCity: 'Rohini, New Delhi',
    pharmacyName: 'Metro Pharma Logistics (DL-ND-89)',
    pharmacyLicense: 'DL-NW-20B-11209',
    orderDate: '01 Mar 2026, 17:05 IST',
    totalAmount: 920.00,
    genericSavings: 110.00,
    status: 'CANCELLED_REFUNDED',
    scheduleHVerified: false,
    prescribingDoctor: 'Dr. Priya Mehta (DMC-88192)',
    riskScore: 74,
    interventions: [
      {
        timestamp: '01 Mar 2026, 17:18 IST',
        officer: 'S. K. Bansal (Zonal Drug Inspector)',
        action: 'ORDER_CANCELLED_REFUND_INITIATED',
        reason: 'Seller price exceeded DPCO 2013 ceiling cap for Rosuvastatin 20mg',
        hash: 'SHA256:1a84f9c39e2365a3d0859c2b48a04df59464e868846c4391217e928ec03cf106'
      }
    ]
  }
];

export const AdminOrdersAudit: React.FC = () => {
  const [orders, setOrders] = useState<CentralOrderAuditItem[]>(INITIAL_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<CentralOrderAuditItem | null>(null);
  const [interventionAction, setInterventionAction] = useState<'HOLD' | 'CANCEL_REFUND'>('HOLD');
  const [interventionReason, setInterventionReason] = useState<string>('SUSPECT_DOCTOR_LICENSE');
  const [interventionNotes, setInterventionNotes] = useState<string>('');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleExecuteIntervention = () => {
    if (!selectedOrder) return;

    const hash = 'SHA256:' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '8e4f';
    const nowStr = new Date().toLocaleDateString('en-IN') + ', ' + new Date().toLocaleTimeString('en-IN') + ' IST';
    const newAction = interventionAction === 'HOLD' ? 'EMERGENCY_HOLD_SUSPENDED' : 'ORDER_CANCELLED_REFUND_INITIATED';
    const newStatus = interventionAction === 'HOLD' ? 'FLAGGED_SAFETY_HOLD' : 'CANCELLED_REFUNDED';

    const newIntervention = {
      timestamp: nowStr,
      officer: 'Dr. Rajesh Varma (CRO · CDSCO)',
      action: newAction,
      reason: `${interventionReason}: ${interventionNotes || 'Automated regulatory compliance enforcement'}`,
      hash: hash
    };

    setOrders(prev => prev.map(o => {
      if (o.id === selectedOrder.id) {
        return {
          ...o,
          status: newStatus as any,
          interventions: [newIntervention, ...(o.interventions || [])]
        };
      }
      return o;
    }));

    showToast(`Order ${selectedOrder.orderNumber} updated. Immutable audit block written: ${hash.slice(0, 18)}...`);
    setSelectedOrder(null);
    setInterventionNotes('');
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.pharmacyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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
            <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 text-xs font-mono font-semibold border border-rose-500/20">
              NATIONAL OVERSIGHT · SECTION 11.5 / SECTION 18
            </span>
            <span className="text-xs text-slate-500 font-mono">IMMUTABLE SHA-256 AUDIT LOG</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display-heading mt-1">
            Central Orders & Regulatory Intervention Console
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Real-time surveillance over all orders nationwide, prescription concordance auditing, and legal order cancellation / escrow refund controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Audit Chain: Tamper-Evident</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search order #, patient name, dispensary..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          {['all', 'DELIVERED', 'FLAGGED_SAFETY_HOLD', 'CANCELLED_REFUNDED'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                filterStatus === st
                  ? 'bg-sky-600 text-white font-semibold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st === 'all' ? 'All Orders' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">ORDER & TIMESTAMP</th>
                <th className="py-3 px-3">PATIENT & CITY</th>
                <th className="py-3 px-3">FULFILLING PHARMACY</th>
                <th className="py-3 px-3">SCHEDULE H VALIDITY</th>
                <th className="py-3 px-3">RISK SCORE</th>
                <th className="py-3 px-3">STATUS</th>
                <th className="py-3 px-4 text-right">ADMIN INTERVENTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono">
                    <span className="font-bold text-white text-sm">{ord.orderNumber}</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">{ord.orderDate}</p>
                    <span className="text-[10px] text-emerald-400 font-semibold">
                      ₹{ord.totalAmount.toFixed(2)} (Saved ₹{ord.genericSavings.toFixed(2)})
                    </span>
                  </td>

                  <td className="py-3.5 px-3">
                    <p className="font-semibold text-white">{ord.patientName}</p>
                    <p className="text-[11px] text-slate-400">{ord.patientCity}</p>
                  </td>

                  <td className="py-3.5 px-3">
                    <p className="font-medium text-slate-200">{ord.pharmacyName}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{ord.pharmacyLicense}</p>
                  </td>

                  <td className="py-3.5 px-3">
                    {ord.scheduleHVerified ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>MCI Verified</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-400 font-mono text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Unverified Rx</span>
                      </span>
                    )}
                    <p className="text-[10px] text-slate-400 mt-0.5">{ord.prescribingDoctor}</p>
                  </td>

                  <td className="py-3.5 px-3 font-mono">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ord.riskScore > 50 ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {ord.riskScore}/100
                    </span>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                      ord.status === 'DELIVERED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      ord.status === 'FLAGGED_SAFETY_HOLD' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse' :
                      ord.status === 'CANCELLED_REFUNDED' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                    }`}>
                      {ord.status.replace(/_/g, ' ')}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono inline-flex items-center gap-1"
                    >
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                      <span>Intervene / Log</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Intervention Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <h3 className="text-base font-bold text-white font-display-heading">
                  Regulatory Intervention: {selectedOrder.orderNumber}
                </h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1 font-mono">
              <p><strong className="text-slate-400">Patient:</strong> {selectedOrder.patientName} ({selectedOrder.patientCity})</p>
              <p><strong className="text-slate-400">Pharmacy:</strong> {selectedOrder.pharmacyName}</p>
              <p><strong className="text-slate-400">Risk Score:</strong> {selectedOrder.riskScore}/100</p>
              <p><strong className="text-slate-400">Doctor:</strong> {selectedOrder.prescribingDoctor}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-mono mb-1">SELECT ENFORCEMENT ACTION</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setInterventionAction('HOLD')}
                    className={`p-2.5 rounded-lg border font-mono text-center transition-all ${
                      interventionAction === 'HOLD'
                        ? 'bg-amber-950/60 border-amber-500 text-amber-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Emergency Safety Hold
                  </button>
                  <button
                    onClick={() => setInterventionAction('CANCEL_REFUND')}
                    className={`p-2.5 rounded-lg border font-mono text-center transition-all ${
                      interventionAction === 'CANCEL_REFUND'
                        ? 'bg-rose-950/60 border-rose-500 text-rose-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Cancel Order & Refund Escrow
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">MANDATORY REASON CODE</label>
                <select
                  value={interventionReason}
                  onChange={(e) => setInterventionReason(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs"
                >
                  <option value="SUSPECT_DOCTOR_LICENSE">MCI / SMC Doctor Registration Unverified</option>
                  <option value="DPCO_CEILING_BREACH">Seller Selling Price Exceeds DPCO 2013 Legal Ceiling</option>
                  <option value="SCHEDULE_X_RESTRICTION">Unpermitted Habit-Forming Narcotic / Sched X Detected</option>
                  <option value="EXPIRY_THRESHOLD_BREACH">FEFO Batch Near-Expiry (&lt;45 days for chronic therapy)</option>
                  <option value="PATIENT_ADVERSE_REPORT">Reported Adverse Drug Reaction / Safety Quarantine</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">OFFICER JUSTIFICATION NOTES</label>
                <textarea
                  rows={3}
                  value={interventionNotes}
                  onChange={(e) => setInterventionNotes(e.target.value)}
                  placeholder="Enter detailed statutory notes for the permanent CDSCO audit log..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Existing Interventions on this order */}
            {selectedOrder.interventions && selectedOrder.interventions.length > 0 && (
              <div className="border-t border-slate-800 pt-3 space-y-2">
                <span className="text-[11px] font-mono text-slate-400 font-bold">AUDIT TRAIL ON RECORD</span>
                {selectedOrder.interventions.map((it, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>{it.officer}</span>
                      <span>{it.timestamp}</span>
                    </div>
                    <p className="text-rose-300 font-semibold">{it.action}: {it.reason}</p>
                    <p className="text-slate-500 text-[10px] break-all">{it.hash}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 border-t border-slate-800 pt-3">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-mono"
              >
                Dismiss
              </button>
              <button
                onClick={handleExecuteIntervention}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold font-mono shadow-lg transition-all"
              >
                Sign & Commit Immutable Block
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

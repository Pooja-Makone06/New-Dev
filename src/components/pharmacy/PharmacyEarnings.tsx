import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  Download, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Building, 
  FileText, 
  Percent, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { SettlementRecord } from '../../types';

const MOCK_SETTLEMENTS: SettlementRecord[] = [
  {
    id: 'SETTL-2026-W09',
    cyclePeriod: '24 Feb 2026 – 02 Mar 2026',
    orderCount: 142,
    grossSales: 84320.00,
    platformCommission: 4216.00,
    commissionRate: 5.0,
    tdsDeduction: 843.20,
    netPayable: 79260.80,
    settlementDate: '03 Mar 2026',
    status: 'SETTLED',
    bankUtr: 'HDFCR520260303891482',
    accountNumberMasked: '•••• •••• 9921 (HDFC Bank)'
  },
  {
    id: 'SETTL-2026-W08',
    cyclePeriod: '17 Feb 2026 – 23 Feb 2026',
    orderCount: 128,
    grossSales: 72150.00,
    platformCommission: 3607.50,
    commissionRate: 5.0,
    tdsDeduction: 721.50,
    netPayable: 67821.00,
    settlementDate: '24 Feb 2026',
    status: 'SETTLED',
    bankUtr: 'HDFCR520260224109481',
    accountNumberMasked: '•••• •••• 9921 (HDFC Bank)'
  },
  {
    id: 'SETTL-2026-W07',
    cyclePeriod: '10 Feb 2026 – 16 Feb 2026',
    orderCount: 119,
    grossSales: 68900.00,
    platformCommission: 3445.00,
    commissionRate: 5.0,
    tdsDeduction: 689.00,
    netPayable: 64766.00,
    settlementDate: '17 Feb 2026',
    status: 'SETTLED',
    bankUtr: 'HDFCR520260217981240',
    accountNumberMasked: '•••• •••• 9921 (HDFC Bank)'
  }
];

export const PharmacyEarnings: React.FC = () => {
  const [settlements] = useState<SettlementRecord[]>(MOCK_SETTLEMENTS);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Current Cycle In-Progress (W10)
  const currentGross = 48650.00;
  const currentCommission = currentGross * 0.05;
  const currentTds = currentGross * 0.01;
  const currentNet = currentGross - currentCommission - currentTds;

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
              DISPENSARY FINANCIAL LEDGER · FR-PAY-02 / FR-PAY-04
            </span>
            <span className="text-xs text-slate-500 font-mono">T+2 ROLLING SETTLEMENT</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display-heading mt-1">
            Earnings, Platform Commission & Payouts
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Transparent escrow deductions, 5% capped platform fee under generic subsidy, and verified NEFT/RTGS bank transfers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => showToast('Dispensary Tax Invoice (GSTR-1 & Form 26AS) downloaded as PDF')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>Export Tax Statement</span>
          </button>
          <button 
            onClick={() => showToast('Dispensary payout bank details verified via Penny-Drop (Razorpay Route)')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-900/30 transition-all"
          >
            <Building className="w-3.5 h-3.5" />
            <span>Bank & Escrow Settings</span>
          </button>
        </div>
      </div>

      {/* Live Active Settlement In-Progress Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h3 className="text-sm font-bold text-white font-mono uppercase">
              Current Settlement Cycle (03 Mar – 09 Mar 2026)
            </h3>
            <span className="px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
              ACCUMULATING
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>Next Payout: <strong className="text-white">10 Mar 2026, 06:00 AM IST</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-mono">GROSS ACCUMULATED SALES</span>
            <p className="text-2xl font-bold text-white font-mono mt-1">₹{currentGross.toFixed(2)}</p>
            <span className="text-[10px] text-slate-500">68 Orders fulfilled this week</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">PLATFORM COMMISSION</span>
              <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded">5.0% Fixed</span>
            </div>
            <p className="text-2xl font-bold text-rose-400 font-mono mt-1">-₹{currentCommission.toFixed(2)}</p>
            <span className="text-[10px] text-slate-500">Includes server, payment gateway & escrow</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-mono">TDS DEDUCTION (194-O)</span>
            <p className="text-2xl font-bold text-amber-400 font-mono mt-1">-₹{currentTds.toFixed(2)}</p>
            <span className="text-[10px] text-slate-500">1% IT compliance deposited to PAN</span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
            <span className="text-[11px] text-emerald-300 font-mono font-semibold">ESTIMATED NET PAYOUT</span>
            <p className="text-2xl font-bold text-emerald-400 font-mono mt-1">₹{currentNet.toFixed(2)}</p>
            <span className="text-[10px] text-emerald-400/80 font-mono">Direct NEFT to HDFC A/c 9921</span>
          </div>
        </div>
      </div>

      {/* Historical Payout Ledger */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white font-display-heading">
              Settlement History & Direct Credit Logs
            </h3>
            <p className="text-xs text-slate-400">
              Weekly verified credits to registered Kendra bank account.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">Showing last 3 cycles</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 font-mono border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">SETTLEMENT CYCLE</th>
                  <th className="py-3 px-3">ORDERS</th>
                  <th className="py-3 px-3">GROSS (₹)</th>
                  <th className="py-3 px-3">COMMISSION (5%)</th>
                  <th className="py-3 px-3">TDS (1%)</th>
                  <th className="py-3 px-3">NET TRANSFERRED</th>
                  <th className="py-3 px-3">UTR NUMBER</th>
                  <th className="py-3 px-4 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {settlements.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-white">{s.id}</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">{s.cyclePeriod}</p>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-slate-300">
                      {s.orderCount}
                    </td>

                    <td className="py-3.5 px-3 font-semibold text-slate-200">
                      ₹{s.grossSales.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-3.5 px-3 text-rose-400">
                      -₹{s.platformCommission.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-3.5 px-3 text-amber-400">
                      -₹{s.tdsDeduction.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="text-sm font-bold text-emerald-400">
                        ₹{s.netPayable.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-[11px] text-slate-400">
                      <span>{s.bankUtr}</span>
                      <p className="text-[10px] text-slate-500">{s.accountNumberMasked}</p>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Credit Successful</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Financial Security Guardrail Note */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
        <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block font-sans">Automated Escrow & Split-Payment Protection (RBI Guidelines)</strong>
          <span>
            GenericMed operates under RBI-compliant merchant aggregator nodal accounts. Patient payments are escrowed upon order placement and released to Kendra dispensary accounts immediately upon verified delivery confirmation minus the standard 5% platform fee.
          </span>
        </div>
      </div>
    </div>
  );
};

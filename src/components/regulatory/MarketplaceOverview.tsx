import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  FileText, 
  Building2, 
  Scale, 
  Clock, 
  Search, 
  Filter, 
  ArrowUpRight, 
  X, 
  ExternalLink,
  Ban,
  Fingerprint,
  RefreshCw
} from 'lucide-react';
import { 
  INITIAL_PHARMACIES, 
  INITIAL_ANOMALIES, 
  INITIAL_AUDIT_LOGS 
} from '../../data/mockData';
import { PharmacyQueueItem, PriceAnomalyItem, AuditLogEntry } from '../../types';

export const MarketplaceOverview: React.FC = () => {
  const [pharmacies, setPharmacies] = useState<PharmacyQueueItem[]>(INITIAL_PHARMACIES);
  const [anomalies, setAnomalies] = useState<PriceAnomalyItem[]>(INITIAL_ANOMALIES);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [filterRisk, setFilterRisk] = useState<'All' | 'Elevated' | 'Low'>('All');
  const [selectedPharmacy, setSelectedPharmacy] = useState<PharmacyQueueItem | null>(null);
  const [selectedHash, setSelectedHash] = useState<string | null>(null);
  const [showCauseModal, setShowCauseModal] = useState<boolean>(false);
  const [bannerDismissed, setBannerDismissed] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApprovePharmacy = (id: string, name: string) => {
    setPharmacies(prev => 
      prev.map(p => p.id === id ? { ...p, status: 'Biometric Verified', riskCategory: 'Low', riskScore: '06/100' } : p)
    );
    // Add audit entry
    const newLog: AuditLogEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      actor: {
        name: 'Dr. Rajesh Varma',
        initials: 'RV',
        role: 'Chief Regulatory Officer'
      },
      actionType: 'PHARMACY LICENSURE APPROVED',
      actionColor: 'emerald',
      targetEntity: name,
      outcome: 'Form 20/21 verified against State Licensing Authority database.',
      hash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`
    };
    setAuditLogs([newLog, ...auditLogs]);
    showToast(`Approved & onboarded ${name}`);
  };

  const handleResolveAnomaly = (id: string, actionName: string) => {
    setAnomalies(prev => prev.filter(a => a.id !== id));
    showToast(`Resolved guardrail: ${actionName}`);
  };

  const filteredPharmacies = pharmacies.filter(p => {
    if (filterRisk === 'All') return true;
    return p.riskCategory === filterRisk;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white shadow-xl text-sm font-medium animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Page Title & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-mono mb-1">
              <span>CENTRAL GOVERNANCE</span>
              <span>/</span>
              <span>LIVE CDSCO SURVEILLANCE DESK</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display-heading">
              Marketplace Governance & Operations Overview
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              National compliance telemetric feed, NPPA DPCO price monitoring, and automated dispensary gatekeeping.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => showToast('Full national audit ledger exported as signed PDF')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span>Export Audit Ledger</span>
            </button>
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>SURVEILLANCE ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Top Metric Cards (Image 7 Replica) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Total Fulfilled Orders</span>
              <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-display-heading text-white">38,419</span>
              <span className="text-xs font-semibold text-emerald-400 font-mono">+14.2% MoM</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">100% concordance verified</p>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500/30"></div>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Search-to-Offer Success</span>
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-display-heading text-white">88.4%</span>
              <span className="text-xs font-mono text-slate-400">Target ≥85%</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Bioequivalent generic matches found</p>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500/30"></div>
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Network Integrity Score</span>
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-display-heading text-white">98.6%</span>
              <span className="text-xs font-mono text-emerald-400">412 Kendra Nodes</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Form 20/21 & Biometrics active</p>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500/30"></div>
          </div>

          {/* Card 4 */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Critical Breaches</span>
              <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-display-heading text-rose-400">04</span>
              <span className="text-xs font-mono text-rose-400/80 bg-rose-500/10 px-1.5 py-0.5 rounded">Action Req</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Statutory override attempts blocked</p>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500/40"></div>
          </div>
        </div>

        {/* Urgent Attention Action Banner */}
        {!bannerDismissed && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/70 via-slate-900 to-amber-950/40 border border-rose-500/40 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      CRITICAL SURVEILLANCE ALERT
                    </span>
                    <span className="text-xs text-slate-400 font-mono">INCIDENT #SEC-2026-904</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-1">
                    Prescription Dispense Override Attempt Flagged (Node #DL-104 & #BLR-892)
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Automated Sentinel blocked 2 partner dispensaries attempting to dispense Schedule X / H formulations without mandatory dual-factor biometric sign-off and valid NMC-registered doctor verification.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                <button
                  onClick={() => setShowCauseModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  Issue Show-Cause Notice
                </button>
                <button
                  onClick={() => showToast('Dispatching Drug Inspector for physical node seizure')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all"
                >
                  Inspect Logs
                </button>
                <button
                  onClick={() => setBannerDismissed(true)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                  title="Dismiss banner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Grid: Left (Tables) & Right (Monitors) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Pharmacy Onboarding & Audit Logs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pharmacy Onboarding Section */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-sky-400" />
                    <h2 className="text-base font-bold text-white font-display-heading">
                      Pharmacy Verification & Onboarding Queue
                    </h2>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live verification against State Drug Control Administration & CDSCO registry.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800 text-xs">
                    {(['All', 'Elevated', 'Low'] as const).map(risk => (
                      <button
                        key={risk}
                        onClick={() => setFilterRisk(risk)}
                        className={`px-2.5 py-1 rounded-md transition-colors ${
                          filterRisk === risk
                            ? 'bg-sky-600 text-white'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {risk}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-mono">
                      <th className="pb-2.5 font-medium">PHARMACY & REGISTRATION</th>
                      <th className="pb-2.5 font-medium">LICENSE & FORM</th>
                      <th className="pb-2.5 font-medium">STATUS</th>
                      <th className="pb-2.5 font-medium">RISK</th>
                      <th className="pb-2.5 font-medium text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredPharmacies.map(pharm => (
                      <tr key={pharm.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3">
                          <p className="font-semibold text-slate-100 text-sm">{pharm.pharmacyName}</p>
                          <p className="text-slate-400 text-[11px]">{pharm.location}</p>
                          <p className="text-slate-500 font-mono text-[10px] mt-0.5">{pharm.pharmacist}</p>
                        </td>

                        <td className="py-3 font-mono">
                          <span className="text-sky-400">{pharm.licenseNumber}</span>
                          <p className="text-slate-400 text-[10px]">{pharm.licenseForms}</p>
                          <p className="text-slate-500 text-[10px]">Exp: {pharm.validUntil}</p>
                        </td>

                        <td className="py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                            pharm.status === 'Biometric Verified'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : pharm.status === 'Under Inspection'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {pharm.status}
                          </span>
                        </td>

                        <td className="py-3 font-mono">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            pharm.riskCategory === 'Elevated'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : pharm.riskCategory === 'Medium'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {pharm.riskScore}
                          </span>
                        </td>

                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {pharm.status !== 'Biometric Verified' ? (
                              <button
                                onClick={() => handleApprovePharmacy(pharm.id, pharm.pharmacyName)}
                                className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-medium transition-colors"
                              >
                                Approve
                              </button>
                            ) : (
                              <span className="text-[11px] text-emerald-400 font-mono">Live Node</span>
                            )}
                            <button
                              onClick={() => setSelectedPharmacy(pharm)}
                              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors border border-slate-700"
                            >
                              Dossier
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Statutory & Operational Audit Stream */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Fingerprint className="w-4 h-4 text-sky-400" />
                  <h2 className="text-base font-bold text-white font-display-heading">
                    Statutory & Operational Audit Stream
                  </h2>
                </div>
                <span className="text-xs text-slate-400 font-mono">SHA-256 Verified Immutable Ledger</span>
              </div>

              <div className="mt-4 space-y-3">
                {auditLogs.map((log) => (
                  <div 
                    key={log.id} 
                    className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start gap-3">
                      {log.actor.avatar ? (
                        <img src={log.actor.avatar} alt={log.actor.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-sky-500/40 shrink-0" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300 shrink-0">
                          {log.actor.initials}
                        </div>
                      )}

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-slate-200">{log.actor.name}</span>
                          <span className="text-[10px] text-slate-400">({log.actor.role})</span>
                          <span className={`px-1.5 py-0.2 text-[10px] rounded font-mono font-medium ${
                            log.actionColor === 'emerald'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : log.actionColor === 'rose'
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              : log.actionColor === 'amber'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                          }`}>
                            {log.actionType}
                          </span>
                        </div>
                        <p className="text-slate-300 font-medium mt-0.5">{log.targetEntity}</p>
                        <p className="text-slate-400 text-[11px] mt-0.5">{log.outcome}</p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 shrink-0 font-mono text-[11px]">
                      <span className="text-slate-400">{log.timestamp}</span>
                      <button 
                        onClick={() => setSelectedHash(log.hash)}
                        className="text-sky-400 hover:text-sky-300 hover:underline flex items-center gap-1"
                      >
                        <span>{log.hash}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Price & Expiry Guardrails & DPCO Monitor (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Price & Expiry Guardrails Monitor */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-400" />
                  <h2 className="text-base font-bold text-white font-display-heading">
                    Price & Expiry Guardrails Monitor
                  </h2>
                </div>
                <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {anomalies.length} Flagged
                </span>
              </div>

              <div className="mt-4 space-y-3.5">
                {anomalies.map((anom) => (
                  <div 
                    key={anom.id}
                    className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/90 hover:border-amber-500/40 transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded">
                          {anom.sku}
                        </span>
                        <h4 className="text-xs font-bold text-slate-100 mt-1">
                          {anom.drugName}
                        </h4>
                      </div>

                      {anom.variancePercentage && (
                        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-xs font-bold font-mono border border-rose-500/30">
                          +{anom.variancePercentage}% Variance
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {anom.description}
                    </p>

                    <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                      <span className="text-slate-500 font-mono">
                        Node: {anom.sellerNode}
                      </span>

                      <button
                        onClick={() => handleResolveAnomaly(anom.id, anom.actionRequired)}
                        className="px-2.5 py-1 rounded bg-amber-600/90 hover:bg-amber-500 text-white font-medium text-xs transition-colors"
                      >
                        {anom.actionRequired}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DPCO Ceiling Price Enforcement Card */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">NPPA COMPLIANCE</span>
                <span className="text-xs font-mono text-emerald-400">Order 2013 / 2024 Gazette</span>
              </div>

              <h3 className="text-base font-bold text-white font-display-heading">
                DPCO Ceiling Price Compliance
              </h3>

              <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <p className="text-xs text-emerald-300 font-medium">Consumer Savings Realized</p>
                  <p className="text-2xl font-bold font-display-heading text-emerald-400 mt-0.5">
                    ₹4.82 Crores
                  </p>
                  <p className="text-[11px] text-emerald-500/90 mt-0.5">vs Innovator Brand MRP this month</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Network Adherence</p>
                  <p className="text-xl font-bold font-mono text-white">99.1%</p>
                  <p className="text-[10px] text-emerald-400 mt-0.5">Zero ceiling violations</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Schedule I Essential Medicines (NLEM)</span>
                  <span className="text-slate-200 font-mono">100% Capped</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div className="bg-emerald-500 h-1.5 rounded-full w-full"></div>
                </div>

                <div className="flex justify-between text-slate-400 pt-1">
                  <span>Non-Scheduled 10% Annual Cap Window</span>
                  <span className="text-slate-200 font-mono">98.4% Monitored</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div className="bg-sky-500 h-1.5 rounded-full w-[98.4%]"></div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Modal: Show-Cause Notice */}
      {showCauseModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                <h3 className="text-base font-bold text-white">Issue Statutory Show-Cause Notice</h3>
              </div>
              <button onClick={() => setShowCauseModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <p>
                Under Section 22(1)(d) of the Drugs & Cosmetics Act 1940 and Rule 65(11A), this action will immediately freeze order routing to 
                <span className="text-rose-400 font-semibold font-mono"> Metro Pharma Logistics (#DL-104)</span> and dispatch a legal inquiry requiring a response within 48 hours.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-400">
                CHARGE: Attempted fulfillment of Schedule X psychotropic formulation without recording mandatory serial number and biometric verification.
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowCauseModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCauseModal(false);
                  showToast('Statutory Show-Cause Notice Dispatched & Node Suspended');
                }}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
              >
                Freeze Node & Dispatch Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Pharmacy Dossier */}
      {selectedPharmacy && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{selectedPharmacy.pharmacyName}</h3>
                <p className="text-xs text-slate-400 font-mono">{selectedPharmacy.licenseNumber}</p>
              </div>
              <button onClick={() => setSelectedPharmacy(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Registered Pharmacist</span>
                <span className="font-semibold text-white">{selectedPharmacy.pharmacist}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Location</span>
                <span>{selectedPharmacy.location}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Forms Approved</span>
                <span className="font-mono text-sky-400">{selectedPharmacy.licenseForms}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Validity Horizon</span>
                <span>{selectedPharmacy.validUntil}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Composite Risk Score</span>
                <span className="font-mono font-bold text-rose-400">{selectedPharmacy.riskScore}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedPharmacy(null)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg"
            >
              Close Dossier
            </button>
          </div>
        </div>
      )}

      {/* Modal: Hash Cryptographic Verification */}
      {selectedHash && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-5 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono text-emerald-400">CRYPTOGRAPHIC PROOF</span>
              <button onClick={() => setSelectedHash(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-300">
              This action is cryptographically anchored in the Central CDSCO Governance Merkle tree.
            </p>
            <div className="p-2.5 bg-slate-950 rounded border border-slate-800 font-mono text-[11px] text-sky-400 break-all">
              {selectedHash}
            </div>
            <p className="text-[10px] text-slate-500">
              Signed by Certificate Authority: CDSCO-ROOT-CA-2026. Non-repudiable audit compliance.
            </p>
            <button
              onClick={() => setSelectedHash(null)}
              className="w-full py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg"
            >
              Verified OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

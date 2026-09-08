import React, { useState } from 'react';
import { 
  Microscope, 
  FileCheck2, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Download, 
  ExternalLink,
  Activity,
  Check,
  XCircle,
  Key,
  HelpCircle,
  Award
} from 'lucide-react';
import { FORM13_REPORTS } from '../../data/mockData';
import { Form13Report } from '../../types';

export const Form13LabReports: React.FC = () => {
  const [reports, setReports] = useState<Form13Report[]>(FORM13_REPORTS);
  const [selectedReportId, setSelectedReportId] = useState<string>(FORM13_REPORTS[0].id);
  const [quarantineLifted, setQuarantineLifted] = useState<boolean>(false);
  const [legalOption, setLegalOption] = useState<'accept' | 'controvert'>('accept');
  const [toast, setToast] = useState<string | null>(null);

  const selectedReport = reports.find(r => r.id === selectedReportId) || reports[0];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleLiftQuarantine = () => {
    setQuarantineLifted(true);
    showToast(`Quarantine hold lifted for Batch #${selectedReport.batchId}. Stock committed to active shelf!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16 font-sans">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white shadow-xl text-sm font-medium animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-5">
        
        {/* Header */}
        <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-sm space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-1">
                <span>GOVERNMENT OF INDIA</span>
                <span>/</span>
                <span>CENTRAL DRUGS LABORATORY (CDL KOLKATA)</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white font-display-heading">
                Form 13 Certificate of Analysis (CoA) Inwarding & Enforcement
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Statutory CDSCO testing docket, NABL ISO/IEC 17025 instrumental telemetry, and dispensary batch quarantine release.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => showToast('Form 13 statutory PDF exported with digital CDL watermark')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200"
              >
                <Download className="w-3.5 h-3.5 text-sky-400" />
                <span>Export Form 13 PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Reports List & Full Form 13 Facsimile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left Docket List (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                Govt. Analyst Dockets ({reports.length})
              </h2>
              <span className="text-[10px] text-slate-400 font-mono">CDL Kolkata</span>
            </div>

            <div className="space-y-2.5">
              {reports.map((rep) => {
                const isSelected = rep.id === selectedReportId;
                return (
                  <div
                    key={rep.id}
                    onClick={() => {
                      setSelectedReportId(rep.id);
                      setQuarantineLifted(false);
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-900 border-sky-500 shadow-md ring-1 ring-sky-500/30'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded">
                        {rep.batchId}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        rep.status === 'PASSED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : rep.status === 'NSQ FAILED'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {rep.status}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-white mt-1.5 line-clamp-1">
                      {rep.drugName}
                    </h3>
                    <p className="text-[11px] text-slate-400">{rep.composition}</p>

                    <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Assay: <strong className="text-slate-200">{rep.assayScore.split(' ')[0]}</strong></span>
                      <span>{rep.receivedDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Statutory Legal Rights Box */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white font-mono">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Statutory Legal Rights: Sec 25(3)</span>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Under Section 25(3) of the Drugs & Cosmetics Act 1940, the report of the Government Analyst shall be conclusive evidence unless within 28 days of receipt the manufacturer notifies intention to controvert.
              </p>

              <div className="space-y-1.5 text-xs">
                <label 
                  onClick={() => setLegalOption('accept')}
                  className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                    legalOption === 'accept'
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <input type="radio" checked={legalOption === 'accept'} onChange={() => {}} className="accent-emerald-500" />
                  <span className="font-medium">Accept CDL Findings & Release</span>
                </label>

                <label 
                  onClick={() => setLegalOption('controvert')}
                  className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                    legalOption === 'controvert'
                      ? 'bg-rose-950/30 border-rose-500/50 text-rose-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <input type="radio" checked={legalOption === 'controvert'} onChange={() => {}} className="accent-rose-500" />
                  <span className="font-medium">Controvert Under Sec 25(3) (Appeal)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Main Facsimile & Telemetry (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Authentic Form 13 Facsimile Card */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-6 space-y-5 shadow-sm">
              
              {/* Top Govt Certificate Header */}
              <div className="text-center border-b border-slate-800 pb-4 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono mb-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>CENTRAL DRUGS TESTING LABORATORY · CDSCO</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white font-display-heading">
                  FORM 13 (See Rule 46)
                </h3>
                <p className="text-xs text-slate-400">
                  Certificate of Test or Analysis by Government Analyst under Section 25(1) of Drugs & Cosmetics Act 1940
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-xs font-mono text-slate-400 pt-1">
                  <span>Certificate: <strong className="text-sky-400">{selectedReport.reportNumber}</strong></span>
                  <span>Date: <strong className="text-slate-200">{selectedReport.receivedDate}</strong></span>
                  <span>Batch: <strong className="text-white">{selectedReport.batchId}</strong></span>
                </div>
              </div>

              {/* Sample Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono">SAMPLE DESCRIPTION</span>
                  <p className="font-bold text-white mt-0.5">{selectedReport.drugName}</p>
                  <p className="text-slate-400 text-[11px]">{selectedReport.composition}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono">SUBMITTING OFFICER & LAB</span>
                  <p className="font-bold text-slate-200 mt-0.5">Shri V. Ramanathan (Drug Inspector, Zone 4)</p>
                  <p className="text-slate-400 text-[11px]">{selectedReport.labName}</p>
                </div>
              </div>

              {/* Results Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
                  Analytical Test Parameters & Monograph Compliance
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs bg-slate-950 rounded-lg border border-slate-800">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono">
                        <th className="p-2.5">PARAMETER</th>
                        <th className="p-2.5">STATUTORY SPECIFICATION</th>
                        <th className="p-2.5">RESULT FOUND</th>
                        <th className="p-2.5 text-right">COMPLIANCE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {selectedReport.parameters.map((param, i) => (
                        <tr key={i} className="hover:bg-slate-900/50">
                          <td className="p-2.5 font-semibold text-white">{param.parameter}</td>
                          <td className="p-2.5 text-slate-400 font-mono text-[11px]">{param.specification}</td>
                          <td className="p-2.5 font-mono text-slate-200 text-[11px]">{param.resultFound}</td>
                          <td className="p-2.5 text-right">
                            {param.passed ? (
                              <span className="inline-flex items-center gap-1 text-emerald-400 text-[10px] font-bold font-mono">
                                <Check className="w-3 h-3" />
                                PASSED
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-rose-400 text-[10px] font-bold font-mono">
                                <XCircle className="w-3 h-3" />
                                FAILED
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Official Opinion Box */}
              <div className={`p-4 rounded-xl border space-y-1.5 ${
                selectedReport.status === 'PASSED'
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                  : selectedReport.status === 'NSQ FAILED'
                  ? 'bg-rose-950/20 border-rose-500/40 text-rose-300'
                  : 'bg-amber-950/20 border-amber-500/40 text-amber-300'
              }`}>
                <div className="flex items-center gap-2">
                  {selectedReport.status === 'PASSED' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                  )}
                  <span className="text-xs font-bold uppercase font-mono">
                    GOVERNMENT ANALYST OPINION & DECLARATION
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-slate-200">
                  {selectedReport.statusDetails}
                </p>
                <div className="pt-2 text-[10px] text-slate-400 flex justify-between items-end">
                  <span>Dr. S. K. Mukherjee, Senior Government Analyst</span>
                  <span className="font-mono">DIGITAL SIGNATURE: CDL-KOL-GOV-2026</span>
                </div>
              </div>

              {/* Instrumental Telemetry (HPLC & Dissolution curves) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono text-sky-400 uppercase">
                    HPLC CHROMATOGRAM TELEMETRY (RT PEAKS)
                  </span>
                  <div className="h-20 flex items-end">
                    <svg className="w-full h-full text-sky-400" preserveAspectRatio="none" viewBox="0 0 100 40">
                      <path
                        d="M0,38 L30,38 L34,36 L38,10 L42,36 L46,38 L65,38 L68,36 L72,4 L76,36 L80,38 L100,38"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Atorvastatin (4.82m)</span>
                    <span>Ezetimibe (8.14m)</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase">
                    IN-VITRO DISSOLUTION KINETICS (30 MIN)
                  </span>
                  <div className="h-20 flex items-end">
                    <svg className="w-full h-full text-emerald-400" preserveAspectRatio="none" viewBox="0 0 100 40">
                      <path
                        d="M0,38 Q30,10 60,6 T100,4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line x1="0" y1="12" x2="100" y2="12" stroke="#64748b" strokeDasharray="2,2" strokeWidth="0.8" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Target: Q &gt; 80%</span>
                    <span className="text-emerald-400 font-bold">Achieved: 94.2%</span>
                  </div>
                </div>
              </div>

              {/* Release Execution Action */}
              <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-white">Dispensary Clearance Execution</p>
                  <p className="text-[11px] text-slate-400">
                    Lifts quarantine hold and authorizes placement into active dispensary dispensing shelf.
                  </p>
                </div>

                {selectedReport.status === 'PASSED' ? (
                  !quarantineLifted ? (
                    <button
                      onClick={handleLiftQuarantine}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-all shrink-0 flex items-center justify-center gap-1.5"
                    >
                      <Key className="w-4 h-4" />
                      <span>Lift Quarantine Hold & Commit</span>
                    </button>
                  ) : (
                    <div className="px-4 py-2 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>QUARANTINE LIFTED · ACTIVE SHELF</span>
                    </div>
                  )
                ) : (
                  <button
                    disabled
                    className="px-4 py-2 rounded-lg bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs font-bold shrink-0 opacity-70 cursor-not-allowed"
                  >
                    Hold Enforced (NSQ Non-Compliance)
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

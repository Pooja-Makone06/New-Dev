import React, { useState } from 'react';
import { 
  FileCheck2, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  QrCode, 
  Scan, 
  Lock, 
  Thermometer, 
  Printer, 
  FileText, 
  ArrowRight,
  User,
  MapPin,
  Sparkles,
  ExternalLink,
  ZoomIn,
  Key,
  X
} from 'lucide-react';
import { ORDERS_QUEUE, ASSETS } from '../../data/mockData';
import { FulfillmentOrder } from '../../types';

export const FulfillmentQueue: React.FC = () => {
  const [orders, setOrders] = useState<FulfillmentOrder[]>(ORDERS_QUEUE);
  const [selectedOrderId, setSelectedOrderId] = useState<string>(ORDERS_QUEUE[0].id);
  const [rxZoomed, setRxZoomed] = useState<boolean>(false);
  const [signedOrders, setSignedOrders] = useState<Record<string, boolean>>({});
  const [handedOverOrders, setHandedOverOrders] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState<boolean>(false);

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || orders[0];
  const isSigned = !!signedOrders[selectedOrder.id];
  const isHandedOver = !!handedOverOrders[selectedOrder.id];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleSignOrder = () => {
    setSignedOrders(prev => ({ ...prev, [selectedOrder.id]: true }));
    showToast(`Order #${selectedOrder.id} signed under Rule 65(11A). Form 20/21 Invoice generated!`);
  };

  const handleHandover = () => {
    setHandedOverOrders(prev => ({ ...prev, [selectedOrder.id]: true }));
    showToast(`Order #${selectedOrder.id} handed over to delivery partner Vikram Singh!`);
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

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-5">
        
        {/* Dispensary Header Bar */}
        <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold font-mono text-base shrink-0">
                #0482
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-bold text-white font-display-heading">
                    PM Bhartiya Janaushadhi Kendra #0482
                  </h1>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
                    DL-SW-21B-00891
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                  <span>Safdarjung Enclave, New Delhi</span>
                  <span>·</span>
                  <span className="text-slate-300">Duty Pharmacist: <strong className="text-white">Priya Sharma, M.Pharm (Reg #39012)</strong></span>
                </p>
              </div>
            </div>

            {/* Shift Counters */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                <span>RX REVIEW (3)</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                TO DISPENSE (4)
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                COLD-SEAL (2)
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                TODAY: <strong className="text-emerald-400">38</strong> (Saved ₹1.42L)
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Layout: Left Queue, Center Rx Concordance, Right Batch & Sign */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Column 1: Fulfillment Orders Queue (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                Incoming Fulfillment Queue ({orders.length})
              </h2>
              <span className="text-[10px] text-sky-400 font-mono">SLA &lt;15 mins</span>
            </div>

            <div className="space-y-2.5">
              {orders.map((order) => {
                const isSelected = order.id === selectedOrderId;
                const signed = signedOrders[order.id];
                const handedOver = handedOverOrders[order.id];

                return (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrderId(order.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-900 border-sky-500 shadow-md ring-1 ring-sky-500/30'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded">
                          #{order.id}
                        </span>
                        <h3 className="text-xs font-bold text-white mt-1">
                          {order.patientName} ({order.patientAge}/{order.patientGender})
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold font-mono text-emerald-400">
                          ₹{order.totalAmount.toFixed(2)}
                        </span>
                        <p className="text-[10px] text-slate-500">{order.distance}</p>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 truncate mt-1">
                      {order.items[0]?.name}
                    </p>

                    <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {order.slaElapsedMins}m / {order.slaMins}m
                      </span>

                      {handedOver ? (
                        <span className="text-emerald-400 font-bold">HANDED OVER</span>
                      ) : signed ? (
                        <span className="text-sky-400 font-bold">DISPENSE SIGNED</span>
                      ) : (
                        <span className="text-amber-400">{order.status}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Prescription Concordance Engine (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-sky-400" />
                  <h2 className="text-sm font-bold text-white font-display-heading">
                    Prescription Concordance Engine (OCR & Salt Match)
                  </h2>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  100% MATCH
                </span>
              </div>

              {/* Patient & Doctor Banner */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">PATIENT IDENTIFIER</span>
                  <p className="font-bold text-white mt-0.5">{selectedOrder.patientName}</p>
                  <p className="text-[11px] text-slate-400 truncate">{selectedOrder.address}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">PRESCRIBING PHYSICIAN</span>
                  <p className="font-bold text-sky-400 mt-0.5">{selectedOrder.doctor.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{selectedOrder.doctor.mciReg}</p>
                </div>
              </div>

              {/* Interactive E-Prescription Scan Visualizer with OCR Bounding Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">e-Prescription Scan & OCR Layer</span>
                  <button 
                    onClick={() => setRxZoomed(!rxZoomed)} 
                    className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-mono text-[11px]"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>{rxZoomed ? 'Standard View' : 'Inspect Bounding Box'}</span>
                  </button>
                </div>

                <div className={`relative rounded-xl border border-slate-700 bg-slate-950 p-4 transition-all overflow-hidden ${
                  rxZoomed ? 'ring-2 ring-sky-400 scale-[1.02]' : ''
                }`}>
                  {/* Paper prescription styling */}
                  <div className="bg-white text-slate-900 p-4 rounded-lg shadow-inner font-mono text-xs space-y-2">
                    <div className="flex justify-between border-b pb-2 border-slate-300">
                      <div>
                        <p className="font-bold text-sm tracking-tight text-slate-900">{selectedOrder.doctor.clinic}</p>
                        <p className="text-[10px] text-slate-600">{selectedOrder.doctor.name} · {selectedOrder.doctor.mciReg}</p>
                      </div>
                      <div className="text-right text-[10px] text-slate-500">
                        <p>Date: 04-Mar-2026</p>
                        <p className="text-emerald-700 font-bold">CHRONIC RX: VALID 180D</p>
                      </div>
                    </div>

                    <div className="pt-1 text-[11px]">
                      <p className="text-slate-700">Pt: <strong className="text-slate-900">{selectedOrder.patientName}</strong>, {selectedOrder.patientAge}y/{selectedOrder.patientGender}</p>
                      <p className="text-slate-500 text-[10px]">Dx: Dyslipidemia & Type-2 Diabetes Mellitus</p>
                    </div>

                    {/* OCR Bounding Box Overlay */}
                    <div className="p-2.5 my-1 bg-amber-50 border-2 border-dashed border-amber-500 rounded relative">
                      <span className="absolute -top-2.5 right-2 bg-amber-600 text-white text-[9px] px-1.5 py-0.2 rounded font-mono font-bold">
                        OCR CONFIRMED 99.8%
                      </span>
                      <p className="font-serif italic font-bold text-slate-800 text-xs sm:text-sm">
                        Rx:
                      </p>
                      <p className="font-mono font-semibold text-slate-900 text-xs">
                        1. Tab Atorvastatin 10mg + Ezetimibe 10mg — 1 OD HS
                      </p>
                      <p className="font-mono font-semibold text-slate-900 text-xs">
                        2. Tab Metformin HCl 500mg SR — 1 BD PC
                      </p>
                    </div>

                    <div className="flex justify-between items-end pt-2 text-[10px] text-slate-500">
                      <span>NMC Electronic Prescription Signature Validated</span>
                      <div className="text-right border-t border-slate-400 pt-0.5">
                        <span className="font-serif italic font-bold text-slate-800">Dr. A. Thorne</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Concordance Checklist */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>NMC / MCI Doctor Registration Check</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">VERIFIED</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>180-Day Chronic Prescription Window</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">ACTIVE (DAY 14)</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Exact Salt & Strength Equivalence</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">100% IDENTICAL</span>
                </div>
              </div>

            </div>
          </div>

          {/* Column 3: Batch Allocation, 2D Scan & Pharmacist Sign-Off (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Batch Allocation & 2D Verification */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-sky-400" />
                  <h3 className="text-sm font-bold text-white font-display-heading">
                    Physical Batch Allocation & 2D Scan
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400">GS1-128 READY</span>
              </div>

              <div className="space-y-3">
                {selectedOrder.items.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 space-y-1.5 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-white">{item.name}</span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                        SCAN OK
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 font-mono">
                      <span>Batch: <strong className="text-sky-400">{item.batchNo}</strong></span>
                      <span>Exp: <strong className="text-slate-200">{item.expDate}</strong></span>
                      <span>Bin: <strong className="text-slate-300">{item.storageBin}</strong></span>
                      <span>Qty: <strong className="text-slate-200">{item.quantity}</strong></span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tamper & Cold Chain Telemetry */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Thermometer className="w-3.5 h-3.5 text-sky-400" />
                    <span>IoT Pouch Sensor #IOT-DL-8924</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">18.2°C (Safe 15-25°C)</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Holographic Barcode Seal</span>
                  </div>
                  <span className="font-mono text-slate-300">#SEAL-90821-DEL</span>
                </div>
              </div>

              {/* Pharmacist Statutory Sign-Off Box */}
              <div className="p-3.5 rounded-lg bg-sky-950/20 border border-sky-500/30 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <img 
                    src={ASSETS.pharmacistPriya} 
                    alt="Priya Sharma" 
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-sky-400"
                  />
                  <div>
                    <p className="text-xs font-bold text-white">Priya Sharma, M.Pharm</p>
                    <p className="text-[10px] text-sky-400 font-mono">Reg #DL-39012 · USB Token Active</p>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Dispensed in accordance with Drugs & Cosmetics Act 1940 Rule 65(11A). Digital signature affixed to invoice.
                </p>

                {/* Primary Action Buttons */}
                <div className="space-y-2 pt-1">
                  {!isSigned ? (
                    <button
                      onClick={handleSignOrder}
                      className="w-full py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Key className="w-4 h-4" />
                      <span>Authorize & Sign Form 20/21 (₹{selectedOrder.totalAmount.toFixed(2)})</span>
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded text-center text-xs text-emerald-300 font-semibold flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Prescription Digitally Signed & Stamped</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setShowInvoiceModal(true)}
                          className="py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center justify-center gap-1"
                        >
                          <Printer className="w-3.5 h-3.5 text-sky-400" />
                          <span>View Invoice</span>
                        </button>

                        {!isHandedOver ? (
                          <button
                            onClick={handleHandover}
                            className="py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition-all flex items-center justify-center gap-1"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                            <span>Courier Handover</span>
                          </button>
                        ) : (
                          <div className="py-1.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono text-center font-bold">
                            HANDED OVER
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Modal: Form 20/21 Invoice Viewer */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-emerald-400">TAX INVOICE & DISPENSE CERTIFICATE</span>
                <h3 className="text-base font-bold text-white">Form 20 / 21 Drug Sale Bill</h3>
              </div>
              <button onClick={() => setShowInvoiceModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-white text-slate-900 rounded-lg font-mono text-xs space-y-3">
              <div className="text-center border-b pb-2">
                <p className="font-bold text-sm">PM BHARTIYA JANAUSHADHI KENDRA #0482</p>
                <p className="text-[11px] text-slate-600">DL-SW-21B-00891 · GSTIN: 07AAAPJ0482K1Z8</p>
                <p className="text-[10px] text-slate-500">Invoice: INV-2026-DEL-0482-892401 · Date: 08-Mar-2026</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] border-b pb-2">
                <div>
                  <p className="font-bold">Customer: {selectedOrder.patientName}</p>
                  <p className="text-slate-600">{selectedOrder.address}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Doctor: {selectedOrder.doctor.name}</p>
                  <p className="text-slate-600">{selectedOrder.doctor.mciReg}</p>
                </div>
              </div>

              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="border-b">
                    <th className="py-1">Description</th>
                    <th className="py-1">Batch</th>
                    <th className="py-1">Exp</th>
                    <th className="py-1 text-right">MRP</th>
                    <th className="py-1 text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, i) => (
                    <tr key={i} className="border-b border-slate-200">
                      <td className="py-1 font-sans text-[11px]">{item.name}</td>
                      <td className="py-1">{item.batchNo}</td>
                      <td className="py-1">{item.expDate}</td>
                      <td className="py-1 text-right line-through text-slate-400">₹{item.mrp.toFixed(2)}</td>
                      <td className="py-1 text-right font-bold">₹{item.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center pt-2 font-bold text-xs border-t">
                <span className="text-emerald-700">Total Patient Savings: ₹763.00 (87.5%)</span>
                <span>Net Payable: ₹{selectedOrder.totalAmount.toFixed(2)}</span>
              </div>

              <div className="pt-2 text-[10px] text-slate-500 flex justify-between items-end border-t">
                <div>
                  <p>Digitally signed by Registered Pharmacist</p>
                  <p className="font-semibold text-slate-800">Priya Sharma (Reg #39012)</p>
                </div>
                <span className="font-mono text-[9px] bg-slate-100 p-1 rounded">AUTH HASH: 0x9a88...c112</span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowInvoiceModal(false);
                  showToast('Invoice printed to dispensary receipt printer');
                }}
                className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs"
              >
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

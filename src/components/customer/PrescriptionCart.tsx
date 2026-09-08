import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  CreditCard, 
  ArrowRight, 
  Sparkles,
  Lock,
  UploadCloud,
  Trash2,
  Plus,
  Minus,
  MapPin,
  Building2,
  Check,
  Printer,
  QrCode,
  Truck,
  HelpCircle
} from 'lucide-react';

interface PrescriptionCartProps {
  onNavigateToTracking: () => void;
}

interface FormMedicineItem {
  id: string;
  name: string;
  salt: string;
  genericPrice: number;
  innovatorPrice: number;
  quantity: number;
  packSize: string;
  batchNo: string;
  expiry: string;
}

export const PrescriptionCart: React.FC<PrescriptionCartProps> = ({ onNavigateToTracking }) => {
  // Form State
  const [patientName, setPatientName] = useState('Ananya Roy');
  const [patientAge, setPatientAge] = useState('29');
  const [patientGender, setPatientGender] = useState('female');
  const [patientPhone, setPatientPhone] = useState('9810294821');
  const [abhaId, setAbhaId] = useState('91-8402-9912-40');
  const [patientEmail, setPatientEmail] = useState('ananya.roy@caremail.in');

  // Prescription File & Doctor State
  const [rxFileName, setRxFileName] = useState('Dr_Thorne_Cardiology_Rx_Feb2026.pdf');
  const [rxFileSize, setRxFileSize] = useState('2.4 MB');
  const [rxUploaded, setRxUploaded] = useState(true);
  const [doctorName, setDoctorName] = useState('Dr. Aris Thorne, MD');
  const [doctorRegNo, setDoctorRegNo] = useState('MCI/DEL/7012945');
  const [clinicName, setClinicName] = useState('City Care Medical Clinic & Heart Institute');
  const [rxDate, setRxDate] = useState('2026-02-28');
  const [dosageDuration, setDosageDuration] = useState('30 Days (Chronic Maintenance)');

  // Medicines List
  const [medicines, setMedicines] = useState<FormMedicineItem[]>([
    {
      id: 'm1',
      name: 'Generic Atorvastatin + Ezetimibe 10/10mg',
      salt: 'Atorvastatin 10mg + Ezetimibe 10mg',
      genericPrice: 24.0,
      innovatorPrice: 248.0,
      quantity: 1,
      packSize: '10 Tablets / Strip',
      batchNo: 'PMBI-2401',
      expiry: '11/2026'
    },
    {
      id: 'm2',
      name: 'Generic Metformin HCl Prolonged-Release 500mg',
      salt: 'Metformin Hydrochloride 500mg PR',
      genericPrice: 18.0,
      innovatorPrice: 90.0,
      quantity: 2,
      packSize: '10 Tablets / Strip',
      batchNo: 'MET-9921',
      expiry: '08/2026'
    }
  ]);

  // Delivery Details
  const [deliveryStreet, setDeliveryStreet] = useState('Flat 402, Block B, Silver Oak Apartments, Ring Road');
  const [deliveryArea, setDeliveryArea] = useState('Lajpat Nagar IV');
  const [deliveryPin, setDeliveryPin] = useState('110024');
  const [deliveryCity, setDeliveryCity] = useState('New Delhi');
  const [deliveryState, setDeliveryState] = useState('Delhi');
  const [deliverySlot, setDeliverySlot] = useState('express');
  const [coldChainRequired, setColdChainRequired] = useState(true);

  // Statutory Declarations & Payment
  const [rule65Consent, setRule65Consent] = useState(true);
  const [originalRxDeclaration, setOriginalRxDeclaration] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('ananya.roy@oksbi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState<any | null>(null);

  // Quantity updates
  const updateQuantity = (id: string, delta: number) => {
    setMedicines(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeMedicine = (id: string) => {
    if (medicines.length > 1) {
      setMedicines(prev => prev.filter(item => item.id !== id));
    }
  };

  // Financial calculations
  const innovatorTotal = medicines.reduce((sum, item) => sum + (item.innovatorPrice * item.quantity), 0);
  const genericTotal = medicines.reduce((sum, item) => sum + (item.genericPrice * item.quantity), 0);
  const savings = innovatorTotal - genericTotal;
  const savingsPercent = Math.round((savings / innovatorTotal) * 100);
  const deliveryFee = deliverySlot === 'express' ? 49.0 : 25.0;
  const coldChainFee = coldChainRequired ? 15.0 : 0.0;
  const netPayable = genericTotal + deliveryFee + coldChainFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rule65Consent || !originalRxDeclaration) {
      alert('Please confirm the mandatory statutory declarations under CDSCO Rule 65(11A) before submitting.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderReceipt({
        orderId: 'GM-892401-DL',
        submissionTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        kendra: 'Jan Aushadhi Kendra #0482 (Lajpat Nagar)',
        pharmacist: 'Priya Sharma (Reg #DL-39012)',
        amount: netPayable.toFixed(2),
        savings: savings.toFixed(2),
        payment: selectedPayment.toUpperCase()
      });
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 text-slate-100">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono font-semibold border border-emerald-500/20">
              GOVERNMENT PMBI · CDSCO RULE 65(11A) FORM
            </span>
            <span className="text-xs text-slate-500 font-mono">FORM ID: #WF-RX-2026-9042</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display-heading mt-1">
            Patient Medicine Order & Prescription Web Form
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Submit doctor prescription details, configure bioequivalent generic medicines, and route to your nearest Jan Aushadhi Kendra.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono text-right">
            <strong>Subsidized Generic Pricing:</strong> Save {savingsPercent}% on this order
          </div>
        </div>
      </div>

      {/* Main Form Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Structured Form Sections */}
        <div className="lg:col-span-2 space-y-6">

          {/* Section 1: Beneficiary & Patient Identification */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-bold uppercase">
                <span className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center text-[11px]">1</span>
                <span>Beneficiary & Patient Information</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">ABHA INTEGRATED</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label htmlFor="patient-full-name" className="block text-slate-300 font-medium mb-1">
                  Patient Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  id="patient-full-name"
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="patient-age" className="block text-slate-300 font-medium mb-1">
                    Age <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="patient-age"
                    type="number"
                    required
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="patient-gender" className="block text-slate-300 font-medium mb-1">
                    Gender
                  </label>
                  <select
                    id="patient-gender"
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="patient-mobile" className="block text-slate-300 font-medium mb-1">
                  10-Digit Mobile Number <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-mono">+91</span>
                  <input
                    id="patient-mobile"
                    type="tel"
                    required
                    maxLength={10}
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full pl-12 pr-20 p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-sky-500"
                  />
                  <span className="absolute right-2 top-2 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono flex items-center gap-1">
                    <Check className="w-2.5 h-2.5" /> Verified
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="patient-abha" className="block text-slate-300 font-medium mb-1">
                  ABHA Health Account ID (Ayushman Bharat)
                </label>
                <input
                  id="patient-abha"
                  type="text"
                  value={abhaId}
                  onChange={(e) => setAbhaId(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Prescription Document Upload & Schedule H Compliance */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-bold uppercase">
                <span className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center text-[11px]">2</span>
                <span>Prescription Upload & Schedule H Statutory Gate</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] font-mono border border-amber-500/20">
                DRUGS & COSMETICS ACT RULE 65
              </span>
            </div>

            {/* Drag and Drop File Upload Container */}
            <div className="p-4 rounded-xl bg-slate-950 border-2 border-dashed border-slate-700 hover:border-sky-500 transition-colors">
              {rxUploaded ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{rxFileName}</p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {rxFileSize} · PDF Document · OCR Extraction Completed
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-mono flex items-center gap-1">
                      <Check className="w-3 h-3" /> Validated
                    </span>
                    <button
                      type="button"
                      onClick={() => setRxUploaded(false)}
                      className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1 rounded hover:bg-rose-500/10"
                    >
                      Replace
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 space-y-2">
                  <UploadCloud className="w-8 h-8 text-sky-400 mx-auto" />
                  <p className="text-xs text-slate-200 font-medium">
                    Drag and drop your Doctor's Prescription here, or{' '}
                    <label htmlFor="prescription-file" className="text-sky-400 hover:underline cursor-pointer">
                      browse device files
                    </label>
                  </p>
                  <p className="text-[11px] text-slate-500">Supports PDF, JPG, PNG up to 10MB</p>
                  <input
                    id="prescription-file"
                    type="file"
                    className="hidden"
                    onChange={() => {
                      setRxFileName('Scanned_Doctor_Prescription.pdf');
                      setRxFileSize('1.8 MB');
                      setRxUploaded(true);
                    }}
                  />
                </div>
              )}
            </div>

            {/* Prescribing Doctor & Institution Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
              <div>
                <label htmlFor="doctor-name" className="block text-slate-300 font-medium mb-1">
                  Prescribing Doctor's Name <span className="text-rose-400">*</span>
                </label>
                <input
                  id="doctor-name"
                  type="text"
                  required
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label htmlFor="doctor-reg" className="block text-slate-300 font-medium mb-1">
                  Doctor MCI / State Medical Council Registration No. <span className="text-rose-400">*</span>
                </label>
                <input
                  id="doctor-reg"
                  type="text"
                  required
                  value={doctorRegNo}
                  onChange={(e) => setDoctorRegNo(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label htmlFor="clinic-name" className="block text-slate-300 font-medium mb-1">
                  Hospital / Clinic Name
                </label>
                <input
                  id="clinic-name"
                  type="text"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="rx-date" className="block text-slate-300 font-medium mb-1">
                    Prescription Date <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="rx-date"
                    type="date"
                    required
                    value={rxDate}
                    onChange={(e) => setRxDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="dosage-duration" className="block text-slate-300 font-medium mb-1">
                    Prescription Validity
                  </label>
                  <select
                    id="dosage-duration"
                    value={dosageDuration}
                    onChange={(e) => setDosageDuration(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="30 Days (Chronic Maintenance)">30 Days (Chronic)</option>
                    <option value="60 Days (Bimonthly)">60 Days</option>
                    <option value="90 Days (Quarterly)">90 Days</option>
                    <option value="180 Days (Semi-Annual)">180 Days</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Prescribed Formulation & Generic Substitution Selector */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-bold uppercase">
                <span className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center text-[11px]">3</span>
                <span>Configured Generic Formulations ({medicines.length} Items)</span>
              </div>
              <span className="text-xs font-mono text-emerald-400">100% SALT BIOEQUIVALENCE</span>
            </div>

            <div className="space-y-3">
              {medicines.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 font-mono text-[10px]">
                        NLEM CERTIFIED
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Batch: {item.batchNo}</span>
                      <span className="text-[10px] font-mono text-emerald-400">Exp: {item.expiry}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{item.name}</h4>
                    <p className="text-xs text-slate-400 font-mono">
                      Active Molecule: <span className="text-slate-300">{item.salt}</span> · {item.packSize}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="text-right font-mono">
                      <div className="text-sm font-bold text-emerald-400">
                        ₹{(item.genericPrice * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-[11px] text-slate-500 line-through">
                        ₹{(item.innovatorPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    {/* Quantity Controller */}
                    <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800"
                        title="Decrease Strips"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-1 text-xs font-mono font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800"
                        title="Increase Strips"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeMedicine(item.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Delivery Address & Kendra Allocation */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-bold uppercase">
                <span className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center text-[11px]">4</span>
                <span>Delivery Address & Fulfilment Dispensary</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>Kendra #0482 Auto-Mapped (1.2 km)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label htmlFor="delivery-street" className="block text-slate-300 font-medium mb-1">
                  Street Address / Flat / Building <span className="text-rose-400">*</span>
                </label>
                <input
                  id="delivery-street"
                  type="text"
                  required
                  value={deliveryStreet}
                  onChange={(e) => setDeliveryStreet(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label htmlFor="delivery-area" className="block text-slate-300 font-medium mb-1">
                  Locality / Landmark
                </label>
                <input
                  id="delivery-area"
                  type="text"
                  value={deliveryArea}
                  onChange={(e) => setDeliveryArea(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label htmlFor="delivery-pincode" className="block text-slate-300 font-medium mb-1">
                  Postal PIN Code <span className="text-rose-400">*</span>
                </label>
                <input
                  id="delivery-pincode"
                  type="text"
                  required
                  maxLength={6}
                  value={deliveryPin}
                  onChange={(e) => setDeliveryPin(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label htmlFor="delivery-city" className="block text-slate-300 font-medium mb-1">
                  City <span className="text-rose-400">*</span>
                </label>
                <input
                  id="delivery-city"
                  type="text"
                  required
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label htmlFor="delivery-state" className="block text-slate-300 font-medium mb-1">
                  State <span className="text-rose-400">*</span>
                </label>
                <input
                  id="delivery-state"
                  type="text"
                  required
                  value={deliveryState}
                  onChange={(e) => setDeliveryState(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Delivery Slot & Cold-Chain Checkbox */}
            <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Fulfillment Transit Speed</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliverySlot('express')}
                    className={`p-2 rounded-lg border text-left transition-colors ${
                      deliverySlot === 'express'
                        ? 'bg-sky-950/60 border-sky-500 text-sky-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <p className="font-bold">2-Hour Express (₹49)</p>
                    <p className="text-[10px] text-slate-400">Rider dispatched directly</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliverySlot('standard')}
                    className={`p-2 rounded-lg border text-left transition-colors ${
                      deliverySlot === 'standard'
                        ? 'bg-sky-950/60 border-sky-500 text-sky-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <p className="font-bold">Standard Same-Day (₹25)</p>
                    <p className="text-[10px] text-slate-400">By 19:00 IST today</p>
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={coldChainRequired}
                    onChange={(e) => setColdChainRequired(e.target.checked)}
                    className="mt-0.5 accent-sky-500 rounded"
                  />
                  <div>
                    <span className="font-bold text-white">Insulated Cold-Chain Pouch (+₹15.00)</span>
                    <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                      Includes 2°C–8°C thermal gel pack & tamper-evident live IoT digital temperature logger seal.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Section 5: Statutory Declarations & Informed Consent */}
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-amber-300 font-mono font-bold uppercase">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Statutory Compliance & Patient Informed Consent (Rule 65)</span>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                id="consent-rule65"
                type="checkbox"
                required
                checked={rule65Consent}
                onChange={(e) => setRule65Consent(e.target.checked)}
                className="mt-0.5 accent-emerald-500 rounded"
              />
              <span className="text-slate-300 text-[11px] leading-relaxed">
                I hereby grant informed consent under <strong className="text-white">Rule 65(11A) of Drugs & Cosmetics Rules 1945</strong> to receive bioequivalent, CDSCO-certified Jan Aushadhi generic formulations in lieu of commercial innovator branded equivalents.
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                id="consent-rxoriginal"
                type="checkbox"
                required
                checked={originalRxDeclaration}
                onChange={(e) => setOriginalRxDeclaration(e.target.checked)}
                className="mt-0.5 accent-emerald-500 rounded"
              />
              <span className="text-slate-300 text-[11px] leading-relaxed">
                I confirm that the uploaded prescription was issued by a registered medical practitioner (MCI / State Council) and remains unexpired and clinically active.
              </span>
            </label>
          </div>
        </div>

        {/* Right 1 Column: Sticky Financial Summary, Payment & Submission */}
        <div className="space-y-6">
          <div className="sticky top-16 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                GOVERNMENT SUBSIDY SUMMARY
              </span>
              <h3 className="text-xl font-bold text-white font-display-heading mt-0.5">
                Order & Pricing Ledger
              </h3>
            </div>

            {/* Savings Callout */}
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400">Total Savings</span>
                <p className="text-lg font-bold text-emerald-300 font-mono">₹{savings.toFixed(2)}</p>
              </div>
              <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
                {savingsPercent}% DISCOUNT
              </span>
            </div>

            {/* Ledger Items */}
            <div className="space-y-2 text-xs font-mono border-y border-slate-800 py-3">
              <div className="flex justify-between text-slate-400">
                <span>Innovator MRP Total:</span>
                <span className="line-through">₹{innovatorTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>GenericMed Kendra Price:</span>
                <span className="text-white">₹{genericTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Delivery ({deliverySlot}):</span>
                <span className="text-white">₹{deliveryFee.toFixed(2)}</span>
              </div>

              {coldChainRequired && (
                <div className="flex justify-between text-sky-400">
                  <span>Cold-Chain IoT Pouch:</span>
                  <span>₹{coldChainFee.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-emerald-400 font-bold pt-2 border-t border-slate-800 text-sm">
                <span>Total Net Payable:</span>
                <span>₹{netPayable.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2 text-xs">
              <label className="block text-slate-400 font-mono text-[10px] uppercase font-bold">
                Payment Channel
              </label>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPayment('upi')}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    selectedPayment === 'upi'
                      ? 'bg-sky-950/40 border-sky-500 text-sky-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <QrCode className="w-4 h-4 mx-auto mb-1 text-sky-400" />
                  <span>Instant UPI</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPayment('card')}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    selectedPayment === 'card'
                      ? 'bg-sky-950/40 border-sky-500 text-sky-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1 text-sky-400" />
                  <span>RuPay / Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPayment('netbanking')}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    selectedPayment === 'netbanking'
                      ? 'bg-sky-950/40 border-sky-500 text-sky-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <Building2 className="w-4 h-4 mx-auto mb-1 text-sky-400" />
                  <span>Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPayment('cod')}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    selectedPayment === 'cod'
                      ? 'bg-sky-950/40 border-sky-500 text-sky-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <Lock className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                  <span>Cash on Delivery</span>
                </button>
              </div>

              {selectedPayment === 'upi' && (
                <div className="pt-2">
                  <input
                    type="text"
                    placeholder="Enter UPI VPA (e.g. mobile@upi)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
              )}
            </div>

            {/* Submit Web Form Button */}
            <button
              id="submit-order-webform"
              type="submit"
              disabled={isProcessing || !rule65Consent || !originalRxDeclaration}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Routing to Kendra Pharmacist...</span>
              ) : (
                <>
                  <span>Submit Web Form & Pay ₹{netPayable.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Regulatory Footer Guarantee */}
            <div className="pt-2 text-center text-[10px] text-slate-500 font-mono space-y-1">
              <p>🔒 256-Bit Encrypted Statutory Transmission</p>
              <p>Verified by Priya Sharma, Reg Pharmacist (#DL-39012)</p>
            </div>
          </div>
        </div>
      </form>

      {/* Success Receipt Modal */}
      {orderReceipt && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl text-slate-100">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                  ORDER ACCEPTED · RULE 65(11A) SIGNED
                </span>
                <h3 className="text-lg font-bold text-white font-display-heading">
                  Web Form Successfully Submitted!
                </h3>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl space-y-2 text-xs font-mono border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Order ID:</span>
                <span className="text-white font-bold">{orderReceipt.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned Dispensary:</span>
                <span className="text-white">{orderReceipt.kendra}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Verifying Pharmacist:</span>
                <span className="text-emerald-400">{orderReceipt.pharmacist}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Beneficiary Savings:</span>
                <span className="text-emerald-400 font-bold">₹{orderReceipt.savings}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Paid:</span>
                <span className="text-white font-bold">₹{orderReceipt.amount}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setOrderReceipt(null);
                  onNavigateToTracking();
                }}
                className="flex-1 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold font-mono transition-all flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4" />
                <span>Track Delivery & Cold-Chain</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-all flex items-center gap-1.5"
                title="Print Form Receipt"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

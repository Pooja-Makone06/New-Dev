import { ScreenDefinition } from '../types';

export const SCREENS: ScreenDefinition[] = [
  // Central Regulatory (4 screens)
  {
    id: 'regulatory-overview',
    name: 'Governance & Operations Overview',
    category: 'Central Regulatory',
    badge: 'National Surveillance',
    imageRef: 'Image 7 / Slide 7',
    description: 'National marketplace surveillance, live telemetry, fraud alerts, and state-wise Kendra distribution.',
    keywords: ['kpi', 'dashboard', 'live', 'telemetry', 'compliance', 'fraud', 'cdsco', 'overview', 'surveillance']
  },
  {
    id: 'regulatory-salt-mapping',
    name: 'Catalog & Salt Mapping Studio',
    category: 'Central Regulatory',
    badge: 'Bioequivalence & DPCO',
    imageRef: 'Image 12 / Slide 12',
    description: 'Universal salt monograph dictionary, bioequivalence assays, and CDSCO formulation substitution rules.',
    keywords: ['salt', 'chemical', 'monograph', 'formulation', 'equivalence', 'substitution', 'innovator', 'dpco', 'catalogue']
  },
  {
    id: 'regulatory-orders-audit',
    name: 'Orders Intervention & Audit Console',
    category: 'Central Regulatory',
    badge: 'Escrow & Emergency Holds',
    imageRef: 'Audit & Escrow',
    description: 'SHA-256 immutable ledger, regulatory order interdiction, emergency recall holds, and grievance audit.',
    keywords: ['audit', 'orders', 'freeze', 'escrow', 'investigation', 'sha256', 'tamper-proof', 'recall', 'dispute']
  },
  {
    id: 'regulatory-settings',
    name: 'Commission & DPCO Price Guardrails',
    category: 'Central Regulatory',
    badge: 'Policy & Safety Engine',
    imageRef: 'Policy Guardrails',
    description: 'NPPA price ceiling enforcement, Jan Aushadhi commission splits, and automated compliance threshold flags.',
    keywords: ['pricing', 'settings', 'nppa', 'commission', 'rules', 'caps', 'thresholds', 'margins', 'policy']
  },

  // Dispensary Partner OS (6 screens)
  {
    id: 'dispensary-fulfillment',
    name: 'Fulfillment Queue & Rx Concordance',
    category: 'Dispensary Partner OS',
    badge: 'Rule 65(11A) Sign-Off',
    imageRef: 'Image 18 / Slide 18',
    description: 'Live order dispensing, biometric signature, concordance verification, and Rule 65(11A) pharmacist sign-off.',
    keywords: ['queue', 'dispense', 'pharmacist', 'concordance', 'sign-off', 'prescription', 'fulfillment', 'rule 65']
  },
  {
    id: 'dispensary-catalogue',
    name: 'Store Catalogue & SKU Pricing Studio',
    category: 'Dispensary Partner OS',
    badge: 'Batch Pricing & Jan Aushadhi',
    imageRef: 'Catalogue Studio',
    description: 'Local Kendra inventory manager, DPCO price ceiling verification, and subsidized Jan Aushadhi discounts.',
    keywords: ['catalogue', 'pricing', 'sku', 'jan aushadhi', 'margin', 'discounts', 'mrp', 'store inventory']
  },
  {
    id: 'dispensary-grn',
    name: 'Batch Inwarding & GRN Optical Scanner',
    category: 'Dispensary Partner OS',
    badge: 'GS1-128 & OCR Camera',
    imageRef: 'Image 5 / Slide 5',
    description: 'OCR camera stream, 2D DataMatrix scanning, and automated Good Receipt Note generation against CDSCO lot DB.',
    keywords: ['grn', 'ocr', 'camera', 'barcode', 'batch', 'expiry', 'scanner', 'optical', 'gs1-128', 'inwarding']
  },
  {
    id: 'dispensary-inventory',
    name: 'Inventory & Stock Management',
    category: 'Dispensary Partner OS',
    badge: 'FEFO Queue & Fridge IoT',
    imageRef: 'Image 10 / Slide 10',
    description: 'FEFO priority rotation, cold-chain Bluetooth refrigerator telemetry (2°C - 8°C), and stock expiry prediction.',
    keywords: ['inventory', 'stock', 'fefo', 'cold chain', 'iot', 'temperature', 'refrigerator', 'telemetry', 'batch stock']
  },
  {
    id: 'dispensary-form13',
    name: 'Form 13 Lab Reports & CDL CoA',
    category: 'Dispensary Partner OS',
    badge: 'CDL Kolkata Test Assay',
    imageRef: 'Image 16 / Slide 16',
    description: 'Government analyst Certificate of Analysis (CoA), CDL Kolkata Form 13 compliance, and dissolution test logs.',
    keywords: ['lab', 'form 13', 'cdl', 'assay', 'certificate', 'quality', 'test report', 'kolkata', 'coa', 'dissolution']
  },
  {
    id: 'dispensary-earnings',
    name: 'Earnings, Commission & Settlements',
    category: 'Dispensary Partner OS',
    badge: 'T+2 Payouts & TDS Ledger',
    imageRef: 'Settlements Ledger',
    description: 'Daily pharmacy revenue, PMBI Kendra government subsidies, GST tax ledgers, and automated T+2 UPI settlements.',
    keywords: ['earnings', 'payout', 'settlements', 'tds', 'gst', 'revenue', 'ledger', 'commission', 'payouts']
  },

  // Patient Web Portal (6 screens)
  {
    id: 'customer-search',
    name: 'Generic vs Branded Price Comparison Web Directory',
    category: 'Patient Web Portal',
    badge: 'Multi-Pharmacy Index',
    imageRef: 'Price Index',
    description: 'Comprehensive generic vs branded price comparisons, active molecule search, and multi-Kendra pharmacy stock.',
    keywords: ['search', 'generic', 'branded', 'savings', 'compare', 'directory', 'jan aushadhi', 'price index', 'molecules']
  },
  {
    id: 'customer-detail',
    name: 'Medicine Profile & Bioequivalence Assay',
    category: 'Patient Web Portal',
    badge: 'Lab CoA & Side Effects',
    imageRef: 'Monograph Assay',
    description: 'Therapeutic chemical monograph, Indian Pharmacopoeia standards, 99.8% bioequivalence assay, and pack pricing.',
    keywords: ['detail', 'medicine', 'monograph', 'assay', 'bioequivalence', 'side effects', 'cdsco', 'profile', 'strip']
  },
  {
    id: 'customer-cart',
    name: 'Order & Prescription Web Form (Rule 65(11A))',
    category: 'Patient Web Portal',
    badge: '87.5% Savings & Rx Gate',
    imageRef: 'Image 3 / Slide 3',
    description: 'Prescription upload, patient ABHA credential linking, Schedule H gatekeeper, and Kendra order dispatch web form.',
    keywords: ['cart', 'order', 'web form', 'prescription', 'upload', 'schedule h', 'abha', 'checkout', 'rx', 'patient']
  },
  {
    id: 'customer-tracking',
    name: 'Live Order Tracking Console',
    category: 'Patient Web Portal',
    badge: 'IoT Pouch & Cold Seal',
    imageRef: 'Image 14 / Slide 14',
    description: 'Real-time delivery courier map, tamper-evident cold seal sensor tracking, and 24-minute Kendra express delivery.',
    keywords: ['tracking', 'delivery', 'live', 'gps', 'eta', 'temperature', 'cold seal', 'tamper-evident', 'courier', 'map']
  },
  {
    id: 'customer-refill',
    name: 'Medicine Review & Refill Sentinel',
    category: 'Patient Web Portal',
    badge: '1-Tap Express Refill',
    imageRef: 'Image 22 / Slide 22',
    description: 'Chronic medication adherence pulse (96%), 1-tap express refills, auto-refill rhythm sentinel, and duty pharmacist call.',
    keywords: ['refill', 'sentinel', 'adherence', 'chronic', 'duty pharmacist', 'express', 'repeat', 'consultation', 'auto-refill']
  },
  {
    id: 'customer-account',
    name: 'Customer Account & Saved Rx Vault',
    category: 'Patient Web Portal',
    badge: 'Order History & Vault',
    imageRef: 'Patient Vault',
    description: 'Encrypted patient prescription vault, past orders with GST tax invoice download, and saved Kendra delivery addresses.',
    keywords: ['account', 'history', 'vault', 'saved', 'prescriptions', 'addresses', 'invoices', 'pdf', 'reorder']
  }
];

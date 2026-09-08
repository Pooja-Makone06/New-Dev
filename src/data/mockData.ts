import { 
  AuditLogEntry, 
  PharmacyQueueItem, 
  PriceAnomalyItem, 
  GenericSubstitute, 
  FulfillmentOrder, 
  InventoryBatch, 
  Form13Report 
} from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1XBaYx6GwtOriLz8_rVHbr0i4KtreM81M0GvUC153NlLBsQ82h5lu4HZfq1LTTPCvaRp9bfyMJrGkJHMyf06fmHNWQe3YAQ1FgWHX3klqB0FR3BbpkDosNxCuyPRmr_JwK1c1Une7-CzCzR7uV3-Su5BxMmX45FEipoJABXGUZzuP_Sq7MzUSdOYSHc6KWoPPwXljvOI3YlHGMkDpBgQFvZM1kLE0lXuyQq26MmypGkxEYtXbE9xPmDXw',
  drRajeshVarma: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9dKEq4LbLoU2_if1PW9zvoNBOI3IKDVYwT96dYF7zutlZOYps1MLSkOwSCoaTzw4gF6zN8ff250aldO6Th4bRn939tS9gazhE3RWXOCoFxW5enhQrXIKoVX3vNIigl5jbHu3-z13raMtzmLgU-X5Jz_fvxUURmmx0OtzirlgCYi-sa1mnDhBsAWhYgwQYB8pF08y5B01TYTDvNfNabiu5j4cTyv1O2lKz4eYD3k6TBNXJqiu-h9Qk',
  pharmacistPriya: 'https://lh3.googleusercontent.com/aida/AEtjO1X2D3JafatlW8hlN4B60UtRdKjjyCJaWwCxuJcKZAFjVvvoPwIxOGi_qafOxbxcFUdQWBNcANo-SXU5YKG3PsqHOAEnpLO2BVvl5XFiu5r89sv63LJEKwSuvE8HSmnYMZj0DtKmbBrr6I-hE9vxNYYD0jrAkcEkqfzsjknXmq6UVDMwKl76ygy0KwNQ2v5L7AWfseIwiGvYSxUWdyUgXy_h8Qg5ROakS-VR4qzhZI2zpG1p9y_2Ra2EhQs',
  doctorVikram: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  riderVikram: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  blisterPack: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
  prescriptionSample: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'
};

export const INITIAL_PHARMACIES: PharmacyQueueItem[] = [
  {
    id: 'PHARM-DEL-0891',
    pharmacyName: 'Arogya Medico & Healthcare',
    location: 'Lajpat Nagar IV, New Delhi',
    pharmacist: 'Rakesh Verma, B.Pharm (Reg #39012)',
    licenseNumber: 'DL-SW-20B-98412',
    licenseForms: 'Form 20 / 21',
    validUntil: '14-Mar-2028',
    status: 'Biometric Verified',
    riskScore: '04/100',
    riskCategory: 'Low'
  },
  {
    id: 'PHARM-BLR-0412',
    pharmacyName: 'Shree Balaji Janaushadhi Hub',
    location: 'Indiranagar 100ft Rd, Bengaluru',
    pharmacist: 'Geeta Pillai, M.Pharm (Reg #44910)',
    licenseNumber: 'KA-BNG-20C-10294',
    licenseForms: 'Form 20B / 21B',
    validUntil: '22-Nov-2026',
    status: 'Under Inspection',
    riskScore: '68/100',
    riskCategory: 'Elevated'
  },
  {
    id: 'PHARM-MUM-1109',
    pharmacyName: 'Apollo Generic Care Partner #44',
    location: 'Dadar West, Mumbai',
    pharmacist: 'Saurabh Joshi, B.Pharm (Reg #22981)',
    licenseNumber: 'MH-MUM-20-449182',
    licenseForms: 'Form 20 / 21',
    validUntil: '09-Jan-2029',
    status: 'Biometric Verified',
    riskScore: '12/100',
    riskCategory: 'Low'
  },
  {
    id: 'PHARM-DEL-0112',
    pharmacyName: 'Jan Aushadhi Seva Kendra #112',
    location: 'Dwarka Sector 12, New Delhi',
    pharmacist: 'Anand Sharma, D.Pharm (Reg #19482)',
    licenseNumber: 'DL-DW-20B-44102',
    licenseForms: 'Form 20 / 21',
    validUntil: '30-Jun-2027',
    status: 'Pending Verification',
    riskScore: '41/100',
    riskCategory: 'Medium'
  }
];

export const INITIAL_ANOMALIES: PriceAnomalyItem[] = [
  {
    id: 'ANOM-01',
    sku: 'SKU-ROS-20MG',
    drugName: 'Rosuvastatin Calcium 20mg (10 tabs)',
    variancePercentage: 326,
    varianceType: 'PRICE_VARIANCE',
    description: 'Offered at ₹340.00 vs DPCO Ceil ₹79.80. Algorithmic hold applied.',
    currentPrice: 340.00,
    benchmarkPrice: 79.80,
    flaggedTimeAgo: '4 mins ago',
    source: 'Marketplace Price Scraper Node-02',
    sellerNode: 'Metro Pharma Logistics (DL-ND-89)',
    actionRequired: 'Cap Enforced or Delist SKU'
  },
  {
    id: 'ANOM-02',
    sku: 'SKU-MET-500SR',
    drugName: 'Metformin Hydrochloride SR 500mg (20 tabs)',
    varianceType: 'EXPIRY_GUARDRAIL',
    description: 'Inventory batch #MT-8841 expires in 28 days (<45 day threshold for chronic therapy).',
    flaggedTimeAgo: '18 mins ago',
    source: 'Automated Dispatch FEFO Sentinel',
    sellerNode: 'Kendra Partner #0482',
    actionRequired: 'Quarantine Batch from Cart'
  },
  {
    id: 'ANOM-03',
    sku: 'SKU-AMX-CV625',
    drugName: 'Amoxicillin + Pot. Clavulanate 625mg',
    varianceType: 'SALT_MISMATCH',
    description: 'Listing composition ratio 5:1 differs from CDSCO 7:1 pediatric standard monograph.',
    flaggedTimeAgo: '32 mins ago',
    source: 'Salt Concordance Engine v3.4',
    sellerNode: 'MediPlus Health Direct',
    actionRequired: 'Reject Formulation & Notify CDSCO'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'AUD-9082',
    timestamp: '14:22:18 IST',
    actor: {
      name: 'Dr. Rajesh Varma',
      initials: 'RV',
      role: 'Chief Regulatory Officer',
      avatar: ASSETS.drRajeshVarma
    },
    actionType: 'FORM-13 NABL CLEARANCE',
    actionColor: 'emerald',
    targetEntity: 'Batch #PMBI-2401 (Atorvastatin 10mg)',
    outcome: 'Assay verified at 99.8%. Quarantine lock lifted for 12,000 strips.',
    hash: '0x8f4c...91b2'
  },
  {
    id: 'AUD-9081',
    timestamp: '14:19:04 IST',
    actor: {
      name: 'Priya Sharma, M.Pharm',
      initials: 'PS',
      role: 'Registered Pharmacist (DL-0891)',
      avatar: ASSETS.pharmacistPriya
    },
    actionType: 'SCHEDULE H RX DISPENSE',
    actionColor: 'sky',
    targetEntity: 'Order #GM-892401-DEL (Rajiv Sharma)',
    outcome: 'Digital signature stamped under D&C Act Rule 65(11A). NMC reg #7012945 verified.',
    hash: '0x3a19...d04e'
  },
  {
    id: 'AUD-9080',
    timestamp: '14:02:41 IST',
    actor: {
      name: 'Automated Sentinel Node',
      initials: 'SN',
      role: 'System Bot (PROD-REG)',
    },
    actionType: 'OVERRIDE BLOCK',
    actionColor: 'rose',
    targetEntity: 'Pharmacy Node #DL-104',
    outcome: 'Blocked attempt to dispense Schedule X formulation without narcotic registration certificate.',
    hash: '0x7e21...cc58'
  },
  {
    id: 'AUD-9079',
    timestamp: '13:48:19 IST',
    actor: {
      name: 'V. Ramanathan',
      initials: 'VR',
      role: 'Drug Inspector, Zone 4',
    },
    actionType: 'SHOW-CAUSE NOTICE ISSUED',
    actionColor: 'amber',
    targetEntity: 'Shree Balaji Janaushadhi (#KA-0412)',
    outcome: 'Sec 22(1)(d) inspection notice dispatched via registered email for non-calibrated cold storage.',
    hash: '0x2c99...77ea'
  }
];

export const GENERIC_SUBSTITUTES: GenericSubstitute[] = [
  {
    rank: '01',
    brandName: 'Generic Atorvastatin + Ezetimibe 10/10',
    manufacturer: 'Jan Aushadhi (PMBI Kendra Network)',
    savingsPercentage: 90.3,
    pricePerUnit: 24.00,
    tag: 'Priority Pick · Direct Government Procurement',
    status: 'Active Sub',
    bioEquivalenceScore: '100% CDSCO Match'
  },
  {
    rank: '02',
    brandName: 'Atorlip-EZ 10/10',
    manufacturer: 'Cipla Generics Ltd · US-FDA Facility',
    savingsPercentage: 70.0,
    pricePerUnit: 74.50,
    status: 'Auto-Approved',
    bioEquivalenceScore: '99.4% Match'
  },
  {
    rank: '03',
    brandName: 'Lipicard-AV Eco 10/10',
    manufacturer: 'Mankind Pharma Ltd · WHO-GMP Plant',
    savingsPercentage: 72.5,
    pricePerUnit: 68.00,
    status: 'Auto-Approved',
    bioEquivalenceScore: '98.9% Match'
  },
  {
    rank: '04',
    brandName: 'Storvas-EZ 10/10',
    manufacturer: 'Sun Pharmaceutical Industries Ltd',
    savingsPercentage: 67.0,
    pricePerUnit: 82.00,
    status: 'Auto-Approved',
    bioEquivalenceScore: '99.1% Match'
  }
];

export const ORDERS_QUEUE: FulfillmentOrder[] = [
  {
    id: 'GM-892401-DEL',
    patientName: 'Rajiv Sharma',
    patientAge: 58,
    patientGender: 'M',
    address: 'B-4/122, Safdarjung Enclave, New Delhi - 110029',
    distance: '1.8 km',
    totalAmount: 109.00,
    paymentMode: 'UPI Pre-Paid (Auth #TXN9042)',
    slaMins: 15,
    slaElapsedMins: 4,
    status: 'CONCORDANCE IN REVIEW',
    items: [
      {
        name: 'Generic Atorvastatin + Ezetimibe Tablets 10mg/10mg',
        dosage: '1 Tab Daily at Night after food',
        quantity: '1 Strip (10 Tablets)',
        price: 24.00,
        mrp: 248.00,
        batchNo: 'PMBI-2401',
        expDate: '11/2026',
        scanStatus: 'passed',
        storageBin: 'Aisle A · Bin 04'
      },
      {
        name: 'Generic Metformin Hydrochloride Prolonged-Release 500mg',
        dosage: '1 Tab Twice Daily after meals',
        quantity: '2 Strips (20 Tablets)',
        price: 36.00,
        mrp: 180.00,
        batchNo: 'MET-9921',
        expDate: '08/2026',
        scanStatus: 'passed',
        storageBin: 'Aisle B · Bin 12'
      }
    ],
    doctor: {
      name: 'Dr. Aris Thorne, MD (Cardiology)',
      mciReg: 'MCI/DEL/7012945',
      clinic: 'City Care Medical Clinic & Heart Institute',
      validityDays: 180
    }
  },
  {
    id: 'GM-892402-DEL',
    patientName: 'Sunita Mehra',
    patientAge: 44,
    patientGender: 'F',
    address: 'Flat 102, Green Park Extension, New Delhi',
    distance: '2.4 km',
    totalAmount: 28.50,
    paymentMode: 'COD Confirmed',
    slaMins: 15,
    slaElapsedMins: 8,
    status: 'READY TO PACK',
    items: [
      {
        name: 'Generic Paracetamol 650mg Tablets',
        dosage: '1 Tab SOS fever',
        quantity: '1 Strip (10 Tablets)',
        price: 12.50,
        mrp: 38.00,
        batchNo: 'PARA-0982',
        expDate: '04/2027',
        scanStatus: 'passed',
        storageBin: 'Aisle C · Bin 01'
      },
      {
        name: 'Generic Cetirizine Hydrochloride 10mg',
        dosage: '1 Tab at bedtime',
        quantity: '1 Strip (10 Tablets)',
        price: 16.00,
        mrp: 54.00,
        batchNo: 'CET-4011',
        expDate: '01/2027',
        scanStatus: 'passed',
        storageBin: 'Aisle C · Bin 09'
      }
    ],
    doctor: {
      name: 'Dr. Neeraj Bansal, MBBS',
      mciReg: 'DMC/48912',
      clinic: 'Bansal Poly Clinic',
      validityDays: 90
    }
  },
  {
    id: 'GM-892403-DEL',
    patientName: 'Mohan Lal Gupta',
    patientAge: 67,
    patientGender: 'M',
    address: 'H-18, Hauz Khas Enclave, New Delhi',
    distance: '3.1 km',
    totalAmount: 74.00,
    paymentMode: 'RuPay Card',
    slaMins: 20,
    slaElapsedMins: 14,
    status: 'SCHED-H VALIDATED',
    items: [
      {
        name: 'Generic Telmisartan 40mg + Amlodipine 5mg',
        dosage: '1 Tab morning empty stomach',
        quantity: '1 Strip (15 Tablets)',
        price: 42.00,
        mrp: 210.00,
        batchNo: 'TEL-8890',
        expDate: '12/2026',
        scanStatus: 'passed',
        storageBin: 'Aisle A · Bin 08'
      },
      {
        name: 'Generic Rosuvastatin 10mg',
        dosage: '1 Tab night',
        quantity: '1 Strip (10 Tablets)',
        price: 32.00,
        mrp: 198.00,
        batchNo: 'ROS-1102',
        expDate: '09/2026',
        scanStatus: 'passed',
        storageBin: 'Aisle A · Bin 02'
      }
    ],
    doctor: {
      name: 'Dr. Shalini Vats, MD',
      mciReg: 'DMC/99120',
      clinic: 'Delhi Heart & Lung Care',
      validityDays: 180
    }
  },
  {
    id: 'GM-892404-DEL',
    patientName: 'Anita Verma',
    patientAge: 32,
    patientGender: 'F',
    address: 'Plot 45, Saket Commercial Block, New Delhi',
    distance: '4.2 km',
    totalAmount: 445.00,
    paymentMode: 'Net Banking',
    slaMins: 20,
    slaElapsedMins: 6,
    status: 'COLD-CHAIN ASSURED',
    items: [
      {
        name: 'Human Insulin Injection 100IU/ml (Cold Chain 2-8°C)',
        dosage: '10 Units Sub-Q before breakfast',
        quantity: '1 Vial (10ml)',
        price: 180.00,
        mrp: 490.00,
        batchNo: 'INS-4091',
        expDate: '03/2026',
        scanStatus: 'passed',
        storageBin: 'Fridge 01 · Tray 2'
      },
      {
        name: 'Generic Glimepiride 2mg + Metformin 500mg',
        dosage: '1 Tab twice daily',
        quantity: '2 Strips (30 Tablets)',
        price: 65.00,
        mrp: 270.00,
        batchNo: 'GLI-7721',
        expDate: '10/2026',
        scanStatus: 'passed',
        storageBin: 'Aisle B · Bin 05'
      }
    ],
    doctor: {
      name: 'Dr. K. S. Gill, DM Endocrinology',
      mciReg: 'MCI/PB/14092',
      clinic: 'Saket Diabetes Centre',
      validityDays: 180
    }
  }
];

export const INVENTORY_BATCHES: InventoryBatch[] = [
  {
    id: 'BAT-01',
    drugName: 'Atorvastatin Calcium + Ezetimibe (10+10mg)',
    saltCode: 'SALT-ATV-EZT-10',
    batchId: 'PMBI-2401',
    binId: 'Aisle A · Shelf 04 · Bin R2',
    availableQty: '480 Strips (4,800 Tabs)',
    expiryDate: '30-Nov-2026',
    daysToExpiry: 628,
    expiryStatus: 'optimal',
    mrp: 248.00,
    kendraPrice: 24.00,
    savingsPercentage: 90.3,
    fefoRank: '#12 in FIFO Line',
    scheduleType: 'Schedule H'
  },
  {
    id: 'BAT-02',
    drugName: 'Metformin Hydrochloride Prolonged-Release 500mg',
    saltCode: 'SALT-MET-500-SR',
    batchId: 'MT-8841-K',
    binId: 'Aisle B · Shelf 02 · Bin L1',
    availableQty: '140 Strips (2,800 Tabs)',
    expiryDate: '28-Mar-2026',
    daysToExpiry: 28,
    expiryStatus: 'critical',
    mrp: 90.00,
    kendraPrice: 18.00,
    savingsPercentage: 80.0,
    fefoRank: '#01 IMMEDIATE FEFO',
    scheduleType: 'Schedule H',
    statusText: 'CRITICAL EXPIRY HORIZON (<30 DAYS)'
  },
  {
    id: 'BAT-03',
    drugName: 'Cefixime Trihydrate Dispersible Tablets 200mg',
    saltCode: 'SALT-CFX-200-DT',
    batchId: 'CFX-4491-DEL',
    binId: 'Aisle D · Shelf 01 · Bin M4',
    availableQty: '80 Strips (800 Tabs)',
    expiryDate: '15-Apr-2026',
    daysToExpiry: 46,
    expiryStatus: 'warning',
    mrp: 145.00,
    kendraPrice: 38.00,
    savingsPercentage: 73.8,
    fefoRank: '#02 FEFO EXPEDITE',
    scheduleType: 'Schedule H1'
  },
  {
    id: 'BAT-04',
    drugName: 'Amoxicillin + Potassium Clavulanate 625mg',
    saltCode: 'SALT-AMX-CV-625',
    batchId: 'AMX-0092-RECALL',
    binId: 'Quarantine Chamber Q-1',
    availableQty: '250 Strips (2,500 Tabs)',
    expiryDate: '10-Jul-2026',
    daysToExpiry: 132,
    expiryStatus: 'quarantined',
    mrp: 215.00,
    kendraPrice: 58.00,
    savingsPercentage: 73.0,
    fefoRank: 'LOCKED / QUARANTINED',
    scheduleType: 'Schedule H1',
    statusText: 'CDL Kolkata NSQ Hold Under Sec 25'
  },
  {
    id: 'BAT-05',
    drugName: 'Human Insulin Regular 100 IU/ml Vial',
    saltCode: 'SALT-INS-REG-100',
    batchId: 'INS-COLD-901',
    binId: 'Fridge-01 · Tray 02 (4.2°C)',
    availableQty: '65 Vials (650 ml)',
    expiryDate: '14-Sep-2026',
    daysToExpiry: 198,
    expiryStatus: 'optimal',
    mrp: 490.00,
    kendraPrice: 180.00,
    savingsPercentage: 63.3,
    fefoRank: '#05 in Cold Queue',
    scheduleType: 'Schedule G',
    isColdChain: true
  },
  {
    id: 'BAT-06',
    drugName: 'Telmisartan Tablets IP 40mg',
    saltCode: 'SALT-TEL-40',
    batchId: 'TEL-8812-PMBI',
    binId: 'Aisle A · Shelf 08 · Bin R1',
    availableQty: '920 Strips (13,800 Tabs)',
    expiryDate: '28-Feb-2027',
    daysToExpiry: 720,
    expiryStatus: 'optimal',
    mrp: 140.00,
    kendraPrice: 19.50,
    savingsPercentage: 86.1,
    fefoRank: '#24 in Standard Line',
    scheduleType: 'Schedule H'
  }
];

export const FORM13_REPORTS: Form13Report[] = [
  {
    id: 'F13-2026-0482-01',
    reportNumber: 'CDL/KOL/2026/F13-89412',
    drugName: 'Atorvastatin Calcium + Ezetimibe Tablets IP',
    composition: 'Atorvastatin 10mg + Ezetimibe 10mg',
    batchId: 'PMBI-2401',
    assayScore: '99.8% (Target: 95.0% - 105.0%)',
    dissolutionScore: '94.2% in 30 mins (USP Q > 80%)',
    labName: 'Central Drugs Laboratory, Kolkata (Govt. of India)',
    receivedDate: '28-Feb-2026',
    status: 'PASSED',
    statusDetails: 'Standard Quality as defined in Drugs & Cosmetics Act 1940',
    parameters: [
      {
        parameter: 'Description',
        specification: 'White to off-white, round, biconvex film-coated tablet with score line',
        resultFound: 'Complies',
        passed: true
      },
      {
        parameter: 'Identification (HPLC)',
        specification: 'Retention times match standard working references of Atorvastatin & Ezetimibe',
        resultFound: 'Complies (Atorvastatin RT: 4.82 min, Ezetimibe RT: 8.14 min)',
        passed: true
      },
      {
        parameter: 'Assay: Atorvastatin Calcium',
        specification: '90.0% to 110.0% of stated amount (9.00mg - 11.00mg)',
        resultFound: '99.82% (9.98mg)',
        passed: true
      },
      {
        parameter: 'Assay: Ezetimibe',
        specification: '90.0% to 110.0% of stated amount (9.00mg - 11.00mg)',
        resultFound: '100.14% (10.01mg)',
        passed: true
      },
      {
        parameter: 'Uniformity of Dosage Units',
        specification: 'Acceptance Value (AV) ≤ 15.0',
        resultFound: 'AV = 4.2',
        passed: true
      },
      {
        parameter: 'Related Substances / Impurities',
        specification: 'Individual impurity ≤ 0.5%, Total impurities ≤ 1.5%',
        resultFound: 'Highest impurity: 0.12%, Total: 0.38%',
        passed: true
      },
      {
        parameter: 'Dissolution (Atorvastatin)',
        specification: 'Not less than 80% (Q) in 30 minutes in 0.05M Phosphate buffer pH 6.8',
        resultFound: '94.2% dissolved',
        passed: true
      }
    ]
  },
  {
    id: 'F13-2026-0482-02',
    reportNumber: 'CDL/KOL/2026/F13-88301',
    drugName: 'Amoxicillin + Potassium Clavulanate Tablets 625mg',
    composition: 'Amoxicillin 500mg + Clavulanic Acid 125mg',
    batchId: 'AMX-0092-RECALL',
    assayScore: '71.4% Clavulanic Acid (Deficient)',
    dissolutionScore: 'Failed degradation profile',
    labName: 'Central Drugs Laboratory, Kolkata',
    receivedDate: '24-Feb-2026',
    status: 'NSQ FAILED',
    statusDetails: 'Not of Standard Quality (NSQ). Degraded Clavulanic Acid content below statutory threshold.',
    parameters: [
      {
        parameter: 'Description',
        specification: 'White oblong coated tablet',
        resultFound: 'Slight yellowish discoloration observed on moisture exposure',
        passed: false
      },
      {
        parameter: 'Assay: Clavulanic Acid',
        specification: '90.0% to 120.0% of stated label claim',
        resultFound: '71.4% (Severely deficient - failed)',
        passed: false
      },
      {
        parameter: 'Water Content (Karl Fischer)',
        specification: 'Not more than 7.5% w/w',
        resultFound: '9.8% w/w (Elevated moisture)',
        passed: false
      }
    ]
  },
  {
    id: 'F13-2026-0482-03',
    reportNumber: 'CDL/KOL/2026/F13-90119',
    drugName: 'Metformin Hydrochloride SR 500mg',
    composition: 'Metformin HCl Sustained Release 500mg',
    batchId: 'MET-9921',
    assayScore: 'Analyzing (ETA: 48 hrs)',
    dissolutionScore: 'In-progress Stage 2',
    labName: 'Regional Drugs Testing Laboratory (RDTL), Chandigarh',
    receivedDate: '01-Mar-2026',
    status: 'ANALYZING',
    statusDetails: 'Provisional clearance under quarantine testing protocol.',
    parameters: [
      {
        parameter: 'Assay: Metformin',
        specification: '95.0% to 105.0%',
        resultFound: 'Interim: 99.1%',
        passed: true
      }
    ]
  }
];

export const SEARCHABLE_MEDICINES = [
  {
    brandedName: 'Lipitor / Atorva-E 10',
    innovatorCompany: 'Pfizer / Zydus Cadila',
    innovatorPrice: 248.00,
    saltName: 'Atorvastatin (10mg) + Ezetimibe (10mg)',
    category: 'Cholesterol & Heart Care',
    isScheduleH: true,
    genericAlternatives: [
      {
        pharmacyName: 'Jan Aushadhi Kendra (Govt. PMBI)',
        brandName: 'Generic Atorvastatin + Ezetimibe',
        price: 24.00,
        mrp: 248.00,
        savingsPercent: 90.3,
        rating: 4.9,
        deliveryTime: '25 mins',
        inStock: true,
        recommended: true
      },
      {
        pharmacyName: 'Cipla Generics Hub',
        brandName: 'Atorlip-EZ 10',
        price: 74.50,
        mrp: 248.00,
        savingsPercent: 70.0,
        rating: 4.8,
        deliveryTime: '30 mins',
        inStock: true
      },
      {
        pharmacyName: 'Mankind Eco Care',
        brandName: 'Lipicard-AV Eco',
        price: 68.00,
        mrp: 248.00,
        savingsPercent: 72.5,
        rating: 4.7,
        deliveryTime: '40 mins',
        inStock: true
      }
    ]
  },
  {
    brandedName: 'Glucophage / Glycomet 500 SR',
    innovatorCompany: 'USV / Merck',
    innovatorPrice: 92.00,
    saltName: 'Metformin Hydrochloride SR (500mg)',
    category: 'Type-2 Diabetes Management',
    isScheduleH: true,
    genericAlternatives: [
      {
        pharmacyName: 'Jan Aushadhi Kendra (Govt. PMBI)',
        brandName: 'Generic Metformin PR 500mg',
        price: 18.00,
        mrp: 92.00,
        savingsPercent: 80.4,
        rating: 4.9,
        deliveryTime: '25 mins',
        inStock: true,
        recommended: true
      },
      {
        pharmacyName: 'Apollo Generic Express',
        brandName: 'Metformin Pure 500',
        price: 32.00,
        mrp: 92.00,
        savingsPercent: 65.2,
        rating: 4.7,
        deliveryTime: '35 mins',
        inStock: true
      }
    ]
  },
  {
    brandedName: 'Augmentin 625 Duo',
    innovatorCompany: 'GSK Pharmaceuticals',
    innovatorPrice: 224.00,
    saltName: 'Amoxicillin (500mg) + Pot. Clavulanate (125mg)',
    category: 'Antibiotics & Anti-infectives',
    isScheduleH: true,
    genericAlternatives: [
      {
        pharmacyName: 'Jan Aushadhi Kendra (Govt. PMBI)',
        brandName: 'Generic Amox-Clav 625mg',
        price: 58.00,
        mrp: 224.00,
        savingsPercent: 74.1,
        rating: 4.9,
        deliveryTime: '25 mins',
        inStock: true,
        recommended: true
      },
      {
        pharmacyName: 'Alkem Generic Care',
        brandName: 'Clavam Generic 625',
        price: 94.00,
        mrp: 224.00,
        savingsPercent: 58.0,
        rating: 4.8,
        deliveryTime: '30 mins',
        inStock: true
      }
    ]
  },
  {
    brandedName: 'Telma 40 / Micardis',
    innovatorCompany: 'Glenmark / Boehringer Ingelheim',
    innovatorPrice: 155.00,
    saltName: 'Telmisartan (40mg)',
    category: 'Hypertension & Blood Pressure',
    isScheduleH: true,
    genericAlternatives: [
      {
        pharmacyName: 'Jan Aushadhi Kendra (Govt. PMBI)',
        brandName: 'Generic Telmisartan 40mg',
        price: 19.50,
        mrp: 155.00,
        savingsPercent: 87.4,
        rating: 4.9,
        deliveryTime: '25 mins',
        inStock: true,
        recommended: true
      }
    ]
  }
];

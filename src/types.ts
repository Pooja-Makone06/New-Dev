export type PortalView = 
  | 'regulatory-overview'
  | 'regulatory-salt-mapping'
  | 'regulatory-orders-audit'
  | 'regulatory-settings'
  | 'dispensary-fulfillment'
  | 'dispensary-grn'
  | 'dispensary-inventory'
  | 'dispensary-form13'
  | 'dispensary-catalogue'
  | 'dispensary-earnings'
  | 'customer-cart'
  | 'customer-tracking'
  | 'customer-refill'
  | 'customer-search'
  | 'customer-detail'
  | 'customer-account';

export type PortalSection = 'regulatory' | 'dispensary' | 'customer';

export interface ScreenDefinition {
  id: PortalView;
  name: string;
  category: 'Central Regulatory' | 'Dispensary Partner OS' | 'Patient Web Portal';
  badge: string;
  imageRef: string;
  description?: string;
  keywords?: string[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: {
    name: string;
    initials: string;
    role: string;
    avatar?: string;
  };
  actionType: string;
  actionColor: 'emerald' | 'amber' | 'rose' | 'sky' | 'indigo';
  targetEntity: string;
  outcome: string;
  hash: string;
}

export interface PharmacyQueueItem {
  id: string;
  pharmacyName: string;
  location: string;
  pharmacist: string;
  licenseNumber: string;
  licenseForms: string;
  validUntil: string;
  status: 'Biometric Verified' | 'Under Inspection' | 'Pending Verification';
  riskScore: string;
  riskCategory: 'Low' | 'Medium' | 'Elevated';
}

export interface PriceAnomalyItem {
  id: string;
  sku: string;
  drugName: string;
  variancePercentage?: number;
  varianceType: 'PRICE_VARIANCE' | 'EXPIRY_GUARDRAIL' | 'SALT_MISMATCH';
  description: string;
  currentPrice?: number;
  benchmarkPrice?: number;
  flaggedTimeAgo: string;
  source: string;
  sellerNode: string;
  actionRequired: string;
}

export interface GenericSubstitute {
  rank: string;
  brandName: string;
  manufacturer: string;
  savingsPercentage: number;
  pricePerUnit: number;
  tag?: string;
  status: 'Active Sub' | 'Auto-Approved';
  bioEquivalenceScore?: string;
}

export interface FulfillmentOrder {
  id: string;
  patientName: string;
  patientAge: number;
  patientGender: 'M' | 'F';
  address: string;
  distance: string;
  totalAmount: number;
  paymentMode: string;
  slaMins: number;
  slaElapsedMins: number;
  status: 'CONCORDANCE IN REVIEW' | 'READY TO PACK' | 'SCHED-H VALIDATED' | 'COLD-CHAIN ASSURED';
  items: {
    name: string;
    dosage: string;
    quantity: string;
    price: number;
    mrp: number;
    batchNo: string;
    expDate: string;
    scanStatus: 'passed' | 'pending';
    storageBin: string;
  }[];
  doctor: {
    name: string;
    mciReg: string;
    clinic: string;
    validityDays: number;
  };
}

export interface InventoryBatch {
  id: string;
  drugName: string;
  saltCode: string;
  batchId: string;
  binId: string;
  availableQty: string;
  expiryDate: string;
  daysToExpiry: number;
  expiryStatus: 'critical' | 'warning' | 'optimal' | 'quarantined';
  mrp: number;
  kendraPrice: number;
  savingsPercentage: number;
  fefoRank: string;
  scheduleType: string;
  isColdChain?: boolean;
  statusText?: string;
}

export interface Form13Report {
  id: string;
  reportNumber: string;
  drugName: string;
  composition: string;
  batchId: string;
  assayScore: string;
  dissolutionScore: string;
  labName: string;
  receivedDate: string;
  status: 'PASSED' | 'NSQ FAILED' | 'ANALYZING';
  statusDetails?: string;
  parameters: {
    parameter: string;
    specification: string;
    resultFound: string;
    passed: boolean;
  }[];
}

export interface CatalogueDrugItem {
  id: string;
  sku: string;
  brandName: string;
  saltComposition: string;
  manufacturer: string;
  innovatorBrand: string;
  mrp: number;
  kendraPrice: number;
  dpcoCeiling: number;
  marginPercent: number;
  packSize: string;
  inStock: boolean;
  stockCount: number;
  scheduleType: string;
  category: string;
  bioequivalencePercent: number;
}

export interface SettlementRecord {
  id: string;
  cyclePeriod: string;
  orderCount: number;
  grossSales: number;
  platformCommission: number;
  commissionRate: number;
  tdsDeduction: number;
  netPayable: number;
  settlementDate: string;
  status: 'SETTLED' | 'PROCESSING' | 'UPCOMING';
  bankUtr?: string;
  accountNumberMasked: string;
}

export interface CentralOrderAuditItem {
  id: string;
  orderNumber: string;
  patientName: string;
  patientCity: string;
  pharmacyName: string;
  pharmacyLicense: string;
  orderDate: string;
  totalAmount: number;
  genericSavings: number;
  status: 'DELIVERED' | 'DISPATCHED' | 'FLAGGED_SAFETY_HOLD' | 'CANCELLED_REFUNDED' | 'PROCESSING';
  scheduleHVerified: boolean;
  prescribingDoctor: string;
  riskScore: number;
  interventions?: {
    timestamp: string;
    officer: string;
    action: string;
    reason: string;
    hash: string;
  }[];
}

export interface SavedPrescription {
  id: string;
  doctorName: string;
  clinicHospital: string;
  registrationNumber: string;
  uploadedDate: string;
  validUntil: string;
  status: 'VALID' | 'EXPIRING_SOON' | 'EXPIRED';
  medications: string[];
  imageUrl: string;
}

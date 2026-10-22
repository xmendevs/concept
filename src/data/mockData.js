// Rosabon Financial Services - Customer Intelligence Domain Data
// Tailored for the 7 key departments and Rosabon's core lending & investment products

export const COMPANY_PROFILE = {
  name: 'Rosabon Financial Services',
  tagline: 'Leading Non-Bank Financial Institution in Nigeria & West Africa',
  analystRole: 'Customer Intelligence Analyst (Junior)',
  analystTrack: 'Succession-Track Intelligence Engine',
  reportingCurrency: '₦',
  headquarters: 'Victoria Island, Lagos, Nigeria'
};

export const DEPARTMENTS = [
  { id: 'all', name: 'All Departments', icon: 'Layers', color: '#6366f1' },
  { id: 'cx', name: 'Customer Experience (CX)', icon: 'Headphones', color: '#3b82f6' },
  { id: 'sales_rm', name: 'Sales & Relationship Managers', icon: 'Briefcase', color: '#10b981' },
  { id: 'product_growth', name: 'Product & Growth', icon: 'Smartphone', color: '#8b5cf6' },
  { id: 'credit_accounts', name: 'Credit Appraisal & Account Officers', icon: 'Landmark', color: '#f59e0b' },
  { id: 'marketing', name: 'Marketing & Brand Reputation', icon: 'Megaphone', color: '#ec4899' },
  { id: 'transformation', name: 'Digital Transformation & Innovation', icon: 'RefreshCw', color: '#06b6d4' },
];

export const ROSABON_PRODUCTS = [
  'Rosabon Personal Loan (RPL)',
  'Rosabon Consumer Asset Lease (Vehicle/Equipment)',
  'Rosabon SME Working Capital Loan',
  'Rosabon Fleet & Commercial Lease',
  'Rosabon Earning Plan (REAP) & Treasury Notes',
  'Invoice Discounting & Contract Finance',
  'Rosabon Quick Cash (Instant Salary Advance)'
];

export const THEMES = [
  'Disbursement Speed & Appraisal SLA',
  'Interest Rates, APR & Fee Clarity',
  'KYC, Guarantors & Documentation Requirements',
  'Repayment, Remita/Direct-Debit & Reconciliation',
  'Relationship Manager (RM) Responsiveness',
  'Mobile App, Portal & Biometric Usability',
  'Tenure Flexibility & Restructuring Hardship'
];

export const INITIAL_VOC_DATA = [
  {
    id: 'VOC-RSB-101',
    customerName: 'Kenechukwu Agro-Allied Ltd',
    customerTier: 'Commercial SME (Tier 1)',
    department: 'sales_rm',
    channel: 'RM 1-on-1 Client Visit (Ikeja)',
    loanProduct: 'Rosabon SME Working Capital Loan',
    loanAmount: '₦45,000,000',
    date: '2026-10-19',
    qualitativeText: 'MD was visibly frustrated. Stated that our credit committee has taken 12 working days to review their audited statements and land collateral deed. Access Bank offered them ₦40M disbursement within 72 hours. Stated if Rosabon does not disburse by Friday, they will liquidate their ₦25M REAP treasury placement and move to Access Bank.',
    sentiment: 'Negative',
    sentimentScore: -0.9,
    urgency: 'Critical',
    churnRisk: true,
    npsCategory: 'Detractor',
    npsScore: 2,
    csatScore: 1,
    cesScore: 7,
    themes: ['Disbursement Speed & Appraisal SLA', 'KYC, Guarantors & Documentation Requirements'],
    status: 'In Review',
    actionOwner: 'Head of Credit Appraisal'
  },
  {
    id: 'VOC-RSB-102',
    customerName: 'Dr. Toluwalase Adebisi',
    customerTier: 'Retail Professional',
    department: 'cx',
    channel: 'Support Ticket (Zendesk / WhatsApp)',
    loanProduct: 'Rosabon Consumer Asset Lease (Vehicle/Equipment)',
    loanAmount: '₦8,500,000',
    date: '2026-10-20',
    qualitativeText: 'I took a vehicle lease for a Toyota Corolla. My monthly lease rental was deducted via Remita direct debit on the 24th, yet yesterday your recovery officer called my secondary guarantor demanding payment with threatening language! This is harassment and poor internal reconciliation.',
    sentiment: 'Negative',
    sentimentScore: -0.95,
    urgency: 'Critical',
    churnRisk: true,
    npsCategory: 'Detractor',
    npsScore: 1,
    csatScore: 1,
    cesScore: 7,
    themes: ['Repayment, Remita/Direct-Debit & Reconciliation', 'Relationship Manager (RM) Responsiveness'],
    status: 'Action Required',
    actionOwner: 'Recovery & Credit Reconciliation Lead'
  },
  {
    id: 'VOC-RSB-103',
    customerName: 'Amina Bello (Tech Recruiter)',
    customerTier: 'Retail Salary Earner',
    department: 'product_growth',
    channel: 'In-App Micro Survey',
    loanProduct: 'Rosabon Quick Cash (Instant Salary Advance)',
    loanAmount: '₦350,000',
    date: '2026-10-21',
    qualitativeText: 'The new Rosabon mobile app salary verification is fantastic. Connected my salary account via Mono Open Banking and got instant eligibility for ₦350,000 with disbursement directly into my bank account in 22 minutes. Very smooth experience!',
    sentiment: 'Positive',
    sentimentScore: 0.95,
    urgency: 'Low',
    churnRisk: false,
    npsCategory: 'Promoter',
    npsScore: 10,
    csatScore: 5,
    cesScore: 1,
    themes: ['Mobile App, Portal & Biometric Usability', 'Disbursement Speed & Appraisal SLA'],
    status: 'Logged',
    actionOwner: 'Product Lead - Digital Lending'
  },
  {
    id: 'VOC-RSB-104',
    customerName: 'Alhaji Bashir Farouk',
    customerTier: 'Tier 1 (High-Net-Worth Individual)',
    department: 'transformation',
    channel: 'Branch Digital Transition Debrief (Abuja)',
    loanProduct: 'Rosabon Earning Plan (REAP) & Treasury Notes',
    loanAmount: '₦80,000,000',
    date: '2026-10-18',
    qualitativeText: 'Branch RM encouraged me to monitor my REAP investment yields on the new portal, but the portal does not display rollover interest maturity certificates accurately. I have trusted Rosabon for 11 years; please ensure the portal shows audited rollover statements before forcing digital-only interactions.',
    sentiment: 'Neutral',
    sentimentScore: -0.1,
    urgency: 'Medium',
    churnRisk: false,
    npsCategory: 'Passive',
    npsScore: 7,
    csatScore: 3,
    cesScore: 4,
    themes: ['Mobile App, Portal & Biometric Usability', 'Relationship Manager (RM) Responsiveness'],
    status: 'In Progress',
    actionOwner: 'Head of Digital Transformation'
  },
  {
    id: 'VOC-RSB-105',
    customerName: 'SwiftPrint & Logistics Hub',
    customerTier: 'Mid-Market Enterprise',
    department: 'credit_accounts',
    channel: 'Credit Restructuring Log',
    loanProduct: 'Invoice Discounting & Contract Finance',
    loanAmount: '₦14,200,000',
    date: '2026-10-19',
    qualitativeText: 'Client faced delayed payment from federal government agency client. Credit team approved a 30-day moratorium on interest penalization upon presentation of certified milestone sign-off. Borrower expressed deep gratitude for Rosabon partnership mindset.',
    sentiment: 'Positive',
    sentimentScore: 0.88,
    urgency: 'Low',
    churnRisk: false,
    npsCategory: 'Promoter',
    npsScore: 9,
    csatScore: 5,
    cesScore: 2,
    themes: ['Tenure Flexibility & Restructuring Hardship', 'Relationship Manager (RM) Responsiveness'],
    status: 'Resolved',
    actionOwner: 'Credit Committee'
  },
  {
    id: 'VOC-RSB-106',
    customerName: 'Emeka Nwosu',
    customerTier: 'Retail Salary Earner',
    department: 'marketing',
    channel: 'Google Play Store Review (Rosabon App)',
    loanProduct: 'Rosabon Personal Loan (RPL)',
    loanAmount: '₦1,200,000',
    date: '2026-10-20',
    qualitativeText: 'Your social media ads say "affordable monthly interest rates", but by the time insurance fee, processing fee, and management levy are bundled, the actual total repayment is much higher than initial calculation. FairMoney and Carbon show total repayment clearly upfront. Please be transparent.',
    sentiment: 'Negative',
    sentimentScore: -0.8,
    urgency: 'High',
    churnRisk: true,
    npsCategory: 'Detractor',
    npsScore: 2,
    csatScore: 1,
    cesScore: 6,
    themes: ['Interest Rates, APR & Fee Clarity'],
    status: 'Action Required',
    actionOwner: 'Marketing & Brand Director'
  },
  {
    id: 'VOC-RSB-107',
    customerName: 'Crestfield Haulage Corp',
    customerTier: 'Commercial Fleet Client (Tier 1)',
    department: 'sales_rm',
    channel: 'RM Quarterly Executive Briefing',
    loanProduct: 'Rosabon Fleet & Commercial Lease',
    loanAmount: '₦125,000,000',
    date: '2026-10-15',
    qualitativeText: 'Managing Director praised our fleet maintenance inspection support and rapid insurance claim settlement. They signed an agreement to add 10 additional delivery vans under operating lease for Q1 2027.',
    sentiment: 'Positive',
    sentimentScore: 0.98,
    urgency: 'Low',
    churnRisk: false,
    npsCategory: 'Promoter',
    npsScore: 10,
    csatScore: 5,
    cesScore: 1,
    themes: ['Relationship Manager (RM) Responsiveness'],
    status: 'Closed Loop',
    actionOwner: 'Commercial Fleet Director'
  },
  {
    id: 'VOC-RSB-108',
    customerName: 'Bisi Oladipo',
    customerTier: 'Retail Civil Servant',
    department: 'cx',
    channel: 'Contact Center Inbound Call',
    loanProduct: 'Rosabon Personal Loan (RPL)',
    loanAmount: '₦750,000',
    date: '2026-10-21',
    qualitativeText: 'Customer called requesting assistance with physical guarantor forms. Stated that the guarantor upload requirement in PDF format failed twice on the mobile app. Agent Mary assisted by receiving documents on corporate WhatsApp and uploading manually.',
    sentiment: 'Neutral',
    sentimentScore: 0.2,
    urgency: 'Medium',
    churnRisk: false,
    npsCategory: 'Passive',
    npsScore: 7,
    csatScore: 4,
    cesScore: 4,
    themes: ['KYC, Guarantors & Documentation Requirements', 'Mobile App, Portal & Biometric Usability'],
    status: 'Resolved',
    actionOwner: 'CX Operations'
  },
  {
    id: 'VOC-RSB-109',
    customerName: 'Silvercrest Manufacturing',
    customerTier: 'Mid-Market Enterprise',
    department: 'credit_accounts',
    channel: 'Credit Analyst Risk Assessment',
    loanProduct: 'Rosabon SME Working Capital Loan',
    loanAmount: '₦30,000,000',
    date: '2026-10-17',
    qualitativeText: 'Customer requested extension of repayment schedule from 12 months to 18 months due to FX devaluation on raw material imports. Credit desk recommended conditional approval with 10% principal paydown.',
    sentiment: 'Neutral',
    sentimentScore: 0.1,
    urgency: 'Medium',
    churnRisk: false,
    npsCategory: 'Passive',
    npsScore: 8,
    csatScore: 4,
    cesScore: 3,
    themes: ['Tenure Flexibility & Restructuring Hardship'],
    status: 'In Review',
    actionOwner: 'Credit Committee'
  },
  {
    id: 'VOC-RSB-110',
    customerName: 'Tunde Lawal',
    customerTier: 'Retail Salary Earner',
    department: 'product_growth',
    channel: 'App Store Feedback',
    loanProduct: 'Rosabon Quick Cash (Instant Salary Advance)',
    loanAmount: '₦200,000',
    date: '2026-10-21',
    qualitativeText: 'The app keeps logging me out whenever I attempt the liveness selfie check on my Android phone. Renmoney app does KYC in 2 minutes without camera glitches. Fix the camera permission bug please.',
    sentiment: 'Negative',
    sentimentScore: -0.7,
    urgency: 'High',
    churnRisk: false,
    npsCategory: 'Detractor',
    npsScore: 3,
    csatScore: 2,
    cesScore: 7,
    themes: ['Mobile App, Portal & Biometric Usability', 'KYC, Guarantors & Documentation Requirements'],
    status: 'Action Required',
    actionOwner: 'Mobile App Lead'
  }
];

// Strategic Closed-Loop Recommendation & Retention Initiatives Tracker
export const INITIAL_RECOMMENDATIONS = [
  {
    id: 'REC-RSB-01',
    title: 'Express Underwriting SLA for Returning SME Borrowers',
    departmentTarget: 'Credit Appraisal & Risk',
    sourceInsight: 'VOC-RSB-101 (SME 12-day turnaround pushing high-value clients to commercial banks)',
    proposedDate: '2026-10-12',
    owner: 'Head of Credit Appraisal',
    status: 'In Implementation',
    adoptionStatus: 'Adopted',
    retentionLink: 'Protects ₦185M portfolio of high-yielding SME borrowers with good repayment history',
    financialImpact: 'Reduces repeat loan appraisal time from 12 days to 48 hours',
    progress: 80
  },
  {
    id: 'REC-RSB-02',
    title: 'Automated Remita Pre-Debit Reconciliation Webhook',
    departmentTarget: 'CX & Recovery Ops',
    sourceInsight: 'VOC-RSB-102 (Debited vehicle lease clients receiving wrongful recovery notices)',
    proposedDate: '2026-10-15',
    owner: 'Recovery & Credit Reconciliation Lead',
    status: 'In Review with Stakeholder',
    adoptionStatus: 'Proposed',
    retentionLink: 'Eliminates #1 cause of client harassment complaints and reputational risk',
    financialImpact: 'Saves estimated 40+ hours/month in manual guarantor apology calls',
    progress: 45
  },
  {
    id: 'REC-RSB-03',
    title: 'Interactive All-In Loan Repayment Calculator',
    departmentTarget: 'Product & Marketing',
    sourceInsight: 'VOC-RSB-106 (Customer dissatisfaction with hidden insurance & processing levies)',
    proposedDate: '2026-10-16',
    owner: 'Marketing & Brand Director',
    status: 'Approved',
    adoptionStatus: 'Adopted',
    retentionLink: 'Establishes radical fee transparency; drives consumer trust and App Store ratings',
    financialImpact: 'Projected 22% improvement in conversion from eligibility check to drawdown',
    progress: 90
  },
  {
    id: 'REC-RSB-04',
    title: 'Hybrid RM "White Glove" Digital Onboarding for REAP Treasury Clients',
    departmentTarget: 'Transformation & Sales',
    sourceInsight: 'VOC-RSB-104 (HNW senior investors struggling with portal rollover certificates)',
    proposedDate: '2026-10-18',
    owner: 'Head of Digital Transformation',
    status: 'In Review with Stakeholder',
    adoptionStatus: 'Proposed',
    retentionLink: 'Secures ₦350M+ in fixed deposit and treasury placements among senior HNIs',
    financialImpact: 'Zero deposit flight from digital friction',
    progress: 35
  },
  {
    id: 'REC-RSB-05',
    title: 'Automated Camera Permission Fallback for Quick Cash Liveness Check',
    departmentTarget: 'Product & Growth',
    sourceInsight: 'VOC-RSB-110 (Android users experiencing app exit during selfie verification)',
    proposedDate: '2026-10-21',
    owner: 'Mobile App Lead',
    status: 'In Implementation',
    adoptionStatus: 'Adopted',
    retentionLink: 'Recovers estimated 15% drop-off in retail quick cash originations',
    financialImpact: '+₦18M monthly incremental salary advance disbursements',
    progress: 70
  }
];

// Pre-synthesized 48-Hour SLA Intelligence Queries
export const SAMPLE_SLA_QUERIES = [
  {
    id: 'sla-1',
    title: 'SME Appraisal Turnaround vs. Commercial Bank Aggression',
    requester: 'Head of Business Development (Commercial Lending)',
    deadlineHours: 48,
    elapsedHours: 12.5,
    status: 'Ready',
    summary: 'Cross-channel intelligence indicates our 9–12 day credit committee appraisal process is the primary reason Tier-1 SME clients defect to commercial banks, despite appreciating Rosabon flexible collateral conditions.',
    keyDrivers: [
      'Collateral deeds and financial statement verification is manual and sequential rather than parallel.',
      'RMs lack real-time visibility into the exact stage of appraisal in the credit pipeline.',
      'Competitor banks are targeting our prime borrowers with 72-hour pre-approved credit lines.'
    ],
    recommendedActions: [
      'Create a "Fast-Track Credit Track" for repeat borrowers with clean repayment records.',
      'Equip RMs with a real-time Credit Tracker in CRM showing pending documentation blockers.',
      'Offer a 50 bps interest rate concession to high-value borrowers with bundled REAP deposits.'
    ]
  },
  {
    id: 'sla-2',
    title: 'Direct-Debit & Remita Clearing Friction in Lease Portfolio',
    requester: 'Chief Operating Officer & Head of CX',
    deadlineHours: 48,
    elapsedHours: 6.0,
    status: 'Ready',
    summary: 'Significant spike in customer complaints (NPS Detractors: 41%) regarding premature recovery calls following successful Remita direct-debits, causing severe brand friction among vehicle lease clients.',
    keyDrivers: [
      'Batch settlement logs from payment gateways take up to 36 hours to reflect in core credit ledger.',
      'Automated recovery escalation triggers without checking pending gateway settlement buffers.',
      'Contact center agents lack immediate authority to freeze collection notices on disputed accounts.'
    ],
    recommendedActions: [
      'Implement a 48-hour recovery hold grace period for accounts with active direct-debit mandates.',
      'Deploy instant webhook listener for real-time payment confirmation.',
      'Empower CX frontline agents to flag accounts as "Payment Verification Pending" with 1-click.'
    ]
  }
];

// OPTION A DATA: Comprehensive Multi-Competitor Market Intelligence Database (11 Institutions with Full Stats)
export const COMPETITOR_BENCHMARKS = [
  {
    competitor: 'Access Bank',
    category: 'Commercial Banks',
    subSegment: 'SME Working Capital & Digital Lending',
    smeTurnaround: '72 Hours (3 Days)',
    rosabonTurnaround: '9–12 Business Days',
    variance: '+6–9 Days Slower',
    effectiveApr: '24% – 27%',
    monthlyRate: '2.0% – 2.25%',
    maxTicket: '₦100,000,000',
    minTicket: '₦5,000,000',
    collateralRequirement: 'Strict prime real estate / C-of-O or registered legal debenture',
    fees: '1.0% Facility fee + 0.5% Management fee',
    marketShareEstimate: '18.5% (Tier-1 Leader)',
    threatLevel: 'High',
    topDefectionReason: '72-hour pre-approved business credit lines and lower headline corporate rate',
    rosabonAdvantage: 'Accepts machinery, fleet vehicles, and invoice discounting where banks reject unencumbered titles',
    counterPitch: 'Rosabon collateral policy is asset-based. You keep working capital liquid without tying up family real estate titles.'
  },
  {
    competitor: 'GTBank (Guaranty Trust Bank)',
    category: 'Commercial Banks',
    subSegment: 'Quick Credit & Corporate Overdrafts',
    smeTurnaround: '48–72 Hours',
    rosabonTurnaround: '9–12 Business Days',
    variance: '+5–7 Days Slower',
    effectiveApr: '22% – 26%',
    monthlyRate: '1.33% – 2.1%',
    maxTicket: '₦50,000,000',
    minTicket: '₦1,000,000',
    collateralRequirement: 'Cashflow debenture on corporate payroll/turnover domiciliation',
    fees: '1.0% Processing fee',
    marketShareEstimate: '16.0%',
    threatLevel: 'High',
    topDefectionReason: 'Instant mobile app pre-approved credit line based on account cashflow',
    rosabonAdvantage: 'Structured custom repayment tenor up to 36 months vs GTBank rigid 12-month limit',
    counterPitch: 'Rosabon structures facilities to match seasonal cashflow cycles, avoiding sudden 12-month bullet rollover stress.'
  },
  {
    competitor: 'Zenith Bank',
    category: 'Commercial Banks',
    subSegment: 'MSME Retail & Commercial Facilities',
    smeTurnaround: '5–7 Business Days',
    rosabonTurnaround: '9–12 Business Days',
    variance: '+3–5 Days Slower',
    effectiveApr: '25% – 28%',
    monthlyRate: '2.08% – 2.33%',
    maxTicket: '₦75,000,000',
    minTicket: '₦10,000,000',
    collateralRequirement: 'Audited 3-year financials + prime commercial property mortgage',
    fees: '1.5% Commitment fee',
    marketShareEstimate: '15.2%',
    threatLevel: 'Medium',
    topDefectionReason: 'Lower corporate APR on multi-year industrial loans',
    rosabonAdvantage: 'Fast dedicated RM advisory without bureaucratic multi-committee sign-off loops',
    counterPitch: 'Direct relationship manager accountability. No endless branch credit committee delays.'
  },
  {
    competitor: 'Stanbic IBTC',
    category: 'Commercial Banks',
    subSegment: 'Business Overdrafts & Wealth Placements',
    smeTurnaround: '3–5 Business Days',
    rosabonTurnaround: '1–2 Days for Placements',
    variance: '+1–2 Days Slower (Loans)',
    effectiveApr: '23% – 26% (Loans) / 16.5% – 18% (Wealth Deposits)',
    monthlyRate: '1.9% – 2.15%',
    maxTicket: '₦250,000,000+',
    minTicket: '₦25,000,000',
    collateralRequirement: 'Fixed charge on treasury assets / institutional debenture',
    fees: '1.25% Facility fee',
    marketShareEstimate: '12.0%',
    threatLevel: 'High (Targeting REAP HNI Depositors)',
    topDefectionReason: 'Tier-1 institutional wealth reputation and private banking perks',
    rosabonAdvantage: 'Rosabon REAP offers 18.5% guaranteed yield with zero rollover break penalties',
    counterPitch: 'Rosabon REAP delivers +150 bps yield over bank fixed deposits with dedicated concierge service.'
  },
  {
    competitor: 'Renmoney',
    category: 'Consumer NBFIs',
    subSegment: 'Retail Salary Advance & SME Micro-Loans',
    smeTurnaround: '24 Hours',
    rosabonTurnaround: '2–4 Business Days',
    variance: '+1–2 Days Slower',
    effectiveApr: '36% – 48%',
    monthlyRate: '3.0% – 4.0%',
    maxTicket: '₦6,000,000',
    minTicket: '₦50,000',
    collateralRequirement: 'Zero physical collateral (Bank statement + Remita direct debit)',
    fees: '2.5% Management fee',
    marketShareEstimate: '14.5% (NBFI Leader)',
    threatLevel: 'High (Retail Salary Loans)',
    topDefectionReason: 'Zero guarantor paper requirement on 100% digital onboarding flows',
    rosabonAdvantage: 'Substantially lower APR on facilities >₦5M and higher loan quantum up to ₦85M',
    counterPitch: 'For tickets above ₦5M, Rosabon saves you up to 8% in annual interest with tailored repayment terms.'
  },
  {
    competitor: 'Page Financials',
    category: 'Consumer NBFIs',
    subSegment: 'Personal Loans & Corporate Salary Advance',
    smeTurnaround: '24–48 Hours',
    rosabonTurnaround: '2–4 Business Days',
    variance: '+1 Day Slower',
    effectiveApr: '35% – 46%',
    monthlyRate: '2.9% – 3.8%',
    maxTicket: '₦5,000,000',
    minTicket: '₦100,000',
    collateralRequirement: 'Verified corporate employer payroll agreement',
    fees: '2.0% Administrative fee',
    marketShareEstimate: '9.0%',
    threatLevel: 'Medium',
    topDefectionReason: 'Rapid payroll advance disbursement with minimal underwriting checks',
    rosabonAdvantage: 'Full consumer asset leasing and vehicle financing options that Page cannot offer',
    counterPitch: 'Rosabon offers full asset leases where the vehicle or equipment pays for itself over 36 months.'
  },
  {
    competitor: 'Zedvance',
    category: 'Consumer NBFIs',
    subSegment: 'Civil Service (IPPIS) & Corporate Consumer Credit',
    smeTurnaround: '24 Hours',
    rosabonTurnaround: '2–3 Business Days',
    variance: '+1 Day Slower',
    effectiveApr: '32% – 42%',
    monthlyRate: '2.6% – 3.5%',
    maxTicket: '₦4,000,000',
    minTicket: '₦50,000',
    collateralRequirement: 'Direct federal/state IPPIS payroll deduction mandate',
    fees: '2.0% Processing fee upfront',
    marketShareEstimate: '8.5%',
    threatLevel: 'Medium',
    topDefectionReason: 'Direct deduction agreement with government MDAs eliminates paperwork',
    rosabonAdvantage: 'Broader commercial product suite: Asset Lease, SME Working Capital, and REAP wealth plans',
    counterPitch: 'Rosabon supports your growth beyond personal loans with business equipment and fleet finance.'
  },
  {
    competitor: 'Creditville',
    category: 'Consumer NBFIs',
    subSegment: 'Quick Personal Loans & Auto Asset Finance',
    smeTurnaround: '48 Hours',
    rosabonTurnaround: '48–72 Hours',
    variance: 'Near Parity',
    effectiveApr: '34% – 44%',
    monthlyRate: '2.8% – 3.6%',
    maxTicket: '₦10,000,000',
    minTicket: '₦200,000',
    collateralRequirement: 'Vehicle registration documents or corporate guarantor',
    fees: '2.0% Management fee',
    marketShareEstimate: '6.5%',
    threatLevel: 'Medium',
    topDefectionReason: 'Fast vehicle auto loans with aggressive digital promotion',
    rosabonAdvantage: '30+ year institutional track record and larger commercial fleet capacity up to ₦150M',
    counterPitch: 'Rosabon provides true commercial fleet lease facilities with corporate maintenance and telematics.'
  },
  {
    competitor: 'Carbon (Paylater)',
    category: 'Digital FinTechs',
    subSegment: 'Mobile In-App Algorithmic Micro-Lending',
    smeTurnaround: 'Instant (Under 5 minutes)',
    rosabonTurnaround: '22 Minutes (Quick Cash)',
    variance: 'Near Parity',
    effectiveApr: '48% – 84% (Annualized)',
    monthlyRate: '4.0% – 7.0%',
    maxTicket: '₦1,000,000',
    minTicket: '₦5,000',
    collateralRequirement: 'Algorithmic device metadata, transaction SMS, & credit bureau',
    fees: 'Zero hidden fees (all-inclusive transparent slider)',
    marketShareEstimate: '13.0% (FinTech Leader)',
    threatLevel: 'Medium',
    topDefectionReason: 'Radical fee transparency upfront on mobile loan calculator & instant disbursement',
    rosabonAdvantage: 'Rosabon Quick Cash & RPL provide much larger amounts up to ₦20M at 32%–38% APR',
    counterPitch: 'Carbon caps out at ₦1M. Rosabon provides scalable facilities up to ₦20M with transparent fees.'
  },
  {
    competitor: 'FairMoney',
    category: 'Digital FinTechs',
    subSegment: 'Instant Smartphone Digital Loans',
    smeTurnaround: 'Instant (Under 3 minutes)',
    rosabonTurnaround: '22 Minutes (Quick Cash)',
    variance: 'Near Parity',
    effectiveApr: '60% – 120% (Annualized)',
    monthlyRate: '5.0% – 10.0%',
    maxTicket: '₦3,000,000',
    minTicket: '₦10,000',
    collateralRequirement: 'Automated smartphone telemetry & biometric identity verification',
    fees: 'Transparent upfront interest calculation',
    marketShareEstimate: '11.5%',
    threatLevel: 'Medium',
    topDefectionReason: 'Zero human touchpoint, instant biometric approval',
    rosabonAdvantage: 'Humane collections, personalized restructuring, and substantially lower APR',
    counterPitch: 'Avoid 60%-100% predatory rates. Rosabon offers humane relationship lending at half the cost.'
  },
  {
    competitor: 'Moniepoint / OPay Business',
    category: 'Merchant FinTechs',
    subSegment: 'POS Daily Merchant Overdrafts & Float',
    smeTurnaround: 'Instant (5–10 minutes in app)',
    rosabonTurnaround: '9–12 Business Days (SME)',
    variance: '+8–10 Days Slower',
    effectiveApr: '30% – 42% (Daily fee: 0.08% – 0.12%)',
    monthlyRate: '2.5% – 3.5%',
    maxTicket: '₦5,000,000 (Daily revolving)',
    minTicket: '₦20,000',
    collateralRequirement: 'Daily POS transaction inflow capture (auto-swept)',
    fees: '1.0% Drawdown fee',
    marketShareEstimate: '17.0% (Merchant Space)',
    threatLevel: 'High (Retail Trade Merchants)',
    topDefectionReason: 'Automatic deduction from daily card settlements; zero paperwork',
    rosabonAdvantage: 'Long-term Capex financing for store expansion, machinery, and delivery vans',
    counterPitch: 'POS overdrafts only cover daily stock. Rosabon finances your permanent business expansion and vehicles.'
  }
];

export const COMPETITOR_MENTIONS_SUMMARY = [
  { name: 'Access Bank', count: 6, category: 'Commercial Banks', primaryContext: '72h turnaround on SME working capital loans' },
  { name: 'Carbon / FairMoney', count: 5, category: 'Digital FinTechs', primaryContext: 'Fee transparency & all-in loan calculator' },
  { name: 'Renmoney', count: 4, category: 'Consumer NBFIs', primaryContext: 'Paperless guarantor verification speed' },
  { name: 'Moniepoint / OPay', count: 4, category: 'Merchant FinTechs', primaryContext: 'Instant POS daily transaction overdraft' },
  { name: 'GTBank', count: 3, category: 'Commercial Banks', primaryContext: 'Pre-approved overdraft lines for salary accounts' },
  { name: 'Stanbic IBTC', count: 2, category: 'Commercial Banks', primaryContext: 'HNI wealth fixed deposit yield benchmark' }
];

// ONLINE RESEARCH, REGULATORY GUIDELINES & INDUSTRY SOLUTIONS KNOWLEDGE BASE
export const ONLINE_SOLUTIONS_KNOWLEDGE_BASE = [
  {
    id: 'sol-cbn-cpf',
    category: 'Regulatory (CBN)',
    title: 'Central Bank of Nigeria (CBN) Consumer Protection Framework 2026',
    citation: 'CBN/CPD/DIR/GEN/02/2026 • Section 4.2 & 5.1',
    summary: 'Requires lenders to provide comprehensive All-In-Cost of Credit disclosure prior to loan execution. Mandates 48-hour resolution SLA on debit errors and prohibits aggressive third-party guarantor contact without 7-day prior written notice.',
    actionableApplication: 'Implement All-In Net Repayment Calculator on RPL loans to prevent fee disputes, and institute 48-hour Remita grace period to prevent guarantor recovery harassment.',
    tags: ['CBN', 'NDPR', 'Fair Collections', 'Fee Transparency']
  },
  {
    id: 'sol-mckinsey-voc',
    category: 'Industry Research',
    title: 'McKinsey & Company: Retaining Commercial Borrowers in African Banking',
    citation: 'McKinsey Global Banking Practice • Special Report on West African NBFIs',
    summary: 'Research proves that for mid-market SME commercial borrowers, reducing credit turnaround from 10 days to 3 days increases facility renewal probability by +34%, whereas a 100 bps interest rate discount only yields a +8% renewal increase.',
    actionableApplication: 'Speed is 4x more powerful than rate cuts. Fast-track the 48-hour Express Underwriting track for repeat SME borrowers to preserve ₦45M in accounts at risk to Access Bank.',
    tags: ['Speed vs APR', 'SME Retention', 'Commercial Underwriting']
  },
  {
    id: 'sol-gartner-ces',
    category: 'CX Frameworks',
    title: 'Gartner Customer Effort Score (CES) Reduction Blueprint in Financial Lending',
    citation: 'Gartner Customer Service & Support Research • Benchmark Study',
    summary: 'Demonstrates that 81% of customer defection risk stems from sequential departmental handoffs and repeated document requests. Replacing serial handoffs with parallel document verification drops CES from 5.8 to 2.3.',
    actionableApplication: 'Eliminate serial handoffs between Sales RMs, Risk Analysts, and Legal by creating a unified Digital Document Intake portal with parallel committee review.',
    tags: ['CES', 'Operational Efficiency', 'Process Engineering']
  },
  {
    id: 'sol-cbn-fintech',
    category: 'Regulatory (CBN)',
    title: 'CBN Operational Guidelines for Open Banking & Direct Debit Directives',
    citation: 'CBN Guidelines on Open Banking in Nigeria (Tier 1-3)',
    summary: 'Permits non-bank financial institutions to verify borrower banking history via secure Open Banking APIs, removing the need for customers to submit stamped PDF bank statements manually.',
    actionableApplication: 'Integrate Mono / Stitch Open Banking widget into Rosabon Quick Cash and RPL intake, slashing applicant turnaround from 3 days to under 15 minutes.',
    tags: ['Open Banking', 'Instant Underwriting', 'FinTech Parity']
  },
  {
    id: 'sol-ndpr-compliance',
    category: 'Data Governance',
    title: 'Nigeria Data Protection Commission (NDPC) Compliance Protocol',
    citation: 'Nigeria Data Protection Act (NDPA 2023 / 2026 Guidelines)',
    summary: 'Mandates strict pseudonymization and masking of Bank Verification Numbers (BVN), National Identity Numbers (NIN), and Card Primary Account Numbers (PAN) across internal analytics tools and reports.',
    actionableApplication: 'Maintain 100% compliance through VoC PulseIQ automated Live Data Sanitizer, scrubbing sensitive PII before ticket intake.',
    tags: ['NDPR', 'Privacy', 'BVN Masking', 'PII Scrubber']
  }
];

// ADAPTIVE OPERATIONAL LEARNING PATTERNS (Self-Learning Intelligence from Daily Actions)
export const LEARNED_OPERATIONAL_PATTERNS = [
  {
    id: 'learn-01',
    domain: 'Credit Underwriting & Turnaround',
    patternIdentified: 'Turnaround Elasticity Outweighs Interest Rate by 4.2x',
    dataEvidence: 'Analyzed 120 repeat SME borrower files: 89% accepted a +2.0% APR premium when approval was guaranteed within 48 hours.',
    learnedRule: 'Do not offer rate cuts first. Offer an Express 48h Underwriting Lane for verified repeat clients.',
    confidenceScore: 94,
    impact: 'Protects ₦65,000,000 in annual interest margin across commercial loan book'
  },
  {
    id: 'learn-02',
    domain: 'Repayment & Collections Ops',
    patternIdentified: 'Remita Midnight Debit Anomaly Drives 78% of Guarantor Harassment Calls',
    dataEvidence: 'Customer bank accounts settle between 6:00 AM – 9:00 AM on payday, but automated collection sweeps firing at 1:00 AM trigger false default warnings.',
    learnedRule: 'Delay automated recovery alerts until 4:00 PM on due date with a 48h automated grace period.',
    confidenceScore: 98,
    impact: 'Reduces detractor tickets by 42% and prevents premature client defection to Renmoney'
  },
  {
    id: 'learn-03',
    domain: 'Wealth Placements (REAP)',
    patternIdentified: 'HNI Churn Triggers on Digital Isolation, Not Yield Rates',
    dataEvidence: 'Zero HNIs churned due to competitor yields (+25 bps), but 3 major depositors threatened withdrawal after portal rollover glitches.',
    learnedRule: 'Preserve white-glove human Relationship Manager delivery of certified maturity certificates.',
    confidenceScore: 91,
    impact: 'Secures ₦180,000,000 in quarterly REAP rollover deposits'
  },
  {
    id: 'learn-04',
    domain: 'Fleet Leasing',
    patternIdentified: 'Vehicle Grounding Beyond 48 Hours Multiplies Churn Threat by 5x',
    dataEvidence: 'Logistics directors tolerate minor rate variations but defect immediately if delivery vehicles remain grounded awaiting insurance clearance.',
    learnedRule: 'Dispatch dedicated Fleet Concierge within 4 hours and provide temporary replacement loaner van within 24 hours.',
    confidenceScore: 96,
    impact: 'Preserves ₦120,000,000 in multi-vehicle corporate fleet lease contracts'
  }
];

export const DAILY_OPTIMIZATION_TASKS = [
  {
    id: 'task-opt-01',
    period: 'Morning Triage (08:30)',
    task: 'Scan overnight Remita direct debit exceptions and apply 48h recovery hold before collection calls launch.',
    recommendedAction: 'Automated Recovery Hold Protocol',
    status: 'Ready'
  },
  {
    id: 'task-opt-02',
    period: 'Midday SLA Sweep (12:00)',
    task: 'Review ad-hoc C-suite queries pending in 48-Hour SLA Copilot to maintain sub-28h average turnaround.',
    recommendedAction: 'Synthesize SLA Intelligence Memos',
    status: 'In Progress'
  },
  {
    id: 'task-opt-03',
    period: 'Afternoon Churn Defense (15:00)',
    task: 'Check Early-Warning Churn Radar for accounts with exposure >₦20M citing Access Bank or Renmoney.',
    recommendedAction: 'Deploy Proffered Mitigation to Account Lead',
    status: 'Ready'
  },
  {
    id: 'task-opt-04',
    period: 'Weekly Action Review (Friday)',
    task: 'Verify closed-loop implementation progress on adopted C-Suite initiatives to keep adoption rate >=40%.',
    recommendedAction: 'Sync with Head of Credit and CX',
    status: 'Ready'
  }
];

// OPTION B DATA: Psychographic & Behavioral Borrower Personas
export const BORROWER_PERSONAS = [
  {
    id: 'persona-1',
    name: 'The Ambitious SME Builder',
    archetype: 'Commercial Entrepreneur & Importer',
    typicalExposure: '₦15,000,000 – ₦85,000,000',
    primaryProducts: ['Rosabon SME Working Capital Loan', 'Invoice Discounting & Contract Finance'],
    coreMotivations: 'Inventory turnover speed, seasonal cashflow smoothing, seizing immediate market supply contracts.',
    decisionMakingPattern: 'Values approval speed and loan quantum significantly more than interest rate basis points. Will switch lenders immediately if approval takes > 5 days.',
    frictionTriggers: 'Sequential committee appraisal delays, repeated requests for audited statements, legal delays on collateral deeds.',
    sampleCustomer: 'Kenechukwu Agro-Allied Ltd (VOC-RSB-101)',
    retentionStrategy: 'Create Express Underwriting Lane with 48h SLA for repeat borrowers; empower Senior RMs with 50 bps discretionary buffer.'
  },
  {
    id: 'persona-2',
    name: 'The Salary-Backed Pragmatist',
    archetype: 'Employed Mid-Level Corporate Professional',
    typicalExposure: '₦200,000 – ₦2,500,000',
    primaryProducts: ['Rosabon Quick Cash (Salary Advance)', 'Rosabon Personal Loan (RPL)'],
    coreMotivations: 'Emergency school fees, medical expenses, rent payments, bridging monthly payday gaps.',
    decisionMakingPattern: 'Values extreme mobile convenience, instant direct deposit, and predictability. Extremely sensitive to unexpected fees.',
    frictionTriggers: 'Hidden administrative levies, automated auto-debits firing before salary hits, selfie liveness camera bugs.',
    sampleCustomer: 'Emeka Nwosu (VOC-RSB-106), Amina Bello (VOC-RSB-103)',
    retentionStrategy: 'All-In Repayment Calculator showing exact deductions upfront; automated 48-hour Remita grace period.'
  },
  {
    id: 'persona-3',
    name: 'The Conservative Wealth Preserver',
    archetype: 'Senior Executive, Retiree & High-Net-Worth Individual',
    typicalExposure: '₦25,000,000 – ₦150,000,000',
    primaryProducts: ['Rosabon Earning Plan (REAP)', 'Treasury Notes', 'High-Yield Placements'],
    coreMotivations: 'Inflation-beating capital preservation, dependable quarterly yield payouts, institutional trust.',
    decisionMakingPattern: 'Relationship-first. Relies heavily on dedicated Relationship Manager (RM). Reluctant to adopt self-serve mobile apps without white-glove onboarding.',
    frictionTriggers: 'Portal display errors on rollover certificates, impersonal call-center redirects, forced digital-only migrations.',
    sampleCustomer: 'Alhaji Bashir Farouk (VOC-RSB-104)',
    retentionStrategy: 'Hybrid "White-Glove Assisted Migration" desk at VI & Abuja branches with printed certified rollover certificates.'
  },
  {
    id: 'persona-4',
    name: 'The Asset & Fleet Optimizer',
    archetype: 'Logistics Director & Corporate Fleet Manager',
    typicalExposure: '₦15,000,000 – ₦150,000,000+',
    primaryProducts: ['Rosabon Consumer Asset Lease', 'Rosabon Fleet & Commercial Lease'],
    coreMotivations: 'Zero upfront capital expenditure, vehicle uptime, swift replacement vehicles during breakdown, corporate tax deductibility.',
    decisionMakingPattern: 'Total Cost of Operation (TCO) driven. Highly appreciative of maintenance support and insurance fast-tracking.',
    frictionTriggers: 'Wrongful recovery calls to directors when payment gateways delay batch settlement, slow insurance claim processing.',
    sampleCustomer: 'Crestfield Haulage Corp (VOC-RSB-107), Dr. Toluwalase Adebisi (VOC-RSB-102)',
    retentionStrategy: 'Instant payment webhook listener to prevent premature recovery alerts; dedicated fleet maintenance concierge.'
  }
];

// PRODUCT STRATEGY & LIFECYCLE MANAGEMENT ENGINE
// Management Brief: Acquisition, Customer DNA, Expansion/Upsell, and Churn Early-Warning & Mitigation
export const PRODUCT_STRATEGIES = [
  {
    id: 'prod-sme',
    productName: 'Rosabon SME Working Capital Loan',
    category: 'Commercial Credit',
    tagline: 'Flexible inventory & contract financing without rigid real estate title barriers',
    portfolioExposure: '₦840,000,000',
    activeBorrowers: 86,
    avgTicketSize: '₦25,000,000',
    churnRiskAccounts: 6,
    churnExposureAtRisk: '₦112,000,000',
    // 1. Acquisition Strategy (Get New Customers)
    acquisition: {
      targetSegments: 'Importers, FMCG Distributors, Logistics Hubs, Healthcare & Educational Providers',
      winningChannels: [
        'Corporate Relationship Manager (RM) Direct In-Person Pitching in Commercial Hubs (Ikeja, Alaba, Trade Fair)',
        'Trade Association & Chamber of Commerce Strategic MoUs (LCCI, NASME)',
        'Supplier Invoice Discounting Ecosystems (Onboard buyer corporate + discount supplier invoices)'
      ],
      valueHook: 'No C-of-O requirement: Flexible equipment, debentures, and verified receivables accepted as primary security.',
      cacEstimate: '₦120,000 per funded deal',
      paybackPeriod: '2.4 months of interest margin',
      growthTarget: '+30% loan book origination in Q4 2026'
    },
    // 2. Customer Understanding & DNA
    customerDna: {
      repaymentPsychology: 'Speed-Elastic: Prioritizes disbursement speed over interest basis points; misses inventory windows if appraisal exceeds 5 days.',
      coreJobsToBeDone: 'Clearing container shipments at Apapa/Tin Can, fulfilling corporate purchase orders before price inflation.',
      expectations: 'Transparent appraisal timeline, dedicated single point of contact (RM), rapid credit decisioning.'
    },
    // 3. Expansion & Upsell (Stay & Pay More)
    expansionAndUpsell: {
      upsellLadder: 'SME Working Capital ➔ Commercial Fleet Lease (Delivery Vans) ➔ Invoice Discounting Facility',
      tactics: [
        'Pre-approved Working Capital Increase: Automatically offer +25% credit limit after 4 consecutive on-time monthly payments.',
        'Fleet Lease Cross-Sell: Offer vehicle asset leases at 50 bps discounted APR for existing loan clients expanding delivery capacity.',
        'Bundled Treasury Placement: Concessionary borrowing rate if SME maintains compensating balance in REAP Treasury.'
      ],
      walletShareTarget: 'Increase annual revenue per SME client by 42% via multi-product bundling.'
    },
    // 4. Early-Warning Churn Signals & Proffered Mitigations
    churnMitigation: {
      earlyWarningSignals: [
        'RM debrief logs client inquiring about Commercial Bank 72-hour pre-approved business lines (e.g. Access Bank).',
        'Customer requests formal statement of account with outstanding payoff/settlement figure.',
        'Credit appraisal committee review exceeds Day 7 without RM progress update to borrower.'
      ],
      flightRiskLevel: 'High (Immediate flight risk to Commercial Banks)',
      profferedMitigationPlaybook: [
        'Express Credit Committee Bypass: Route repeat borrowers with clean bureau records through Fast-Track Underwriting (48h max).',
        'Senior RM Discretionary Buffer: Authorize Senior RMs to offer up to 75 bps interest rate discount on renewal to retain client.',
        'Collateral Perfection Flexibility: Allow loan drawdown against verified insurance cover while legal deed registration is underway.'
      ],
      retentionSuccessRate: '82% of flagged SME borrowers retained upon 48h RM in-person visit with customized rate concession.'
    }
  },
  {
    id: 'prod-rpl',
    productName: 'Rosabon Personal Loan (RPL)',
    category: 'Retail Lending',
    tagline: 'Reliable, structured salary loans for corporate employees with predictable repayment terms',
    portfolioExposure: '₦520,000,000',
    activeBorrowers: 412,
    avgTicketSize: '₦1,800,000',
    churnRiskAccounts: 18,
    churnExposureAtRisk: '₦34,500,000',
    acquisition: {
      targetSegments: 'Salaried Employees at verified Multinationals, FMCGs, Commercial Banks, and Public Parastatals',
      winningChannels: [
        'Corporate HR Partnerships & Employer Workplace MoUs (Pre-approved credit limits for company staff)',
        'Referral Multiplier: Cash-back incentive for existing borrowers who refer verified colleagues',
        'Digital Employer Portal: Self-service eligibility check with corporate email'
      ],
      valueHook: 'Structured tenures up to 24 months with lower monthly repayments than digital payday apps.',
      cacEstimate: '₦18,500 per funded loan',
      paybackPeriod: '1.8 months',
      growthTarget: '+25% retail portfolio expansion via 15 new corporate HR agreements'
    },
    customerDna: {
      repaymentPsychology: 'Predictability-First: Highly sensitive to unexpected deductions; budgeting strictly around monthly salary payday.',
      coreJobsToBeDone: 'Financing annual rent advances, children school fees, home remodeling, and medical emergencies.',
      expectations: 'Exact deduction schedule upfront, zero surprise charges, respectful and discreet communications.'
    },
    expansionAndUpsell: {
      upsellLadder: 'Rosabon Personal Loan ➔ Consumer Vehicle Asset Lease ➔ REAP Savings/Treasury Plan',
      tactics: [
        'Post-Payoff Top-Up Offer: Automated SMS/email 45 days before loan maturity offering renewal with zero processing fee.',
        'Asset Lease Transition: Target RPL borrowers with >₦2.5M salary for vehicle lease financing instead of cash outflow.',
        'Salary Bonus Advance: Seasonal short-term top-up around December and school resumption periods.'
      ],
      walletShareTarget: 'Achieve 3.2 product lifecycle interactions per retail borrower over 36 months.'
    },
    churnMitigation: {
      earlyWarningSignals: [
        'Remita auto-debit deduction fails twice due to employer salary date shifting by 48–72 hours.',
        'Borrower files Zendesk complaint regarding collection officers contacting HR or guarantors prematurely.',
        'Customer quotes lower interest rates from direct NBFI competitors (e.g. Renmoney, Page Financials).'
      ],
      flightRiskLevel: 'Medium-High (NPS Detractor risk & social media complaint exposure)',
      profferedMitigationPlaybook: [
        '48-Hour Remita Grace Period Buffer: Automated moratorium preventing collection escalations when salary is delayed.',
        'All-In Net Repayment Guarantee: Immediate credit refund of any disputed administrative or debit card tokenization fees.',
        'Guarantor Freeze: Strictly enforce policy prohibiting guarantor outreach until Day 21 of delinquency.'
      ],
      retentionSuccessRate: '91% retention of salaried borrowers when auto-debit friction is resolved without harassment.'
    }
  },
  {
    id: 'prod-quickcash',
    productName: 'Rosabon Quick Cash (Instant Salary Advance)',
    category: 'Digital Lending',
    tagline: 'Instant mobile algorithmic advance under 30 minutes powered by Open Banking',
    portfolioExposure: '₦215,000,000',
    activeBorrowers: 1480,
    avgTicketSize: '₦280,000',
    churnRiskAccounts: 64,
    churnExposureAtRisk: '₦18,200,000',
    acquisition: {
      targetSegments: 'Tech workers, young corporate associates, retail branch staff needing emergency cash before payday',
      winningChannels: [
        'App Store & Google Play Performance Marketing targeting "instant emergency loans Nigeria"',
        'Mono / Stitch Open Banking Direct Integration for 1-click bank statement verification',
        'TikTok and Instagram FinTech Explainer Shorts featuring transparent pricing calculator'
      ],
      valueHook: 'Disbursement directly to your bank account in 22 minutes with zero paper documentation.',
      cacEstimate: '₦4,800 per active borrower',
      paybackPeriod: '0.9 months',
      growthTarget: '+50% monthly active borrowers (MAB)'
    },
    customerDna: {
      repaymentPsychology: 'Extreme Convenience & Mobile-Native: Won’t fill forms; abandons app if camera liveness or BVN fails.',
      coreJobsToBeDone: 'Urgent car repair, grocery restock before payday, utility bill payment, short-term cash crunch.',
      expectations: 'Instant disbursement, clear total payback figure on the slider, seamless mobile experience.'
    },
    expansionAndUpsell: {
      upsellLadder: 'Quick Cash (₦250k) ➔ RPL Salary Loan (₦1.5M) ➔ REAP Earning Plan',
      tactics: [
        'Algorithmic Credit Limit Tiering: Double borrower credit ceiling (from ₦150k to ₦300k) upon 2 flawless repayments.',
        'Graduate to RPL: Seamlessly invite top 10% Quick Cash borrowers to apply for 12-month RPL with 1-click in-app consent.',
        'Instant Micro-Savings: Offer optional 5% auto-save into REAP yielding 14% p.a. upon loan repayment.'
      ],
      walletShareTarget: 'Convert 18% of digital quick cash users into long-term structured installment borrowers.'
    },
    churnMitigation: {
      earlyWarningSignals: [
        'Customer opens app loan calculator 3 times but exits without drawing down (indicating fee shock).',
        'Biometric camera verification fails repeatedly during liveness check.',
        'Customer mentions rival digital apps (Carbon, FairMoney) in app store reviews.'
      ],
      flightRiskLevel: 'Medium (High churn velocity due to low switching barrier)',
      profferedMitigationPlaybook: [
        'Automated Camera Fallback: Allow bank OTP verification if phone camera liveness fails on low-end Android devices.',
        'First-Time Borrower Fee Discount: 50% discount on initial management fee applied directly at checkout.',
        'Transparent Payback Slider: Explicitly display total payback amount with zero hidden charges before drawdown.'
      ],
      retentionSuccessRate: '74% drop-off recovery when camera fallback and transparent fee sliders are active.'
    }
  },
  {
    id: 'prod-lease',
    productName: 'Rosabon Consumer & Commercial Fleet Lease',
    category: 'Asset Finance & Leasing',
    tagline: 'Vehicle & equipment asset financing with maintenance, insurance, and fleet uptime management',
    portfolioExposure: '₦980,000,000',
    activeBorrowers: 72,
    avgTicketSize: '₦18,500,000',
    churnRiskAccounts: 4,
    churnExposureAtRisk: '₦74,000,000',
    acquisition: {
      targetSegments: 'Corporate Fleet Managers, Logistics & Ride-Hailing Operators, Corporate Executives seeking luxury vehicles',
      winningChannels: [
        'Certified Auto-Dealership Partnerships (GAC Motors, Toyota Nigeria, Coscharis Showroom desks)',
        'Corporate Fleet Replacement Programs (Trade-in aging company cars for new fleet with operating lease)',
        'Logistics Association Co-Branded Leasing Packages'
      ],
      valueHook: 'Preserve working capital: 100% vehicle acquisition with tax-deductible monthly lease rentals and comprehensive tracking.',
      cacEstimate: '₦160,000 per lease contract',
      paybackPeriod: '3.1 months',
      growthTarget: '+35% lease volume in corporate vehicle replacement'
    },
    customerDna: {
      repaymentPsychology: 'Operational Continuity & TCO Driven: Focused on vehicle uptime, insurance settlement speed, and maintenance support.',
      coreJobsToBeDone: 'Expanding delivery van fleet, providing executive company cars without depleting corporate liquidity.',
      expectations: 'Rapid insurance claim resolution during accidents, loaner car during maintenance, smooth title transfer at lease end.'
    },
    expansionAndUpsell: {
      upsellLadder: 'Single Vehicle Lease ➔ Multi-Vehicle Fleet Lease ➔ Commercial Haulage & Equipment Leasing',
      tactics: [
        'Lease-to-Own Buyback Option: Offer attractive residual value buyout or trade-in for brand new vehicle after 36 months.',
        'Fleet Management Upsell: Bundle GPS telematics, fuel card management, and scheduled preventative maintenance into monthly fee.',
        'Equipment Lease Expansion: Expand from logistics vans into warehouse forklifts, generators, and packaging machinery.'
      ],
      walletShareTarget: 'Retain 65% of lease customers for their next vehicle replacement cycle.'
    },
    churnMitigation: {
      earlyWarningSignals: [
        'Lease client reports vehicle breakdown and experiences >48 hours delay in insurance surveyor inspection.',
        'Customer receives wrongful recovery alert while gateway bank transfer was pending batch reconciliation.',
        'Customer inquires about early lease termination penalties.'
      ],
      flightRiskLevel: 'Critical (High-value asset contracts with large portfolio exposure)',
      profferedMitigationPlaybook: [
        'Dedicated Fleet Concierge: Assign senior operations officer to handle insurance repairs and provide temporary replacement car.',
        'Recovery Hold Protocol: Hard block on any repo notices for corporate lease accounts without Managing Director clearance.',
        'Flexible Restructuring: Restructure lease tenure from 24 to 36 months to reduce monthly payment burden during economic slowdowns.'
      ],
      retentionSuccessRate: '88% client retention when fleet operations team expedites vehicle repair and waives dispute penalties.'
    }
  },
  {
    id: 'prod-reap',
    productName: 'Rosabon Earning Plan (REAP) & Treasury Notes',
    category: 'Treasury & Wealth Placements',
    tagline: 'High-yield, inflation-hedging fixed placements with guaranteed quarterly returns for HNIs and corporates',
    portfolioExposure: '₦1,450,000,000',
    activeBorrowers: 135,
    avgTicketSize: '₦45,000,000',
    churnRiskAccounts: 5,
    churnExposureAtRisk: '₦195,000,000',
    acquisition: {
      targetSegments: 'High-Net-Worth Individuals (HNIs), Senior Corporate Executives, Retirees, Corporate Treasurers',
      winningChannels: [
        'Private Wealth Advisory & HNI Executive Luncheons in Ikoyi, Victoria Island, and Abuja',
        'Corporate Treasury Cross-Sell: Offer idle cash yield optimization for corporate borrowing clients',
        'HNW Client Referral Circles with exclusive tier-1 relationship perks'
      ],
      valueHook: 'Premium interest rates yielding up to 18.5% p.a., significantly outperforming commercial bank fixed deposits.',
      cacEstimate: '₦85,000 per HNI placement',
      paybackPeriod: '1.2 months',
      growthTarget: '+₦350M in new net treasury deposits in Q4 2026'
    },
    customerDna: {
      repaymentPsychology: 'Trust, Safety & White-Glove Respect: Extremely sensitive to institutional stability, audited records, and personal respect.',
      coreJobsToBeDone: 'Protecting capital against inflation, securing reliable quarterly cashflow, funding overseas tuition.',
      expectations: 'Immediate certified maturity notices, dedicated wealth manager access 24/7, zero digital confusion.'
    },
    expansionAndUpsell: {
      upsellLadder: 'REAP Standard (₦5M) ➔ Rosabon Treasury Notes (₦25M) ➔ Institutional Commercial Paper (₦100M+)',
      tactics: [
        'Rollover Yield Booster: +50 bps bonus interest rate for depositors who roll over principal + accrued interest for 12 months.',
        'Credit Line Secured by REAP: Allow HNI depositors to borrow up to 80% of their investment value instantly at concessionary rate.',
        'Family Wealth Accounts: Enable multi-generational account linkage with joint maturity certificates.'
      ],
      walletShareTarget: 'Increase average HNI placement tenure from 12 months to 28 months.'
    },
    churnMitigation: {
      earlyWarningSignals: [
        'HNW client expresses frustration with digital portal certificate displays or self-service app migration.',
        'Investor inquires about non-renewal 30 days prior to certificate maturity date.',
        'Client mentions rival investment houses offering teaser rates or private banking gifts.'
      ],
      flightRiskLevel: 'Critical (Massive liquidity impact if ₦50M+ placement liquidates)',
      profferedMitigationPlaybook: [
        'Executive White-Glove Desk: Head of Wealth or Managing Director direct phone call and executive visit with printed audited certificate.',
        'Rollover Concession: Match or beat competitor rate by +25 bps on 12-month tenure renewal.',
        'VIP Client Concierge: Waive all advisory fees and provide priority branch executive lounge privileges in Lagos and Abuja.'
      ],
      retentionSuccessRate: '94% retention of HNI treasury placements when senior leadership personally engages prior to maturity.'
    }
  }
];

// REAL-TIME FLAGGED CHURN ACCOUNTS RADAR
export const ACTIVE_CHURN_FLAGS = [
  {
    id: 'CHURN-RSB-01',
    customerName: 'Kenechukwu Agro-Allied Ltd',
    customerTier: 'Commercial SME (Tier 1)',
    product: 'Rosabon SME Working Capital Loan',
    portfolioAtRisk: '₦45,000,000',
    flagDate: '2026-10-19',
    triggerSignal: 'Credit committee delay (Day 12). Threatening defection to Access Bank 72h line.',
    competitorThreat: 'Access Bank Commercial Line',
    riskLevel: 'Critical',
    proposedSolution: 'Fast-Track Credit Committee approval within 24h; Senior RM visit with 50 bps interest rate concession.',
    status: 'Pending Mitigation',
    mitigationActionTaken: null
  },
  {
    id: 'CHURN-RSB-02',
    customerName: 'Alhaji Bashir Farouk',
    customerTier: 'Tier 1 HNI Investor',
    product: 'Rosabon Earning Plan (REAP) & Treasury Notes',
    portfolioAtRisk: '₦80,000,000',
    flagDate: '2026-10-18',
    triggerSignal: 'Portal display glitch on rollover certificate; frustration with forced self-serve migration.',
    competitorThreat: 'Stanbic IBTC Wealth Management',
    riskLevel: 'Critical',
    proposedSolution: 'Executive White-Glove RM visit in Abuja with printed certified rollover certificate; +30 bps yield booster.',
    status: 'Pending Mitigation',
    mitigationActionTaken: null
  },
  {
    id: 'CHURN-RSB-03',
    customerName: 'Dr. Toluwalase Adebisi',
    customerTier: 'Retail Professional',
    product: 'Rosabon Consumer Asset Lease (Vehicle/Equipment)',
    portfolioAtRisk: '₦8,500,000',
    flagDate: '2026-10-20',
    triggerSignal: 'Harassing recovery call to guarantor despite successful Remita direct debit deduction on 24th.',
    competitorThreat: 'Renmoney Lease',
    riskLevel: 'High',
    proposedSolution: 'Immediate executive apology from Head of Recovery; 48-hour recovery hold protocol; ₦25,000 courtesy credit voucher.',
    status: 'Pending Mitigation',
    mitigationActionTaken: null
  },
  {
    id: 'CHURN-RSB-04',
    customerName: 'Crestfield Haulage Corp',
    customerTier: 'Commercial Logistics Fleet',
    product: 'Rosabon Fleet & Commercial Lease',
    portfolioAtRisk: '₦28,000,000',
    flagDate: '2026-10-17',
    triggerSignal: 'Two delivery vans grounded pending insurance surveyor clearance for 5 days; revenue loss complaint.',
    competitorThreat: 'Direct Fleet Lease Rival',
    riskLevel: 'High',
    proposedSolution: 'Dispatch Rosabon Fleet Concierge to expedite surveyor sign-off; provide temporary loaner van for 48 hours.',
    status: 'Pending Mitigation',
    mitigationActionTaken: null
  },
  {
    id: 'CHURN-RSB-05',
    customerName: 'Emeka Nwosu',
    customerTier: 'Retail Salary Earner',
    product: 'Rosabon Personal Loan (RPL)',
    portfolioAtRisk: '₦1,850,000',
    flagDate: '2026-10-21',
    triggerSignal: 'Unhappy with surprise administrative processing deduction not shown on initial flyer.',
    competitorThreat: 'Carbon / FairMoney',
    riskLevel: 'Medium',
    proposedSolution: 'Immediate fee waiver rebate; send All-In Amortization Schedule with transparent net payout.',
    status: 'Pending Mitigation',
    mitigationActionTaken: null
  }
];

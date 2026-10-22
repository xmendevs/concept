/**
 * ROSABON FINANCIAL SERVICES - PRODUCT REQUIREMENTS DOCUMENTS (PRD) REPOSITORY
 * Comprehensive operational PRDs for core products & intelligent PRD generator/parser for custom product lines.
 */

export const DEFAULT_PRODUCT_PRDS = {
  'prod-sme': {
    title: 'PRD-RSB-SME: Rosabon SME Working Capital Facility',
    version: 'v2.4-Production',
    status: 'Active in Market',
    author: 'Head of Commercial Credit & Product Architecture',
    lastUpdated: 'October 2026',
    problemStatement: 'Nigerian mid-market SMEs face chronic cashflow crunches clearing import cargo at Apapa ports and fulfilling commercial purchase orders. Tier-1 commercial banks require Certificate of Occupancy (C-of-O) titles on prime Lagos real estate, which locks out 74% of viable operating businesses.',
    targetAudience: 'Importers, FMCG Distributors, Logistics Operators, Healthcare & Educational Providers with monthly turnover >= ₦10,000,000 and min 2 years operating history.',
    underwritingCriteria: {
      minTurnover: '₦10,000,000 average monthly bank turnover',
      creditBureau: 'Zero 90+ days past due across CRC, FirstCentral, and CreditRegistry in trailing 12 months',
      collateral: 'Equipment hypothecation, stock debentures, and verified corporate purchase order receivables',
      guarantor: 'Two credible directors with personal indemnity and clean bureau scores',
      maxDti: '35% Debt Service Coverage Ratio (DSCR >= 1.35x)'
    },
    targetKpis: {
      slaTurnaround: '48–72 Hours (Express Underwriting Track)',
      targetNpl: '< 2.4%',
      targetIrr: '34.5% Annualized Margin',
      targetDisbursal: '₦350M monthly origination',
      retentionRate: '85% facility rollover'
    },
    regulatoryCompliance: 'CBN Non-Bank Financial Institutions (NBFI) Credit Guidelines, NDPR 2026 PII Scrubbing on Director BVNs, and GSI/Remita Direct Debit Mandate rules.',
    fullDocument: `# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Rosabon SME Working Capital Facility (RSB-SME)
**Document Version:** v2.4-Production | **Classification:** Rosabon Executive Confidential
**Product Lead:** Head of Commercial Credit & Product Architecture
**Effective Date:** Q1 2026 – Q4 2026

---

### 1. Executive Summary & Strategic Rationale
The Rosabon SME Working Capital Loan is engineered to provide fast-turnaround inventory and contract financing to mid-tier Nigerian enterprises without demanding rigid real estate titles (Certificate of Occupancy). By accepting asset debentures, verifiable receivables, and equipment pledges, Rosabon bridges the ₦15M–₦85M commercial credit gap left open by traditional commercial banks.

### 2. Market Problem & Opportunity
- **Bank Lending Paralysis:** Tier-1 banks take 3–6 weeks to approve SME facilities and reject borrowers lacking prime residential deeds.
- **Port & Supply Chain Friction:** Demurrage fees at Lagos ports escalate daily; importers who cannot access ₦20M–₦50M within 72 hours face devastating financial penalties.
- **Rosabon Advantage:** Turnaround under 72 hours for first-time borrowers; guaranteed 48-hour approval for clean renewals.

### 3. Target Customer Personas & Eligibility
- **Primary Persona:** The Ambitious SME Builder (Importers, FMCG wholesalers, logistics fleets, industrial processors).
- **Minimum Bank Turnover:** ₦10,000,000 per month (audited or 12-month certified bank statements).
- **Operating Age:** Minimum 24 months incorporated with CAC.
- **Borrower Psychology:** Speed-elastic. Values rapid capital disbursement over 50–100 bps APR differences.

### 4. Product Specifications & Underwriting Rules
- **Facility Quantum:** ₦5,000,000 to ₦85,000,000.
- **Tenure:** 3 to 12 months (revolving working capital with monthly bullet or bullet interest options).
- **Pricing:** 2.8% – 3.5% monthly flat (33.6% – 42% APR).
- **Security Structure:**
  1. Tripartite warehousing agreement OR verified corporate purchase order (PO).
  2. Fixed and floating debenture on inventory/equipment.
  3. Undated cheques / Remita standing order mandate.
  4. Personal guarantee from 2 equity directors.

### 5. Regulatory & Compliance Framework
- Compliance with CBN Revised NBFI Prudential Guidelines.
- Mandatory credit bureau checks via CRC, FirstCentral, and CreditRegistry.
- Full compliance with Nigeria Data Protection Act (NDPA 2023 / 2026): Director BVNs and NINs masked in VoC repositories.

### 6. Success Metrics & Performance KPIs
- **Disbursement Turnaround SLA:** 48–72 hours from completed document submission.
- **Target Non-Performing Loans (NPL):** Maintained below 2.5% of total portfolio book.
- **Quarterly Facility Rollover Rate:** >= 80% of performing borrowers renewing facility.`
  },

  'prod-rpl': {
    title: 'PRD-RSB-RPL: Rosabon Personal Loan (RPL)',
    version: 'v3.1-Production',
    status: 'Active in Market',
    author: 'Consumer Lending Product Manager',
    lastUpdated: 'October 2026',
    problemStatement: 'Salaried Nigerian employees face cash crunch between monthly paydays for lump-sum commitments (school fees, annual advance rent, medical emergencies). Digital loan apps offer predatory APRs (60%-120%) and abusive recovery harassment, while commercial banks require complex payroll domiciliation.',
    targetAudience: 'Employed professionals at verified multinational corporations, commercial banks, telecom firms, FMCGs, and accredited government MDAs earning net >= ₦150,000/month.',
    underwritingCriteria: {
      minTurnover: '₦150,000 monthly net salary inflow',
      creditBureau: 'No active non-performing debt on CreditBureau registry',
      collateral: 'Clean Remita / Direct Debit salary mandate + employer verification letter',
      guarantor: 'One credible corporate colleague guarantor for amounts > ₦1.5M',
      maxDti: '33.3% of verifiable net monthly salary'
    },
    targetKpis: {
      slaTurnaround: '24–48 Hours',
      targetNpl: '< 1.8%',
      targetIrr: '36.0% APR',
      targetDisbursal: '₦180M monthly origination',
      retentionRate: '75% renewal at month 10'
    },
    regulatoryCompliance: 'CBN Consumer Protection Framework 2026, FCCPC Ethical Lending Code, and NDPR Fair Contact Rules prohibiting premature guarantor contact.',
    fullDocument: `# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Rosabon Personal Loan (RPL)
**Document Version:** v3.1-Production | **Classification:** Rosabon Executive Confidential
**Product Lead:** Consumer Lending Product Manager

### 1. Executive Summary
Rosabon Personal Loan (RPL) provides salaried professionals in corporate Nigeria with structured installment financing up to ₦6,000,000 over 6 to 24 months. RPL balances competitive interest rates with humane, ethical credit management, directly answering customer fatigue with aggressive digital loan sharks.

### 2. User Problem Statement
Employees frequently confront lump-sum cash demands—annual house rent, school tuition, vehicle repairs—that exceed their monthly liquidity. Predatory digital apps offer rapid micro-cash but harass contacts and charge over 80% APR. RPL delivers large-ticket liquidity with predictable fixed deductions aligned with payday.

### 3. Key Underwriting Parameters
- **Maximum Facility:** Up to ₦6,000,000 (dependent on verifiable net monthly pay).
- **Debt-to-Income (DTI):** Capped at 33.3% of net monthly take-home salary.
- **Tenure Range:** 6, 12, 18, and 24 months.
- **Repayment Mechanism:** Automated Remita standing order triggered 24 hours post-salary alert.

### 4. Ethical Collections & Churn Defense Playbook
- **48-Hour Remita Grace Period:** Zero collection contact or penalty interest if payment delayed due to employer payroll delays.
- **Guarantor Protection:** Guarantors are never contacted before Day 21 of consecutive delinquency and only after written notice.`
  },

  'prod-quickcash': {
    title: 'PRD-RSB-QC: Rosabon Quick Cash (Instant Salary Advance)',
    version: 'v4.0-Production',
    status: 'Active in Market',
    author: 'Digital Banking & Mobile Platforms Lead',
    lastUpdated: 'October 2026',
    problemStatement: 'Young salaried workers encounter unexpected mid-month emergencies and abandon traditional loan applications that require paper documents, physical branch visits, or manual bank statement stamping.',
    targetAudience: 'Tech workers, young corporate associates, retail branch staff aged 22–38 seeking instant micro-liquidity (₦50k–₦500k) via mobile app.',
    underwritingCriteria: {
      minTurnover: '₦80,000 monthly salary inflow verified via Open Banking API (Mono/Stitch)',
      creditBureau: 'Algorithmic bureau check via API with sub-30 second response',
      collateral: 'Direct debit card tokenization + automated bank debit mandate',
      guarantor: 'Zero guarantor requirement (purely algorithmic)',
      maxDti: '25% of monthly salary'
    },
    targetKpis: {
      slaTurnaround: 'Under 25 minutes end-to-end',
      targetNpl: '< 3.2%',
      targetIrr: '42.0% APR',
      targetDisbursal: '2,500 active monthly disbursements',
      retentionRate: '88% repeat utilization'
    },
    regulatoryCompliance: 'CBN Open Banking Tier-1 Regulations, NDPR Automated Decisioning Transparency Protocol.',
    fullDocument: `# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Rosabon Quick Cash (Instant Salary Advance)
**Document Version:** v4.0-Production | **Classification:** Internal Product Spec
**Product Lead:** Digital Banking & Mobile Platforms Lead

### 1. Overview & Objective
Quick Cash is Rosabon’s flagship mobile algorithmic loan. It delivers sub-25-minute loan application, appraisal, and direct disbursement to any Nigerian commercial bank account with zero manual paperwork.

### 2. Core Functional Requirements
- **Open Banking Statement Verification:** Ingestion of 6-month statement via Mono/Stitch without manual PDF upload.
- **Automated Credit Decision Engine:** Instant affordability scoring, identity matching with BVN/NIN, and automated disbursement via NIP gateway.
- **Transparent Fee Slider:** Displays all interest, administrative charges, and total payback amount prior to acceptance.`
  },

  'prod-lease': {
    title: 'PRD-RSB-LEASING: Rosabon Consumer & Fleet Asset Lease',
    version: 'v2.2-Production',
    status: 'Active in Market',
    author: 'Head of Asset Financing & Fleet Solutions',
    lastUpdated: 'October 2026',
    problemStatement: 'Corporate businesses and mid-to-senior executives require reliable operational mobility (delivery vans, corporate sedans, logistics trucks) but cannot afford large upfront capital expenditure in an inflationary economy.',
    targetAudience: 'Corporate logistics directors, FMCG sales fleet coordinators, and Tier-1 executives seeking vehicle lease financing up to ₦150M.',
    underwritingCriteria: {
      minTurnover: '₦25,000,000 monthly turnover for corporate leases; ₦800k salary for retail executive leases',
      creditBureau: 'Satisfactory corporate credit rating and clean director bureau profiles',
      collateral: 'Asset ownership title retained by Rosabon with telematics tracking & comprehensive insurance',
      guarantor: 'Corporate board resolution or corporate cross-guarantee',
      maxDti: '40% operating cashflow coverage'
    },
    targetKpis: {
      slaTurnaround: '4 to 5 Business Days (inclusive of vehicle procurement and telematics installation)',
      targetNpl: '< 1.5%',
      targetIrr: '32.0% APR',
      targetDisbursal: '₦250M monthly lease value',
      retentionRate: '92% fleet lease renewal'
    },
    regulatoryCompliance: 'Equipment Leasing Act of Nigeria, National Insurance Commission (NAICOM) insurance compliance.',
    fullDocument: `# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Rosabon Consumer & Fleet Asset Lease
**Document Version:** v2.2-Production | **Classification:** Executive Confidential
**Product Lead:** Head of Asset Financing & Fleet Solutions

### 1. Value Proposition
Enables corporations and executives to acquire and operate brand-new and certified pre-owned vehicles with zero capital lockup. Rosabon maintains vehicle title, comprehensive insurance, and GPS telematics throughout the tenure.`
  },

  'prod-reap': {
    title: 'PRD-RSB-REAP: Rosabon Earning Plan (REAP Treasury & Wealth)',
    version: 'v3.0-Production',
    status: 'Active in Market',
    author: 'Head of Treasury & High-Net-Worth Wealth Desk',
    lastUpdated: 'October 2026',
    problemStatement: 'High-Net-Worth Individuals (HNIs) and corporate treasurers face currency devaluation and negative real yields in traditional commercial bank savings (paying sub-7%). They require dependable, high-yield institutional fixed-term placements with flexible tenure and institutional governance.',
    targetAudience: 'HNIs, retirees, corporate finance directors, family offices, and diaspora investors with minimum placement of ₦1,000,000.',
    underwritingCriteria: {
      minTurnover: 'Minimum single placement of ₦1,000,000 (No upper cap)',
      creditBureau: 'KYC & AML source-of-funds verification in accordance with CBN / NFIU guidelines',
      collateral: 'Secured treasury placement backed by Rosabon commercial credit portfolio',
      guarantor: 'N/A (Deposit product)',
      maxDti: 'N/A'
    },
    targetKpis: {
      slaTurnaround: 'Same-day value booking and certificate issuance',
      targetNpl: 'Zero default risk on investor principal and accrued yield',
      targetIrr: '13.5% – 17.5% Annualized Yield to Investor',
      targetDisbursal: '₦500M quarterly deposit balance growth',
      retentionRate: '86% quarterly rollover rate'
    },
    regulatoryCompliance: 'CBN Revised Guidelines for Finance Companies in Nigeria, Money Laundering (Prevention and Prohibition) Act 2022.',
    fullDocument: `# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Rosabon Earning Plan (REAP Treasury & Wealth)
**Document Version:** v3.0-Production | **Classification:** Executive Confidential
**Product Lead:** Head of Treasury & High-Net-Worth Wealth Desk

### 1. Strategic Role
REAP serves as the core funding engine for Rosabon’s commercial and consumer lending portfolio. It provides institutional and private wealth depositors with superior yields backed by Rosabon’s 30+ year track record.`
  }
};

/**
 * Automatically parses a pasted PRD text to extract strategic parameters
 */
export function parsePrdMarkdown(rawText) {
  if (!rawText || typeof rawText !== 'string') return {};

  const result = {
    productName: '',
    category: 'Commercial Credit',
    tagline: '',
    valueHook: '',
    targetSegments: '',
    repaymentPsychology: '',
    churnSignal: '',
    portfolioExposure: '₦350,000,000',
    underwritingCriteria: '',
    targetKpis: ''
  };

  const lines = rawText.split('\n');

  // 1. Try to extract product name from first H1 or title
  for (const line of lines) {
    const clean = line.trim();
    if (clean.startsWith('# ') || clean.toLowerCase().startsWith('title:') || clean.toLowerCase().startsWith('product name:')) {
      result.productName = clean.replace(/^[#:]+\s*|^(title|product name):\s*/i, '').replace(/product requirements document|prd|\(prd\)/gi, '').trim();
      break;
    }
  }

  // 2. Scan for sections
  const textLower = rawText.toLowerCase();

  // Category heuristic
  if (textLower.includes('fleet') || textLower.includes('vehicle') || textLower.includes('lease') || textLower.includes('asset')) {
    result.category = 'Asset Financing & Leasing';
  } else if (textLower.includes('salary') || textLower.includes('payroll') || textLower.includes('personal loan')) {
    result.category = 'Retail Loans';
  } else if (textLower.includes('quick cash') || textLower.includes('instant') || textLower.includes('mobile app')) {
    result.category = 'Digital Lending';
  } else if (textLower.includes('treasury') || textLower.includes('wealth') || textLower.includes('deposit') || textLower.includes('earning plan')) {
    result.category = 'Treasury & Wealth Management';
  } else if (textLower.includes('invoice') || textLower.includes('receivable')) {
    result.category = 'Invoice Discounting';
  } else {
    result.category = 'Commercial Credit';
  }

  // Value hook / Problem statement extraction
  const problemMatch = rawText.match(/(?:problem statement|executive summary|value proposition|overview)[\s\S]*?(?=\n##|\n#|$)/i);
  if (problemMatch) {
    const extracted = problemMatch[0].replace(/^(?:problem statement|executive summary|value proposition|overview)[:\s#]*/i, '').trim();
    result.valueHook = extracted.slice(0, 240).replace(/\n/g, ' ') + (extracted.length > 240 ? '...' : '');
  }

  // Target customer / segments extraction
  const targetMatch = rawText.match(/(?:target audience|target customer|target persona|eligibility)[\s\S]*?(?=\n##|\n#|$)/i);
  if (targetMatch) {
    const extracted = targetMatch[0].replace(/^(?:target audience|target customer|target persona|eligibility)[:\s#]*/i, '').trim();
    result.targetSegments = extracted.slice(0, 200).replace(/\n/g, ' ') + (extracted.length > 200 ? '...' : '');
  }

  // Underwriting / criteria extraction
  const underMatch = rawText.match(/(?:underwriting|eligibility criteria|risk parameters|security structure)[\s\S]*?(?=\n##|\n#|$)/i);
  if (underMatch) {
    const extracted = underMatch[0].replace(/^(?:underwriting|eligibility criteria|risk parameters|security structure)[:\s#]*/i, '').trim();
    result.underwritingCriteria = extracted.slice(0, 240).replace(/\n/g, ' ');
  }

  // Churn / risks extraction
  const riskMatch = rawText.match(/(?:risks|churn|early warning|threats|defection)[\s\S]*?(?=\n##|\n#|$)/i);
  if (riskMatch) {
    const extracted = riskMatch[0].replace(/^(?:risks|churn|early warning|threats|defection)[:\s#]*/i, '').trim();
    result.churnSignal = extracted.slice(0, 220).replace(/\n/g, ' ') + (extracted.length > 220 ? '...' : '');
  }

  return result;
}

/**
 * Generates a clean markdown template for any new product PRD
 */
export function generatePrdTemplate({ productName, category, tagline, valueHook, targetSegments, portfolioExposure }) {
  const pName = productName || 'New Rosabon Financial Product';
  return `# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## ${pName}
**Category:** ${category || 'Commercial Credit'} | **Document Version:** v1.0-Production
**Author:** Product Strategy Lead | **Classification:** Rosabon Executive Confidential
**Monitored Exposure Target:** ${portfolioExposure || '₦350,000,000'}

---

### 1. Executive Summary & Problem Statement
${valueHook || 'This product is structured to eliminate customer friction, accelerate loan appraisal turnaround, and provide competitive financing options tailored to Nigerian market demands.'}

### 2. Target Market & User Personas
- **Primary Target Profile:** ${targetSegments || 'Mid-tier commercial enterprises, verified corporate salaried employees, and growth businesses.'}
- **Borrower Psychology:** Values transparent pricing, single Relationship Manager contact, and rapid credit committee turnaround.

### 3. Underwriting & Risk Architecture
- **Minimum Operating Turnover:** Verifiable 6-month bank statement demonstrating consistent cashflow.
- **Credit Bureau Verification:** Clean credit standing across Nigerian Credit Bureaus (CRC, FirstCentral, CreditRegistry).
- **Security & Collateral Structure:** Personal director indemnity, Remita/direct debit mandate, and debenture on business assets or verifiable receivables.
- **Max Debt-to-Income / DSCR:** Debt service capped at 35% of verifiable net monthly operating income.

### 4. Target KPIs & Success Metrics
- **Appraisal Turnaround SLA:** 48–72 Hours.
- **Target Portfolio NPL:** Maintained below 3.0%.
- **Quarterly Facility Rollover Rate:** >= 80% customer retention upon maturity.

### 5. Regulatory & Compliance Safeguards
- Full adherence to Central Bank of Nigeria (CBN) Non-Bank Financial Institutions Prudential Guidelines.
- Nigeria Data Protection Act (NDPA 2023 / 2026) compliance: Automatic BVN, NIN, and PAN masking across customer intelligence tools.
`;
}

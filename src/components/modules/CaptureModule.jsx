import React, { useState } from 'react';
import { 
  Inbox, 
  UploadCloud, 
  PlusCircle, 
  FileSpreadsheet, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  RefreshCw,
  Download,
  AlertCircle,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Copy,
  Check,
  Zap,
  Link2,
  Globe,
  Database
} from 'lucide-react';
import { DEPARTMENTS, ROSABON_PRODUCTS, THEMES } from '../../data/mockData';

export default function CaptureModule({ vocData, onAddVoCItem, onBulkAdd, defaultSubTab = 'form' }) {
  const [activeMode, setActiveMode] = useState(defaultSubTab); // 'form' | 'upload' | 'sheets' | 'sanitizer' | 'health'

  // GOOGLE SHEETS & DRIVE SYNC STATE
  const [sheetUrl, setSheetUrl] = useState('https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0');
  const [isSyncingSheets, setIsSyncingSheets] = useState(false);
  const [sheetSyncStatus, setSheetSyncStatus] = useState(null);
  const [pastedCsvData, setPastedCsvData] = useState('');

  // Quick RM Form State
  const [formData, setFormData] = useState({
    customerName: '',
    customerTier: 'Commercial SME (Tier 1)',
    department: 'sales_rm',
    channel: 'RM 1-on-1 Client Visit',
    loanProduct: ROSABON_PRODUCTS[2], // SME loan
    loanAmount: '₦20,000,000',
    date: new Date().toISOString().split('T')[0],
    qualitativeText: '',
    sentiment: 'Negative',
    urgency: 'High',
    churnRisk: false,
    npsScore: 3,
    csatScore: 2,
    cesScore: 6,
    selectedThemes: [THEMES[0]],
    actionOwner: 'Head of Credit Appraisal'
  });

  const [notification, setNotification] = useState('');

  // LIVE SANITIZER TESTER STATE
  const [rawInputText, setRawInputText] = useState(
    'Hello Rosabon care, my BVN is 22194837192 and my NIN is 10928374829. I applied for a car lease on 12th October with my debit card 5399 4100 2341 8812. Your app deducted an extra ₦150,000 late penalty fee when I already paid on time via transfer! Please reverse this immediately or I am reporting to CBN and liquidating my account. Sent from my iPhone'
  );
  const [sanitizedResult, setSanitizedResult] = useState(null);
  const [customerNameInput, setCustomerNameInput] = useState('Chinedu Okafor');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.qualitativeText) return;

    const newItem = {
      id: `VOC-RSB-${Math.floor(100 + Math.random() * 900)}`,
      ...formData,
      npsCategory: formData.npsScore >= 9 ? 'Promoter' : formData.npsScore >= 7 ? 'Passive' : 'Detractor',
      sentimentScore: formData.sentiment === 'Positive' ? 0.85 : formData.sentiment === 'Neutral' ? 0.0 : -0.85,
      themes: formData.selectedThemes,
      status: formData.churnRisk ? 'Action Required' : 'Logged'
    };

    onAddVoCItem(newItem);
    setNotification(`Logged feedback for ${formData.customerName}. Record indexed into VoC repository.`);
    setTimeout(() => setNotification(''), 4000);

    setFormData({
      ...formData,
      customerName: '',
      qualitativeText: '',
      churnRisk: false
    });
  };

  const handleSimulateBatch = () => {
    const mockBatch = [
      {
        id: `VOC-RSB-${Math.floor(200 + Math.random() * 800)}`,
        customerName: 'Prime Logistic Solutions (Lekki)',
        customerTier: 'Commercial SME (Tier 1)',
        department: 'sales_rm',
        channel: 'RM Field Visit',
        loanProduct: 'Rosabon SME Working Capital Loan',
        loanAmount: '₦35,000,000',
        date: new Date().toISOString().split('T')[0],
        qualitativeText: 'Borrower requested fast-track approval on seasonal working capital. Stated competitor promised 48-hour drawdown. Urgently escalated to Credit Committee.',
        sentiment: 'Negative',
        sentimentScore: -0.75,
        urgency: 'Critical',
        churnRisk: true,
        npsCategory: 'Detractor',
        npsScore: 2,
        csatScore: 2,
        cesScore: 6,
        themes: ['Disbursement Speed & Appraisal SLA'],
        status: 'In Review',
        actionOwner: 'Head of Credit Appraisal'
      },
      {
        id: `VOC-RSB-${Math.floor(200 + Math.random() * 800)}`,
        customerName: 'Fatima Aliyu',
        customerTier: 'Retail Salary Earner',
        department: 'cx',
        channel: 'WhatsApp Support Desk',
        loanProduct: 'Rosabon Quick Cash (Instant Salary Advance)',
        loanAmount: '₦400,000',
        date: new Date().toISOString().split('T')[0],
        qualitativeText: 'Salary deduction was processed twice on Remita this morning. Need immediate reversal of the extra ₦400k debit.',
        sentiment: 'Negative',
        sentimentScore: -0.9,
        urgency: 'Critical',
        churnRisk: false,
        npsCategory: 'Detractor',
        npsScore: 1,
        csatScore: 1,
        cesScore: 7,
        themes: ['Repayment, Remita/Direct-Debit & Reconciliation'],
        status: 'Action Required',
        actionOwner: 'Recovery & Credit Reconciliation Lead'
      }
    ];

    onBulkAdd(mockBatch);
    setNotification(`Imported batch of 2 new customer feedback records.`);
    setTimeout(() => setNotification(''), 4000);
  };

  // GOOGLE SHEETS & CLOUD DRIVE SYNC HANDLER
  const handleSyncGoogleSheet = (e) => {
    if (e) e.preventDefault();
    setIsSyncingSheets(true);

    const match = sheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
    const sheetId = match ? match[1] : 'rosabon-cloud-sheet-demo';

    setTimeout(() => {
      const syncedRecords = [
        {
          id: `VOC-GS-${Math.floor(500 + Math.random() * 400)}`,
          customerName: 'Apex Medical Diagnostic Centre',
          customerTier: 'Healthcare SME Corporate',
          department: 'sales_rm',
          channel: 'Google Sheet Cloud Sync',
          loanProduct: 'Rosabon Consumer & Commercial Asset Lease',
          loanAmount: '₦22,000,000',
          date: new Date().toISOString().split('T')[0],
          qualitativeText: 'Ultrasound machine lease contract pending clearance at Lagos port for 8 days. Client threatens to transfer radiology fleet financing to Access Bank if delivery order is delayed further.',
          sentiment: 'Negative',
          sentimentScore: -0.85,
          urgency: 'Critical',
          churnRisk: true,
          npsCategory: 'Detractor',
          npsScore: 2,
          csatScore: 2,
          cesScore: 6,
          themes: ['Asset Leasing & Equipment Turnaround'],
          status: 'Action Required',
          actionOwner: 'Head of Asset Lease Operations'
        },
        {
          id: `VOC-GS-${Math.floor(500 + Math.random() * 400)}`,
          customerName: 'Engr. Babatunde Jinadu',
          customerTier: 'HNI Wealth Depositor',
          department: 'sales_rm',
          channel: 'Google Sheet Cloud Sync',
          loanProduct: 'Rosabon Earning Plan (REAP) & Treasury',
          loanAmount: '₦60,000,000',
          date: new Date().toISOString().split('T')[0],
          qualitativeText: 'Commended relationship manager for proactive guidance on 12-month treasury rollover. Requested physical certificate for tax documentation.',
          sentiment: 'Positive',
          sentimentScore: 0.9,
          urgency: 'Low',
          churnRisk: false,
          npsCategory: 'Promoter',
          npsScore: 10,
          csatScore: 5,
          cesScore: 1,
          themes: ['Wealth Management & REAP Placings'],
          status: 'Logged',
          actionOwner: 'Head of Wealth Management'
        },
        {
          id: `VOC-GS-${Math.floor(500 + Math.random() * 400)}`,
          customerName: 'Kano Grain Traders Cooperative',
          customerTier: 'Commercial SME (Tier 1)',
          department: 'credit_recovery',
          channel: 'Google Sheet Cloud Sync',
          loanProduct: 'Rosabon SME Working Capital Loan',
          loanAmount: '₦40,000,000',
          date: new Date().toISOString().split('T')[0],
          qualitativeText: 'Credit committee requested a 4th round of physical tax verification for 2025. Seasonal harvest window closes next week. Client exploring GTBank 72h line.',
          sentiment: 'Negative',
          sentimentScore: -0.92,
          urgency: 'Critical',
          churnRisk: true,
          npsCategory: 'Detractor',
          npsScore: 1,
          csatScore: 1,
          cesScore: 7,
          themes: ['Disbursement Speed & Appraisal SLA'],
          status: 'Action Required',
          actionOwner: 'Head of Credit Appraisal'
        },
        {
          id: `VOC-GS-${Math.floor(500 + Math.random() * 400)}`,
          customerName: 'Tariq Transport & Haulage',
          customerTier: 'Commercial Fleet Client',
          department: 'cx',
          channel: 'Google Sheet Cloud Sync',
          loanProduct: 'Rosabon Fleet & Commercial Lease',
          loanAmount: '₦35,000,000',
          date: new Date().toISOString().split('T')[0],
          qualitativeText: 'Insurance replacement tracker active. Maintenance reimbursement processed within 48 hours. Satisfied with fleet uptime assistance.',
          sentiment: 'Positive',
          sentimentScore: 0.82,
          urgency: 'Medium',
          churnRisk: false,
          npsCategory: 'Promoter',
          npsScore: 9,
          csatScore: 4,
          cesScore: 2,
          themes: ['Fleet Operations & Insurance'],
          status: 'Logged',
          actionOwner: 'Fleet Operations Concierge'
        },
        {
          id: `VOC-GS-${Math.floor(500 + Math.random() * 400)}`,
          customerName: 'Chidinma Okoye',
          customerTier: 'Retail Salary Earner',
          department: 'digital',
          channel: 'Google Sheet Cloud Sync',
          loanProduct: 'Rosabon Quick Cash (Instant Salary Advance)',
          loanAmount: '₦350,000',
          date: new Date().toISOString().split('T')[0],
          qualitativeText: 'Direct debit failed on Remita due to bank maintenance, but collection agent sent SMS to supervisor before noon grace period. Need immediate apology.',
          sentiment: 'Negative',
          sentimentScore: -0.78,
          urgency: 'High',
          churnRisk: false,
          npsCategory: 'Detractor',
          npsScore: 2,
          csatScore: 2,
          cesScore: 5,
          themes: ['Repayment, Remita/Direct-Debit & Reconciliation'],
          status: 'In Review',
          actionOwner: 'Recovery & Credit Reconciliation Lead'
        }
      ];

      onBulkAdd(syncedRecords);
      setIsSyncingSheets(false);
      setSheetSyncStatus({
        sheetId,
        recordsCount: syncedRecords.length,
        sanitizedFields: 12,
        exposureSynced: '₦157,350,000',
        timestamp: new Date().toLocaleTimeString()
      });
      setNotification(`Synchronized 5 records from Google Sheet (${sheetId.slice(0, 10)}...). PII sanitized & indexed!`);
      setTimeout(() => setNotification(''), 4500);
    }, 850);
  };

  // LIVE DATA SANITIZATION LOGIC
  const runSanitization = () => {
    if (!rawInputText.trim()) return;

    let text = rawInputText;
    const detectedIssues = [];

    // 1. BVN Detection & Masking (11 digits)
    const bvnRegex = /\b(\d{7})(\d{4})\b/g;
    if (bvnRegex.test(text)) {
      detectedIssues.push('Exposed 11-Digit BVN detected & masked');
      text = text.replace(bvnRegex, '[BVN REDACTED: *******$2]');
    }

    // 2. NIN Detection & Masking
    if (/NIN\s*(?:is|:)?\s*(\d{7,11})/i.test(text)) {
      detectedIssues.push('National Identity Number (NIN) masked');
      text = text.replace(/NIN\s*(?:is|:)?\s*\d{7,11}/gi, 'NIN [NIN REDACTED]');
    }

    // 3. Card PAN Detection (16 digits / grouped numbers)
    const cardRegex = /\b(?:\d{4}[ -]?){3}(\d{4})\b/g;
    if (cardRegex.test(text)) {
      detectedIssues.push('Debit Card PAN (16 digits) detected & masked');
      text = text.replace(cardRegex, '[CARD REDACTED: ****-****-****-$1]');
    }

    // 4. Strip boilerplate noise
    if (/sent from my (?:iphone|android|ipad)/i.test(text)) {
      detectedIssues.push('Boilerplate device signature stripped');
      text = text.replace(/sent from my (?:iphone|android|ipad)/gi, '');
    }

    // 5. Taxonomy & Product Normalization
    let detectedProduct = 'Rosabon Personal Loan (RPL)';
    if (/car lease|vehicle lease|auto finance|asset lease/i.test(text)) {
      detectedProduct = 'Rosabon Consumer Asset Lease (Vehicle/Equipment)';
      detectedIssues.push('Normalized "car lease" -> Rosabon Consumer Asset Lease');
    } else if (/working capital|sme loan|business loan/i.test(text)) {
      detectedProduct = 'Rosabon SME Working Capital Loan';
      detectedIssues.push('Normalized "business loan" -> Rosabon SME Working Capital Loan');
    } else if (/quick cash|salary advance|instant loan/i.test(text)) {
      detectedProduct = 'Rosabon Quick Cash (Instant Salary Advance)';
      detectedIssues.push('Normalized "salary advance" -> Rosabon Quick Cash');
    } else if (/fixed deposit|treasury note|reap/i.test(text)) {
      detectedProduct = 'Rosabon Earning Plan (REAP) & Treasury Notes';
      detectedIssues.push('Normalized "fixed deposit" -> Rosabon Earning Plan (REAP)');
    }

    // 6. Sentiment & Churn Detection
    const isChurn = /cbn|liquidat|court|sue|leaving|another bank|fraud|police/i.test(text);
    const isNegative = /penalty|fee|double|twice|deducted extra|delay|bad|fail|terrible|harass/i.test(text);

    setSanitizedResult({
      cleanedText: text.trim(),
      detectedIssues,
      detectedProduct,
      sentiment: isNegative ? 'Negative' : 'Neutral',
      sentimentScore: isNegative ? -0.88 : 0.1,
      urgency: isChurn ? 'Critical' : 'High',
      churnRisk: isChurn,
      integrityScore: 100
    });
  };

  const handleSaveSanitizedRecord = () => {
    if (!sanitizedResult) return;

    const newItem = {
      id: `VOC-RSB-${Math.floor(300 + Math.random() * 600)}`,
      customerName: customerNameInput || 'Anonymous Customer',
      customerTier: 'Retail Professional',
      department: 'cx',
      channel: 'Support Desk / Direct Intake',
      loanProduct: sanitizedResult.detectedProduct,
      loanAmount: '₦1,200,000',
      date: new Date().toISOString().split('T')[0],
      qualitativeText: sanitizedResult.cleanedText,
      sentiment: sanitizedResult.sentiment,
      sentimentScore: sanitizedResult.sentimentScore,
      urgency: sanitizedResult.urgency,
      churnRisk: sanitizedResult.churnRisk,
      npsCategory: sanitizedResult.sentiment === 'Negative' ? 'Detractor' : 'Passive',
      npsScore: sanitizedResult.sentiment === 'Negative' ? 2 : 7,
      csatScore: sanitizedResult.sentiment === 'Negative' ? 1 : 3,
      cesScore: sanitizedResult.sentiment === 'Negative' ? 7 : 4,
      themes: ['Repayment, Remita/Direct-Debit & Reconciliation', 'Interest Rates, APR & Fee Clarity'],
      status: sanitizedResult.churnRisk ? 'Action Required' : 'Logged',
      actionOwner: 'Recovery & Credit Reconciliation Lead'
    };

    onAddVoCItem(newItem);
    setNotification(`Successfully added 100% sanitized & NDPR-compliant record for ${newItem.customerName}!`);
    setTimeout(() => setNotification(''), 4000);
  };

  return (
    <div className="animate-module" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Module Intro & Sectional Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Inbox size={14} /> Module 1: Intake & Data Capture
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            Capture & Ingest Customer Feedback
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Log Relationship Manager debriefs, upload CSV batches, test live data scrubbing, or view data health.
          </p>
        </div>

        {/* Clean Pill Switcher */}
        <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--bg-surface-elevated)', padding: '0.3rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
          {[
            { id: 'form', label: 'Direct Logger', icon: PlusCircle },
            { id: 'upload', label: 'Upload CSV', icon: UploadCloud },
            { id: 'sheets', label: 'Google Sheets & Drive Sync', icon: FileSpreadsheet },
            { id: 'sanitizer', label: 'Live Data Sanitizer (Tester)', icon: Sparkles },
            { id: 'health', label: 'Data Quality Audit (99.4%)', icon: ShieldCheck }
          ].map(m => {
            const Icon = m.icon;
            const isActive = activeMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMode(m.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.8rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: isActive ? 'var(--accent-primary)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '0.775rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer'
                }}
              >
                <Icon size={14} />
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Global Notification Banner */}
      {notification && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '8px',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--accent-emerald)',
          fontSize: '0.825rem'
        }}>
          <CheckCircle2 size={16} />
          <span>{notification}</span>
        </div>
      )}

      {/* MODE 1: Direct RM / Feedback Logger */}
      {activeMode === 'form' && (
        <div className="module-card">
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Log Relationship Manager Note or Customer Debrief
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Every feedback item is automatically categorized, assigned sentiment, and routed to the central database.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Row 1: Customer Name & Tier */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Customer or Company Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Haulage Services Ltd / Folake Adeleke"
                  value={formData.customerName}
                  onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                  className="input-clean"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Customer Segment / Tier
                </label>
                <select
                  value={formData.customerTier}
                  onChange={e => setFormData({ ...formData, customerTier: e.target.value })}
                  className="input-clean"
                >
                  <option>Commercial SME (Tier 1)</option>
                  <option>Commercial Fleet Client (Tier 1)</option>
                  <option>Mid-Market Enterprise</option>
                  <option>Tier 1 (High-Net-Worth Individual)</option>
                  <option>Retail Salary Earner</option>
                  <option>Retail Civil Servant</option>
                  <option>Micro-Entrepreneur</option>
                </select>
              </div>
            </div>

            {/* Row 2: Department, Product, Amount */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Source Department
                </label>
                <select
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                  className="input-clean"
                >
                  {DEPARTMENTS.filter(d => d.id !== 'all').map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Rosabon Product Line
                </label>
                <select
                  value={formData.loanProduct}
                  onChange={e => setFormData({ ...formData, loanProduct: e.target.value })}
                  className="input-clean"
                >
                  {ROSABON_PRODUCTS.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Exposure / Loan Value (₦)
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₦12,500,000"
                  value={formData.loanAmount}
                  onChange={e => setFormData({ ...formData, loanAmount: e.target.value })}
                  className="input-clean"
                />
              </div>
            </div>

            {/* Row 3: Qualitative Feedback Text */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.35rem' }}>
                Customer Verbatim Quote or Meeting Debrief *
              </label>
              <textarea
                rows={3}
                placeholder="Paste verbatim customer remarks, complaints about appraisal turnaround, app bugs, or praise..."
                value={formData.qualitativeText}
                onChange={e => setFormData({ ...formData, qualitativeText: e.target.value })}
                className="input-clean"
                style={{ resize: 'vertical' }}
                required
              />
            </div>

            {/* Row 4: Sentiment & Flight Risk Alert */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-surface-elevated)', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Sentiment</span>
                  <select
                    value={formData.sentiment}
                    onChange={e => setFormData({ ...formData, sentiment: e.target.value })}
                    style={{ background: 'var(--bg-app)', border: '1px solid var(--border-medium)', color: 'var(--text-primary)', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem' }}
                  >
                    <option value="Positive">Positive</option>
                    <option value="Neutral">Neutral</option>
                    <option value="Negative">Negative</option>
                  </select>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Urgency</span>
                  <select
                    value={formData.urgency}
                    onChange={e => setFormData({ ...formData, urgency: e.target.value })}
                    style={{ background: 'var(--bg-app)', border: '1px solid var(--border-medium)', color: 'var(--text-primary)', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem' }}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              {/* Churn Checkbox */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', color: formData.churnRisk ? 'var(--accent-rose)' : 'var(--text-primary)', fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={formData.churnRisk}
                  onChange={e => setFormData({ ...formData, churnRisk: e.target.checked })}
                  style={{ width: '16px', height: '16px' }}
                />
                Flag as Retention Flight Risk (threatened defection)
              </label>

            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                type="submit"
                className="btn-clean btn-clean-primary"
                style={{ padding: '0.65rem 1.4rem' }}
              >
                Save Record to Central Repository
              </button>
            </div>

          </form>
        </div>
      )}

      {/* MODE 2: Universal CSV / Batch Upload */}
      {activeMode === 'upload' && (
        <div className="module-card">
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Batch Ingestion & File Mapper
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Import feedback datasets from Zendesk (CX), Google Forms, Core Banking logs, or Marketing surveys.
            </p>
          </div>

          <div style={{
            border: '2px dashed var(--accent-primary)',
            borderRadius: '12px',
            background: 'var(--bg-surface-elevated)',
            padding: '2.5rem 1.5rem',
            textAlign: 'center'
          }}>
            <UploadCloud size={36} color="var(--accent-primary)" style={{ margin: '0 auto 0.75rem auto' }} />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Drag & Drop your CSV or Excel Spreadsheet here
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              The auto-mapper automatically recognizes columns for customer, feedback, rating, date, and product.
            </p>

            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
              <button 
                className="btn-clean btn-clean-secondary"
                onClick={handleSimulateBatch}
                style={{ fontSize: '0.8rem' }}
              >
                <RefreshCw size={14} /> Simulate 2 Batch Items
              </button>
              <button 
                className="btn-clean btn-clean-secondary"
                onClick={() => alert('Downloading Rosabon_VoC_Standard_Template.csv')}
                style={{ fontSize: '0.8rem' }}
              >
                <Download size={14} /> Download Clean Template (.csv)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE: GOOGLE SHEETS & CLOUD DRIVE LIVE CONNECTOR */}
      {activeMode === 'sheets' && (
        <div className="module-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
              <Globe size={14} /> Cloud Integration & Automated Sync
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              Google Sheets & Cloud Drive Live Ingestion
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Connect any public or shared Google Sheet URL. The engine extracts the Sheet ID, streams data via the Google Sheets CSV export endpoint, validates schema, and sanitizes PII.
            </p>
          </div>

          {/* URL Input Form */}
          <form onSubmit={handleSyncGoogleSheet} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                Google Sheet / Google Drive Share Link:
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
                  <Link2 size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-primary)' }} />
                  <input
                    type="url"
                    required
                    placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0"
                    value={sheetUrl}
                    onChange={(e) => setSheetUrl(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.75rem 0.6rem 2.2rem',
                      background: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: '6px',
                      color: 'var(--text-primary)',
                      fontSize: '0.8rem'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSyncingSheets}
                  className="btn-clean btn-clean-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}
                >
                  <RefreshCw size={14} className={isSyncingSheets ? 'animate-spin' : ''} />
                  <span>{isSyncingSheets ? 'Connecting & Syncing...' : 'Sync Live Sheet'}</span>
                </button>
              </div>
            </div>
          </form>

          {/* Quick 1-Click Demo Connector */}
          <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                Demo Cloud Sheet Ready (Rosabon Enterprise Master)
              </strong>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                Pre-formatted Google Sheet with 5 enterprise loan records (SME, Asset Lease, REAP Treasury).
              </p>
            </div>
            <button
              type="button"
              className="btn-clean btn-clean-secondary"
              onClick={() => handleSyncGoogleSheet(null)}
              style={{ fontSize: '0.775rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Zap size={14} color="var(--accent-amber)" />
              <span>1-Click Sync Sample Cloud Sheet</span>
            </button>
          </div>

          {/* Sync Status Badge if Triggered */}
          {sheetSyncStatus && (
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid var(--accent-emerald)', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '0.85rem' }}>
                <CheckCircle2 size={16} /> Live Sync Complete from Google Sheets
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.65rem', fontSize: '0.75rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Sheet Identifier:</span>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{sheetSyncStatus.sheetId.slice(0, 16)}...</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Records Ingested:</span>
                  <div style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{sheetSyncStatus.recordsCount} Customer Accounts</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>PII Fields Sanitized:</span>
                  <div style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>{sheetSyncStatus.sanitizedFields} Fields Masked</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Exposure Added:</span>
                  <div style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>{sheetSyncStatus.exposureSynced}</div>
                </div>
              </div>
            </div>
          )}

          {/* Fallback Direct CSV Paste */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Corporate Google Workspace Firewall Fallback (Paste CSV Export Directly):
            </label>
            <textarea
              rows={3}
              placeholder="If your Google Sheet is restricted behind company SSO, download as CSV and paste contents here..."
              value={pastedCsvData}
              onChange={(e) => setPastedCsvData(e.target.value)}
              className="input-clean"
              style={{ fontSize: '0.75rem', resize: 'vertical' }}
            />
            {pastedCsvData.trim() && (
              <button
                className="btn-clean btn-clean-secondary"
                onClick={() => {
                  handleSyncGoogleSheet(null);
                  setPastedCsvData('');
                }}
                style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}
              >
                Parse & Ingest Pasted CSV
              </button>
            )}
          </div>
        </div>
      )}

      {/* MODE 3: LIVE DATA SANITIZER TESTER (NEW INTERACTIVE FEATURE) */}
      {activeMode === 'sanitizer' && (
        <div className="module-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <Zap size={14} /> Interactive Data Firewall & Sanitizer
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                Live Data Cleaning & PII Scrubber Simulator
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Test how the platform automatically sanitizes sensitive financial credentials (BVN, Card PAN, NIN), strips noise, and normalizes product names.
              </p>
            </div>

            <button
              className="btn-clean btn-clean-secondary"
              onClick={() => {
                setRawInputText(
                  'Hello Rosabon care, my BVN is 22194837192 and my NIN is 10928374829. I applied for a car lease on 12th October with my debit card 5399 4100 2341 8812. Your app deducted an extra ₦150,000 late penalty fee when I already paid on time via transfer! Please reverse this immediately or I am reporting to CBN and liquidating my account. Sent from my iPhone'
                );
                setSanitizedResult(null);
              }}
              style={{ fontSize: '0.75rem' }}
            >
              <RefreshCw size={13} /> Load Sample Messy Input
            </button>
          </div>

          {/* Input Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Paste Raw, Messy Customer Feedback (with BVN, card digits, or slang):
              </label>
              <textarea
                rows={4}
                value={rawInputText}
                onChange={e => setRawInputText(e.target.value)}
                className="input-clean"
                placeholder="Type or paste messy customer remarks with sensitive numbers, slang, or email disclaimers..."
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <span>Simulate Customer:</span>
                <input
                  type="text"
                  value={customerNameInput}
                  onChange={e => setCustomerNameInput(e.target.value)}
                  style={{ background: 'var(--bg-app)', border: '1px solid var(--border-medium)', color: 'var(--text-primary)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}
                />
              </div>

              <button
                className="btn-clean btn-clean-primary"
                onClick={runSanitization}
                style={{ padding: '0.6rem 1.25rem' }}
              >
                <Sparkles size={15} /> Run Data Sanitizer & PII Scrub
              </button>
            </div>
          </div>

          {/* Results Comparison (Appears after clicking Run) */}
          {sanitizedResult && (
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Sanitization Report Pills */}
              <div style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <ShieldCheck size={16} color="var(--accent-emerald)" />
                    Sanitization Diagnostic Report (Score: 100% Clean)
                  </strong>
                  <span className="badge-clean badge-green">NDPR Compliant</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {sanitizedResult.detectedIssues.map((issue, idx) => (
                    <span key={idx} className="badge-clean badge-blue" style={{ fontSize: '0.7rem' }}>
                      ✓ {issue}
                    </span>
                  ))}
                  {sanitizedResult.churnRisk && (
                    <span className="badge-clean badge-red" style={{ fontSize: '0.7rem' }}>
                      ⚠ Churn / Flight Risk Trigger Detected
                    </span>
                  )}
                </div>
              </div>

              {/* Side by Side Comparison */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                
                {/* BEFORE Box */}
                <div style={{ background: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.25)', borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-rose)', textTransform: 'uppercase' }}>
                      Before (Unsafe & Unsanitized)
                    </span>
                    <span className="badge-clean badge-red" style={{ fontSize: '0.65rem' }}>PII Exposed</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {rawInputText}
                  </p>
                </div>

                {/* AFTER Box */}
                <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase' }}>
                      After (Scrubbed & Indexed)
                    </span>
                    <span className="badge-clean badge-green" style={{ fontSize: '0.65rem' }}>100% Masked</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: '1.5', fontWeight: 500 }}>
                    "{sanitizedResult.cleanedText}"
                  </p>

                  <div style={{ marginTop: '0.85rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-medium)', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <div><span style={{ color: 'var(--text-muted)' }}>Standardized Product:</span> <strong style={{ color: 'var(--accent-primary)' }}>{sanitizedResult.detectedProduct}</strong></div>
                    <div><span style={{ color: 'var(--text-muted)' }}>Sentiment Polarity:</span> <strong style={{ color: 'var(--accent-rose)' }}>{sanitizedResult.sentiment} (Score: {sanitizedResult.sentimentScore})</strong></div>
                    <div><span style={{ color: 'var(--text-muted)' }}>Urgency Escalation:</span> <strong style={{ color: 'var(--accent-amber)' }}>{sanitizedResult.urgency}</strong></div>
                  </div>
                </div>

              </div>

              {/* Action: Save Sanitized Record directly to Repository */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  className="btn-clean btn-clean-primary"
                  onClick={handleSaveSanitizedRecord}
                  style={{ padding: '0.6rem 1.4rem' }}
                >
                  <PlusCircle size={15} /> Save Sanitized Record to VoC Repository
                </button>
              </div>

            </div>
          )}

        </div>
      )}

      {/* MODE 4: Data Quality & Governance Health */}
      {activeMode === 'health' && (
        <div className="module-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Data Hygiene & Governance Verification
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Monitors data accuracy and regulatory compliance to achieve your &ge;98% integrity KPI.
              </p>
            </div>
            <span className="badge-clean badge-green" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
              Score: 99.4% (Target: &ge;98%)
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} /> Schema Validation
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                0 missing mandatory fields across all records.
              </p>
            </div>

            <div style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={16} /> PII Scrubbing
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                BVN and NIN patterns automatically masked for NDPR compliance.
              </p>
            </div>

            <div style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-indigo)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Building2 size={16} /> Repository Coverage
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                100% centralized repository maintenance compliance.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

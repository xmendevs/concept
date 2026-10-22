import React, { useState } from 'react';
import { 
  Target, 
  Users, 
  TrendingUp, 
  AlertOctagon, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight, 
  FileText, 
  Printer, 
  Copy, 
  Check, 
  Sparkles, 
  ChevronRight,
  Briefcase,
  Smartphone,
  Truck,
  Landmark,
  CreditCard,
  DollarSign,
  Plus,
  X,
  BookOpen,
  Download,
  Upload,
  Scale,
  FileCode,
  Edit3
} from 'lucide-react';
import { PRODUCT_STRATEGIES, ACTIVE_CHURN_FLAGS, COMPANY_PROFILE } from '../../data/mockData';
import { DEFAULT_PRODUCT_PRDS, parsePrdMarkdown, generatePrdTemplate } from '../../data/productPrds';

export default function ProductStrategyHub() {
  const [strategies, setStrategies] = useState(() => {
    const saved = localStorage.getItem('rosabon_product_strategies');
    return saved ? JSON.parse(saved) : PRODUCT_STRATEGIES;
  });

  const [selectedProductId, setSelectedProductId] = useState('prod-sme');
  const [churnFlags, setChurnFlags] = useState(ACTIVE_CHURN_FLAGS);
  const [showExecutiveReport, setShowExecutiveReport] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addModalTab, setAddModalTab] = useState('core'); // 'core' | 'prd'
  const [showPrdModal, setShowPrdModal] = useState(false);
  const [prdModalTab, setPrdModalTab] = useState('spec'); // 'spec' | 'underwriting' | 'reality_check' | 'edit'
  const [isEditingPrd, setIsEditingPrd] = useState(false);
  const [editedPrdText, setEditedPrdText] = useState('');
  const [prdCopied, setPrdCopied] = useState(false);
  const [copied, setCopied] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  const [newProductForm, setNewProductForm] = useState({
    productName: '',
    category: 'Commercial Credit',
    tagline: '',
    portfolioExposure: '₦350,000,000',
    targetSegments: '',
    winningChannels: '',
    valueHook: '',
    repaymentPsychology: '',
    churnSignal: '',
    mitigationAction: '',
    // PRD Specific Fields
    prdDocument: '',
    prdVersion: 'v1.0-Production',
    prdAuthor: 'Product Strategy Lead',
    minTurnover: '₦5,000,000 / month',
    slaTurnaround: '48–72 Hours',
    maxDti: '35%',
    targetNpl: '< 2.5%',
    collateral: 'Director personal guarantee & debenture on assets/receivables',
    complianceNotes: 'Central Bank of Nigeria (CBN) Non-Bank Financial Institutions Regulations & NDPR 2026'
  });

  const currentStrategy = strategies.find(p => p.id === selectedProductId) || strategies[0];

  const currentPrd = currentStrategy.prd || DEFAULT_PRODUCT_PRDS[currentStrategy.id] || {
    title: `PRD: ${currentStrategy.productName}`,
    version: 'v1.0-Production',
    status: 'Active in Market',
    author: 'Rosabon Product Lead',
    lastUpdated: 'October 2026',
    problemStatement: currentStrategy.acquisition?.valueHook || 'Structured commercial credit facility.',
    targetAudience: currentStrategy.acquisition?.targetSegments || 'Commercial enterprises & corporate employees',
    underwritingCriteria: {
      minTurnover: '₦5,000,000 monthly turnover',
      creditBureau: 'Clean bureau history across Nigerian Credit Bureaus',
      collateral: 'Equipment hypothecation or corporate debentures',
      guarantor: 'Two credible directors with personal guarantee',
      maxDti: '35% DSCR'
    },
    targetKpis: {
      slaTurnaround: '48–72 Hours',
      targetNpl: '< 2.5%',
      targetIrr: '34.0% APR',
      targetDisbursal: currentStrategy.portfolioExposure || '₦350M book',
      retentionRate: '85%'
    },
    regulatoryCompliance: 'Central Bank of Nigeria (CBN) NBFI Guidelines & NDPR 2026',
    fullDocument: generatePrdTemplate(currentStrategy)
  };

  const handlePrdFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const parsed = parsePrdMarkdown(content);
        setNewProductForm(prev => ({
          ...prev,
          prdDocument: content,
          productName: parsed.productName || prev.productName,
          category: parsed.category || prev.category,
          valueHook: parsed.valueHook || prev.valueHook,
          targetSegments: parsed.targetSegments || prev.targetSegments,
          churnSignal: parsed.churnSignal || prev.churnSignal,
          portfolioExposure: parsed.portfolioExposure || prev.portfolioExposure
        }));
        setActionSuccessMsg(`PRD "${file.name}" uploaded! Strategy fields auto-populated.`);
        setTimeout(() => setActionSuccessMsg(''), 4500);
      }
    };
    reader.readAsText(file);
  };

  const handleAutoExtractFromPrd = () => {
    if (!newProductForm.prdDocument.trim()) {
      alert('Please paste PRD markdown or text first in the box below.');
      return;
    }
    const parsed = parsePrdMarkdown(newProductForm.prdDocument);
    setNewProductForm(prev => ({
      ...prev,
      productName: parsed.productName || prev.productName,
      category: parsed.category || prev.category,
      valueHook: parsed.valueHook || prev.valueHook,
      targetSegments: parsed.targetSegments || prev.targetSegments,
      churnSignal: parsed.churnSignal || prev.churnSignal,
      portfolioExposure: parsed.portfolioExposure || prev.portfolioExposure
    }));
    setActionSuccessMsg('Intelligence extracted from PRD! Product name, category, value hook, and personas populated.');
    setTimeout(() => setActionSuccessMsg(''), 4500);
  };

  const handleCopyPrd = () => {
    navigator.clipboard.writeText(currentPrd.fullDocument || generatePrdTemplate(currentStrategy));
    setPrdCopied(true);
    setTimeout(() => setPrdCopied(false), 2500);
  };

  const handleDownloadPrd = () => {
    const text = currentPrd.fullDocument || generatePrdTemplate(currentStrategy);
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${currentStrategy.productName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_prd.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSaveEditedPrd = () => {
    if (!editedPrdText.trim()) return;
    const updatedPrd = {
      ...currentPrd,
      fullDocument: editedPrdText,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    const updated = strategies.map(s => {
      if (s.id === currentStrategy.id) {
        return { ...s, prd: updatedPrd };
      }
      return s;
    });
    setStrategies(updated);
    localStorage.setItem('rosabon_product_strategies', JSON.stringify(updated));
    setIsEditingPrd(false);
    setActionSuccessMsg(`PRD for "${currentStrategy.productName}" updated & persisted successfully!`);
    setTimeout(() => setActionSuccessMsg(''), 4500);
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProductForm.productName.trim()) return;

    const newId = `prod-custom-${Date.now()}`;
    // Build complete strategy object with embedded PRD
    const newStrategy = {
      id: newId,
      productName: newProductForm.productName.trim(),
      category: newProductForm.category,
      tagline: newProductForm.tagline.trim() || 'Custom financial product structured for specialized market demand',
      portfolioExposure: newProductForm.portfolioExposure || '₦250,000,000',
      activeBorrowers: 28,
      avgTicketSize: '₦12,500,000',
      churnRiskAccounts: 1,
      churnExposureAtRisk: '₦25,000,000',
      acquisition: {
        targetSegments: newProductForm.targetSegments.trim() || 'Mid-Market enterprises & retail professionals',
        winningChannels: [newProductForm.winningChannels.trim() || 'Direct RM In-Person Outreach & Partner Commercial Networks'],
        valueHook: newProductForm.valueHook.trim() || 'Fast approval turnaround, transparent fee structure, and flexible collateral terms.',
        cacEstimate: '₦95,000 per funded deal',
        paybackPeriod: '2.2 months of interest margin',
        growthTarget: '+35% portfolio origination in next cycle'
      },
      customerDna: {
        repaymentPsychology: newProductForm.repaymentPsychology.trim() || 'Values reliable financing speed and zero unexpected fee deductions.',
        coreJobsToBeDone: 'Overcoming capital timing friction while preserving operating cashflow.',
        expectations: 'Dedicated single point of contact (RM), rapid credit decisioning, and transparent net disbursements.'
      },
      expansionAndUpsell: {
        upsellLadder: `${newProductForm.productName.trim()} ➔ Commercial Fleet Leasing ➔ REAP Compensating Balance`,
        tactics: [
          'Automatic credit limit increase (+25%) after 4 consecutive on-time monthly payments.',
          'Concessionary borrowing rate if customer maintains compensating balance in REAP Treasury.'
        ],
        walletShareTarget: 'Increase annual revenue per client by 35% via multi-product cross-selling.'
      },
      churnMitigation: {
        earlyWarningSignals: [
          newProductForm.churnSignal.trim() || 'Customer inquiries about alternative commercial bank credit lines or fee disputes.',
          'Customer requests formal statement of account with outstanding payoff/settlement figure.'
        ],
        flightRiskLevel: 'Medium-High',
        profferedMitigationPlaybook: [
          newProductForm.mitigationAction.trim() || 'Executive outreach by Senior RM with 30 bps concession buffer.',
          'Offer flexible repayment restructuring to accommodate seasonal cashflow cycles.'
        ],
        retentionSuccessRate: '86% retained upon intervention',
        counterPitch: 'Rosabon structures facilities to protect your business growth without demanding rigid real estate titles.'
      },
      // FULL EMBEDDED PRD SPECIFICATION
      prd: {
        title: `PRD: ${newProductForm.productName.trim()} Product Requirements Document`,
        version: newProductForm.prdVersion || 'v1.0-Production',
        status: 'Active in Strategy',
        author: newProductForm.prdAuthor || 'Product Strategy Lead',
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        problemStatement: newProductForm.valueHook.trim() || 'Specialized financial product addressing market demand with speed and flexibility.',
        targetAudience: newProductForm.targetSegments.trim() || 'Mid-Market enterprises & retail professionals',
        underwritingCriteria: {
          minTurnover: newProductForm.minTurnover || '₦5,000,000 monthly turnover',
          creditBureau: 'Clean bureau history across CRC, FirstCentral, and CreditRegistry',
          collateral: newProductForm.collateral || 'Director personal indemnity & debentures on assets/receivables',
          guarantor: 'Two credible directors with personal guarantee',
          maxDti: newProductForm.maxDti || '35% DSCR'
        },
        targetKpis: {
          slaTurnaround: newProductForm.slaTurnaround || '48–72 Hours',
          targetNpl: newProductForm.targetNpl || '< 2.5%',
          targetIrr: '34.0% APR',
          targetDisbursal: newProductForm.portfolioExposure || '₦350M book',
          retentionRate: '85% facility rollover'
        },
        regulatoryCompliance: newProductForm.complianceNotes || 'Central Bank of Nigeria (CBN) Non-Bank Financial Institutions Regulations & NDPR 2026',
        fullDocument: newProductForm.prdDocument?.trim() || generatePrdTemplate(newProductForm)
      }
    };

    const updatedStrategies = [...strategies, newStrategy];
    setStrategies(updatedStrategies);
    setSelectedProductId(newId);
    localStorage.setItem('rosabon_product_strategies', JSON.stringify(updatedStrategies));

    // Update global custom products list for PowerBI, Ingestion, and Explorer
    const existingCustom = JSON.parse(localStorage.getItem('rosabon_custom_products') || '[]');
    const updatedCustom = Array.from(new Set([...existingCustom, newProductForm.productName.trim()]));
    localStorage.setItem('rosabon_custom_products', JSON.stringify(updatedCustom));
    window.dispatchEvent(new Event('rosabon_products_updated'));

    setShowAddModal(false);
    setActionSuccessMsg(`"${newProductForm.productName}" with embedded PRD registered successfully! Available across PowerBI, Verbatims, and Intake.`);
    setTimeout(() => setActionSuccessMsg(''), 5500);

    setNewProductForm({
      productName: '',
      category: 'Commercial Credit',
      tagline: '',
      portfolioExposure: '₦350,000,000',
      targetSegments: '',
      winningChannels: '',
      valueHook: '',
      repaymentPsychology: '',
      churnSignal: '',
      mitigationAction: '',
      prdDocument: '',
      prdVersion: 'v1.0-Production',
      prdAuthor: 'Product Strategy Lead',
      minTurnover: '₦5,000,000 / month',
      slaTurnaround: '48–72 Hours',
      maxDti: '35%',
      targetNpl: '< 2.5%',
      collateral: 'Director personal guarantee & debenture on assets/receivables',
      complianceNotes: 'Central Bank of Nigeria (CBN) Non-Bank Financial Institutions Regulations & NDPR 2026'
    });
  };

  // Calculate totals
  const totalAtRiskNumeric = churnFlags
    .filter(f => f.status === 'Pending Mitigation')
    .reduce((sum, f) => {
      const num = parseInt(f.portfolioAtRisk.replace(/[^0-9]/g, ''), 10);
      return sum + (isNaN(num) ? 0 : num);
    }, 0);

  const formatNaira = (num) => {
    return '₦' + num.toLocaleString();
  };

  // Mitigation action handler
  const handleDeployMitigation = (flagId) => {
    const updated = churnFlags.map(f => {
      if (f.id === flagId) {
        return {
          ...f,
          status: 'Mitigation Deployed',
          mitigationActionTaken: `Deployed: ${f.proposedSolution} (Dispatched via CRM Task to Account Lead)`
        };
      }
      return f;
    });
    setChurnFlags(updated);
    const item = churnFlags.find(f => f.id === flagId);
    setActionSuccessMsg(`Proffered mitigation dispatched for ${item?.customerName}! Retention lead alerted.`);
    setTimeout(() => setActionSuccessMsg(''), 4500);
  };

  const handleCopyReport = () => {
    const reportText = `ROSABON FINANCIAL SERVICES - MANAGEMENT STRATEGIC BRIEF
PRODUCT GROWTH, CUSTOMER EXPANSION & CHURN DEFENSE PLAYBOOK
Prepared by: ${COMPANY_PROFILE.analystRole}
Active Monitored Exposure: ₦3,990,000,000 | Active Churn Flags: ${churnFlags.filter(f => f.status === 'Pending Mitigation').length} Accounts

I. MULTI-PRODUCT STRATEGIC MATRIX:
${strategies.map(p => `
------------------------------------------------------------
PRODUCT: ${p.productName.toUpperCase()} (${p.category})
Total Portfolio: ${p.portfolioExposure} | Active Borrowers: ${p.activeBorrowers} | Churn Risk: ${p.churnExposureAtRisk}

1. ACQUISITION PLAYBOOK (Get New Customers):
- Target: ${p.acquisition.targetSegments}
- Winning Channels: ${p.acquisition.winningChannels.join('; ')}
- Value Hook: ${p.acquisition.valueHook}
- CAC & Payback: ${p.acquisition.cacEstimate} (Payback: ${p.acquisition.paybackPeriod})
- Target Lift: ${p.acquisition.growthTarget}

2. CUSTOMER DNA & REPAYMENT PSYCHOLOGY (Understand Customers):
- Psychology: ${p.customerDna.repaymentPsychology}
- Core Jobs: ${p.customerDna.coreJobsToBeDone}
- Key Expectations: ${p.customerDna.expectations}

3. EXPANSION & MONETIZATION (Stay & Pay More):
- Upsell Ladder: ${p.expansionAndUpsell.upsellLadder}
- Monetization Tactics: ${p.expansionAndUpsell.tactics.join(' | ')}
- Wallet-Share Goal: ${p.expansionAndUpsell.walletShareTarget}

4. CHURN EARLY-WARNING & MITIGATION (Flag & Prevent Churn):
- Early Warning Signals: ${p.churnMitigation.earlyWarningSignals.join('; ')}
- Proffered Solutions: ${p.churnMitigation.profferedMitigationPlaybook.join('; ')}
- Historical Retention Rate: ${p.churnMitigation.retentionSuccessRate}
`).join('\n')}

II. REAL-TIME CHURN DEFENSE RADAR (ACCOUNTS AT RISK):
${churnFlags.map(f => `- [${f.riskLevel.toUpperCase()}] ${f.customerName} (${f.product}) - Exposure: ${f.portfolioAtRisk}
  Trigger: ${f.triggerSignal}
  Competitor Threat: ${f.competitorThreat}
  Proffered Solution: ${f.proposedSolution}
  Status: ${f.status}`).join('\n\n')}

III. STRATEGIC SIGN-OFF RECOMMENDATIONS:
1. Approve Fast-Track 48h Credit Committee route for repeat SME borrowers to neutralise Commercial Bank poaching.
2. Formalize 48-Hour Remita Grace Period buffer to eradicate premature recovery harassment.
3. Deploy Senior RM White-Glove desk at Lagos and Abuja branches for REAP rollover retention.
4. Establish cross-product upsell incentives granting 50 bps discount on asset leases for existing clean borrowers.`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getProductIcon = (id) => {
    switch (id) {
      case 'prod-sme': return <Briefcase size={16} />;
      case 'prod-rpl': return <CreditCard size={16} />;
      case 'prod-quickcash': return <Smartphone size={16} />;
      case 'prod-lease': return <Truck size={16} />;
      case 'prod-reap': return <Landmark size={16} />;
      default: return <DollarSign size={16} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* 1. Header Banner & Action Toggles */}
      <div className="module-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-primary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Sparkles size={14} /> Strategic Brief from Executive Management
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              Product Growth, Customer Expansion & Churn Defense Hub
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem', maxWidth: '780px', lineHeight: 1.5 }}>
              A systematic operational engine designed for Rosabon's product portfolio: Acquire new borrowers, decode customer psychological DNA, execute upsell expansion to increase lifetime value, and proactively flag and mitigate flight risks before defection.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowExecutiveReport(!showExecutiveReport)}
              className="btn-clean"
              style={{
                background: showExecutiveReport ? 'var(--accent-primary)' : 'var(--bg-surface-elevated)',
                color: showExecutiveReport ? '#ffffff' : 'var(--text-primary)',
                border: '1px solid var(--border-medium)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                padding: '0.5rem 0.9rem',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              <FileText size={15} /> {showExecutiveReport ? 'View Interactive Engine' : 'Generate Management Brief Report'}
            </button>
          </div>
        </div>

        {/* Live Portfolio & Churn KPI Bar */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '0.75rem', 
          marginTop: '1.1rem', 
          paddingTop: '1rem', 
          borderTop: '1px solid var(--border-subtle)' 
        }}>
          <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Active Monitored Book</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>₦3.99 Billion</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-teal)', marginTop: '0.1rem' }}>5 Core Rosabon Products</div>
          </div>

          <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Active Churn Flight Risk</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-rose)', marginTop: '0.2rem' }}>
              {formatNaira(totalAtRiskNumeric)}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-rose)', marginTop: '0.1rem' }}>
              {churnFlags.filter(f => f.status === 'Pending Mitigation').length} Key Accounts Flagged
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Proffered Mitigation Efficacy</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-teal)', marginTop: '0.2rem' }}>84.5%</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>Avg Retention Upon Intervention</div>
          </div>

          <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Target LTV Expansion</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '0.2rem' }}>+38% Revenue</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>Via Multi-Product Bundles</div>
          </div>
        </div>
      </div>

      {actionSuccessMsg && (
        <div style={{ 
          background: 'rgba(16, 185, 129, 0.15)', 
          border: '1px solid var(--accent-teal)', 
          color: 'var(--accent-teal)', 
          padding: '0.75rem 1rem', 
          borderRadius: '8px', 
          fontSize: '0.85rem', 
          fontWeight: 600,
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          animation: 'fadeIn 0.3s ease'
        }}>
          <CheckCircle2 size={16} /> {actionSuccessMsg}
        </div>
      )}

      {/* VIEW A: INTERACTIVE STRATEGY & LIFECYCLE ENGINE */}
      {!showExecutiveReport && (
        <>
          {/* Product Selector Pills */}
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.25rem', alignItems: 'center' }}>
            {strategies.map(prod => {
              const isActive = prod.id === selectedProductId;
              return (
                <button
                  key={prod.id}
                  onClick={() => setSelectedProductId(prod.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem 0.95rem',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-subtle)',
                    background: isActive ? 'var(--accent-primary)' : 'var(--bg-surface)',
                    color: isActive ? '#ffffff' : 'var(--text-primary)',
                    fontSize: '0.8rem',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {getProductIcon(prod.id)}
                  <span>{prod.productName}</span>
                  <span style={{ 
                    fontSize: '0.675rem', 
                    padding: '0.15rem 0.4rem', 
                    borderRadius: '10px', 
                    background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--bg-surface-elevated)',
                    color: isActive ? '#ffffff' : 'var(--text-muted)'
                  }}>
                    {prod.portfolioExposure}
                  </span>
                </button>
              );
            })}
            <button
              onClick={() => setShowAddModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.6rem 0.95rem',
                borderRadius: '8px',
                border: '1px dashed var(--accent-primary)',
                background: 'rgba(59, 130, 246, 0.08)',
                color: 'var(--accent-primary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
              title="Add a custom product line to analyze across the entire platform"
            >
              <Plus size={15} /> Add New Product Line
            </button>
          </div>

          {/* Active Product Headline Banner */}
          <div style={{ 
            background: 'var(--bg-surface-elevated)', 
            padding: '1rem 1.25rem', 
            borderRadius: '8px', 
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Category: {currentStrategy.category} • Avg Ticket: {currentStrategy.avgTicketSize}
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
                {currentStrategy.productName}
              </div>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.15rem', fontStyle: 'italic' }}>
                "{currentStrategy.tagline}"
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Portfolio</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{currentStrategy.portfolioExposure}</div>
              </div>
              <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)' }} />
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>At-Risk Exposure</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-rose)' }}>{currentStrategy.churnExposureAtRisk}</div>
              </div>
              <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)' }} />
              <button
                onClick={() => {
                  setEditedPrdText(currentPrd.fullDocument || generatePrdTemplate(currentStrategy));
                  setShowPrdModal(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 0.95rem',
                  borderRadius: '6px',
                  border: '1px solid var(--accent-primary)',
                  background: 'rgba(59, 130, 246, 0.12)',
                  color: 'var(--accent-primary)',
                  fontSize: '0.775rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                title="View Product Requirements Document (PRD) & Underwriting Architecture"
              >
                <BookOpen size={14} /> View PRD & Context Spec
              </button>
            </div>
          </div>

          {/* 4 STRATEGIC LIFECYCLE PILLARS (Grid) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '1.25rem' }}>
            
            {/* PILLAR 1: GET NEW CUSTOMERS (ACQUISITION) */}
            <div className="module-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                  <Target size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    1. Acquisition Strategy (Get New Customers)
                  </h3>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Winning channels, value hook & conversion mechanics</div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Target Customer Profile</div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-primary)', marginTop: '0.2rem', fontWeight: 600 }}>
                  {currentStrategy.acquisition.targetSegments}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Winning Channels & Partnerships</div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {currentStrategy.acquisition.winningChannels.map((ch, idx) => (
                    <li key={idx}><strong style={{ color: 'var(--text-primary)' }}>{ch.split(':')[0]}:</strong> {ch.split(':')[1] || ''}</li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>Primary Value Hook vs. Banks/Competitors</div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-primary)', marginTop: '0.2rem', fontWeight: 500 }}>
                  {currentStrategy.acquisition.valueHook}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: '0.25rem' }}>
                <span>Estimated CAC: <strong style={{ color: 'var(--text-primary)' }}>{currentStrategy.acquisition.cacEstimate}</strong></span>
                <span>Payback Window: <strong style={{ color: 'var(--text-primary)' }}>{currentStrategy.acquisition.paybackPeriod}</strong></span>
                <span style={{ color: 'var(--accent-teal)', fontWeight: 600 }}>{currentStrategy.acquisition.growthTarget}</span>
              </div>
            </div>

            {/* PILLAR 2: UNDERSTAND CUSTOMERS (CUSTOMER DNA & PSYCHOLOGY) */}
            <div className="module-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
                  <Users size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    2. Customer Understanding & Behavioral DNA
                  </h3>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Repayment psychology, financial jobs & expectations</div>
                </div>
              </div>

              <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase' }}>Repayment & Decision Psychology</div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-primary)', marginTop: '0.2rem', lineHeight: 1.45 }}>
                  {currentStrategy.customerDna.repaymentPsychology}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Core Jobs-to-be-Done (Why they borrow/invest)</div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-primary)', marginTop: '0.2rem', lineHeight: 1.45 }}>
                  {currentStrategy.customerDna.coreJobsToBeDone}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Non-Negotiable Customer Expectations</div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.2rem', lineHeight: 1.45 }}>
                  {currentStrategy.customerDna.expectations}
                </div>
              </div>
            </div>

            {/* PILLAR 3: STAY & PAY MORE (EXPANSION & UPSELL) */}
            <div className="module-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                  <TrendingUp size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    3. Monetization & Expansion (Stay & Pay More)
                  </h3>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Lifecycle upsell ladder, limit scaling & product bundling</div>
                </div>
              </div>

              {/* Upsell Ladder Visual */}
              <div>
                <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--accent-teal)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Recommended Product Upsell Ladder
                </div>
                <div style={{ 
                  background: 'var(--bg-surface-elevated)', 
                  padding: '0.65rem 0.85rem', 
                  borderRadius: '6px', 
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  flexWrap: 'wrap'
                }}>
                  {currentStrategy.expansionAndUpsell.upsellLadder.split('➔').map((step, idx, arr) => (
                    <React.Fragment key={idx}>
                      <span style={{ color: idx === 0 ? 'var(--text-secondary)' : 'var(--accent-teal)' }}>{step.trim()}</span>
                      {idx < arr.length - 1 && <ChevronRight size={14} color="var(--text-muted)" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Actionable Monetization Tactics
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {currentStrategy.expansionAndUpsell.tactics.map((tac, idx) => (
                    <div key={idx} style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: 1.4, display: 'flex', gap: '0.4rem' }}>
                      <span style={{ color: 'var(--accent-teal)', fontWeight: 700 }}>•</span>
                      <span>{tac}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Target Outcome: <strong style={{ color: 'var(--accent-teal)' }}>{currentStrategy.expansionAndUpsell.walletShareTarget}</strong>
              </div>
            </div>

            {/* PILLAR 4: CHURN EARLY-WARNING & MITIGATION */}
            <div className="module-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                  <AlertOctagon size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    4. Churn Early-Warning & Mitigation Playbook
                  </h3>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Behavioral red-flags & proven retention countermeasures</div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--accent-rose)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Early-Warning Churn Signals (Red Flags)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {currentStrategy.churnMitigation.earlyWarningSignals.map((sig, idx) => (
                    <div key={idx} style={{ 
                      fontSize: '0.775rem', 
                      background: 'rgba(239, 68, 68, 0.08)', 
                      padding: '0.45rem 0.65rem', 
                      borderRadius: '5px',
                      borderLeft: '3px solid var(--accent-rose)',
                      color: 'var(--text-primary)',
                      lineHeight: 1.4
                    }}>
                      ⚠️ {sig}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--accent-teal)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Proffered Retention Countermeasures
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {currentStrategy.churnMitigation.profferedMitigationPlaybook.map((play, idx) => (
                    <div key={idx} style={{ 
                      fontSize: '0.775rem', 
                      background: 'var(--bg-surface-elevated)', 
                      padding: '0.45rem 0.65rem', 
                      borderRadius: '5px',
                      borderLeft: '3px solid var(--accent-teal)',
                      color: 'var(--text-primary)',
                      lineHeight: 1.4
                    }}>
                      🛡️ {play}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>Flight Risk: <strong style={{ color: 'var(--accent-rose)' }}>{currentStrategy.churnMitigation.flightRiskLevel}</strong></span>
                <span>Retention Efficacy: <strong style={{ color: 'var(--accent-teal)' }}>{currentStrategy.churnMitigation.retentionSuccessRate}</strong></span>
              </div>
            </div>

          </div>

          {/* REAL-TIME FLAGGED CHURN ACCOUNTS RADAR */}
          <div className="module-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-rose)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  <ShieldAlert size={15} /> Real-Time Early-Warning Churn Radar
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.15rem 0 0 0' }}>
                  Active High-Exposure Accounts Flagged for Defection
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Accounts exhibiting behavioral defection triggers. Deploy proffered mitigations with 1-click to trigger retention protocols.
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--bg-surface-elevated)', padding: '0.4rem 0.75rem', borderRadius: '6px' }}>
                Active Exposure at Risk: <strong style={{ color: 'var(--accent-rose)' }}>{formatNaira(totalAtRiskNumeric)}</strong>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-medium)', background: 'var(--bg-surface-elevated)', textAlign: 'left' }}>
                    <th style={{ padding: '0.65rem 0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Client & Product</th>
                    <th style={{ padding: '0.65rem 0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Exposure at Risk</th>
                    <th style={{ padding: '0.65rem 0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Early-Warning Trigger</th>
                    <th style={{ padding: '0.65rem 0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Competitor Threat</th>
                    <th style={{ padding: '0.65rem 0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Proffered Solution & Action</th>
                  </tr>
                </thead>
                <tbody>
                  {churnFlags.map(flag => {
                    const isMitigated = flag.status === 'Mitigation Deployed';
                    return (
                      <tr 
                        key={flag.id} 
                        style={{ 
                          borderBottom: '1px solid var(--border-subtle)',
                          background: isMitigated ? 'rgba(16, 185, 129, 0.04)' : 'transparent',
                          transition: 'background-color 0.2s ease'
                        }}
                      >
                        <td style={{ padding: '0.75rem' }}>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{flag.customerName}</div>
                          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{flag.product} • {flag.customerTier}</div>
                          <span style={{ 
                            fontSize: '0.65rem', 
                            fontWeight: 700, 
                            padding: '0.1rem 0.4rem', 
                            borderRadius: '4px',
                            background: flag.riskLevel === 'Critical' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                            color: flag.riskLevel === 'Critical' ? 'var(--accent-rose)' : 'var(--accent-amber)',
                            display: 'inline-block',
                            marginTop: '0.2rem'
                          }}>
                            {flag.riskLevel.toUpperCase()} RISK
                          </span>
                        </td>

                        <td style={{ padding: '0.75rem', fontWeight: 800, color: isMitigated ? 'var(--text-muted)' : 'var(--accent-rose)', textDecoration: isMitigated ? 'line-through' : 'none' }}>
                          {flag.portfolioAtRisk}
                        </td>

                        <td style={{ padding: '0.75rem', color: 'var(--text-secondary)', maxWidth: '240px', lineHeight: 1.4 }}>
                          {flag.triggerSignal}
                        </td>

                        <td style={{ padding: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                          {flag.competitorThreat}
                        </td>

                        <td style={{ padding: '0.75rem', maxWidth: '300px' }}>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-primary)', marginBottom: '0.4rem', lineHeight: 1.35 }}>
                            {flag.proposedSolution}
                          </div>

                          {isMitigated ? (
                            <span style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '0.3rem', 
                              fontSize: '0.725rem', 
                              color: 'var(--accent-teal)', 
                              fontWeight: 700,
                              background: 'rgba(16, 185, 129, 0.15)',
                              padding: '0.25rem 0.6rem',
                              borderRadius: '4px'
                            }}>
                              <CheckCircle2 size={13} /> Retention Action Dispatched
                            </span>
                          ) : (
                            <button
                              onClick={() => handleDeployMitigation(flag.id)}
                              className="btn-clean"
                              style={{
                                background: 'var(--accent-primary)',
                                color: '#ffffff',
                                border: 'none',
                                fontSize: '0.725rem',
                                fontWeight: 700,
                                padding: '0.35rem 0.75rem',
                                borderRadius: '5px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                cursor: 'pointer'
                              }}
                            >
                              Deploy Proffered Mitigation <ArrowRight size={13} />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* VIEW B: FORMAL EXECUTIVE MANAGEMENT REPORT */}
      {showExecutiveReport && (
        <div className="module-card animate-module" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--bg-surface)' }}>
          
          {/* Action Toolbar */}
          <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <button 
              onClick={() => setShowExecutiveReport(false)}
              className="btn-clean"
              style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}
            >
              ← Back to Interactive Engine
            </button>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handleCopyReport}
                className="btn-clean"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.8rem',
                  background: 'var(--bg-surface-elevated)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-medium)',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                {copied ? <Check size={14} color="var(--accent-teal)" /> : <Copy size={14} />}
                {copied ? 'Copied to Clipboard!' : 'Copy Brief Text'}
              </button>
              <button
                onClick={() => window.print()}
                className="btn-clean btn-clean-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.8rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                <Printer size={14} /> Print / Save PDF
              </button>
            </div>
          </div>

          {/* Formal Report Header */}
          <div style={{ textAlign: 'center', borderBottom: '2px solid var(--border-medium)', paddingBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {COMPANY_PROFILE.name.toUpperCase()} • EXECUTIVE STRATEGIC BRIEF
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.4rem 0 0.2rem 0' }}>
              Multi-Product Growth, Customer Expansion & Churn Defense Playbook
            </h1>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Prepared for: <strong>Executive Committee & Managing Director</strong> • Author: <strong>{COMPANY_PROFILE.analystRole}</strong>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.4rem' }}>
              1. Executive Summary & Portfolio Context
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '0.5rem' }}>
              This strategic brief addresses management’s directive to systematically manage Rosabon’s diversified product portfolio across the 4 key stages of customer value creation: <strong>Acquisition</strong> (acquiring verified borrowers efficiently), <strong>Customer DNA</strong> (aligning with psychological motivations), <strong>Expansion</strong> (increasing tenure, ticket size, and multi-product wallet-share), and <strong>Churn Defense</strong> (proactively flagging red flags and deploying retention countermeasures).
            </p>
          </div>

          {/* Strategic Matrix Table */}
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.4rem', marginBottom: '0.75rem' }}>
              2. Product-by-Product Strategic Framework
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {strategies.map(p => (
                <div key={p.id} style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      {p.productName} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>({p.category})</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 700 }}>
                      Portfolio: {p.portfolioExposure} | At-Risk: <span style={{ color: 'var(--accent-rose)' }}>{p.churnExposureAtRisk}</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', fontSize: '0.775rem' }}>
                    <div>
                      <strong style={{ color: 'var(--accent-primary)' }}>Acquisition:</strong>
                      <div style={{ color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{p.acquisition.valueHook}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>CAC: {p.acquisition.cacEstimate}</div>
                    </div>
                    <div>
                      <strong style={{ color: '#8b5cf6' }}>Customer DNA:</strong>
                      <div style={{ color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{p.customerDna.repaymentPsychology}</div>
                    </div>
                    <div>
                      <strong style={{ color: 'var(--accent-teal)' }}>Upsell & Monetization:</strong>
                      <div style={{ color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{p.expansionAndUpsell.upsellLadder}</div>
                    </div>
                    <div>
                      <strong style={{ color: 'var(--accent-rose)' }}>Churn Mitigation:</strong>
                      <div style={{ color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{p.churnMitigation.profferedMitigationPlaybook[0]}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Churn Radar Summary */}
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.4rem', marginBottom: '0.75rem' }}>
              3. Imminent Churn Radar: ₦163.35M Exposure Under Defense
            </h3>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.5rem' }}>
              The Customer Intelligence early-warning engine has detected 5 accounts reaching critical flight thresholds. Proffered countermeasures have been generated for account leads:
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {churnFlags.map(f => (
                <li key={f.id}>
                  <strong style={{ color: 'var(--text-primary)' }}>{f.customerName} ({f.portfolioAtRisk}):</strong> Triggered by <em>{f.triggerSignal}</em>. Threat: <strong>{f.competitorThreat}</strong>. <span style={{ color: 'var(--accent-teal)' }}>Action: {f.proposedSolution}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4 Priority Recommendations for C-Suite Sign-off */}
          <div style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-medium)' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-primary)', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>
              4 Strategic Recommendations for Management Approval
            </h4>
            <ol style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '0.4rem', lineHeight: 1.5 }}>
              <li><strong>Approve 48h Fast-Track Credit Committee Lane</strong> for repeat SME borrowers to counter commercial banks' 72h pre-approved credit lines.</li>
              <li><strong>Implement 48-Hour Remita Grace Period Protocol</strong> to prevent premature collection notices from reaching guarantors when employer paydays shift.</li>
              <li><strong>Launch HNI White-Glove Desk at Victoria Island and Abuja branches</strong> providing printed audited rollover statements for REAP treasury investors.</li>
              <li><strong>Institute 50 bps Cross-Product Discount</strong> granting borrowers preferential interest rates on vehicle leases when their working capital facility is in good standing.</li>
            </ol>
          </div>

        </div>
      )}

      {/* ADD NEW PRODUCT MODAL */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-medium)',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '640px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '1.5rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={18} color="var(--accent-primary)" /> Register New Product Line
                </h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Provide product parameters or upload/paste a PRD to auto-extract strategy and analyze across PowerBI & Ingestion.
                </div>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.25rem' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* TAB SELECTOR: CORE STRATEGY VS PRD SPEC */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setAddModalTab('core')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: addModalTab === 'core' ? 'var(--accent-primary)' : 'var(--bg-surface-elevated)',
                  color: addModalTab === 'core' ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '0.775rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                1. Core Strategy & Financials
              </button>
              <button
                type="button"
                onClick={() => setAddModalTab('prd')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: addModalTab === 'prd' ? 'var(--accent-primary)' : 'var(--bg-surface-elevated)',
                  color: addModalTab === 'prd' ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '0.775rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <BookOpen size={13} /> 2. PRD & Underwriting Specs {newProductForm.prdDocument ? '(Loaded)' : ''}
              </button>
            </div>

            <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* TAB 1: CORE STRATEGY & FINANCIALS */}
              {addModalTab === 'core' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                        Product Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Rosabon Healthcare Equipment Financing"
                        value={newProductForm.productName}
                        onChange={(e) => setNewProductForm({...newProductForm, productName: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.75rem',
                          borderRadius: '6px',
                          background: 'var(--bg-surface-elevated)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          fontSize: '0.825rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                        Product Category *
                      </label>
                      <select
                        value={newProductForm.category}
                        onChange={(e) => setNewProductForm({...newProductForm, category: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.75rem',
                          borderRadius: '6px',
                          background: 'var(--bg-surface-elevated)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          fontSize: '0.825rem'
                        }}
                      >
                        <option value="Commercial Credit">Commercial Credit</option>
                        <option value="Retail Loans">Retail Loans</option>
                        <option value="Asset Financing & Leasing">Asset Financing & Leasing</option>
                        <option value="Treasury & Wealth Management">Treasury & Wealth Management</option>
                        <option value="Invoice Discounting">Invoice Discounting</option>
                        <option value="Micro-Lending">Micro-Lending</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                        Initial Monitored Exposure (Naira)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., ₦450,000,000"
                        value={newProductForm.portfolioExposure}
                        onChange={(e) => setNewProductForm({...newProductForm, portfolioExposure: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.75rem',
                          borderRadius: '6px',
                          background: 'var(--bg-surface-elevated)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          fontSize: '0.825rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                        Tagline / Strategic Positioning
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Tailored clinic machinery lease with structured moratorium"
                        value={newProductForm.tagline}
                        onChange={(e) => setNewProductForm({...newProductForm, tagline: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.75rem',
                          borderRadius: '6px',
                          background: 'var(--bg-surface-elevated)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          fontSize: '0.825rem'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      Target Customer Persona & Winning Acquisition Channels
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Private diagnostic centers & HMO clinics via healthcare distributor partnerships"
                      value={newProductForm.targetSegments}
                      onChange={(e) => setNewProductForm({...newProductForm, targetSegments: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.6rem 0.75rem',
                        borderRadius: '6px',
                        background: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        fontSize: '0.825rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      Core Value Hook (Why Borrowers Choose Rosabon over Banks)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g., 20% equity contribution vs 40% demanded by tier-1 banks, with equipment warranty and service SLAs bundled."
                      value={newProductForm.valueHook}
                      onChange={(e) => setNewProductForm({...newProductForm, valueHook: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.6rem 0.75rem',
                        borderRadius: '6px',
                        background: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        fontSize: '0.825rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                        Customer DNA & Repayment Psychology
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g., Requires predictable monthly installments matching health insurance settlement cycles."
                        value={newProductForm.repaymentPsychology}
                        onChange={(e) => setNewProductForm({...newProductForm, repaymentPsychology: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.75rem',
                          borderRadius: '6px',
                          background: 'var(--bg-surface-elevated)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          fontSize: '0.825rem',
                          resize: 'vertical'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                        Churn Early-Warning Signal & Counter-Tactic
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g., Request for payoff settlement balance -> Action: Trigger Senior RM visit with 35 bps rate concession."
                        value={newProductForm.churnSignal}
                        onChange={(e) => setNewProductForm({...newProductForm, churnSignal: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.75rem',
                          borderRadius: '6px',
                          background: 'var(--bg-surface-elevated)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          fontSize: '0.825rem',
                          resize: 'vertical'
                        }}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: PRD & UNDERWRITING SPECIFICATION */}
              {addModalTab === 'prd' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  
                  {/* PRD File Ingest & Auto-Parse Banner */}
                  <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div>
                      <div style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Upload size={14} color="var(--accent-primary)" /> Upload Existing PRD Document (.md, .txt)
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        Select a PRD file from your local computer to auto-populate specifications.
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <label style={{
                        padding: '0.4rem 0.75rem',
                        borderRadius: '6px',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-medium)',
                        color: 'var(--text-primary)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}>
                        <Upload size={13} /> Choose PRD File
                        <input
                          type="file"
                          accept=".md,.txt,.json,.doc,.docx"
                          onChange={handlePrdFileUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={handleAutoExtractFromPrd}
                        style={{
                          padding: '0.4rem 0.75rem',
                          borderRadius: '6px',
                          background: 'rgba(59, 130, 246, 0.15)',
                          border: '1px solid var(--accent-primary)',
                          color: 'var(--accent-primary)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        <Sparkles size={13} /> Auto-Extract Strategy
                      </button>
                    </div>
                  </div>

                  {/* PRD Text / Markdown Area */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      Product Requirements Document (Markdown / Text)
                    </label>
                    <textarea
                      rows={5}
                      placeholder={`# PRODUCT REQUIREMENTS DOCUMENT (PRD)\n## ${newProductForm.productName || 'Product Title'}\n\n### 1. Executive Summary & Problem Statement\n...\n### 2. Target Market & User Personas\n...\n### 3. Underwriting & Risk Architecture\n...`}
                      value={newProductForm.prdDocument}
                      onChange={(e) => setNewProductForm({...newProductForm, prdDocument: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.6rem 0.75rem',
                        borderRadius: '6px',
                        background: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        fontFamily: 'monospace',
                        fontSize: '0.775rem',
                        lineHeight: 1.45,
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Structured Underwriting & Risk Architecture */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                        Target Turnaround SLA
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 48–72 Hours"
                        value={newProductForm.slaTurnaround}
                        onChange={(e) => setNewProductForm({...newProductForm, slaTurnaround: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.65rem',
                          borderRadius: '6px',
                          background: 'var(--bg-surface-elevated)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          fontSize: '0.775rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                        Minimum Monthly Turnover
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., ₦5,000,000"
                        value={newProductForm.minTurnover}
                        onChange={(e) => setNewProductForm({...newProductForm, minTurnover: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.65rem',
                          borderRadius: '6px',
                          background: 'var(--bg-surface-elevated)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          fontSize: '0.775rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                        Max DTI / DSCR
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 35% DSCR"
                        value={newProductForm.maxDti}
                        onChange={(e) => setNewProductForm({...newProductForm, maxDti: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.65rem',
                          borderRadius: '6px',
                          background: 'var(--bg-surface-elevated)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          fontSize: '0.775rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                        Target NPL Ceiling
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., < 2.5%"
                        value={newProductForm.targetNpl}
                        onChange={(e) => setNewProductForm({...newProductForm, targetNpl: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.65rem',
                          borderRadius: '6px',
                          background: 'var(--bg-surface-elevated)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          fontSize: '0.775rem'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                      Security & Collateral Framework
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Equipment hypothecation, director personal indemnity, Remita mandate"
                      value={newProductForm.collateral}
                      onChange={(e) => setNewProductForm({...newProductForm, collateral: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.65rem',
                        borderRadius: '6px',
                        background: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        fontSize: '0.775rem'
                      }}
                    />
                  </div>

                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                <div>
                  {addModalTab === 'core' ? (
                    <button
                      type="button"
                      onClick={() => setAddModalTab('prd')}
                      style={{
                        padding: '0.5rem 0.85rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-medium)',
                        background: 'transparent',
                        color: 'var(--accent-primary)',
                        fontSize: '0.775rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Next: Add PRD & Underwriting Specs →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setAddModalTab('core')}
                      style={{
                        padding: '0.5rem 0.85rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-medium)',
                        background: 'transparent',
                        color: 'var(--text-secondary)',
                        fontSize: '0.775rem',
                        cursor: 'pointer'
                      }}
                    >
                      ← Back to Core Strategy
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    style={{
                      padding: '0.6rem 1rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-medium)',
                      background: 'transparent',
                      color: 'var(--text-secondary)',
                      fontSize: '0.825rem',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '0.6rem 1.25rem',
                      borderRadius: '6px',
                      border: 'none',
                      background: 'var(--accent-primary)',
                      color: '#ffffff',
                      fontSize: '0.825rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Plus size={16} /> Register & Propagate Across App
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW PRD & UNDERWRITING SPECIFICATION MODAL */}
      {showPrdModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-medium)',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '840px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden'
          }}>
            {/* PRD Modal Header */}
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: 'var(--bg-surface-elevated)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-primary)', fontWeight: 700 }}>
                    {currentPrd.version || 'v2.4-Production'}
                  </span>
                  <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-teal)', fontWeight: 600 }}>
                    {currentPrd.status || 'Active in Market'}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Lead: <strong>{currentPrd.author || 'Product Architecture'}</strong> • Updated: {currentPrd.lastUpdated || 'October 2026'}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.35rem 0 0.15rem 0' }}>
                  {currentPrd.title || `${currentStrategy.productName} PRD`}
                </h3>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                  Product Requirements Document, Underwriting Criteria & Operational Guardrails
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={handleCopyPrd}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border-medium)',
                    background: 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                  title="Copy full PRD markdown"
                >
                  {prdCopied ? <Check size={14} color="var(--accent-teal)" /> : <Copy size={14} />}
                  {prdCopied ? 'Copied!' : 'Copy PRD'}
                </button>
                <button
                  onClick={handleDownloadPrd}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border-medium)',
                    background: 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                  title="Download PRD as .md file"
                >
                  <Download size={14} /> Download .md
                </button>
                <button 
                  onClick={() => setShowPrdModal(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.25rem', marginLeft: '0.5rem' }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* PRD Modal Subtabs */}
            <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
              {[
                { id: 'spec', label: 'Full PRD Document', icon: <FileText size={14} /> },
                { id: 'underwriting', label: 'Underwriting & Risk Rules', icon: <Scale size={14} /> },
                { id: 'reality_check', label: 'PRD Spec vs VoC Reality', icon: <Target size={14} /> },
                { id: 'edit', label: 'Edit PRD Markdown', icon: <Edit3 size={14} /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setPrdModalTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: prdModalTab === tab.id ? 'var(--accent-primary)' : 'transparent',
                    color: prdModalTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
                    fontSize: '0.775rem',
                    fontWeight: prdModalTab === tab.id ? 700 : 500,
                    cursor: 'pointer'
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* PRD Modal Body */}
            <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, maxHeight: '65vh' }}>
              
              {/* SUBTAB 1: FULL PRD DOCUMENT */}
              {prdModalTab === 'spec' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Executive Problem Statement</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                      {currentPrd.problemStatement}
                    </div>
                  </div>

                  <div style={{ background: 'var(--bg-surface-elevated)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit', fontSize: '0.825rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                      {currentPrd.fullDocument || generatePrdTemplate(currentStrategy)}
                    </pre>
                  </div>
                </div>
              )}

              {/* SUBTAB 2: UNDERWRITING & RISK RULES */}
              {prdModalTab === 'underwriting' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    These underwriting parameters govern credit scoring cutoffs, turnaround SLAs, and collateral requirements to protect Rosabon’s ₦3.99B portfolio:
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Appraisal Turnaround SLA</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '0.25rem' }}>
                        {currentPrd.targetKpis?.slaTurnaround || '48–72 Hours'}
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>From completed file intake</div>
                    </div>

                    <div style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Target NPL Ceiling</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-teal)', marginTop: '0.25rem' }}>
                        {currentPrd.targetKpis?.targetNpl || '< 2.5%'}
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>30+ Days Past Due threshold</div>
                    </div>

                    <div style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Min Bank Statement Turnover</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                        {currentPrd.underwritingCriteria?.minTurnover || '₦5,000,000 / month'}
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>6-month average verifiable inflow</div>
                    </div>

                    <div style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Max Debt Service Ratio (DTI)</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                        {currentPrd.underwritingCriteria?.maxDti || '35% DSCR'}
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Monthly installment vs net cashflow</div>
                    </div>
                  </div>

                  <div style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>
                      Collateral & Security Perfection Framework
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      {currentPrd.underwritingCriteria?.collateral || 'Director personal indemnity, stock/equipment debenture, and verified receivables mandate.'}
                    </p>
                  </div>

                  <div style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>
                      Regulatory & Central Bank of Nigeria (CBN) Safeguards
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      {currentPrd.regulatoryCompliance || 'Adheres strictly to Central Bank of Nigeria (CBN) NBFI Credit Regulations, Consumer Protection Framework 2026, and NDPR 2026 data masking.'}
                    </p>
                  </div>
                </div>
              )}

              {/* SUBTAB 3: PRD SPEC VS VOC REALITY (CUSTOMER INTELLIGENCE AUDIT) */}
              {prdModalTab === 'reality_check' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid var(--accent-primary)', padding: '0.85rem 1rem', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                    <strong>Customer Intelligence Audit:</strong> Comparing what was designed in this Product Requirements Document (PRD) against real-world customer verbatims collected in the platform.
                  </div>

                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--border-medium)', textAlign: 'left', color: 'var(--text-muted)' }}>
                        <th style={{ padding: '0.5rem' }}>PRD Design Target</th>
                        <th style={{ padding: '0.5rem' }}>Voice of Customer (VoC) Reality</th>
                        <th style={{ padding: '0.5rem' }}>Operational Gap & Fix</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '0.65rem 0.5rem' }}>
                          <strong style={{ color: 'var(--text-primary)' }}>Appraisal Turnaround:</strong>
                          <div style={{ color: 'var(--accent-teal)' }}>Target: {currentPrd.targetKpis?.slaTurnaround || '48h'}</div>
                        </td>
                        <td style={{ padding: '0.65rem 0.5rem', color: 'var(--accent-rose)' }}>
                          Actual: 9–12 Days on SME files (Credit Appraisal bottleneck)
                        </td>
                        <td style={{ padding: '0.65rem 0.5rem', color: 'var(--text-secondary)' }}>
                          Deploy Fast-Track 48h committee lane for repeat borrowers.
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '0.65rem 0.5rem' }}>
                          <strong style={{ color: 'var(--text-primary)' }}>Fee Transparency:</strong>
                          <div style={{ color: 'var(--accent-teal)' }}>Zero hidden charges upfront</div>
                        </td>
                        <td style={{ padding: '0.65rem 0.5rem', color: 'var(--accent-rose)' }}>
                          3 accounts disputed admin/tokenization charges
                        </td>
                        <td style={{ padding: '0.65rem 0.5rem', color: 'var(--text-secondary)' }}>
                          Embed All-In Net Repayment slider before loan confirmation.
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '0.65rem 0.5rem' }}>
                          <strong style={{ color: 'var(--text-primary)' }}>Ethical Collections:</strong>
                          <div style={{ color: 'var(--accent-teal)' }}>No premature guarantor outreach</div>
                        </td>
                        <td style={{ padding: '0.65rem 0.5rem', color: 'var(--accent-rose)' }}>
                          Remita sweeps firing at 1 AM trigger false arrears calls
                        </td>
                        <td style={{ padding: '0.65rem 0.5rem', color: 'var(--text-secondary)' }}>
                          Enforce 48h Remita Grace Period buffer to protect customer dignity.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* SUBTAB 4: EDIT PRD SPEC */}
              {prdModalTab === 'edit' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Modify the Product Requirements Document markdown below. Your changes will persist into enterprise strategy memory:
                  </div>
                  <textarea
                    rows={14}
                    value={editedPrdText}
                    onChange={(e) => setEditedPrdText(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      background: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      fontFamily: 'monospace',
                      fontSize: '0.8rem',
                      lineHeight: 1.5,
                      resize: 'vertical'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => setPrdModalTab('spec')}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-medium)',
                        background: 'transparent',
                        color: 'var(--text-secondary)',
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveEditedPrd}
                      style={{
                        padding: '0.5rem 1.25rem',
                        borderRadius: '6px',
                        border: 'none',
                        background: 'var(--accent-primary)',
                        color: '#ffffff',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Check size={15} /> Save Updated PRD
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

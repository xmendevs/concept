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
  DollarSign
} from 'lucide-react';
import { PRODUCT_STRATEGIES, ACTIVE_CHURN_FLAGS, COMPANY_PROFILE } from '../../data/mockData';

export default function ProductStrategyHub() {
  const [selectedProductId, setSelectedProductId] = useState('prod-sme');
  const [churnFlags, setChurnFlags] = useState(ACTIVE_CHURN_FLAGS);
  const [showExecutiveReport, setShowExecutiveReport] = useState(false);
  const [copied, setCopied] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  const currentStrategy = PRODUCT_STRATEGIES.find(p => p.id === selectedProductId) || PRODUCT_STRATEGIES[0];

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
${PRODUCT_STRATEGIES.map(p => `
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
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
            {PRODUCT_STRATEGIES.map(prod => {
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

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Portfolio</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{currentStrategy.portfolioExposure}</div>
              </div>
              <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)' }} />
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>At-Risk Exposure</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-rose)' }}>{currentStrategy.churnExposureAtRisk}</div>
              </div>
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
              {PRODUCT_STRATEGIES.map(p => (
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

    </div>
  );
}

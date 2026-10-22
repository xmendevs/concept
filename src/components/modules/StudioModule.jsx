import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  Sparkles, 
  Copy, 
  Printer, 
  Check, 
  Share2, 
  Building2, 
  TrendingUp, 
  AlertTriangle,
  Download,
  Eye,
  Maximize2,
  Target
} from 'lucide-react';
import { SAMPLE_SLA_QUERIES, COMPANY_PROFILE } from '../../data/mockData';
import BoardroomDeck from './BoardroomDeck';
import ProductStrategyHub from './ProductStrategyHub';

export default function StudioModule({ vocData = [] }) {
  const [reportType, setReportType] = useState('sla_memo'); // 'sla_memo' | 'monthly_briefing' | 'product_strategy'
  const [selectedQuery, setSelectedQuery] = useState(SAMPLE_SLA_QUERIES[0] || {});
  const [customQuestion, setCustomQuestion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDeck, setShowDeck] = useState(false); // Option C: Boardroom Slide Deck

  // Safe data handling
  const safeData = Array.isArray(vocData) ? vocData : [];
  const total = safeData.length;
  const promoters = safeData.filter(d => d?.npsCategory === 'Promoter').length;
  const detractors = safeData.filter(d => d?.npsCategory === 'Detractor').length;
  const npsScore = total > 0 ? Math.round(((promoters - detractors) / total) * 100) : 0;
  const churnAlerts = safeData.filter(d => d?.churnRisk).length;

  const keyDrivers = selectedQuery?.keyDrivers || [];
  const recommendedActions = selectedQuery?.recommendedActions || [];

  const handleGenerateCustom = (e) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      setSelectedQuery({
        id: `sla-custom-${Date.now()}`,
        title: customQuestion,
        requester: 'Ad-Hoc Executive Request',
        deadlineHours: 48,
        elapsedHours: 1.5,
        status: 'Generated',
        summary: `Synthesized analysis based on ${total} records in the Rosabon Central Repository. The predominant driver relates to turnaround expectations, fee transparency, and touchpoint hand-offs.`,
        keyDrivers: [
          'High correlation between customer effort (CES > 5.5) and manual documentation requirements.',
          'Cross-department delay between Frontline RM request and Credit Committee resolution.',
          'Borrowers actively benchmarking against alternative FinTech and commercial banking terms.'
        ],
        recommendedActions: [
          'Establish a standard 24-hour acknowledgment SLA for all ad-hoc borrower inquiries.',
          'Streamline collateral inspection documentation via digital upload protocol.',
          'Circulate monthly customer intelligence briefing highlights to frontline managers.'
        ]
      });
      setIsGenerating(false);
      setCustomQuestion('');
    }, 400);
  };

  const handleCopyMemo = () => {
    const text = `
ROSABON FINANCIAL SERVICES - CUSTOMER INTELLIGENCE MEMO
SUBJECT: ${selectedQuery?.title || 'Intelligence Briefing'}
REQUESTER: ${selectedQuery?.requester || 'Leadership'}
SLA COMPLIANCE: ${selectedQuery?.elapsedHours || 0}h of 48h limit
---------------------------------------------------------
EXECUTIVE SUMMARY:
${selectedQuery?.summary || ''}

KEY DRIVERS:
${keyDrivers.map((d, i) => `${i + 1}. ${d}`).join('\n')}

ACTIONABLE RECOMMENDATIONS:
${recommendedActions.map((a, i) => `• ${a}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-module" style={{ maxWidth: '1050px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Fullscreen Boardroom Deck Modal (Option C) */}
      {showDeck && (
        <BoardroomDeck
          vocData={safeData}
          onClose={() => setShowDeck(false)}
        />
      )}

      {/* Module Title & Report Type Switcher (Hidden during print) */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <FileText size={14} /> Module 3: Executive Reporting Studio
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            Executive Briefings & Intelligence Memos
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Produce fast under 48-hour ad-hoc memos, generate the monthly report, or present the boardroom slide deck.
          </p>
        </div>

        {/* Studio Switcher & Option C Deck Trigger */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--bg-surface-elevated)', padding: '0.3rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => setReportType('sla_memo')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                border: 'none',
                background: reportType === 'sla_memo' ? 'var(--accent-primary)' : 'transparent',
                color: reportType === 'sla_memo' ? '#ffffff' : 'var(--text-secondary)',
                fontSize: '0.775rem',
                fontWeight: reportType === 'sla_memo' ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              <Clock size={14} /> 48-Hour Rapid SLA Memo
            </button>

            <button
              onClick={() => setReportType('monthly_briefing')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                border: 'none',
                background: reportType === 'monthly_briefing' ? 'var(--accent-primary)' : 'transparent',
                color: reportType === 'monthly_briefing' ? '#ffffff' : 'var(--text-secondary)',
                fontSize: '0.775rem',
                fontWeight: reportType === 'monthly_briefing' ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              <FileText size={14} /> Monthly C-Suite Report
            </button>

            <button
              onClick={() => setReportType('product_strategy')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                border: 'none',
                background: reportType === 'product_strategy' ? 'var(--accent-primary)' : 'transparent',
                color: reportType === 'product_strategy' ? '#ffffff' : 'var(--text-secondary)',
                fontSize: '0.775rem',
                fontWeight: reportType === 'product_strategy' ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              <Target size={14} /> Product Growth & Churn Brief
            </button>
          </div>

          <button
            className="btn-clean btn-clean-primary"
            onClick={() => setShowDeck(true)}
            style={{ fontSize: '0.775rem', padding: '0.5rem 0.9rem' }}
            title="Launch Fullscreen Slide Deck Presentation"
          >
            <Maximize2 size={13} /> Present Boardroom Deck (Opt. C)
          </button>
        </div>
      </div>

      {/* VIEW 1: 48-Hour Rapid SLA Memo */}
      {reportType === 'sla_memo' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          
          {/* Left Column: Input & Queue (Hidden in print) */}
          <div className="no-print" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Ask VoC Box */}
            <div className="module-card">
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={16} color="var(--accent-primary)" />
                Synthesize New Ad-Hoc Memo
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                Type an inquiry from leadership or an RM to draft a 1-page intelligence memo:
              </p>

              <form onSubmit={handleGenerateCustom} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <textarea
                  rows={3}
                  placeholder="e.g. Why are SME borrowers churning in Abuja? / Analyze Remita lease deduction errors..."
                  value={customQuestion}
                  onChange={e => setCustomQuestion(e.target.value)}
                  className="input-clean"
                />
                <button 
                  type="submit" 
                  className="btn-clean btn-clean-primary"
                  disabled={isGenerating || !customQuestion.trim()}
                  style={{ alignSelf: 'flex-start', fontSize: '0.8rem' }}
                >
                  {isGenerating ? 'Synthesizing...' : 'Generate 1-Page Memo'}
                </button>
              </form>
            </div>

            {/* Pre-Built Briefing Queue */}
            <div className="module-card">
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Active Ad-Hoc Queue (SLA &le;48h)
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
                {SAMPLE_SLA_QUERIES.map(q => {
                  const isSelected = selectedQuery?.id === q.id;
                  return (
                    <div
                      key={q.id}
                      onClick={() => setSelectedQuery(q)}
                      style={{
                        background: isSelected ? 'var(--bg-surface-elevated)' : 'var(--bg-app)',
                        border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                        padding: '0.75rem 0.85rem',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: '0.825rem', color: 'var(--text-primary)' }}>{q.title}</strong>
                        <span className="badge-clean badge-green" style={{ fontSize: '0.65rem' }}>{q.elapsedHours}h</span>
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                        From: {q.requester}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Clean Document Preview (Printable) */}
          <div className="module-card printable-document" style={{ border: '1px solid var(--border-medium)' }}>
            
            {/* Action Bar (Hidden in print) */}
            <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
                Executive Memo Preview
              </span>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className="btn-clean btn-clean-secondary"
                  onClick={handleCopyMemo}
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                >
                  {copied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button 
                  className="btn-clean btn-clean-secondary"
                  onClick={handlePrint}
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                >
                  <Printer size={14} /> Print / PDF
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
              
              <div className="print-box" style={{ background: 'var(--bg-surface-elevated)', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <div><span style={{ color: 'var(--text-muted)' }}>SUBJECT:</span> <strong style={{ color: 'var(--text-primary)' }}>{selectedQuery?.title || 'Intelligence Inquiry'}</strong></div>
                <div style={{ marginTop: '0.2rem' }}><span style={{ color: 'var(--text-muted)' }}>REQUESTER:</span> <strong style={{ color: 'var(--text-secondary)' }}>{selectedQuery?.requester || 'Leadership'}</strong></div>
                <div style={{ marginTop: '0.2rem' }}><span style={{ color: 'var(--text-muted)' }}>SLA STATUS:</span> <strong style={{ color: 'var(--accent-emerald)' }}>{selectedQuery?.elapsedHours || 0} hours (Target &le;48h)</strong></div>
              </div>

              <div>
                <strong style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                  1. Executive Summary
                </strong>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {selectedQuery?.summary || 'No summary text available.'}
                </p>
              </div>

              <div>
                <strong style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                  2. Key Qualitative Drivers
                </strong>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                  {keyDrivers.map((d, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.4rem' }}>
                      <strong style={{ color: 'var(--accent-primary)' }}>{i + 1}.</strong> {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <strong style={{ color: 'var(--accent-emerald)', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                  3. Actionable Recommendations
                </strong>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-primary)' }}>
                  {recommendedActions.map((a, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.4rem' }}>
                      <strong style={{ color: 'var(--accent-emerald)' }}>•</strong> {a}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* VIEW 2: Monthly C-Suite Report */}
      {reportType === 'monthly_briefing' && (
        <div className="module-card printable-document" style={{ padding: '2rem' }}>
          
          {/* Header Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--accent-primary)', paddingBottom: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: '10px', height: '10px', background: '#dc2626', borderRadius: '2px' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {COMPANY_PROFILE.name}
                </span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                Monthly Customer Intelligence Briefing
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Reporting Cycle: Active Month • Prepared by Customer Intelligence Function
              </p>
            </div>

            <div className="no-print" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button 
                className="btn-clean btn-clean-primary"
                onClick={() => setShowDeck(true)}
                style={{ fontSize: '0.8rem' }}
              >
                <Maximize2 size={14} /> Present Slide Deck (Opt. C)
              </button>
              <button 
                className="btn-clean btn-clean-secondary"
                onClick={handlePrint}
                style={{ fontSize: '0.8rem' }}
              >
                <Printer size={15} /> Print / Export PDF
              </button>
            </div>
          </div>

          {/* Section 1: CX Metrics */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>
              1. Voice of Customer Health (NPS & CSAT)
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              <div className="print-box" style={{ background: 'var(--bg-surface-elevated)', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Net Promoter Score</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '0.1rem' }}>
                  +{npsScore}
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Based on {total} customer entries</span>
              </div>

              <div className="print-box" style={{ background: 'var(--bg-surface-elevated)', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Customer Satisfaction</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '0.1rem' }}>
                  4.1 / 5.0
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Above 4.0 internal benchmark</span>
              </div>

              <div className="print-box" style={{ background: 'var(--bg-surface-elevated)', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Flight Risk Exposure</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-rose)', marginTop: '0.1rem' }}>
                  {churnAlerts} Accounts
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-rose)' }}>Immediate retention follow-up</span>
              </div>
            </div>

            <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Overall portfolio customer sentiment remains positive at <strong>+{npsScore} NPS</strong>. However, qualitative analysis reveals distinct operational tension between high-volume retail lending (Quick Cash: 95% satisfaction) and commercial SME facilities, where multi-day credit committee appraisal delays are causing churn risks among Tier-1 borrowers.
            </p>
          </div>

          {/* Section 2: Department Findings */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>
              2. Cross-Functional Department Insights
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.825rem' }}>
              <div className="print-box" style={{ background: 'var(--bg-surface-elevated)', padding: '0.85rem 1rem', borderRadius: '6px', borderLeft: '3px solid var(--accent-emerald)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ color: 'var(--accent-emerald)' }}>Sales & Relationship Managers:</strong> Commercial SME borrowers report 9–12 day appraisal times vs. 48h competitor offers. Repeat borrowers with clean history need an express underwriting track.
              </div>

              <div className="print-box" style={{ background: 'var(--bg-surface-elevated)', padding: '0.85rem 1rem', borderRadius: '6px', borderLeft: '3px solid var(--accent-primary)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>Customer Experience (CX):</strong> Remita direct-debits deducting before salary credits settle remain the #1 driver of customer dispute tickets. A 48-hour recovery hold protocol is recommended.
              </div>

              <div className="print-box" style={{ background: 'var(--bg-surface-elevated)', padding: '0.85rem 1rem', borderRadius: '6px', borderLeft: '3px solid var(--accent-indigo)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ color: 'var(--accent-indigo)' }}>Product & Growth:</strong> Mono Open Banking statement reading was a major success on Quick Cash; biometric liveness crashes on Android devices require sprint prioritization.
              </div>
            </div>
          </div>

          {/* Section 3: Recommendations */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-emerald)', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>
              3. Strategic Recommendations for Management Sign-Off (KPI Target &ge;40%)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
              <div className="print-box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface-elevated)', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>1. Express 48h SLA for Returning SME Borrowers</span>
                <span className="badge-clean badge-green">Adopted</span>
              </div>
              <div className="print-box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface-elevated)', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>2. 48-Hour Remita Direct-Debit Settlement Hold</span>
                <span className="badge-clean badge-yellow">Under Review</span>
              </div>
              <div className="print-box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface-elevated)', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>3. Transparent All-In Loan Repayment Calculator</span>
                <span className="badge-clean badge-green">Adopted</span>
              </div>
            </div>
          </div>

          {/* Sign-off Footer */}
          <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>Rosabon Financial Services • Customer Intelligence Engine</span>
            <span>100% Quality Standard Verified</span>
          </div>

        </div>
      )}

      {/* VIEW 3: Product Strategy & Churn Management Brief */}
      {reportType === 'product_strategy' && (
        <ProductStrategyHub />
      )}

    </div>
  );
}

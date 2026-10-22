import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Building2, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  CheckCircle2, 
  Clock, 
  Percent, 
  Brain,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { COMPANY_PROFILE, COMPETITOR_BENCHMARKS, BORROWER_PERSONAS } from '../../data/mockData';

export default function BoardroomDeck({ vocData = [], onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Metrics
  const total = vocData.length;
  const promoters = vocData.filter(d => d?.npsCategory === 'Promoter').length;
  const detractors = vocData.filter(d => d?.npsCategory === 'Detractor').length;
  const npsScore = total > 0 ? Math.round(((promoters - detractors) / total) * 100) : 0;
  const churnAlerts = vocData.filter(d => d?.churnRisk).length;

  const slides = [
    // Slide 1: Title Slide
    {
      title: 'Executive Title',
      render: () => (
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: 'auto' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            boxShadow: '0 4px 20px rgba(220, 38, 38, 0.4)'
          }}>
            <Building2 size={36} color="#ffffff" />
          </div>

          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {COMPANY_PROFILE.name}
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginTop: '0.5rem', lineHeight: '1.2' }}>
            Monthly Customer Intelligence Briefing
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#94a3b8', marginTop: '0.75rem' }}>
            Translating Voice of Customer Signals into Retention & Revenue Growth
          </p>

          <div style={{ marginTop: '2.5rem', display: 'inline-flex', gap: '1.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.85rem 1.75rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.85rem', color: '#cbd5e1' }}>
            <div>Audience: <strong>Executive Committee & Managing Director</strong></div>
            <div>•</div>
            <div>Function: <strong>Customer Intelligence Engine</strong></div>
          </div>
        </div>
      )
    },

    // Slide 2: Macro VoC Health
    {
      title: 'Macro VoC Health & CX Metrics',
      render: () => (
        <div style={{ maxWidth: '900px', margin: 'auto' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 800, textTransform: 'uppercase' }}>
            Executive Dashboard
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem', marginBottom: '1.5rem' }}>
            Macro Customer Experience & Retention Health
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.75rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Net Promoter Score</span>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: '#34d399', margin: '0.5rem 0' }}>
                +{npsScore}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#34d399' }}>Promoters outnumber detractors by 3:1</span>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.75rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Customer Satisfaction (CSAT)</span>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: '#60a5fa', margin: '0.5rem 0' }}>
                4.1
              </div>
              <span style={{ fontSize: '0.75rem', color: '#60a5fa' }}>Scale of 1.0 to 5.0 (Target &ge;4.0)</span>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.75rem', borderRadius: '12px', border: '1px solid rgba(244,63,94,0.3)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#fca5a5' }}>Immediate Churn Flight Risk</span>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: '#fb7185', margin: '0.5rem 0' }}>
                ₦185M
              </div>
              <span style={{ fontSize: '0.75rem', color: '#fb7185' }}>{churnAlerts} Commercial SME accounts threatened</span>
            </div>
          </div>

          <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '1rem 1.5rem', borderRadius: '8px', fontSize: '0.9rem', color: '#dbeafe' }}>
            <strong>Strategic Summary:</strong> Overall borrower satisfaction remains healthy, but we are facing acute flight risk in our high-yielding SME loan portfolio due to credit appraisal delays.
          </div>
        </div>
      )
    },

    // Slide 3: Cross-Department Friction Insights
    {
      title: 'Departmental VoC Breakdown',
      render: () => (
        <div style={{ maxWidth: '900px', margin: 'auto' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 800, textTransform: 'uppercase' }}>
            Operational Diagnostics
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem', marginBottom: '1.5rem' }}>
            Cross-Functional Friction Hotspots
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.25rem', borderRadius: '10px', borderLeft: '4px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#34d399', fontSize: '0.95rem' }}>1. Sales & Commercial RMs</strong>
                <span className="badge-clean badge-red">Appraisal Delay</span>
              </div>
              <p style={{ fontSize: '0.825rem', color: '#cbd5e1', marginTop: '0.5rem', lineHeight: '1.5' }}>
                9–12 day credit committee turnarounds are forcing prime SME borrowers to defect to commercial banks promising 72-hour disbursement.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.25rem', borderRadius: '10px', borderLeft: '4px solid #3b82f6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#60a5fa', fontSize: '0.95rem' }}>2. Customer Experience (CX)</strong>
                <span className="badge-clean badge-yellow">Remita Clearing</span>
              </div>
              <p style={{ fontSize: '0.825rem', color: '#cbd5e1', marginTop: '0.5rem', lineHeight: '1.5' }}>
                Direct debits deducting before monthly salaries settle trigger recovery calls to client guarantors, driving severe brand distress and complaints.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.25rem', borderRadius: '10px', borderLeft: '4px solid #8b5cf6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#a78bfa', fontSize: '0.95rem' }}>3. Product & Growth</strong>
                <span className="badge-clean badge-green">Quick Cash Win</span>
              </div>
              <p style={{ fontSize: '0.825rem', color: '#cbd5e1', marginTop: '0.5rem', lineHeight: '1.5' }}>
                Mono Open Banking statement reading achieved 22-minute turnaround on Quick Cash; Android selfie liveness crash is the remaining friction point.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.25rem', borderRadius: '10px', borderLeft: '4px solid #06b6d4' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#67e8f9', fontSize: '0.95rem' }}>4. Digital Transformation</strong>
                <span className="badge-clean badge-neutral">Senior HNW Trust</span>
              </div>
              <p style={{ fontSize: '0.825rem', color: '#cbd5e1', marginTop: '0.5rem', lineHeight: '1.5' }}>
                Senior REAP treasury depositors in Abuja and VI resist digital-only portals. A hybrid RM assisted migration desk is essential to protect deposits.
              </p>
            </div>
          </div>
        </div>
      )
    },

    // Slide 4: Competitor Intelligence Radar
    {
      title: 'Competitor Intelligence Radar',
      render: () => (
        <div style={{ maxWidth: '900px', margin: 'auto' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 800, textTransform: 'uppercase' }}>
            Market Intelligence Radar
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem', marginBottom: '1.5rem' }}>
            Competitor Benchmarking & Threat Matrix
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {COMPETITOR_BENCHMARKS.map((b, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr', gap: '1rem', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: '#ffffff', fontSize: '0.9rem' }}>{b.competitor}</strong>
                  <div style={{ fontSize: '0.725rem', color: '#94a3b8' }}>{b.category}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Turnaround Speed</div>
                  <strong style={{ color: '#34d399', fontSize: '0.85rem' }}>{b.smeTurnaround}</strong>
                </div>

                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Rosabon Variance</div>
                  <strong style={{ color: '#fb7185', fontSize: '0.85rem' }}>{b.variance}</strong>
                </div>

                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Rosabon Advantage</div>
                  <div style={{ fontSize: '0.75rem', color: '#60a5fa' }}>{b.rosabonAdvantage}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#cbd5e1' }}>
            <strong>Strategic Takeaway:</strong> Our flexible collateral policy is our shield. Our turnaround delay is our vulnerability.
          </div>
        </div>
      )
    },

    // Slide 5: Strategic Recommendations for Sign-Off
    {
      title: 'Actionable Executive Recommendations',
      render: () => (
        <div style={{ maxWidth: '900px', margin: 'auto' }}>
          <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 800, textTransform: 'uppercase' }}>
            Executive Sign-Off Required
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem', marginBottom: '1.5rem' }}>
            Strategic Action Plan (Target &ge;40% Adoption)
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1.25rem', borderRadius: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#34d399', fontSize: '1rem' }}>1. Express 48h Underwriting SLA for Returning SME Borrowers</strong>
                <span className="badge-clean badge-green">Adopted</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '0.35rem' }}>
                Owner: <strong>Head of Underwriting</strong> • Impact: <strong>Protects ₦185M portfolio from commercial bank defection</strong>
              </p>
            </div>

            <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '1.25rem', borderRadius: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#fbbf24', fontSize: '1rem' }}>2. 48-Hour Remita Direct-Debit Settlement Grace Period</strong>
                <span className="badge-clean badge-yellow">Under Review</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '0.35rem' }}>
                Owner: <strong>Recovery & CX Lead</strong> • Impact: <strong>Eliminates #1 cause of guarantor harassment disputes</strong>
              </p>
            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1.25rem', borderRadius: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#34d399', fontSize: '1rem' }}>3. Transparent All-In Loan Repayment Calculator</strong>
                <span className="badge-clean badge-green">Adopted</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '0.35rem' }}>
                Owner: <strong>Marketing & Product</strong> • Impact: <strong>+22% conversion from eligibility check to drawdown</strong>
              </p>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8' }}>
            <span>Adoption Compliance: <strong>48.0% (Exceeding &ge;40% Target)</strong></span>
            <span>Customer Intelligence Analyst • Rosabon Financial Services</span>
          </div>
        </div>
      )
    }
  ];

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length, onClose]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#070a10',
      zIndex: 200,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '2rem 3rem'
    }}>
      
      {/* Top Deck Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '10px', height: '10px', background: '#dc2626', borderRadius: '2px' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {COMPANY_PROFILE.name} • Boardroom Presentation Mode
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Slide <strong style={{ color: '#ffffff' }}>{currentSlide + 1}</strong> of {slides.length}
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#ffffff',
              padding: '0.4rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <X size={14} /> Exit Presentation (Esc)
          </button>
        </div>
      </div>

      {/* Main Slide Body */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
        {slides[currentSlide].render()}
      </div>

      {/* Bottom Deck Navigation Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
          Use <strong>← / → arrow keys</strong> or Spacebar to navigate slides
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
            disabled={currentSlide === 0}
            style={{
              background: currentSlide === 0 ? 'transparent' : 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: currentSlide === 0 ? '#475569' : '#ffffff',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: currentSlide === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.8rem'
            }}
          >
            <ChevronLeft size={16} /> Previous
          </button>

          <button
            onClick={() => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))}
            disabled={currentSlide === slides.length - 1}
            style={{
              background: currentSlide === slides.length - 1 ? 'transparent' : 'var(--accent-primary)',
              border: 'none',
              color: currentSlide === slides.length - 1 ? '#475569' : '#ffffff',
              padding: '0.5rem 1.25rem',
              borderRadius: '6px',
              cursor: currentSlide === slides.length - 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.8rem',
              fontWeight: 700
            }}
          >
            Next Slide <ChevronRight size={16} />
          </button>
        </div>
      </div>

    </div>
  );
}

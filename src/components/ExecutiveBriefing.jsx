import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Share2, 
  CheckCircle, 
  TrendingUp, 
  AlertTriangle, 
  Building2, 
  ShieldCheck, 
  Target,
  Sparkles
} from 'lucide-react';
import { COMPANY_PROFILE, DEPARTMENTS } from '../data/mockData';

export default function ExecutiveBriefing({ vocData }) {
  const [reportPeriod, setReportPeriod] = useState('October 2026');
  const [copied, setCopied] = useState(false);

  const total = vocData.length;
  const promoters = vocData.filter(d => d.npsCategory === 'Promoter').length;
  const detractors = vocData.filter(d => d.npsCategory === 'Detractor').length;
  const npsScore = Math.round(((promoters - detractors) / (total || 1)) * 100);
  const churnAlerts = vocData.filter(d => d.churnRisk).length;

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Header & Export Controls */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '1rem 1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc' }}>
              Monthly Customer Intelligence Briefing
            </h3>
            <span className="badge badge-emerald">100% On-Schedule Compliance</span>
            <span className="badge badge-indigo">C-Suite & Board Distribution</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>
            Curated executive briefing consolidating customer insights across all 7 operational departments
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <select 
            value={reportPeriod}
            onChange={e => setReportPeriod(e.target.value)}
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
          >
            <option>October 2026 (Current Cycle)</option>
            <option>September 2026 (Archived)</option>
            <option>Q3 2026 Strategic Review</option>
          </select>

          <button 
            className="btn btn-secondary"
            onClick={handleShare}
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.75rem' }}
          >
            <Share2 size={15} />
            {copied ? 'Link Copied' : 'Share Briefing'}
          </button>

          <button 
            className="btn btn-primary"
            onClick={() => window.print()}
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.75rem' }}
          >
            <Printer size={15} /> Print / Export PDF
          </button>
        </div>
      </div>

      {/* Formal Executive Document Preview Container */}
      <div className="card" style={{ 
        background: '#0d131f', 
        border: '1px solid #334155', 
        padding: '2.5rem', 
        maxWidth: '1000px', 
        margin: '0 auto', 
        width: '100%',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
      }}>
        
        {/* Document Header */}
        <div style={{ borderBottom: '2px solid #3b82f6', paddingBottom: '1.5rem', marginBottom: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', background: '#dc2626', borderRadius: '2px' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {COMPANY_PROFILE.name}
              </span>
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginTop: '0.5rem', letterSpacing: '-0.02em' }}>
              Executive Customer Intelligence Briefing
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              Period: {reportPeriod} • Author: Customer Intelligence Function (Succession Track)
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
              CONFIDENTIAL • MANAGEMENT ONLY
            </span>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>
              Target SLA: 100% Met<br />
              Integrity Score: 99.4%
            </div>
          </div>
        </div>

        {/* SECTION 1: Strategic Macro CX Pulse */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            1. Strategic Voice of Customer (VoC) Health
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1f2937' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Net Promoter Score</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', marginTop: '0.2rem' }}>
                +{npsScore}
              </div>
              <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>+4 pts vs. prior month</p>
            </div>

            <div style={{ background: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1f2937' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>CSAT Satisfaction</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#60a5fa', marginTop: '0.2rem' }}>
                4.1 <span style={{ fontSize: '0.9rem', color: '#64748b' }}>/ 5.0</span>
              </div>
              <p style={{ fontSize: '0.7rem', color: '#34d399' }}>Above 4.0 internal standard</p>
            </div>

            <div style={{ background: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1f2937' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Customer Effort Score</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fbbf24', marginTop: '0.2rem' }}>
                3.1 <span style={{ fontSize: '0.9rem', color: '#64748b' }}>/ 7.0</span>
              </div>
              <p style={{ fontSize: '0.7rem', color: '#fb7185' }}>Friction in Remita & Onboarding</p>
            </div>

            <div style={{ background: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1f2937' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Retention Flight Risks</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f87171', marginTop: '0.2rem' }}>
                {churnAlerts} Accounts
              </div>
              <p style={{ fontSize: '0.7rem', color: '#fca5a5' }}>₦185M portfolio exposure</p>
            </div>
          </div>

          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.6' }}>
            Overall customer sentiment across Rosabon lending and investment channels remains resilient at <strong>+{npsScore} NPS</strong>. However, qualitative intelligence reveals an escalating divergence between our fast retail lending products (Quick Cash: 95% satisfaction) and our commercial SME facilities, where 9–12 day credit committee turnarounds are driving high-value borrowers toward aggressive commercial bank competitors.
          </p>
        </div>

        {/* SECTION 2: Cross-Functional Department Findings */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            2. Departmental Intelligence Synthesis
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ background: '#111827', padding: '0.85rem 1rem', borderRadius: '6px', borderLeft: '3px solid #10b981' }}>
              <strong style={{ color: '#34d399', fontSize: '0.85rem' }}>Sales & Relationship Managers:</strong>
              <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.25rem', lineHeight: '1.5' }}>
                Commercial RMs report strong borrower appetite for lease facilities (e.g. Crestfield Haulage 10-van expansion). However, SME RMs are losing deals due to appraisal delays. RMs require greater visibility into underwriting stages and 50 bps discretionary rate leeway.
              </p>
            </div>

            <div style={{ background: '#111827', padding: '0.85rem 1rem', borderRadius: '6px', borderLeft: '3px solid #3b82f6' }}>
              <strong style={{ color: '#60a5fa', fontSize: '0.85rem' }}>Customer Experience (CX) & Operations:</strong>
              <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.25rem', lineHeight: '1.5' }}>
                The #1 driver of customer distress and 1-star reviews remains Remita direct-debit reconciliation lag. Clients debited on the 24th are receiving automated recovery calls and guarantor warnings before batch settlement clears, creating major legal and brand exposure.
              </p>
            </div>

            <div style={{ background: '#111827', padding: '0.85rem 1rem', borderRadius: '6px', borderLeft: '3px solid #8b5cf6' }}>
              <strong style={{ color: '#a78bfa', fontSize: '0.85rem' }}>Product & Digital Growth:</strong>
              <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.25rem', lineHeight: '1.5' }}>
                Mono Open Banking statement integration on Quick Cash was a major operational win, reducing origination time to 22 minutes. However, biometric liveness check crashes on Android devices are causing a 15% drop-off that must be prioritized in sprint 14.
              </p>
            </div>

            <div style={{ background: '#111827', padding: '0.85rem 1rem', borderRadius: '6px', borderLeft: '3px solid #06b6d4' }}>
              <strong style={{ color: '#67e8f9', fontSize: '0.85rem' }}>Transformation & Digital Migration:</strong>
              <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.25rem', lineHeight: '1.5' }}>
                Senior HNW clients holding REAP fixed deposits are resistant to portal-only rollover management. A hybrid "White-Glove Assisted Migration" model is recommended to prevent deposit flight among high-value account holders in Abuja and VI branches.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: Actionable Intelligence Recommendations */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            3. Actionable Recommendations for Executive Sign-Off (KPI Target &ge;40% Adoption)
          </h2>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ background: '#111827', borderBottom: '1px solid #334155', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '0.6rem 0.75rem' }}>Initiative</th>
                <th style={{ padding: '0.6rem 0.75rem' }}>Owner</th>
                <th style={{ padding: '0.6rem 0.75rem' }}>Projected Financial / Retention Impact</th>
                <th style={{ padding: '0.6rem 0.75rem' }}>Adoption Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #1f2937' }}>
                <td style={{ padding: '0.65rem 0.75rem', color: '#f8fafc', fontWeight: 600 }}>Express 48h SLA for Returning SME Borrowers</td>
                <td style={{ padding: '0.65rem 0.75rem', color: '#cbd5e1' }}>Head of Underwriting</td>
                <td style={{ padding: '0.65rem 0.75rem', color: '#34d399' }}>Protects ₦185M SME portfolio against bank defection</td>
                <td style={{ padding: '0.65rem 0.75rem' }}><span className="badge badge-emerald">Adopted</span></td>
              </tr>
              <tr style={{ borderBottom: '1px solid #1f2937' }}>
                <td style={{ padding: '0.65rem 0.75rem', color: '#f8fafc', fontWeight: 600 }}>48h Remita Direct-Debit Settlement Hold</td>
                <td style={{ padding: '0.65rem 0.75rem', color: '#cbd5e1' }}>CX & Recovery Lead</td>
                <td style={{ padding: '0.65rem 0.75rem', color: '#34d399' }}>Eliminates top cause of customer harassment disputes</td>
                <td style={{ padding: '0.65rem 0.75rem' }}><span className="badge badge-amber">Under Review</span></td>
              </tr>
              <tr style={{ borderBottom: '1px solid #1f2937' }}>
                <td style={{ padding: '0.65rem 0.75rem', color: '#f8fafc', fontWeight: 600 }}>All-In Fee & Effective APR App Calculator</td>
                <td style={{ padding: '0.65rem 0.75rem', color: '#cbd5e1' }}>Marketing & Product</td>
                <td style={{ padding: '0.65rem 0.75rem', color: '#34d399' }}>+22% conversion from eligibility to loan drawdown</td>
                <td style={{ padding: '0.65rem 0.75rem' }}><span className="badge badge-emerald">Adopted</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Document Footer Sign-off */}
        <div style={{ borderTop: '1px solid #1f2937', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#94a3b8' }}>
          <div>
            Submitted to: <strong>Executive Committee & Managing Director</strong><br />
            Function: <strong>Customer Intelligence Engine</strong>
          </div>
          <div style={{ textAlign: 'right' }}>
            Internal Governance Standard: <strong>100% Quality Verified</strong><br />
            Next Scheduled Cycle: <strong>November 2026</strong>
          </div>
        </div>

      </div>

    </div>
  );
}

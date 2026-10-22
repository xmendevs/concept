import React, { useState } from 'react';
import { 
  Trophy, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Award, 
  ShieldCheck, 
  Target 
} from 'lucide-react';
import { INITIAL_SCORECARD } from '../data/mockData';

export default function ScorecardBanner() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{
      maxWidth: '1440px',
      margin: '1rem auto 0 auto',
      padding: '0 1.5rem'
    }}>
      <div style={{
        background: 'linear-gradient(90deg, #1e1b4b 0%, #1e293b 50%, #0f172a 100%)',
        border: '1px solid #3730a3',
        borderRadius: '12px',
        padding: '0.85rem 1.25rem',
        boxShadow: '0 4px 15px rgba(55, 48, 163, 0.25)'
      }}>
        {/* Top Summary Bar */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          flexWrap: 'wrap', 
          gap: '1rem' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(99, 102, 241, 0.2)',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Trophy size={18} color="#818cf8" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                  Role Performance Scorecard (Succession Track)
                </span>
                <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                  100% KPI Compliance
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Automated tracking against your Rosabon Customer Intelligence Analyst KRAs
              </p>
            </div>
          </div>

          {/* Quick Score Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Adoption Target</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#34d399' }}>
                48.0% <span style={{ fontSize: '0.7rem', color: '#64748b' }}>(&ge;40%)</span>
              </div>
            </div>

            <div style={{ width: '1px', height: '24px', background: '#334155' }} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Ad-Hoc SLA</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#38bdf8' }}>
                26.4h <span style={{ fontSize: '0.7rem', color: '#64748b' }}>(&le;48h)</span>
              </div>
            </div>

            <div style={{ width: '1px', height: '24px', background: '#334155' }} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Data Cleanliness</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#a78bfa' }}>
                99.4% <span style={{ fontSize: '0.7rem', color: '#64748b' }}>(&ge;98%)</span>
              </div>
            </div>

            <div style={{ width: '1px', height: '24px', background: '#334155' }} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Stakeholder CSAT</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#fbbf24' }}>
                4.85 <span style={{ fontSize: '0.7rem', color: '#64748b' }}>(&ge;4.5)</span>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid #475569',
                color: '#f8fafc',
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              {isExpanded ? 'Hide Details' : 'View Framework'}
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        </div>

        {/* Expanded KPI Breakdown Table */}
        {isExpanded && (
          <div style={{ 
            marginTop: '1rem', 
            paddingTop: '1rem', 
            borderTop: '1px solid #334155',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            {/* Perspective 1: Financial */}
            <div style={{ background: '#111827', padding: '0.85rem', borderRadius: '8px', border: '1px solid #1f2937' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34d399', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                <TrendingUp size={14} /> I. Financial Perspective
              </div>
              <ul style={{ listStyle: 'none', fontSize: '0.75rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Recommendation Adoption:</span>
                  <strong style={{ color: '#34d399' }}>48% (Target &ge;40%) ✓</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Retention Initiatives Linked:</span>
                  <strong style={{ color: '#34d399' }}>5 active (Target &ge;4) ✓</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Reporting Compliance:</span>
                  <strong style={{ color: '#34d399' }}>100% on schedule ✓</strong>
                </li>
              </ul>
            </div>

            {/* Perspective 2: Customer & Stakeholder */}
            <div style={{ background: '#111827', padding: '0.85rem', borderRadius: '8px', border: '1px solid #1f2937' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#60a5fa', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                <Award size={14} /> II. Stakeholder Perspective
              </div>
              <ul style={{ listStyle: 'none', fontSize: '0.75rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Internal Stakeholder CSAT:</span>
                  <strong style={{ color: '#60a5fa' }}>4.85 / 5.0 (Target &ge;4.5) ✓</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Ad-Hoc Request SLA:</span>
                  <strong style={{ color: '#60a5fa' }}>26.4h (Target &le;48h) ✓</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Report Quality Rating:</span>
                  <strong style={{ color: '#60a5fa' }}>98% (Target &ge;95%) ✓</strong>
                </li>
              </ul>
            </div>

            {/* Perspective 3: Internal Process */}
            <div style={{ background: '#111827', padding: '0.85rem', borderRadius: '8px', border: '1px solid #1f2937' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#a78bfa', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                <ShieldCheck size={14} /> III. Internal Process
              </div>
              <ul style={{ listStyle: 'none', fontSize: '0.75rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Repository Completeness:</span>
                  <strong style={{ color: '#a78bfa' }}>100% maintained ✓</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Data Validation Health:</span>
                  <strong style={{ color: '#a78bfa' }}>99.4% (Target &ge;98%) ✓</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Research Activity SLA:</span>
                  <strong style={{ color: '#a78bfa' }}>97% (Target &ge;95%) ✓</strong>
                </li>
              </ul>
            </div>

            {/* Perspective 4: Compliance & Learning */}
            <div style={{ background: '#111827', padding: '0.85rem', borderRadius: '8px', border: '1px solid #1f2937' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fbbf24', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                <Target size={14} /> IV. Governance & Learning
              </div>
              <ul style={{ listStyle: 'none', fontSize: '0.75rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Data Privacy & NDPR Compliance:</span>
                  <strong style={{ color: '#fbbf24' }}>100% compliant ✓</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Strategic Research Studies:</span>
                  <strong style={{ color: '#fbbf24' }}>4 of 4 completed ✓</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Knowledge Repository Sharing:</span>
                  <strong style={{ color: '#fbbf24' }}>Active Quarterly ✓</strong>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

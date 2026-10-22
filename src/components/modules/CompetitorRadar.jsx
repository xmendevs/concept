import React, { useState } from 'react';
import { 
  ShieldAlert, 
  TrendingUp, 
  Clock, 
  Percent, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Building2,
  Zap,
  ExternalLink
} from 'lucide-react';
import { COMPETITOR_BENCHMARKS, COMPETITOR_MENTIONS_SUMMARY } from '../../data/mockData';

export default function CompetitorRadar({ onNavigateToVerbatims }) {
  const [selectedBenchmark, setSelectedBenchmark] = useState(COMPETITOR_BENCHMARKS[0]);

  return (
    <div className="animate-module" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Context Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Zap size={14} /> Market Intelligence & Competitor Radar
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            Competitor Benchmarking & Defection Threat Matrix
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Monitors competitor interest rates, loan appraisal speeds, and borrower defection drivers to fulfill your Market Intelligence mandate.
          </p>
        </div>

        <span className="badge-clean badge-red" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}>
          <AlertTriangle size={13} /> Active Defection Pressure: Access Bank & FinTechs
        </span>
      </div>

      {/* Summary KPI Cards: Speed, APR, Mentions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        
        <div className="module-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>SME Turnaround Gap</span>
            <Clock size={16} color="var(--accent-rose)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-rose)', margin: '0.25rem 0' }}>
            +6 to 9 Days
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--accent-rose)' }}>
            Rosabon (9-12d) vs Banks (72h)
          </span>
        </div>

        <div className="module-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>APR Pricing Differential</span>
            <Percent size={16} color="var(--accent-amber)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-amber)', margin: '0.25rem 0' }}>
            +1.5% to 3.0%
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--accent-amber)' }}>
            Banks undercut on prime corporate accounts
          </span>
        </div>

        <div className="module-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Rosabon Core Moat</span>
            <CheckCircle2 size={16} color="var(--accent-emerald)" />
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)', margin: '0.25rem 0' }}>
            Flexible Collateral
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)' }}>
            Asset leases & equipment debentures accepted
          </span>
        </div>

        <div className="module-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>VoC Competitor Mentions</span>
            <TrendingUp size={16} color="var(--accent-primary)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-primary)', margin: '0.25rem 0' }}>
            18 Mentions
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
            Across 10 active customer files
          </span>
        </div>

      </div>

      {/* Main Benchmark Comparison Table */}
      <div className="module-card" style={{ padding: '1.5rem' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
          Head-to-Head Competitor Intelligence Matrix
        </h4>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Click any competitor row to inspect Rosabon counter-strategies and borrower quotes:
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-medium)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '0.65rem 0.75rem' }}>Competitor Group</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Their Turnaround</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Rosabon Turnaround</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Effective APR</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Top Defection Reason</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Rosabon Strategic Advantage</th>
              </tr>
            </thead>
            <tbody>
              {COMPETITOR_BENCHMARKS.map(b => {
                const isSelected = selectedBenchmark.competitor === b.competitor;
                return (
                  <tr
                    key={b.competitor}
                    onClick={() => setSelectedBenchmark(b)}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      background: isSelected ? 'var(--bg-surface-elevated)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    <td style={{ padding: '0.75rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        {isSelected && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }} />}
                        {b.competitor}
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>{b.smeTurnaround}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--accent-rose)', fontWeight: 600 }}>{b.rosabonTurnaround}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-primary)' }}>{b.effectiveApr}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--accent-amber)' }}>{b.topDefectionReason}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--accent-emerald)' }}>{b.rosabonAdvantage}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Competitor Deep Dive & Action Playbook */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        
        {/* Left: Strategic Counter-Offensive */}
        <div className="module-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
              Strategic Counter-Offensive
            </span>
            <span className="badge-clean badge-red">{selectedBenchmark.threatLevel}</span>
          </div>

          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Combating: {selectedBenchmark.competitor}
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
            <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Why Borrowers Threaten Defection:</strong>
              <p style={{ marginTop: '0.2rem' }}>{selectedBenchmark.topDefectionReason}</p>
            </div>

            <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.75rem 1rem', borderRadius: '6px', borderLeft: '3px solid var(--accent-emerald)', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ color: 'var(--accent-emerald)' }}>How Rosabon Wins the Deal:</strong>
              <p style={{ marginTop: '0.2rem' }}>{selectedBenchmark.rosabonAdvantage}</p>
            </div>

            <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.75rem 1rem', borderRadius: '6px', borderLeft: '3px solid var(--accent-primary)', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ color: 'var(--accent-primary)' }}>Customer Intelligence Recommendation:</strong>
              <p style={{ marginTop: '0.2rem' }}>
                Implement the 48-hour Express Underwriting track for prime SME repeat accounts to eliminate the bank turnaround advantage.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Competitor Mentions in Customer Feedback */}
        <div className="module-card">
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
            VoC Competitor Citation Heatmap
          </h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Actual mentions of rival lenders extracted from Relationship Manager debriefs and reviews:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {COMPETITOR_MENTIONS_SUMMARY.map(item => (
              <div
                key={item.name}
                style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  padding: '0.75rem 0.85rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{item.name}</strong>
                  <p style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                    {item.primaryContext}
                  </p>
                </div>
                <span className="badge-clean badge-blue" style={{ fontSize: '0.7rem' }}>
                  {item.count} citations
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              className="btn-clean btn-clean-secondary"
              onClick={onNavigateToVerbatims}
              style={{ fontSize: '0.75rem' }}
            >
              View Filtered Verbatims <ArrowRight size={13} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

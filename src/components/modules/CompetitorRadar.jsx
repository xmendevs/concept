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
  ExternalLink,
  Search,
  Sliders,
  DollarSign,
  Scale,
  ShieldCheck,
  Target
} from 'lucide-react';
import { COMPETITOR_BENCHMARKS, COMPETITOR_MENTIONS_SUMMARY } from '../../data/mockData';

export default function CompetitorRadar({ onNavigateToVerbatims }) {
  const [selectedBenchmark, setSelectedBenchmark] = useState(COMPETITOR_BENCHMARKS[0]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Filter logic
  const filteredBenchmarks = COMPETITOR_BENCHMARKS.filter(b => {
    if (activeCategory !== 'all' && b.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchComp = b.competitor.toLowerCase().includes(q);
      const matchSub = b.subSegment.toLowerCase().includes(q);
      const matchReason = b.topDefectionReason.toLowerCase().includes(q);
      if (!matchComp && !matchSub && !matchReason) return false;
    }
    return true;
  });

  const categories = [
    { id: 'all', label: 'All Competitors (11)' },
    { id: 'Commercial Banks', label: 'Commercial Banks (4)' },
    { id: 'Consumer NBFIs', label: 'Direct NBFIs (4)' },
    { id: 'Digital FinTechs', label: 'Digital FinTechs (2)' },
    { id: 'Merchant FinTechs', label: 'Merchant POS FinTechs (1)' }
  ];

  return (
    <div className="animate-module" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Context Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Zap size={14} /> Market Intelligence & Competitor Radar
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            Multi-Competitor Intelligence Matrix & Stats
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Monitors 11 major Nigerian lenders across Commercial Banks, NBFIs, and FinTechs with complete stats on APR, turnaround, fees, and collateral.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            className="btn-clean btn-clean-primary"
            onClick={() => setShowComparisonModal(true)}
            style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Scale size={14} /> Compare {selectedBenchmark.competitor} vs Rosabon
          </button>
          <span className="badge-clean badge-red" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}>
            <AlertTriangle size={13} /> Active Pressure: 72h Bank Lines & In-App FinTechs
          </span>
        </div>
      </div>

      {/* Summary KPI Cards */}
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
            Rosabon (9-12d) vs Access/GTB (72h)
          </span>
        </div>

        <div className="module-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Average Prime APR Differential</span>
            <Percent size={16} color="var(--accent-amber)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-amber)', margin: '0.25rem 0' }}>
            +1.5% to 3.0%
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--accent-amber)' }}>
            Banks charge 24-27% vs Rosabon 27-32%
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
            Equipment debentures & vehicle leases accepted
          </span>
        </div>

        <div className="module-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Monitored Competitors</span>
            <TrendingUp size={16} color="var(--accent-primary)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-primary)', margin: '0.25rem 0' }}>
            11 Institutions
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
            Across 4 financial sectors in Nigeria
          </span>
        </div>

      </div>

      {/* Filter Toolbar: Category Pills & Search */}
      <div className="module-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '0.45rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-medium)',
                  background: activeCategory === cat.id ? 'var(--accent-primary)' : 'var(--bg-surface-elevated)',
                  color: activeCategory === cat.id ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: activeCategory === cat.id ? 700 : 500,
                  cursor: 'pointer'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', minWidth: '220px' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search competitor by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.45rem 0.75rem 0.45rem 2.2rem',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-medium)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
                fontSize: '0.775rem'
              }}
            />
          </div>

        </div>
      </div>

      {/* Main Benchmark Comparison Table */}
      <div className="module-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Head-to-Head Competitor Intelligence Matrix ({filteredBenchmarks.length} Showing)
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
              Click any competitor row to inspect stats, fees, and Rosabon counter-arguments:
            </p>
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            Selected: <strong style={{ color: 'var(--accent-primary)' }}>{selectedBenchmark.competitor}</strong>
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-medium)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '0.65rem 0.75rem' }}>Competitor</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Category</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Their SLA</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Rosabon SLA</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Effective APR</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Max Ticket</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Threat Level</th>
              </tr>
            </thead>
            <tbody>
              {filteredBenchmarks.map(b => {
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
                    <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{b.category}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>{b.smeTurnaround}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--accent-rose)', fontWeight: 600 }}>{b.rosabonTurnaround}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>{b.effectiveApr}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--accent-blue)', fontWeight: 600 }}>{b.maxTicket}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge-clean ${b.threatLevel.includes('High') ? 'badge-red' : 'badge-amber'}`} style={{ fontSize: '0.675rem' }}>
                        {b.threatLevel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Competitor Deep Dive & Action Playbook */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
        
        {/* Left: Granular Statistics & Defense */}
        <div className="module-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
              Deep-Dive Statistics: {selectedBenchmark.competitor}
            </span>
            <span className="badge-clean badge-red">{selectedBenchmark.threatLevel}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', background: 'var(--bg-surface-elevated)', padding: '0.85rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '0.75rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Sub-Segment:</span>
              <div style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{selectedBenchmark.subSegment}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Market Share Est:</span>
              <div style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{selectedBenchmark.marketShareEstimate}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Monthly Rate:</span>
              <div style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{selectedBenchmark.monthlyRate}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Fees & Levies:</span>
              <div style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>{selectedBenchmark.fees}</div>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <span style={{ color: 'var(--text-muted)' }}>Collateral Requirement:</span>
              <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{selectedBenchmark.collateralRequirement}</div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
            <strong style={{ color: 'var(--accent-rose)' }}>Why Borrowers Threaten Defection:</strong>
            <p style={{ marginTop: '0.2rem', color: 'var(--text-secondary)' }}>{selectedBenchmark.topDefectionReason}</p>
          </div>

          <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.75rem 1rem', borderRadius: '6px', borderLeft: '3px solid var(--accent-emerald)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
            <strong style={{ color: 'var(--accent-emerald)' }}>How Rosabon Wins the Deal:</strong>
            <p style={{ marginTop: '0.2rem', color: 'var(--text-secondary)' }}>{selectedBenchmark.rosabonAdvantage}</p>
          </div>

          <div style={{ background: 'rgba(37, 99, 235, 0.08)', padding: '0.75rem 1rem', borderRadius: '6px', borderLeft: '3px solid var(--accent-primary)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-primary)', fontWeight: 700 }}>
              <Target size={14} /> Relationship Manager (RM) Winning Counter-Pitch:
            </div>
            <p style={{ marginTop: '0.25rem', color: 'var(--text-primary)', fontStyle: 'italic', fontWeight: 500 }}>
              "{selectedBenchmark.counterPitch}"
            </p>
          </div>
        </div>

        {/* Right: Competitor Citation Heatmap & Actions */}
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{item.name}</strong>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>({item.category})</span>
                  </div>
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

          <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Total 24 competitor mentions tracked
            </span>
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

      {/* Side-by-Side Comparison Modal */}
      {showComparisonModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem'
        }}>
          <div className="module-card" style={{ maxWidth: '780px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <span className="badge-clean badge-blue" style={{ fontSize: '0.7rem' }}>Side-by-Side Benchmark</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  {selectedBenchmark.competitor} vs. Rosabon Financial Services
                </h3>
              </div>
              <button
                className="btn-clean btn-clean-secondary"
                onClick={() => setShowComparisonModal(false)}
                style={{ fontSize: '0.75rem' }}
              >
                Close (Esc)
              </button>
            </div>

            <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-medium)', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>Metric / Dimension</th>
                    <th style={{ padding: '0.75rem', color: 'var(--accent-rose)' }}>{selectedBenchmark.competitor}</th>
                    <th style={{ padding: '0.75rem', color: 'var(--accent-emerald)' }}>Rosabon Financial Services</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>Turnaround Speed (SLA)</td>
                    <td style={{ padding: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>{selectedBenchmark.smeTurnaround}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--accent-rose)', fontWeight: 600 }}>{selectedBenchmark.rosabonTurnaround}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>Effective Annual APR</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-primary)' }}>{selectedBenchmark.effectiveApr}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>27% – 32% (Tailored Tenors)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>Collateral Policy</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{selectedBenchmark.collateralRequirement}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>Flexible asset backing, machinery, fleet leases & debentures</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>Hidden / Upfront Fees</td>
                    <td style={{ padding: '0.75rem', color: 'var(--accent-amber)' }}>{selectedBenchmark.fees}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-primary)' }}>Standard 1.5% management with transparent net slider</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>Maximum Facility Ticket</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-primary)' }}>{selectedBenchmark.maxTicket}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--accent-blue)', fontWeight: 700 }}>₦150,000,000 (Commercial Leasing)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>Core Strategic Pitch</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>Speed and prime automated digital limits</td>
                    <td style={{ padding: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>{selectedBenchmark.rosabonAdvantage}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="btn-clean btn-clean-primary"
                onClick={() => setShowComparisonModal(false)}
              >
                Done Inspecting
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

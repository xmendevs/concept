import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Smile, 
  Frown, 
  Meh, 
  ArrowUpRight, 
  CheckCircle2, 
  Building, 
  Briefcase, 
  Smartphone, 
  Layers, 
  DollarSign, 
  Clock 
} from 'lucide-react';
import { ROSABON_PRODUCTS, THEMES } from '../data/mockData';

export default function PulseOverview({ vocData, onSelectVoC, onNavigateToExplorer }) {
  // Calculations
  const total = vocData.length;
  const promoters = vocData.filter(d => d.npsCategory === 'Promoter').length;
  const detractors = vocData.filter(d => d.npsCategory === 'Detractor').length;
  const passives = vocData.filter(d => d.npsCategory === 'Passive').length;
  const npsScore = Math.round(((promoters - detractors) / (total || 1)) * 100);

  const avgCsat = (vocData.reduce((acc, curr) => acc + (curr.csatScore || 3), 0) / (total || 1)).toFixed(1);
  const avgCes = (vocData.reduce((acc, curr) => acc + (curr.cesScore || 4), 0) / (total || 1)).toFixed(1);

  const positiveCount = vocData.filter(d => d.sentiment === 'Positive').length;
  const neutralCount = vocData.filter(d => d.sentiment === 'Neutral').length;
  const negativeCount = vocData.filter(d => d.sentiment === 'Negative').length;

  const churnRiskItems = vocData.filter(d => d.churnRisk);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Critical Alert: Churn Radar */}
      {churnRiskItems.length > 0 && (
        <div style={{
          background: 'linear-gradient(90deg, rgba(153, 27, 27, 0.3) 0%, rgba(220, 38, 38, 0.1) 100%)',
          border: '1px solid rgba(220, 38, 38, 0.4)',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(239, 68, 68, 0.4)'
            }}>
              <AlertTriangle size={20} color="#f87171" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <strong style={{ color: '#fecaca', fontSize: '0.9rem' }}>
                  Critical Portfolio Churn Alerts ({churnRiskItems.length} High-Exposure Accounts)
                </strong>
                <span className="badge badge-rose" style={{ fontSize: '0.65rem' }}>Immediate Retention Priority</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#fca5a5' }}>
                Key commercial & lease clients signaling flight risk due to appraisal turnaround and Remita reconciliation issues.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#f8fafc', fontWeight: 600 }}>
              Top at risk: {churnRiskItems[0].customerName} ({churnRiskItems[0].loanAmount})
            </span>
            <button 
              className="btn btn-secondary"
              onClick={() => onSelectVoC(churnRiskItems[0])}
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            >
              Inspect Risk
            </button>
          </div>
        </div>
      )}

      {/* 4 Core CX Metric Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1.25rem' 
      }}>
        {/* Metric 1: NPS */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Net Promoter Score</span>
            <span className="badge badge-emerald">Healthy Benchmark</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.5rem 0 0.25rem 0' }}>
            <span style={{ fontSize: '2.25rem', fontWeight: 800, color: '#34d399', letterSpacing: '-0.03em' }}>
              +{npsScore}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>NPS Scale (-100 to +100)</span>
          </div>
          <div style={{ display: 'flex', gap: '0.25rem', height: '6px', borderRadius: '4px', overflow: 'hidden', margin: '0.75rem 0' }}>
            <div style={{ width: `${(promoters/total)*100}%`, background: '#10b981' }} title={`Promoters: ${promoters}`} />
            <div style={{ width: `${(passives/total)*100}%`, background: '#f59e0b' }} title={`Passives: ${passives}`} />
            <div style={{ width: `${(detractors/total)*100}%`, background: '#ef4444' }} title={`Detractors: ${detractors}`} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8' }}>
            <span>Promoters: <strong>{promoters}</strong> ({Math.round((promoters/total)*100)}%)</span>
            <span>Detractors: <strong>{detractors}</strong> ({Math.round((detractors/total)*100)}%)</span>
          </div>
        </div>

        {/* Metric 2: CSAT */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Customer Satisfaction (CSAT)</span>
            <span className="badge badge-blue">Target: &ge; 4.0</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.5rem 0 0.25rem 0' }}>
            <span style={{ fontSize: '2.25rem', fontWeight: 800, color: '#60a5fa', letterSpacing: '-0.03em' }}>
              {avgCsat}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>/ 5.0 (Rosabon Average)</span>
          </div>
          <div style={{ height: '6px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden', margin: '0.75rem 0' }}>
            <div style={{ width: `${(parseFloat(avgCsat)/5)*100}%`, height: '100%', background: '#3b82f6', borderRadius: '4px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8' }}>
            <span>Top-2-Box Rating: <strong>78.5%</strong></span>
            <span style={{ color: '#34d399' }}>+0.3 vs last month</span>
          </div>
        </div>

        {/* Metric 3: CES */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Customer Effort Score (CES)</span>
            <span className="badge badge-amber">Lower is Better</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.5rem 0 0.25rem 0' }}>
            <span style={{ fontSize: '2.25rem', fontWeight: 800, color: '#fbbf24', letterSpacing: '-0.03em' }}>
              {avgCes}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>/ 7.0 (Loan Origination)</span>
          </div>
          <div style={{ height: '6px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden', margin: '0.75rem 0' }}>
            <div style={{ width: `${(parseFloat(avgCes)/7)*100}%`, height: '100%', background: '#f59e0b', borderRadius: '4px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8' }}>
            <span>Primary friction: <strong>Remita & App KYC</strong></span>
            <span style={{ color: '#fb7185' }}>Friction Alert</span>
          </div>
        </div>

        {/* Metric 4: Intelligence Repository Health */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>VoC Ingestion & Integrity</span>
            <span className="badge badge-indigo">100% Maintained</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.5rem 0 0.25rem 0' }}>
            <span style={{ fontSize: '2.25rem', fontWeight: 800, color: '#a78bfa', letterSpacing: '-0.03em' }}>
              {total}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Records in Central DB</span>
          </div>
          <div style={{ height: '6px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden', margin: '0.75rem 0' }}>
            <div style={{ width: '99.4%', height: '100%', background: '#8b5cf6', borderRadius: '4px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8' }}>
            <span>Validation Health: <strong>99.4%</strong></span>
            <span style={{ color: '#34d399' }}>SLA 48h Met: 100%</span>
          </div>
        </div>
      </div>

      {/* Main Section: Sentiment Breakdown & Loan Product Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.25rem' }}>
        
        {/* Left: Sentiment & Thematic Radar */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>
                Macro Sentiment Distribution
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Automated NLP polarity across all 7 Rosabon operational touchpoints
              </p>
            </div>
            <span className="badge badge-blue">Real-Time NLP</span>
          </div>

          {/* Sentiment visual bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', color: '#34d399', fontSize: '0.8rem', fontWeight: 600 }}>
                <Smile size={16} /> Positive
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.2rem' }}>
                {positiveCount} <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>({Math.round((positiveCount/total)*100)}%)</span>
              </div>
              <p style={{ fontSize: '0.65rem', color: '#34d399', marginTop: '0.2rem' }}>Speed of Quick Cash, RM Service</p>
            </div>

            <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', color: '#fbbf24', fontSize: '0.8rem', fontWeight: 600 }}>
                <Meh size={16} /> Neutral
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.2rem' }}>
                {neutralCount} <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>({Math.round((neutralCount/total)*100)}%)</span>
              </div>
              <p style={{ fontSize: '0.65rem', color: '#fbbf24', marginTop: '0.2rem' }}>Inquiries, Rollovers, Restructuring</p>
            </div>

            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', color: '#f87171', fontSize: '0.8rem', fontWeight: 600 }}>
                <Frown size={16} /> Negative
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.2rem' }}>
                {negativeCount} <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>({Math.round((negativeCount/total)*100)}%)</span>
              </div>
              <p style={{ fontSize: '0.65rem', color: '#f87171', marginTop: '0.2rem' }}>Remita Debits, SME Appraisal SLA</p>
            </div>
          </div>

          {/* Top Friction Themes */}
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '0.75rem' }}>
            Top VoC Thematic Clusters
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {THEMES.slice(0, 5).map((theme, i) => {
              const count = vocData.filter(d => d.themes.includes(theme)).length;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={theme} style={{ background: '#1e293b', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: '#cbd5e1', fontWeight: 600 }}>{i + 1}. {theme}</span>
                    <span style={{ color: '#94a3b8' }}><strong>{count}</strong> mentions ({pct}%)</span>
                  </div>
                  <div style={{ height: '4px', background: '#0f172a', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${pct * 2}%`, 
                      maxWidth: '100%', 
                      height: '100%', 
                      background: i === 0 ? '#ef4444' : i === 1 ? '#f59e0b' : '#3b82f6',
                      borderRadius: '2px'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Rosabon Product Lines & Touchpoints */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>
                VoC by Rosabon Product Portfolio
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Customer sentiment mapped against active credit and investment lines
              </p>
            </div>
            <button 
              className="btn btn-secondary"
              onClick={onNavigateToExplorer}
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            >
              Open Explorer <ArrowUpRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {ROSABON_PRODUCTS.map(product => {
              const productItems = vocData.filter(d => d.loanProduct === product);
              const pCount = productItems.length;
              if (pCount === 0) return null;
              const pDetractors = productItems.filter(d => d.npsCategory === 'Detractor').length;
              const pPromoters = productItems.filter(d => d.npsCategory === 'Promoter').length;

              return (
                <div 
                  key={product} 
                  style={{ 
                    background: '#1a2234', 
                    border: '1px solid #283548', 
                    borderRadius: '8px', 
                    padding: '0.75rem',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease'
                  }}
                  onClick={onNavigateToExplorer}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f1f5f9' }}>
                      {product}
                    </span>
                    <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>
                      {pCount} Feedback Records
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.4rem', fontSize: '0.75rem' }}>
                    <span style={{ color: '#34d399' }}>Promoters: {pPromoters}</span>
                    <span style={{ color: '#94a3b8' }}>•</span>
                    <span style={{ color: '#f87171' }}>Detractors: {pDetractors}</span>
                    <span style={{ color: '#94a3b8' }}>•</span>
                    <span style={{ color: '#94a3b8' }}>
                      Recent item: <em style={{ color: '#cbd5e1' }}>{productItems[0].customerName}</em>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Tip for Analyst */}
          <div style={{ 
            marginTop: '1.25rem', 
            background: 'rgba(99, 102, 241, 0.08)', 
            border: '1px dashed #4f46e5', 
            borderRadius: '8px', 
            padding: '0.75rem',
            fontSize: '0.75rem',
            color: '#c7d2fe',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}>
            <TrendingUp size={18} color="#818cf8" style={{ flexShrink: 0 }} />
            <span>
              <strong>Analyst Tip:</strong> Notice that SME Working Capital Loans has the highest detractor ratio due to the 12-day credit committee turnaround. This directly informs Recommendation #1.
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}

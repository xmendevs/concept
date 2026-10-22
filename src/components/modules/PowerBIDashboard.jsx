import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  Filter, 
  Download, 
  RefreshCw, 
  Maximize2, 
  Minimize2, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Target, 
  Layers, 
  Building2, 
  Sliders, 
  FileSpreadsheet, 
  Share2, 
  ArrowUpRight, 
  ArrowDownRight,
  Search,
  Code
} from 'lucide-react';
import { ROSABON_PRODUCTS, DEPARTMENTS } from '../../data/mockData';

export default function PowerBIDashboard({ vocData = [] }) {
  // Slicer States (PowerBI Interactive Filtering)
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedSentiment, setSelectedSentiment] = useState('all');
  const [churnOnly, setChurnOnly] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDaxModal, setShowDaxModal] = useState(false);
  const [exportNotice, setExportNotice] = useState('');

  // Slicer Filter Logic
  const filteredData = useMemo(() => {
    return vocData.filter(item => {
      if (selectedProduct !== 'all' && item.loanProduct !== selectedProduct) return false;
      if (selectedDepartment !== 'all' && item.department !== selectedDepartment) return false;
      if (selectedSentiment !== 'all' && item.sentiment !== selectedSentiment) return false;
      if (churnOnly && !item.churnRisk) return false;
      return true;
    });
  }, [vocData, selectedProduct, selectedDepartment, selectedSentiment, churnOnly]);

  // Aggregate Metrics (PowerBI Card Measures)
  const totalRecords = filteredData.length;
  const promoters = filteredData.filter(d => d.npsCategory === 'Promoter').length;
  const passives = filteredData.filter(d => d.npsCategory === 'Passive').length;
  const detractors = filteredData.filter(d => d.npsCategory === 'Detractor').length;
  const npsScore = totalRecords > 0 ? Math.round(((promoters - detractors) / totalRecords) * 100) : 0;
  
  const avgCsat = totalRecords > 0 
    ? (filteredData.reduce((acc, curr) => acc + (curr.csatScore || 3.5), 0) / totalRecords).toFixed(1)
    : '4.1';

  const avgCes = totalRecords > 0
    ? (filteredData.reduce((acc, curr) => acc + (curr.cesScore || 3.2), 0) / totalRecords).toFixed(1)
    : '3.1';

  const totalExposureRiskNumeric = filteredData
    .filter(d => d.churnRisk)
    .reduce((sum, d) => {
      const num = parseInt((d.loanAmount || '0').replace(/[^0-9]/g, ''), 10);
      return sum + (isNaN(num) ? 0 : num);
    }, 0);

  const formatNaira = (num) => {
    if (num >= 1000000) return `₦${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `₦${(num / 1000).toFixed(0)}k`;
    return `₦${num.toLocaleString()}`;
  };

  // Product-Level Performance Metrics
  const productMetrics = useMemo(() => {
    return ROSABON_PRODUCTS.map(prod => {
      const records = vocData.filter(d => d.loanProduct === prod);
      const pTotal = records.length;
      const pProm = records.filter(d => d.npsCategory === 'Promoter').length;
      const pDet = records.filter(d => d.npsCategory === 'Detractor').length;
      const pNps = pTotal > 0 ? Math.round(((pProm - pDet) / pTotal) * 100) : 0;
      const pChurn = records.filter(d => d.churnRisk).length;
      const pAvgCsat = pTotal > 0 ? (records.reduce((acc, c) => acc + (c.csatScore || 3), 0) / pTotal).toFixed(1) : '3.8';
      
      const pExposure = records.reduce((acc, c) => {
        const val = parseInt((c.loanAmount || '0').replace(/[^0-9]/g, ''), 10);
        return acc + (isNaN(val) ? 0 : val);
      }, 0);

      return {
        product: prod,
        count: pTotal,
        nps: pNps,
        csat: pAvgCsat,
        churnCount: pChurn,
        exposure: pExposure
      };
    });
  }, [vocData]);

  // Departmental SLA & CES Mapping
  const deptMetrics = [
    { name: 'Credit Appraisal & Risk', slaTurnaround: '9–12 Days', csat: '2.8 / 5.0', ces: '5.8 / 7.0', frictionStatus: 'Critical Bottleneck', color: 'var(--accent-rose)' },
    { name: 'Sales & Relationship Mgrs', slaTurnaround: '24–48 Hours', csat: '4.6 / 5.0', ces: '2.1 / 7.0', frictionStatus: 'High Performer', color: 'var(--accent-emerald)' },
    { name: 'Customer Experience (CX)', slaTurnaround: '4–12 Hours', csat: '4.2 / 5.0', ces: '3.0 / 7.0', frictionStatus: 'Stable', color: 'var(--accent-blue)' },
    { name: 'Digital App & Channels', slaTurnaround: 'Instant (Buggy)', csat: '3.4 / 5.0', ces: '4.9 / 7.0', frictionStatus: 'App Crash Hotspot', color: 'var(--accent-amber)' }
  ];

  // Competitor Threat Distribution
  const competitorThreats = [
    { competitor: 'Access Bank / GTBank', count: 9, threatShare: '38%', riskPortfolio: '₦95,000,000', reason: '72h Pre-Approved Credit Lines' },
    { competitor: 'Carbon / FairMoney', count: 6, threatShare: '25%', riskPortfolio: '₦8,500,000', reason: 'Instant App Disbursement & Fee Slider' },
    { competitor: 'Renmoney / Page', count: 5, threatShare: '21%', riskPortfolio: '₦22,000,000', reason: 'Zero Paper Guarantor Flow' },
    { competitor: 'Moniepoint / OPay POS', count: 4, threatShare: '16%', riskPortfolio: '₦38,350,000', reason: 'Daily POS Overdrafts' }
  ];

  // Export Data for PowerBI Desktop (CSV download)
  const handleExportPowerBiData = () => {
    const headers = ['ID', 'CustomerName', 'CustomerTier', 'Department', 'Product', 'LoanAmount', 'Sentiment', 'NPS_Score', 'NPS_Category', 'CSAT', 'CES', 'ChurnRisk', 'RootCause'];
    const rows = filteredData.map(d => [
      d.id,
      `"${d.customerName}"`,
      `"${d.customerTier}"`,
      d.department,
      `"${d.loanProduct}"`,
      `"${d.loanAmount}"`,
      d.sentiment,
      d.npsScore,
      d.npsCategory,
      d.csatScore,
      d.cesScore,
      d.churnRisk ? 'TRUE' : 'FALSE',
      `"${(d.qualitativeText || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rosabon_PowerBI_Customer_Intelligence_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice('Exported PowerBI-ready dataset (CSV)! Open in PowerBI Desktop to load schema.');
    setTimeout(() => setExportNotice(''), 4500);
  };

  const resetAllSlicers = () => {
    setSelectedProduct('all');
    setSelectedDepartment('all');
    setSelectedSentiment('all');
    setChurnOnly(false);
  };

  return (
    <div className={`animate-module ${isFullscreen ? 'powerbi-fullscreen' : ''}`} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      background: isFullscreen ? 'var(--bg-app)' : 'transparent',
      padding: isFullscreen ? '1.5rem' : '0',
      minHeight: isFullscreen ? '100vh' : 'auto',
      zIndex: isFullscreen ? 9999 : 'auto',
      position: isFullscreen ? 'fixed' : 'relative',
      top: isFullscreen ? 0 : 'auto',
      left: isFullscreen ? 0 : 'auto',
      right: isFullscreen ? 0 : 'auto',
      bottom: isFullscreen ? 0 : 'auto',
      overflowY: isFullscreen ? 'auto' : 'visible'
    }}>
      
      {/* 1. POWER BI CANVAS TOOLBAR */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-medium)',
        borderRadius: '8px',
        padding: '0.75rem 1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: '#ffffff',
            padding: '0.4rem',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BarChart3 size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Microsoft PowerBI • Rosabon Executive VoC Intelligence Dashboard
              </span>
              <span style={{ fontSize: '0.65rem', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>
                Live BI Canvas
              </span>
            </div>
            <p style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
              Interactive cross-filtering across 5 product lines, 7 operational departments, and ₦1.85B portfolio exposure.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
          <button
            className="btn-clean btn-clean-secondary"
            onClick={() => setShowDaxModal(true)}
            style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Code size={13} /> View DAX Measures
          </button>

          <button
            className="btn-clean btn-clean-primary"
            onClick={handleExportPowerBiData}
            style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Download size={13} /> Export PBIX / CSV Dataset
          </button>

          <button
            className="btn-clean btn-clean-secondary"
            onClick={() => setIsFullscreen(!isFullscreen)}
            style={{ fontSize: '0.75rem', padding: '0.45rem 0.65rem' }}
            title="Toggle Fullscreen Canvas"
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {exportNotice && (
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--accent-emerald)', borderRadius: '6px', padding: '0.65rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', fontSize: '0.8rem' }}>
          <CheckCircle2 size={15} /> {exportNotice}
        </div>
      )}

      {/* 2. POWER BI INTERACTIVE SLICERS PANE (Top Cross-Filtering Bar) */}
      <div className="module-card" style={{ padding: '1rem', background: 'var(--bg-surface-elevated)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
            <Filter size={13} /> Interactive BI Slicers (Click any to filter entire canvas)
          </div>
          {(selectedProduct !== 'all' || selectedDepartment !== 'all' || selectedSentiment !== 'all' || churnOnly) && (
            <button
              onClick={resetAllSlicers}
              style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', fontSize: '0.725rem', cursor: 'pointer', fontWeight: 600 }}
            >
              Reset Slicers (Clear Filters)
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          
          {/* Product Slicer */}
          <div>
            <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>
              Product Line Slicer:
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              style={{
                width: '100%',
                padding: '0.4rem 0.6rem',
                borderRadius: '6px',
                border: '1px solid var(--border-medium)',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontSize: '0.775rem'
              }}
            >
              <option value="all">All Rosabon Products (5)</option>
              {ROSABON_PRODUCTS.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Department Slicer */}
          <div>
            <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>
              Department Slicer:
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              style={{
                width: '100%',
                padding: '0.4rem 0.6rem',
                borderRadius: '6px',
                border: '1px solid var(--border-medium)',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontSize: '0.775rem'
              }}
            >
              <option value="all">All Departments (7)</option>
              {DEPARTMENTS.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Sentiment Slicer */}
          <div>
            <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>
              Sentiment Slicer:
            </label>
            <select
              value={selectedSentiment}
              onChange={(e) => setSelectedSentiment(e.target.value)}
              style={{
                width: '100%',
                padding: '0.4rem 0.6rem',
                borderRadius: '6px',
                border: '1px solid var(--border-medium)',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontSize: '0.775rem'
              }}
            >
              <option value="all">All Sentiments</option>
              <option value="Positive">Positive (Promoters)</option>
              <option value="Neutral">Neutral (Passives)</option>
              <option value="Negative">Negative (Detractors)</option>
            </select>
          </div>

          {/* Churn Risk Toggle Slicer */}
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              onClick={() => setChurnOnly(!churnOnly)}
              style={{
                width: '100%',
                padding: '0.42rem 0.75rem',
                borderRadius: '6px',
                border: churnOnly ? '1px solid var(--accent-rose)' : '1px solid var(--border-medium)',
                background: churnOnly ? 'rgba(244, 63, 94, 0.12)' : 'var(--bg-surface)',
                color: churnOnly ? 'var(--accent-rose)' : 'var(--text-secondary)',
                fontSize: '0.775rem',
                fontWeight: churnOnly ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
            >
              <ShieldAlert size={14} color={churnOnly ? 'var(--accent-rose)' : 'var(--text-muted)'} />
              <span>{churnOnly ? 'Active: Flight Risk Only' : 'Filter: Churn Risk Only'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 3. POWER BI KPI CARDS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
        
        {/* Card 1: Total Records */}
        <div className="module-card" style={{ padding: '1.1rem', borderTop: '3px solid var(--accent-primary)' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
            Total Analyzed Files
          </span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
            {totalRecords} Files
          </div>
          <span style={{ fontSize: '0.675rem', color: 'var(--accent-primary)' }}>
            Filtered from master VoC base
          </span>
        </div>

        {/* Card 2: Net Promoter Score */}
        <div className="module-card" style={{ padding: '1.1rem', borderTop: '3px solid var(--accent-emerald)' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
            Net Promoter Score (NPS)
          </span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: npsScore >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)', margin: '0.2rem 0' }}>
            {npsScore >= 0 ? `+${npsScore}` : npsScore}
          </div>
          <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
            {promoters} Promoters • {detractors} Detractors
          </span>
        </div>

        {/* Card 3: CSAT */}
        <div className="module-card" style={{ padding: '1.1rem', borderTop: '3px solid var(--accent-blue)' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
            Avg CSAT Rating
          </span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-blue)', margin: '0.2rem 0' }}>
            {avgCsat} / 5.0
          </div>
          <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
            Target: &ge; 4.5 / 5.0
          </span>
        </div>

        {/* Card 4: Customer Effort (CES) */}
        <div className="module-card" style={{ padding: '1.1rem', borderTop: '3px solid var(--accent-amber)' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
            Customer Effort Score (CES)
          </span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-amber)', margin: '0.2rem 0' }}>
            {avgCes} / 7.0
          </div>
          <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
            Low Effort Benchmark (&le; 3.5)
          </span>
        </div>

        {/* Card 5: Churn Exposure */}
        <div className="module-card" style={{ padding: '1.1rem', borderTop: '3px solid var(--accent-rose)' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
            Portfolio at Flight Risk
          </span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-rose)', margin: '0.2rem 0' }}>
            {formatNaira(totalExposureRiskNumeric)}
          </div>
          <span style={{ fontSize: '0.675rem', color: 'var(--accent-rose)' }}>
            Across {filteredData.filter(d => d.churnRisk).length} Flagged Accounts
          </span>
        </div>

      </div>

      {/* 4. MAIN POWER BI CHARTS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.25rem' }}>
        
        {/* Visual 1: Product Performance & Satisfaction Matrix */}
        <div className="module-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Product Intelligence & Satisfaction Matrix
            </h4>
            <span className="badge-clean badge-blue" style={{ fontSize: '0.65rem' }}>5 Products</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {productMetrics.map(p => (
              <div 
                key={p.product}
                onClick={() => setSelectedProduct(selectedProduct === p.product ? 'all' : p.product)}
                style={{
                  background: selectedProduct === p.product ? 'rgba(37, 99, 235, 0.08)' : 'var(--bg-surface-elevated)',
                  border: selectedProduct === p.product ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  padding: '0.65rem 0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <strong style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{p.product}</strong>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: p.nps >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                    NPS: {p.nps >= 0 ? `+${p.nps}` : p.nps}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
                  <span>CSAT: <strong>{p.csat}/5.0</strong></span>
                  <span>Feedback: <strong>{p.count} files</strong></span>
                  <span>Exposure: <strong style={{ color: 'var(--accent-blue)' }}>{formatNaira(p.exposure)}</strong></span>
                  {p.churnCount > 0 && (
                    <span style={{ color: 'var(--accent-rose)', fontWeight: 700 }}>⚠️ {p.churnCount} at risk</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual 2: Departmental SLA Turnaround vs Customer Friction (SLA vs CES) */}
        <div className="module-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Departmental Turnaround vs Friction Hotspots
            </h4>
            <span className="badge-clean badge-red" style={{ fontSize: '0.65rem' }}>Credit Bottleneck</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {deptMetrics.map(d => (
              <div key={d.name} style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '0.75rem 0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{d.name}</strong>
                  <span style={{ fontSize: '0.7rem', color: d.color, fontWeight: 700 }}>{d.frictionStatus}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '0.4rem', fontSize: '0.725rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Avg SLA Turnaround:</span>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{d.slaTurnaround}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Dept CSAT:</span>
                    <div style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>{d.csat}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Customer Effort (CES):</span>
                    <div style={{ fontWeight: 700, color: d.color }}>{d.ces}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual 3: Competitor Defection Share (PowerBI Threat Breakdown) */}
        <div className="module-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Competitor Defection Share (Portfolio at Threat)
            </h4>
            <span className="badge-clean badge-amber" style={{ fontSize: '0.65rem' }}>Market Defense</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {competitorThreats.map(c => (
              <div key={c.competitor} style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '0.65rem 0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{c.competitor}</strong>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-rose)' }}>{c.riskPortfolio}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  <span>Defection Reason: <strong>{c.reason}</strong></span>
                  <span className="badge-clean badge-red" style={{ fontSize: '0.65rem' }}>{c.threatShare} Share</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual 4: Sentiment Distribution & NPS Gauge */}
        <div className="module-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            NPS Sentiment Breakdown (PowerBI Donut View)
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>Promoters (Score 9-10)</span>
                <strong>{totalRecords > 0 ? Math.round((promoters / totalRecords) * 100) : 0}% ({promoters})</strong>
              </div>
              <div style={{ height: '8px', background: 'var(--bg-surface-elevated)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${totalRecords > 0 ? (promoters / totalRecords) * 100 : 0}%`, height: '100%', background: 'var(--accent-emerald)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>Passives (Score 7-8)</span>
                <strong>{totalRecords > 0 ? Math.round((passives / totalRecords) * 100) : 0}% ({passives})</strong>
              </div>
              <div style={{ height: '8px', background: 'var(--bg-surface-elevated)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${totalRecords > 0 ? (passives / totalRecords) * 100 : 0}%`, height: '100%', background: 'var(--accent-amber)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--accent-rose)', fontWeight: 700 }}>Detractors (Score 0-6)</span>
                <strong>{totalRecords > 0 ? Math.round((detractors / totalRecords) * 100) : 0}% ({detractors})</strong>
              </div>
              <div style={{ height: '8px', background: 'var(--bg-surface-elevated)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${totalRecords > 0 ? (detractors / totalRecords) * 100 : 0}%`, height: '100%', background: 'var(--accent-rose)' }} />
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            <strong>Strategic Executive Takeaway:</strong> 72% of detractors cite Credit Committee appraisal delays rather than interest rate pricing. Fast-tracking Repeat SME loans eliminates ₦45M in immediate defection threat.
          </div>
        </div>

      </div>

      {/* 5. DRILLTHROUGH DATA GRID (PowerBI Table Visual) */}
      <div className="module-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              PowerBI Drillthrough Table: Customer Verbatim Records ({filteredData.length} records matching slicers)
            </h4>
            <p style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
              Live tabular view showing verified customer exposure, NPS category, and cross-functional root causes.
            </p>
          </div>

          <button
            className="btn-clean btn-clean-secondary"
            onClick={handleExportPowerBiData}
            style={{ fontSize: '0.75rem' }}
          >
            Export Filtered Rows to Excel
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.775rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-medium)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '0.5rem 0.65rem' }}>ID</th>
                <th style={{ padding: '0.5rem 0.65rem' }}>Customer Name</th>
                <th style={{ padding: '0.5rem 0.65rem' }}>Product Line</th>
                <th style={{ padding: '0.5rem 0.65rem' }}>Exposure (₦)</th>
                <th style={{ padding: '0.5rem 0.65rem' }}>NPS Category</th>
                <th style={{ padding: '0.5rem 0.65rem' }}>CSAT</th>
                <th style={{ padding: '0.5rem 0.65rem' }}>CES</th>
                <th style={{ padding: '0.5rem 0.65rem' }}>Churn Threat</th>
                <th style={{ padding: '0.5rem 0.65rem' }}>Root Cause</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(0, 10).map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.6rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>{item.id}</td>
                  <td style={{ padding: '0.6rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.customerName}</td>
                  <td style={{ padding: '0.6rem', color: 'var(--text-secondary)' }}>{item.loanProduct}</td>
                  <td style={{ padding: '0.6rem', color: 'var(--accent-blue)', fontWeight: 700 }}>{item.loanAmount}</td>
                  <td style={{ padding: '0.6rem' }}>
                    <span className={`badge-clean ${item.npsCategory === 'Promoter' ? 'badge-green' : item.npsCategory === 'Detractor' ? 'badge-red' : 'badge-amber'}`} style={{ fontSize: '0.65rem' }}>
                      {item.npsCategory} ({item.npsScore}/10)
                    </span>
                  </td>
                  <td style={{ padding: '0.6rem', fontWeight: 600 }}>{item.csatScore}/5</td>
                  <td style={{ padding: '0.6rem', fontWeight: 600, color: item.cesScore >= 5 ? 'var(--accent-rose)' : 'inherit' }}>{item.cesScore}/7</td>
                  <td style={{ padding: '0.6rem' }}>
                    {item.churnRisk ? (
                      <span className="badge-clean badge-red" style={{ fontSize: '0.65rem' }}>Flight Risk</span>
                    ) : (
                      <span className="badge-clean badge-green" style={{ fontSize: '0.65rem' }}>Retained</span>
                    )}
                  </td>
                  <td style={{ padding: '0.6rem', color: 'var(--text-secondary)', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.qualitativeText}>
                    {item.qualitativeText}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. MODAL: POWER BI DAX MEASURES & DATA MODEL SCHEMA */}
      {showDaxModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '1.5rem'
        }}>
          <div className="module-card" style={{ maxWidth: '680px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <span className="badge-clean badge-blue" style={{ fontSize: '0.7rem' }}>DAX Measures & PowerBI Architecture</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  PowerBI Measures & Formula Architecture
                </h3>
              </div>
              <button
                className="btn-clean btn-clean-secondary"
                onClick={() => setShowDaxModal(false)}
                style={{ fontSize: '0.75rem' }}
              >
                Close
              </button>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Use these certified DAX formulas inside PowerBI Desktop when creating custom dashboards for executive stakeholders:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>[Net Promoter Score]:</span>
                <pre style={{ margin: '0.3rem 0 0 0', color: 'var(--text-primary)', whiteSpace: 'pre-wrap' }}>
{`NPS = 
VAR Total = COUNTROWS('RosabonVoC')
VAR Promoters = CALCULATE(COUNTROWS('RosabonVoC'), 'RosabonVoC'[NPS_Score] >= 9)
VAR Detractors = CALCULATE(COUNTROWS('RosabonVoC'), 'RosabonVoC'[NPS_Score] <= 6)
RETURN DIVIDE(Promoters - Detractors, Total, 0) * 100`}
                </pre>
              </div>

              <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--accent-rose)', fontWeight: 700 }}>[Total Churn Exposure at Risk]:</span>
                <pre style={{ margin: '0.3rem 0 0 0', color: 'var(--text-primary)', whiteSpace: 'pre-wrap' }}>
{`PortfolioFlightRisk = 
CALCULATE(
    SUM('RosabonVoC'[ExposureNumeric]),
    'RosabonVoC'[ChurnRisk] = TRUE()
)`}
                </pre>
              </div>

              <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>[Recommendation Adoption Rate]:</span>
                <pre style={{ margin: '0.3rem 0 0 0', color: 'var(--text-primary)', whiteSpace: 'pre-wrap' }}>
{`AdoptionRate = 
DIVIDE(
    CALCULATE(COUNTROWS('ActionTracker'), 'ActionTracker'[Status] = "Adopted"),
    COUNTROWS('ActionTracker'),
    0
)`}
                </pre>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="btn-clean btn-clean-primary"
                onClick={() => setShowDaxModal(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  AlertTriangle, 
  Smile, 
  Frown, 
  Meh, 
  Download, 
  X, 
  Building2, 
  Calendar,
  Layers,
  ArrowRight,
  Zap,
  Brain,
  MessageSquare,
  Target,
  Sparkles,
  CheckCircle2,
  Trash2,
  RotateCcw,
  Plus
} from 'lucide-react';
import { DEPARTMENTS, ROSABON_PRODUCTS } from '../../data/mockData';
import CompetitorRadar from './CompetitorRadar';
import PersonaStudio from './PersonaStudio';
import ProductStrategyHub from './ProductStrategyHub';
import AdaptiveLearnerHub from './AdaptiveLearnerHub';

export default function ExplorerModule({ 
  vocData, 
  allVocData,
  selectedItem, 
  onSelectItem, 
  onCloseDrawer, 
  onDeleteItem,
  onClearAll,
  onRestoreSamples,
  activeProduct = 'all',
  onChangeProduct,
  availableProducts: propProducts,
  onNavigateToCapture, 
  onNavigateToReports 
}) {
  const [explorerTab, setExplorerTab] = useState('verbatims'); // 'verbatims' | 'competitor' | 'personas' | 'strategies' | 'adaptive'
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [sentimentFilter, setSentimentFilter] = useState('all');
  const [productFilter, setProductFilter] = useState(activeProduct);
  const [churnFilter, setChurnFilter] = useState(false);
  const [exportNotice, setExportNotice] = useState('');

  // Keep in sync with global product scope
  useEffect(() => {
    if (activeProduct) {
      setProductFilter(activeProduct);
    }
  }, [activeProduct]);

  const [productsVer, setProductsVer] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setProductsVer(v => v + 1);
    window.addEventListener('rosabon_products_updated', handleUpdate);
    return () => window.removeEventListener('rosabon_products_updated', handleUpdate);
  }, []);

  const availableProducts = useMemo(() => {
    const set = new Set(ROSABON_PRODUCTS);
    try {
      const custom = JSON.parse(localStorage.getItem('rosabon_custom_products') || '[]');
      custom.forEach(c => set.add(c));
    } catch (e) {}
    vocData.forEach(d => {
      if (d.loanProduct) set.add(d.loanProduct);
    });
    return Array.from(set);
  }, [vocData, productsVer]);

  // Filter Logic
  const filtered = vocData.filter(item => {
    if (deptFilter !== 'all' && item.department !== deptFilter) return false;
    if (sentimentFilter !== 'all' && item.sentiment !== sentimentFilter) return false;
    if (productFilter !== 'all' && item.loanProduct !== productFilter) return false;
    if (churnFilter && !item.churnRisk) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = item.customerName.toLowerCase().includes(q);
      const matchText = item.qualitativeText.toLowerCase().includes(q);
      const matchProd = item.loanProduct.toLowerCase().includes(q);
      if (!matchName && !matchText && !matchProd) return false;
    }
    return true;
  });

  // REAL CSV EXPORT HANDLER
  const handleExportCsv = () => {
    if (!filtered || filtered.length === 0) return;

    const headers = [
      'Ticket ID',
      'Customer / Company Name',
      'Customer Segment',
      'Department',
      'Channel',
      'Rosabon Product Line',
      'Exposure Amount (NGN)',
      'Date Logged',
      'Sentiment',
      'Sentiment Score (-1 to +1)',
      'NPS Category',
      'NPS Rating (0-10)',
      'CSAT Score (1-5)',
      'CES Effort Score (1-7)',
      'Urgency Level',
      'Churn Flight Risk',
      'Resolution Status',
      'Action Owner',
      'Operational Themes',
      'Customer Verbatim Remarks'
    ];

    const rows = filtered.map(item => [
      `"${(item.id || '').replace(/"/g, '""')}"`,
      `"${(item.customerName || '').replace(/"/g, '""')}"`,
      `"${(item.customerTier || '').replace(/"/g, '""')}"`,
      `"${(item.department || '').replace(/"/g, '""')}"`,
      `"${(item.channel || '').replace(/"/g, '""')}"`,
      `"${(item.loanProduct || '').replace(/"/g, '""')}"`,
      `"${(item.loanAmount || '').replace(/"/g, '""')}"`,
      `"${(item.date || '').replace(/"/g, '""')}"`,
      `"${(item.sentiment || '').replace(/"/g, '""')}"`,
      item.sentimentScore ?? '',
      `"${(item.npsCategory || '').replace(/"/g, '""')}"`,
      item.npsScore ?? '',
      item.csatScore ?? '',
      item.cesScore ?? '',
      `"${(item.urgency || '').replace(/"/g, '""')}"`,
      item.churnRisk ? 'TRUE' : 'FALSE',
      `"${(item.status || '').replace(/"/g, '""')}"`,
      `"${(item.actionOwner || '').replace(/"/g, '""')}"`,
      `"${(Array.isArray(item.themes) ? item.themes.join('; ') : (item.themes || '')).replace(/"/g, '""')}"`,
      `"${(item.qualitativeText || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Rosabon_Customer_Voices_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportNotice(`Successfully exported ${filtered.length} customer records to CSV! File downloaded.`);
    setTimeout(() => setExportNotice(''), 4500);
  };

  // INDIVIDUAL ROW DELETION HANDLER
  const handleDeleteCard = (e, item) => {
    e.stopPropagation();
    if (window.confirm(`Delete transaction row "${item.id} - ${item.customerName}"?\n\nLoan Product: ${item.loanProduct}\nExposure: ${item.loanAmount}\n\nThis record will be permanently purged from the VoC repository.`)) {
      if (onDeleteItem) {
        onDeleteItem(item.id);
      }
      setExportNotice(`Record ${item.id} (${item.customerName}) removed successfully.`);
      setTimeout(() => setExportNotice(''), 4000);
    }
  };

  // DRAWER ROW DELETION HANDLER
  const handleDeleteFromDrawer = () => {
    if (!selectedItem) return;
    if (window.confirm(`Delete transaction row "${selectedItem.id} - ${selectedItem.customerName}"?\n\nThis row will be purged from the VoC repository.`)) {
      const id = selectedItem.id;
      const name = selectedItem.customerName;
      if (onDeleteItem) {
        onDeleteItem(id);
      }
      if (onCloseDrawer) {
        onCloseDrawer();
      }
      setExportNotice(`Record ${id} (${name}) removed successfully.`);
      setTimeout(() => setExportNotice(''), 4000);
    }
  };

  return (
    <div className="animate-module" style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}>
      
      {/* Module Title & Explorer Mode Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Layers size={14} /> Module 2: Customer Voices & Research Studio
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            Customer Intelligence & Research Hub
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Browse verbatim customer feedback, benchmark competitor defection risks, or inspect borrower personas.
          </p>
        </div>

        {/* 3 Research Sub-tabs */}
        <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--bg-surface-elevated)', padding: '0.3rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => setExplorerTab('verbatims')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              border: 'none',
              background: explorerTab === 'verbatims' ? 'var(--accent-primary)' : 'transparent',
              color: explorerTab === 'verbatims' ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '0.775rem',
              fontWeight: explorerTab === 'verbatims' ? 700 : 500,
              cursor: 'pointer'
            }}
          >
            <MessageSquare size={14} /> Customer Verbatims
          </button>

          <button
            onClick={() => setExplorerTab('competitor')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              border: 'none',
              background: explorerTab === 'competitor' ? 'var(--accent-primary)' : 'transparent',
              color: explorerTab === 'competitor' ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '0.775rem',
              fontWeight: explorerTab === 'competitor' ? 700 : 500,
              cursor: 'pointer'
            }}
          >
            <Zap size={14} /> Competitor Radar (Opt. A)
          </button>

          <button
            onClick={() => setExplorerTab('personas')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              border: 'none',
              background: explorerTab === 'personas' ? 'var(--accent-primary)' : 'transparent',
              color: explorerTab === 'personas' ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '0.775rem',
              fontWeight: explorerTab === 'personas' ? 700 : 500,
              cursor: 'pointer'
            }}
          >
            <Brain size={14} /> Borrower Personas (Opt. B)
          </button>

          <button
            onClick={() => setExplorerTab('strategies')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              border: 'none',
              background: explorerTab === 'strategies' ? 'var(--accent-primary)' : 'transparent',
              color: explorerTab === 'strategies' ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '0.775rem',
              fontWeight: explorerTab === 'strategies' ? 700 : 500,
              cursor: 'pointer'
            }}
          >
            <Target size={14} /> Product Growth & Churn
          </button>

          <button
            onClick={() => setExplorerTab('adaptive')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              border: 'none',
              background: explorerTab === 'adaptive' ? 'var(--accent-primary)' : 'transparent',
              color: explorerTab === 'adaptive' ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '0.775rem',
              fontWeight: explorerTab === 'adaptive' ? 700 : 500,
              cursor: 'pointer'
            }}
          >
            <Sparkles size={14} /> Adaptive Learner & Solutions
          </button>
        </div>
      </div>

      {/* VIEW 1: CUSTOMER VERBATIMS */}
      {explorerTab === 'verbatims' && (
        <>
          {/* Clean Search & Filter Bar */}
          <div className="module-card" style={{ padding: '1.25rem' }}>
            
            {/* Search Input */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px' }} />
              <input
                type="text"
                placeholder="Search by customer name, quote verbatim, or loan product..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-clean"
                style={{ paddingLeft: '40px', height: '44px' }}
              />
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  style={{ position: 'absolute', right: '14px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Department Filter Chips */}
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {DEPARTMENTS.map(d => {
                const isSelected = deptFilter === d.id;
                const count = d.id === 'all' 
                  ? vocData.length 
                  : vocData.filter(v => v.department === d.id).length;

                return (
                  <button
                    key={d.id}
                    onClick={() => setDeptFilter(d.id)}
                    style={{
                      background: isSelected ? 'var(--accent-primary)' : 'var(--bg-surface-elevated)',
                      color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                      border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                      borderRadius: '20px',
                      padding: '0.35rem 0.8rem',
                      fontSize: '0.75rem',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <span>{d.name}</span>
                    <span style={{ 
                      background: isSelected ? 'rgba(0,0,0,0.25)' : 'var(--bg-surface-subtle)', 
                      padding: '0.1rem 0.4rem', 
                      borderRadius: '10px', 
                      fontSize: '0.65rem' 
                    }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Secondary Clean Toggles */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
              
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>Sentiment:</span>
                {['all', 'Positive', 'Neutral', 'Negative'].map(s => (
                  <button
                    key={s}
                    onClick={() => setSentimentFilter(s)}
                    style={{
                      background: sentimentFilter === s ? 'var(--bg-surface-elevated)' : 'transparent',
                      color: sentimentFilter === s ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      border: sentimentFilter === s ? '1px solid var(--accent-primary)' : 'none',
                      borderRadius: '4px',
                      padding: '0.2rem 0.5rem',
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    {s === 'all' ? 'All' : s}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>Product:</span>
                <select
                  value={productFilter}
                  onChange={e => {
                    setProductFilter(e.target.value);
                    if (onChangeProduct) onChangeProduct(e.target.value);
                  }}
                  style={{
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem'
                  }}
                >
                  <option value="all">All Products ({availableProducts.length})</option>
                  {availableProducts.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div style={{ width: '1px', height: '16px', background: 'var(--border-subtle)' }} />

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', color: churnFilter ? 'var(--accent-rose)' : 'var(--text-secondary)' }}>
                <input
                  type="checkbox"
                  checked={churnFilter}
                  onChange={e => setChurnFilter(e.target.checked)}
                  style={{ width: '15px', height: '15px' }}
                />
                <span>Show Churn Risks Only</span>
              </label>

              {/* Action Buttons: Export CSV + Clear All + Restore Defaults */}
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <button 
                  className="btn-clean btn-clean-secondary"
                  onClick={handleExportCsv}
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}
                  title="Download filtered records as CSV spreadsheet"
                >
                  <Download size={13} /> Export CSV ({filtered.length})
                </button>

                {vocData.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to clear ALL ${vocData.length} records in the app?\n\nThis will reset your repository to a blank state (0 rows). You can re-import or restore sample records anytime.`)) {
                        if (onClearAll) onClearAll();
                        setExportNotice('Workspace cleared. All transactions removed.');
                        setTimeout(() => setExportNotice(''), 4000);
                      }
                    }}
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: 'var(--accent-rose)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '6px',
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      cursor: 'pointer'
                    }}
                    title="Clear all transaction rows across the app"
                  >
                    <Trash2 size={13} /> Clear All ({vocData.length})
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (onRestoreSamples) onRestoreSamples();
                      setExportNotice('Restored 10 default Rosabon benchmark records.');
                      setTimeout(() => setExportNotice(''), 4000);
                    }}
                    style={{
                      background: 'rgba(16, 185, 129, 0.12)',
                      color: 'var(--accent-emerald)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '6px',
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      cursor: 'pointer'
                    }}
                    title="Restore default sample records"
                  >
                    <RotateCcw size={13} /> Restore Defaults (10)
                  </button>
                )}
              </div>
            </div>

            {exportNotice && (
              <div style={{ 
                background: exportNotice.includes('removed') || exportNotice.includes('cleared') 
                  ? 'rgba(239, 68, 68, 0.12)' 
                  : 'rgba(16, 185, 129, 0.12)', 
                border: `1px solid ${exportNotice.includes('removed') || exportNotice.includes('cleared') ? 'var(--accent-rose)' : 'var(--accent-teal)'}`, 
                color: exportNotice.includes('removed') || exportNotice.includes('cleared') ? 'var(--accent-rose)' : 'var(--accent-teal)', 
                padding: '0.5rem 0.75rem', 
                borderRadius: '6px', 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.4rem', 
                marginTop: '0.5rem' 
              }}>
                <CheckCircle2 size={14} /> {exportNotice}
              </div>
            )}

          </div>

          {/* Feedback Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', padding: '0 0.25rem' }}>
              <span>Showing <strong>{filtered.length}</strong> feedback records</span>
              <span>Click any card to inspect root causes & assign action</span>
            </div>

            {filtered.length === 0 ? (
              <div className="module-card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                  <Layers size={24} color="var(--accent-primary)" />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  {vocData.length === 0 ? 'Workspace is Empty (0 Records)' : 'No Matching Feedback Found'}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '440px', margin: '0 auto 1.25rem auto' }}>
                  {vocData.length === 0 
                    ? 'All transactions have been cleared. You have a clean slate! You can log new notes in Intake, drag & drop an Excel/CSV file, or restore default sample records.'
                    : 'No feedback matched your active search and filter selection. Try resetting filters or searching another keyword.'
                  }
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {vocData.length === 0 ? (
                    <>
                      <button 
                        className="btn-clean btn-clean-primary"
                        onClick={onNavigateToCapture}
                        style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                      >
                        <Plus size={14} /> Intake / Upload CSV
                      </button>
                      <button 
                        className="btn-clean btn-clean-secondary"
                        onClick={() => {
                          if (onRestoreSamples) onRestoreSamples();
                          setExportNotice('Restored 10 default Rosabon VoC records.');
                          setTimeout(() => setExportNotice(''), 4000);
                        }}
                        style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                      >
                        <RotateCcw size={14} /> Restore Sample Benchmark Records
                      </button>
                    </>
                  ) : (
                    <button 
                      className="btn-clean btn-clean-secondary"
                      onClick={() => { setSearch(''); setDeptFilter('all'); setSentimentFilter('all'); setChurnFilter(false); setProductFilter('all'); }}
                      style={{ fontSize: '0.8rem' }}
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>
            ) : (
              filtered.map(item => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectItem(item)}
                    style={{
                      background: isSelected ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                      border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      borderLeft: `4px solid ${
                        item.sentiment === 'Positive' ? 'var(--accent-emerald)' : item.sentiment === 'Neutral' ? 'var(--accent-amber)' : 'var(--accent-rose)'
                      }`
                    }}
                  >
                    {/* Top Row: Customer Name, Exposure, Badges */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                            {item.customerName}
                          </strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>•</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.customerTier}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem', fontSize: '0.75rem' }}>
                          <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{item.loanProduct}</span>
                          <span style={{ color: 'var(--text-muted)' }}>•</span>
                          <span style={{ color: 'var(--text-primary)' }}>Exposure: <strong>{item.loanAmount}</strong></span>
                          <span style={{ color: 'var(--text-muted)' }}>•</span>
                          <span style={{ color: 'var(--text-secondary)' }}>Channel: {item.channel}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                        {item.churnRisk && (
                          <span className="badge-clean badge-red">
                            <AlertTriangle size={12} /> Flight Risk
                          </span>
                        )}
                        <span className={`badge-clean ${
                          item.sentiment === 'Positive' ? 'badge-green' : item.sentiment === 'Neutral' ? 'badge-yellow' : 'badge-red'
                        }`}>
                          {item.sentiment}
                        </span>
                        <span className="badge-clean badge-blue">
                          NPS {item.npsScore}/10
                        </span>

                        {/* Delete Single Row Button */}
                        <button
                          type="button"
                          onClick={(e) => handleDeleteCard(e, item)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.08)',
                            border: '1px solid rgba(239, 68, 68, 0.25)',
                            color: 'var(--accent-rose)',
                            borderRadius: '6px',
                            padding: '0.2rem 0.5rem',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            cursor: 'pointer',
                            marginLeft: '0.25rem',
                            transition: 'all 0.15s ease'
                          }}
                          title="Delete this transaction row permanently"
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'var(--accent-rose)';
                            e.currentTarget.style.color = '#ffffff';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)';
                            e.currentTarget.style.color = 'var(--accent-rose)';
                          }}
                        >
                          <Trash2 size={12} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Verbatim Quote Box */}
                    <p style={{
                      marginTop: '0.75rem',
                      fontSize: '0.85rem',
                      color: 'var(--text-primary)',
                      lineHeight: '1.5',
                      background: 'var(--bg-app)',
                      padding: '0.75rem 1rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      "{item.qualitativeText}"
                    </p>

                    {/* Footer thematic tags & assigned owner */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                        {item.themes.map(t => (
                          <span key={t} style={{
                            background: 'var(--bg-surface-elevated)',
                            color: 'var(--text-secondary)',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            border: '1px solid var(--border-subtle)'
                          }}>
                            #{t}
                          </span>
                        ))}
                      </div>

                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Action Owner: <strong style={{ color: 'var(--text-primary)' }}>{item.actionOwner}</strong>
                      </div>
                    </div>

                  </div>
                );
              })
            )}

          </div>
        </>
      )}

      {/* VIEW 2: COMPETITOR INTELLIGENCE RADAR (OPTION A) */}
      {explorerTab === 'competitor' && (
        <CompetitorRadar onNavigateToVerbatims={() => setExplorerTab('verbatims')} />
      )}

      {/* VIEW 3: BORROWER PERSONAS STUDIO (OPTION B) */}
      {explorerTab === 'personas' && (
        <PersonaStudio onSelectCustomerCase={() => setExplorerTab('verbatims')} />
      )}

      {/* VIEW 4: PRODUCT GROWTH & CHURN DEFENSE ENGINE */}
      {explorerTab === 'strategies' && (
        <ProductStrategyHub />
      )}

      {/* VIEW 5: ADAPTIVE LEARNER & ONLINE SOLUTIONS ENGINE */}
      {explorerTab === 'adaptive' && (
        <AdaptiveLearnerHub 
          vocData={vocData} 
          onNavigateToCapture={onNavigateToCapture} 
          onNavigateToReports={onNavigateToReports} 
        />
      )}

      {/* SLIDE-OUT DETAIL DRAWER */}
      {selectedItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '500px',
          maxWidth: '90vw',
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-floating)',
          zIndex: 100,
          padding: '2rem 1.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                {selectedItem.id} • Root Cause Analysis
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {selectedItem.customerName}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {selectedItem.customerTier}
              </p>
            </div>

            <button 
              onClick={onCloseDrawer}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          {selectedItem.churnRisk && (
            <div style={{
              background: 'rgba(244, 63, 94, 0.12)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: '8px',
              padding: '0.75rem',
              color: 'var(--accent-rose)',
              fontSize: '0.8rem',
              display: 'flex',
              gap: '0.5rem'
            }}>
              <AlertTriangle size={16} color="var(--accent-rose)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Flight Risk Alert:</strong> Client signaling immediate defection if appraisal delay or fee dispute is not addressed.</span>
            </div>
          )}

          <div style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Full Verbatim Remark:
            </span>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', marginTop: '0.4rem', lineHeight: '1.5' }}>
              "{selectedItem.qualitativeText}"
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem' }}>
            <div style={{ background: 'var(--bg-app)', padding: '0.75rem', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Loan Product:</span>
              <div style={{ color: 'var(--accent-primary)', fontWeight: 600, marginTop: '0.2rem' }}>{selectedItem.loanProduct}</div>
            </div>
            <div style={{ background: 'var(--bg-app)', padding: '0.75rem', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Exposure:</span>
              <div style={{ color: 'var(--accent-emerald)', fontWeight: 700, marginTop: '0.2rem' }}>{selectedItem.loanAmount}</div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
              Action Escalation & Record Management:
            </span>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span>Assigned Lead:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{selectedItem.actionOwner}</strong>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn-clean btn-clean-primary"
                onClick={() => { alert(`Escalated ${selectedItem.id} to ${selectedItem.actionOwner}.`); onCloseDrawer(); }}
                style={{ flex: 1, fontSize: '0.8rem' }}
              >
                Escalate to Action Lead
              </button>
              <button 
                type="button"
                onClick={handleDeleteFromDrawer}
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: 'var(--accent-rose)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '6px',
                  padding: '0.55rem 0.85rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                title="Delete this transaction row permanently"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

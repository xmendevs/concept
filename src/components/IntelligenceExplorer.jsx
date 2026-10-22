import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Layers, 
  AlertTriangle, 
  Smile, 
  Frown, 
  Meh, 
  Download, 
  CheckCircle2, 
  ArrowRight, 
  User, 
  Building, 
  Tag, 
  Calendar,
  X
} from 'lucide-react';
import { DEPARTMENTS, ROSABON_PRODUCTS, THEMES } from '../data/mockData';

export default function IntelligenceExplorer({ 
  vocData, 
  selectedItem, 
  onSelectItem, 
  onCloseDrawer 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [selectedSentiment, setSelectedSentiment] = useState('all');
  const [churnOnly, setChurnOnly] = useState(false);

  // Filter Logic
  const filteredData = vocData.filter(item => {
    // Dept filter
    if (selectedDept !== 'all' && item.department !== selectedDept) return false;
    // Product filter
    if (selectedProduct !== 'all' && item.loanProduct !== selectedProduct) return false;
    // Sentiment filter
    if (selectedSentiment !== 'all' && item.sentiment !== selectedSentiment) return false;
    // Churn filter
    if (churnOnly && !item.churnRisk) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.customerName.toLowerCase().includes(q);
      const matchText = item.qualitativeText.toLowerCase().includes(q);
      const matchChannel = item.channel.toLowerCase().includes(q);
      const matchThemes = item.themes.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchText && !matchChannel && !matchThemes) return false;
    }

    return true;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}>
      
      {/* Top Filter & Search Controls */}
      <div className="card" style={{ padding: '1.25rem' }}>
        
        {/* Search Bar */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ 
            flex: '1 1 300px', 
            position: 'relative', 
            display: 'flex', 
            alignItems: 'center' 
          }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px' }} />
            <input
              type="text"
              placeholder="Search across qualitative feedback, verbatims, client names, or themes..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', paddingLeft: '38px', height: '42px' }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Product Filter */}
          <select 
            value={selectedProduct}
            onChange={e => setSelectedProduct(e.target.value)}
            style={{ height: '42px' }}
          >
            <option value="all">All Rosabon Products</option>
            {ROSABON_PRODUCTS.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          {/* Sentiment Filter */}
          <select 
            value={selectedSentiment}
            onChange={e => setSelectedSentiment(e.target.value)}
            style={{ height: '42px' }}
          >
            <option value="all">All Sentiments</option>
            <option value="Positive">Positive Only</option>
            <option value="Neutral">Neutral Only</option>
            <option value="Negative">Negative Only</option>
          </select>

          {/* Churn Risk Filter */}
          <button
            onClick={() => setChurnOnly(!churnOnly)}
            className="btn"
            style={{
              background: churnOnly ? 'rgba(239, 68, 68, 0.25)' : '#1e293b',
              color: churnOnly ? '#f87171' : '#94a3b8',
              borderColor: churnOnly ? '#ef4444' : '#334155',
              height: '42px',
              fontSize: '0.8rem'
            }}
          >
            <AlertTriangle size={16} color={churnOnly ? '#f87171' : '#94a3b8'} />
            {churnOnly ? 'Showing Churn Risks Only' : 'Filter Churn Risks'}
          </button>

          {/* Export Filtered */}
          <button 
            className="btn btn-secondary"
            onClick={() => alert(`Exported ${filteredData.length} records to Rosabon_VoC_Filtered_Intelligence.csv`)}
            style={{ height: '42px', fontSize: '0.8rem' }}
          >
            <Download size={15} /> Export CSV ({filteredData.length})
          </button>
        </div>

        {/* Department Filter Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {DEPARTMENTS.map(dept => {
            const isSelected = selectedDept === dept.id;
            const count = dept.id === 'all' 
              ? vocData.length 
              : vocData.filter(d => d.department === dept.id).length;

            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                style={{
                  background: isSelected ? 'rgba(59, 130, 246, 0.2)' : '#1a2234',
                  color: isSelected ? '#60a5fa' : '#94a3b8',
                  border: isSelected ? '1px solid #3b82f6' : '1px solid #283548',
                  borderRadius: '20px',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.75rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  whiteSpace: 'nowrap'
                }}
              >
                {dept.name}
                <span style={{ 
                  background: isSelected ? '#3b82f6' : '#283548', 
                  color: isSelected ? '#ffffff' : '#94a3b8', 
                  padding: '0.1rem 0.45rem', 
                  borderRadius: '10px', 
                  fontSize: '0.65rem' 
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Main VoC Record Feed / Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Showing <strong>{filteredData.length}</strong> customer intelligence verbatims
          </span>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Click any record to inspect root cause & assign action
          </span>
        </div>

        {filteredData.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No feedback records matched your filter criteria.</p>
            <button 
              className="btn btn-secondary" 
              onClick={() => { setSearchQuery(''); setSelectedDept('all'); setSelectedProduct('all'); setSelectedSentiment('all'); setChurnOnly(false); }}
              style={{ marginTop: '1rem', fontSize: '0.8rem' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredData.map(item => {
            const isSelected = selectedItem?.id === item.id;
            return (
              <div 
                key={item.id}
                className="card card-interactive"
                onClick={() => onSelectItem(item)}
                style={{
                  padding: '1.1rem 1.25rem',
                  borderColor: isSelected ? '#3b82f6' : item.churnRisk ? 'rgba(239, 68, 68, 0.4)' : '#283548',
                  background: isSelected ? '#172033' : '#111827',
                  borderLeft: `4px solid ${
                    item.sentiment === 'Positive' ? '#10b981' : item.sentiment === 'Neutral' ? '#f59e0b' : '#ef4444'
                  }`
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', fontWeight: 600 }}>
                      {item.id}
                    </span>
                    <strong style={{ fontSize: '0.95rem', color: '#f8fafc' }}>
                      {item.customerName}
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>•</span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {item.customerTier}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {item.churnRisk && (
                      <span className="badge badge-rose">
                        <AlertTriangle size={12} /> Flight Risk
                      </span>
                    )}

                    <span className={`badge ${
                      item.sentiment === 'Positive' ? 'badge-emerald' : item.sentiment === 'Neutral' ? 'badge-amber' : 'badge-rose'
                    }`}>
                      {item.sentiment === 'Positive' && <Smile size={12} />}
                      {item.sentiment === 'Neutral' && <Meh size={12} />}
                      {item.sentiment === 'Negative' && <Frown size={12} />}
                      {item.sentiment}
                    </span>

                    <span className="badge badge-indigo">
                      NPS {item.npsScore}/10 ({item.npsCategory})
                    </span>
                  </div>
                </div>

                {/* Sub details */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.35rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                  <span style={{ color: '#60a5fa', fontWeight: 600 }}>{item.loanProduct}</span>
                  <span>•</span>
                  <span>Exposure: <strong style={{ color: '#f1f5f9' }}>{item.loanAmount}</strong></span>
                  <span>•</span>
                  <span>Channel: {item.channel}</span>
                  <span>•</span>
                  <span>Date: {item.date}</span>
                </div>

                {/* Verbatim quote */}
                <p style={{ 
                  marginTop: '0.65rem', 
                  fontSize: '0.85rem', 
                  color: '#e2e8f0', 
                  lineHeight: '1.45', 
                  background: '#0d131f', 
                  padding: '0.65rem 0.85rem', 
                  borderRadius: '6px',
                  border: '1px solid #1e293b'
                }}>
                  "{item.qualitativeText}"
                </p>

                {/* Footer thematic tags */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {item.themes.map(t => (
                      <span key={t} style={{ 
                        background: '#1e293b', 
                        color: '#cbd5e1', 
                        fontSize: '0.7rem', 
                        padding: '0.2rem 0.5rem', 
                        borderRadius: '4px',
                        border: '1px solid #334155'
                      }}>
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                    <span>Owner: <strong style={{ color: '#f8fafc' }}>{item.actionOwner}</strong></span>
                    <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>{item.status}</span>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* DETAIL INSPECTION DRAWER / MODAL */}
      {selectedItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '540px',
          maxWidth: '90vw',
          background: '#0f172a',
          borderLeft: '1px solid #334155',
          boxShadow: '-10px 0 35px rgba(0,0,0,0.6)',
          zIndex: 100,
          padding: '2rem 1.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>
                {selectedItem.id} • Root Cause Analysis
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
                {selectedItem.customerName}
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                {selectedItem.customerTier}
              </p>
            </div>
            <button 
              onClick={onCloseDrawer}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.25rem' }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Alert if flight risk */}
          {selectedItem.churnRisk && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '8px',
              padding: '0.75rem',
              color: '#fca5a5',
              fontSize: '0.8rem',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center'
            }}>
              <AlertTriangle size={18} color="#f87171" style={{ flexShrink: 0 }} />
              <span><strong>Flight Risk Escalation:</strong> Customer threatened account liquidation or legal escalation if not addressed promptly.</span>
            </div>
          )}

          {/* Verbatim Section */}
          <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', border: '1px solid #334155' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
              Full Verbatim Transcript / Note:
            </span>
            <p style={{ fontSize: '0.9rem', color: '#f8fafc', marginTop: '0.5rem', lineHeight: '1.5', fontStyle: 'italic' }}>
              "{selectedItem.qualitativeText}"
            </p>
          </div>

          {/* Credit & Exposure Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div style={{ background: '#111827', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1f2937' }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Rosabon Product:</span>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#60a5fa', marginTop: '0.2rem' }}>
                {selectedItem.loanProduct}
              </div>
            </div>

            <div style={{ background: '#111827', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1f2937' }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Portfolio Exposure:</span>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399', marginTop: '0.2rem' }}>
                {selectedItem.loanAmount}
              </div>
            </div>

            <div style={{ background: '#111827', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1f2937' }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Touchpoint Channel:</span>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', marginTop: '0.2rem' }}>
                {selectedItem.channel}
              </div>
            </div>

            <div style={{ background: '#111827', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1f2937' }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Feedback Timestamp:</span>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', marginTop: '0.2rem' }}>
                {selectedItem.date}
              </div>
            </div>
          </div>

          {/* CX Metrics Diagnostic */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
            <div style={{ background: '#111827', padding: '0.75rem', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>NPS Score</span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: selectedItem.npsScore >= 9 ? '#34d399' : '#f87171' }}>
                {selectedItem.npsScore} / 10
              </div>
              <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{selectedItem.npsCategory}</span>
            </div>

            <div style={{ background: '#111827', padding: '0.75rem', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>CSAT Rating</span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#60a5fa' }}>
                {selectedItem.csatScore} / 5
              </div>
              <span style={{ fontSize: '0.65rem', color: '#64748b' }}>Satisfaction</span>
            </div>

            <div style={{ background: '#111827', padding: '0.75rem', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>CES Score</span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: selectedItem.cesScore > 4 ? '#fbbf24' : '#34d399' }}>
                {selectedItem.cesScore} / 7
              </div>
              <span style={{ fontSize: '0.65rem', color: '#64748b' }}>Effort Level</span>
            </div>
          </div>

          {/* Action Ownership & Cross-Functional Hand-off */}
          <div style={{ background: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1f2937' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: '0.5rem' }}>
              Cross-Functional Action Hand-off:
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Assigned Business Unit Lead:</span>
                <strong style={{ color: '#f8fafc' }}>{selectedItem.actionOwner}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Intelligence Status:</span>
                <span className="badge badge-emerald">{selectedItem.status}</span>
              </div>
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn btn-primary"
                onClick={() => alert(`Escalated ${selectedItem.id} to ${selectedItem.actionOwner} with 24-hour turnaround notice.`)}
                style={{ flex: 1, fontSize: '0.8rem' }}
              >
                Escalate to Action Owner
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => alert(`Drafting 1-page intelligence memo for ${selectedItem.customerName}`)}
                style={{ fontSize: '0.8rem' }}
              >
                Draft Memo
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

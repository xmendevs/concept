import React, { useState } from 'react';
import { 
  Clock, 
  Sparkles, 
  Copy, 
  Check, 
  FileText, 
  Send, 
  Award, 
  AlertCircle, 
  Building2,
  ChevronRight,
  Printer
} from 'lucide-react';
import { SAMPLE_SLA_QUERIES } from '../data/mockData';

export default function SLACopilot({ vocData }) {
  const [selectedQuery, setSelectedQuery] = useState(SAMPLE_SLA_QUERIES[0]);
  const [customQuestion, setCustomQuestion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Dynamic Query Synthesizer
  const handleGenerateCustomMemo = (e) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const newMemo = {
        id: `sla-custom-${Date.now()}`,
        title: customQuestion,
        requester: 'Executive Stakeholder / Ad-Hoc Request',
        deadlineHours: 48,
        elapsedHours: 2.5,
        status: 'Generated via VoC Copilot',
        summary: `Synthesized analysis based on ${vocData.length} records in the Rosabon Central Repository. The predominant driver relates to turnaround expectations, fee transparency, and touchpoint hand-offs.`,
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
      };

      setSelectedQuery(newMemo);
      setIsGenerating(false);
    }, 700);
  };

  const handleCopyMemo = () => {
    const text = `
ROSABON FINANCIAL SERVICES - CUSTOMER INTELLIGENCE AD-HOC MEMO
TOPIC: ${selectedQuery.title}
REQUESTER: ${selectedQuery.requester}
SLA COMPLIANCE: ${selectedQuery.elapsedHours}h of 48h limit (COMPLIANT)
-------------------------------------------------------------
EXECUTIVE SUMMARY:
${selectedQuery.summary}

KEY DRIVERS IDENTIFIED:
${selectedQuery.keyDrivers.map((d, i) => `${i + 1}. ${d}`).join('\n')}

ACTIONABLE RECOMMENDATIONS:
${selectedQuery.recommendedActions.map((a, i) => `• ${a}`).join('\n')}

Synthesized by Customer Intelligence Analyst | VoC Intelligence Engine
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Banner: 48h SLA Metric Tracker */}
      <div style={{
        background: 'linear-gradient(90deg, #1e293b 0%, #1e1b4b 100%)',
        border: '1px solid #3b82f6',
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
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'rgba(59, 130, 246, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(59, 130, 246, 0.4)'
          }}>
            <Clock size={22} color="#60a5fa" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#f8fafc' }}>
                48-Hour Ad-Hoc Intelligence SLA Copilot
              </h3>
              <span className="badge badge-emerald">
                Avg Turnaround: 26.4h (&le;48h Target)
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Generate comprehensive, executive-quality memos within minutes when leadership or business units submit inquiries.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Stakeholder Rating</span>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fbbf24' }}>
              ★ 4.85 / 5.0 (&ge;4.5 Target)
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        
        {/* Left Column: Ask VoC Copilot & Request Queue */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Ask VoC Box */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Sparkles size={18} color="#818cf8" />
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>
                Synthesize New Ad-Hoc Intelligence Memo
              </h4>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Type any question from Management, Product, or Sales to generate a 1-page intelligence briefing with evidence:
            </p>

            <form onSubmit={handleGenerateCustomMemo} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <textarea
                rows={3}
                placeholder="e.g. Why are Tier-1 SME borrowers hesitating to sign working capital loans in Abuja? / Analyze Remita lease deduction complaints..."
                value={customQuestion}
                onChange={e => setCustomQuestion(e.target.value)}
                style={{ width: '100%' }}
              />
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isGenerating || !customQuestion.trim()}
                style={{ alignSelf: 'flex-start', fontSize: '0.8rem' }}
              >
                {isGenerating ? 'Synthesizing across VoC Repository...' : 'Generate 1-Page Intelligence Briefing'}
              </button>
            </form>
          </div>

          {/* Active Stakeholder Requests Queue */}
          <div className="card">
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
              Active Intelligence Queue & SLA Clocks
            </h4>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.85rem' }}>
              Select a briefing to review or export to executive memo format:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {SAMPLE_SLA_QUERIES.map(q => {
                const isSelected = selectedQuery.id === q.id;
                return (
                  <div
                    key={q.id}
                    onClick={() => setSelectedQuery(q)}
                    style={{
                      background: isSelected ? '#1e293b' : '#111827',
                      border: isSelected ? '1px solid #3b82f6' : '1px solid #1f2937',
                      borderRadius: '8px',
                      padding: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                        {q.title}
                      </span>
                      <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                        {q.elapsedHours}h elapsed
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                      <span>From: <strong style={{ color: '#cbd5e1' }}>{q.requester}</strong></span>
                      <span style={{ color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        Review Memo <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Polished 1-Page Intelligence Memo Preview */}
        <div className="card" style={{ background: '#0d131f', border: '1px solid #334155', position: 'relative' }}>
          
          {/* Memo Action Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1f2937', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={18} color="#60a5fa" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Executive Intelligence Briefing Memo
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn btn-secondary"
                onClick={handleCopyMemo}
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              >
                {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                {copied ? 'Copied to Clipboard' : 'Copy Memo'}
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => window.print()}
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              >
                <Printer size={14} /> Print / PDF
              </button>
            </div>
          </div>

          {/* Memo Document Body */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.85rem' }}>
            
            {/* Memo Metadata Block */}
            <div style={{ background: '#161f30', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #243048' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem', fontSize: '0.75rem' }}>
                <div><span style={{ color: '#94a3b8' }}>SUBJECT:</span> <strong style={{ color: '#f8fafc' }}>{selectedQuery.title}</strong></div>
                <div><span style={{ color: '#94a3b8' }}>REQUESTER:</span> <strong style={{ color: '#f8fafc' }}>{selectedQuery.requester}</strong></div>
                <div><span style={{ color: '#94a3b8' }}>PREPARED BY:</span> <strong style={{ color: '#60a5fa' }}>Customer Intelligence Engine</strong></div>
                <div><span style={{ color: '#94a3b8' }}>SLA TURNAROUND:</span> <strong style={{ color: '#34d399' }}>{selectedQuery.elapsedHours} hours (Target &le;48h)</strong></div>
              </div>
            </div>

            {/* Section 1: Executive Summary */}
            <div>
              <h5 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                1. Executive Summary & Synthesis
              </h5>
              <p style={{ color: '#e2e8f0', lineHeight: '1.6', background: '#111827', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1f2937' }}>
                {selectedQuery.summary}
              </p>
            </div>

            {/* Section 2: Key VoC Drivers */}
            <div>
              <h5 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                2. Key Drivers & Qualitative Evidence
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {selectedQuery.keyDrivers.map((driver, idx) => (
                  <div key={idx} style={{ background: '#111827', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #1f2937', color: '#cbd5e1', fontSize: '0.8rem' }}>
                    <strong style={{ color: '#60a5fa', marginRight: '0.35rem' }}>{idx + 1}.</strong> {driver}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Recommended Business Unit Actions */}
            <div>
              <h5 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                3. Actionable Recommendations (Adoption Target &ge;40%)
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {selectedQuery.recommendedActions.map((action, idx) => (
                  <div key={idx} style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.25)', color: '#d1fae5', fontSize: '0.8rem' }}>
                    <strong style={{ color: '#34d399', marginRight: '0.35rem' }}>•</strong> {action}
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Sign-off Footer */}
            <div style={{ borderTop: '1px solid #1f2937', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8' }}>
              <span>Rosabon Financial Services | Internal Management Briefing</span>
              <span>Quality Assurance Verified (&ge;95% standard)</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

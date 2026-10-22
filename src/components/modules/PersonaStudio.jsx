import React, { useState } from 'react';
import { 
  Users, 
  Brain, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  DollarSign
} from 'lucide-react';
import { BORROWER_PERSONAS } from '../../data/mockData';

export default function PersonaStudio({ onSelectCustomerCase }) {
  const [selectedPersona, setSelectedPersona] = useState(BORROWER_PERSONAS[0]);

  return (
    <div className="animate-module" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Module Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Brain size={14} /> Psychographic & Behavioral Research
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            Rosabon Borrower & Investor Personas Studio
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Segmenting customer motivations, financial decision-making patterns, and friction thresholds across Rosabon lines.
          </p>
        </div>

        <span className="badge-clean badge-blue" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}>
          4 Core Financial Archetypes
        </span>
      </div>

      {/* Persona Selector Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
        {BORROWER_PERSONAS.map(p => {
          const isSelected = selectedPersona.id === p.id;
          return (
            <div
              key={p.id}
              onClick={() => setSelectedPersona(p)}
              style={{
                background: isSelected ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.7rem', color: isSelected ? 'var(--accent-primary)' : 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {p.archetype}
                </span>
                {isSelected && <span className="badge-clean badge-blue" style={{ fontSize: '0.65rem' }}>Active</span>}
              </div>

              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.35rem' }}>
                {p.name}
              </h4>
              <p style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Exposure: <strong style={{ color: 'var(--accent-emerald)' }}>{p.typicalExposure}</strong>
              </p>
            </div>
          );
        })}
      </div>

      {/* Selected Persona Deep Dive Card */}
      <div className="module-card" style={{ padding: '1.75rem', borderLeft: '4px solid var(--accent-primary)' }}>
        
        {/* Header Block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Deep-Dive Behavioral Profile
            </span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
              {selectedPersona.name}
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
              Primary Role: <strong>{selectedPersona.archetype}</strong> • Typical Exposure: <strong style={{ color: 'var(--accent-emerald)' }}>{selectedPersona.typicalExposure}</strong>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {selectedPersona.primaryProducts.map(prod => (
              <span key={prod} className="badge-clean badge-neutral" style={{ fontSize: '0.7rem' }}>
                {prod}
              </span>
            ))}
          </div>
        </div>

        {/* 4 Psychographic Dimensions Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          
          {/* 1. Motivations */}
          <div style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              <Target size={16} /> Core Financial Motivations
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {selectedPersona.coreMotivations}
            </p>
          </div>

          {/* 2. Decision Making Pattern */}
          <div style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              <Brain size={16} /> Decision-Making Logic & Sensitivity
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {selectedPersona.decisionMakingPattern}
            </p>
          </div>

          {/* 3. Friction Triggers */}
          <div style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-rose)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              <AlertTriangle size={16} /> High-Friction Churn Triggers
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {selectedPersona.frictionTriggers}
            </p>
          </div>

          {/* 4. Strategic Retention Playbook */}
          <div style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-amber)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              <Sparkles size={16} /> Recommended Retention Strategy
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: '1.5', fontWeight: 500 }}>
              {selectedPersona.retentionStrategy}
            </p>
          </div>

        </div>

        {/* Real Customer Case Reference */}
        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Linked Representative Case: <strong style={{ color: 'var(--text-primary)' }}>{selectedPersona.sampleCustomer}</strong>
          </div>
          <span className="badge-clean badge-green">Validated via VoC Repository</span>
        </div>

      </div>

    </div>
  );
}

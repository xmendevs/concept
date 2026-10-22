import React, { useState } from 'react';
import { 
  Building2, 
  Inbox, 
  Search, 
  FileText, 
  Target, 
  Plus, 
  Sun, 
  Moon, 
  Calendar, 
  RotateCcw,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { COMPANY_PROFILE } from '../data/mockData';

export default function Header({ 
  activeModule, 
  setActiveModule, 
  vocCount, 
  onQuickLog,
  theme,
  toggleTheme,
  activeMonth,
  availableMonths = ['October 2026', 'November 2026', 'December 2026', 'All Time'],
  onChangeMonth,
  onResetMonth,
  onRestoreSamples
}) {
  const [showMonthModal, setShowMonthModal] = useState(false);

  const modules = [
    { id: 'capture', label: '1. Capture & Intake', icon: Inbox },
    { id: 'explorer', label: '2. Customer Voices', icon: Search },
    { id: 'reports', label: '3. Executive Reports', icon: FileText },
    { id: 'tracker', label: '4. Actions & KPIs', icon: Target }
  ];

  return (
    <header className="no-print" style={{
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      transition: 'background-color 0.2s ease'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.85rem'
      }}>
        
        {/* Brand & Context */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)'
          }}>
            <Building2 size={18} color="#ffffff" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                {COMPANY_PROFILE.name}
              </span>
              <span style={{ fontSize: '0.65rem', background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-primary)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>
                VoC Platform
              </span>
            </div>
            <p style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
              Customer Intelligence Analyst • Succession Track
            </p>
          </div>
        </div>

        {/* 4 Sequential Modules */}
        <nav style={{
          display: 'flex',
          background: 'var(--bg-app)',
          padding: '0.25rem',
          borderRadius: '8px',
          border: '1px solid var(--border-subtle)',
          gap: '0.2rem'
        }}>
          {modules.map(mod => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.8rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: isActive ? 'var(--accent-primary)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '0.775rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={14} color={isActive ? '#ffffff' : 'var(--text-muted)'} />
                <span>{mod.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Month Cycle Manager, Light/Dark Toggle, Quick Log */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          
          {/* Active Cycle Button */}
          <button
            onClick={() => setShowMonthModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-primary)',
              padding: '0.4rem 0.65rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            title="Switch or reset monthly reporting cycle"
          >
            <Calendar size={13} color="var(--accent-primary)" />
            <span>{activeMonth}</span>
            <ChevronDown size={12} color="var(--text-muted)" />
          </button>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-primary)',
              padding: '0.4rem 0.65rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={14} color="#f59e0b" /> : <Moon size={14} color="#6366f1" />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>

          {/* Quick Log Action */}
          <button
            className="btn-clean btn-clean-primary"
            onClick={onQuickLog}
            style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}
          >
            <Plus size={14} /> Log Feedback
          </button>
        </div>

      </div>

      {/* MONTHLY CYCLE MANAGER MODAL */}
      {showMonthModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem'
        }}>
          <div className="module-card" style={{ maxWidth: '480px', width: '100%', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={18} color="var(--accent-primary)" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Monthly Reporting Cycle Manager
                </h3>
              </div>
              <button 
                onClick={() => setShowMonthModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.1rem' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Filter intelligence records by month or start a fresh reporting cycle for the new month.
            </p>

            {/* Select Active Month */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                Select Active Month View
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {availableMonths.map(m => {
                  const isCur = activeMonth === m;
                  return (
                    <button
                      key={m}
                      onClick={() => { onChangeMonth(m); setShowMonthModal(false); }}
                      style={{
                        padding: '0.55rem',
                        borderRadius: '6px',
                        border: isCur ? '1px solid var(--accent-primary)' : '1px solid var(--border-medium)',
                        background: isCur ? 'var(--bg-surface-elevated)' : 'var(--bg-app)',
                        color: isCur ? 'var(--accent-primary)' : 'var(--text-primary)',
                        fontWeight: isCur ? 700 : 500,
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      {m} {isCur && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset / New Month Actions */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Cycle Maintenance & Reset
              </span>

              <button
                className="btn-clean btn-clean-secondary"
                onClick={() => {
                  if (confirm(`Start a fresh cycle for next month? Current records will remain accessible under archive.`)) {
                    onResetMonth('November 2026');
                    setShowMonthModal(false);
                  }
                }}
                style={{ justifyContent: 'flex-start', fontSize: '0.775rem' }}
              >
                <Sparkles size={14} color="var(--accent-primary)" />
                Start Fresh Next Month (November 2026)
              </button>

              <button
                className="btn-clean btn-clean-secondary"
                onClick={() => {
                  if (confirm(`Clear all current month records to 0 for a clean test?`)) {
                    onResetMonth('Clear');
                    setShowMonthModal(false);
                  }
                }}
                style={{ justifyContent: 'flex-start', fontSize: '0.775rem', color: 'var(--accent-rose)' }}
              >
                <RotateCcw size={14} color="var(--accent-rose)" />
                Clear Current Month Records (Blank State)
              </button>

              <button
                className="btn-clean btn-clean-secondary"
                onClick={() => {
                  onRestoreSamples();
                  setShowMonthModal(false);
                }}
                style={{ justifyContent: 'flex-start', fontSize: '0.775rem', color: 'var(--accent-emerald)' }}
              >
                ✓ Restore Full Rosabon Sample Records (10 items)
              </button>
            </div>

          </div>
        </div>
      )}

    </header>
  );
}

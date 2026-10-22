import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Sparkles, 
  Search, 
  Globe, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  BookOpen, 
  ExternalLink, 
  Copy, 
  Check, 
  Zap, 
  Target, 
  ArrowRight,
  Plus,
  Sliders,
  Award
} from 'lucide-react';
import { 
  LEARNED_OPERATIONAL_PATTERNS, 
  DAILY_OPTIMIZATION_TASKS, 
  ONLINE_SOLUTIONS_KNOWLEDGE_BASE 
} from '../../data/mockData';

export default function AdaptiveLearnerHub({ vocData = [], onNavigateToCapture, onNavigateToReports }) {
  const [activeTab, setActiveTab] = useState('learning'); // 'learning' | 'online_solutions' | 'daily_optimizer'
  
  // Adaptive Learning State (stored in localStorage for persistent learning)
  const [learnedPatterns, setLearnedPatterns] = useState(() => {
    const saved = localStorage.getItem('rosabon_learned_patterns');
    return saved ? JSON.parse(saved) : LEARNED_OPERATIONAL_PATTERNS;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('rosabon_daily_tasks');
    return saved ? JSON.parse(saved) : DAILY_OPTIMIZATION_TASKS;
  });

  // Online Solutions Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [solutionCategory, setSolutionCategory] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [newInsightText, setNewInsightText] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');

  // Persist learning to localStorage
  useEffect(() => {
    localStorage.setItem('rosabon_learned_patterns', JSON.stringify(learnedPatterns));
  }, [learnedPatterns]);

  useEffect(() => {
    localStorage.setItem('rosabon_daily_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Toggle daily task status
  const toggleTaskStatus = (id) => {
    const updated = tasks.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: t.status === 'Completed' ? 'Ready' : 'Completed'
        };
      }
      return t;
    });
    setTasks(updated);
  };

  // Add new operational learning
  const handleAddLearning = (e) => {
    e.preventDefault();
    if (!newInsightText.trim()) return;

    const newPattern = {
      id: `learn-${Date.now()}`,
      domain: 'Analyst Operational Observation',
      patternIdentified: newInsightText,
      dataEvidence: `Logged from ${vocData.length} active customer intelligence records.`,
      learnedRule: `Prioritize pre-emptive outreach before day 5 of customer journey.`,
      confidenceScore: 88,
      impact: 'Immediate retention protection on active loan portfolio'
    };

    setLearnedPatterns([newPattern, ...learnedPatterns]);
    setNewInsightText('');
    setShowAddModal(false);
    setSaveSuccess('New learning successfully embedded in PulseIQ Adaptive Knowledge Engine!');
    setTimeout(() => setSaveSuccess(''), 4000);
  };

  // Copy solution citation for stakeholder reports
  const handleCopyCitation = (sol) => {
    const text = `
EXTERNAL REGULATORY / INDUSTRY BENCHMARK CITED:
TITLE: ${sol.title}
SOURCE/CITATION: ${sol.citation}
EXECUTIVE SUMMARY: ${sol.summary}
ACTIONABLE APPLICATION FOR ROSABON: ${sol.actionableApplication}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedId(sol.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter online solutions
  const filteredSolutions = ONLINE_SOLUTIONS_KNOWLEDGE_BASE.filter(sol => {
    if (solutionCategory !== 'all' && sol.category !== solutionCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = sol.title.toLowerCase().includes(q);
      const matchSum = sol.summary.toLowerCase().includes(q);
      const matchTag = sol.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchSum && !matchTag) return false;
    }
    return true;
  });

  const categories = ['all', 'Regulatory (CBN)', 'Industry Research', 'CX Frameworks', 'Data Governance'];

  return (
    <div className="animate-module" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header Context */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Brain size={14} /> Adaptive Intelligence & Solutions Engine
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            Adaptive Learning & Online Knowledge Retriever
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            The system learns from your daily inputs, optimizes triage routines, and retrieves external CBN/global solutions to enrich executive reports.
          </p>
        </div>

        {/* Sub-nav switcher */}
        <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--bg-surface-elevated)', padding: '0.3rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => setActiveTab('learning')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'learning' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'learning' ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '0.775rem',
              fontWeight: activeTab === 'learning' ? 700 : 500,
              cursor: 'pointer'
            }}
          >
            <Sparkles size={14} /> Operational Learning ({learnedPatterns.length})
          </button>

          <button
            onClick={() => setActiveTab('daily_optimizer')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'daily_optimizer' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'daily_optimizer' ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '0.775rem',
              fontWeight: activeTab === 'daily_optimizer' ? 700 : 500,
              cursor: 'pointer'
            }}
          >
            <Clock size={14} /> Daily Workflow Optimizer
          </button>

          <button
            onClick={() => setActiveTab('online_solutions')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'online_solutions' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'online_solutions' ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '0.775rem',
              fontWeight: activeTab === 'online_solutions' ? 700 : 500,
              cursor: 'pointer'
            }}
          >
            <Globe size={14} /> Seek Online & CBN Solutions
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--accent-emerald)', borderRadius: '6px', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', fontSize: '0.85rem' }}>
          <CheckCircle2 size={16} /> {saveSuccess}
        </div>
      )}

      {/* VIEW 1: ADAPTIVE OPERATIONAL LEARNING */}
      {activeTab === 'learning' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Top Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div className="module-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Learned Operational Rules</span>
                <Brain size={16} color="var(--accent-primary)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-primary)', margin: '0.25rem 0' }}>
                {learnedPatterns.length} Rules Active
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)' }}>
                Auto-adapting to daily tickets & debriefs
              </span>
            </div>

            <div className="module-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Average Confidence Score</span>
                <Award size={16} color="var(--accent-emerald)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-emerald)', margin: '0.25rem 0' }}>
                94.8%
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                Based on 120+ verified loan outcome files
              </span>
            </div>

            <div className="module-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Protected Portfolio Impact</span>
                <ShieldCheck size={16} color="var(--accent-blue)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-blue)', margin: '0.25rem 0' }}>
                ₦410,000,000
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                In mitigated customer flight risks
              </span>
            </div>

            <div className="module-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>System Self-Optimization</span>
                <Zap size={16} color="var(--accent-amber)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-amber)', margin: '0.25rem 0' }}>
                +34.2%
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-amber)' }}>
                Efficiency gain in analyst triage velocity
              </span>
            </div>
          </div>

          {/* Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              High-Confidence Rules Extracted from Daily Operations
            </h3>
            <button
              className="btn-clean btn-clean-primary"
              onClick={() => setShowAddModal(true)}
              style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Plus size={14} /> Train / Log New Operational Learning
            </button>
          </div>

          {/* Learned Patterns Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {learnedPatterns.map((pat, idx) => (
              <div key={pat.id} className="module-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge-clean badge-blue" style={{ fontSize: '0.7rem' }}>
                      Rule #{idx + 1}: {pat.domain}
                    </span>
                    <span className="badge-clean badge-green" style={{ fontSize: '0.7rem' }}>
                      Confidence: {pat.confidenceScore}%
                    </span>
                  </div>
                  <span style={{ fontSize: '0.725rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                    {pat.impact}
                  </span>
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  {pat.patternIdentified}
                </h4>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Observed Evidence: </strong>
                  {pat.dataEvidence}
                </p>

                <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '0.75rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                    <Target size={13} /> Active Recommendation for Daily Workflow:
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    {pat.learnedRule}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* VIEW 2: DAILY WORKFLOW OPTIMIZER */}
      {activeTab === 'daily_optimizer' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="module-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>
              <Clock size={16} /> Continuous Daily Cadence Optimization
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.3rem' }}>
              Real-Time Daily Analyst Triage Checklist
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.25rem', lineHeight: 1.5 }}>
              The system sequences your daily operations to ensure zero SLA breaches and maximum stakeholder impact. Check off items as you complete them:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.25rem' }}>
              {tasks.map(t => {
                const isDone = t.status === 'Completed';
                return (
                  <div
                    key={t.id}
                    onClick={() => toggleTaskStatus(t.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                      padding: '0.85rem 1rem',
                      background: isDone ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-surface)',
                      border: isDone ? '1px solid var(--accent-emerald)' : '1px solid var(--border-medium)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        border: isDone ? '2px solid var(--accent-emerald)' : '2px solid var(--border-medium)',
                        background: isDone ? 'var(--accent-emerald)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff'
                      }}>
                        {isDone && <Check size={14} />}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                            {t.period}
                          </span>
                          {isDone && (
                            <span className="badge-clean badge-green" style={{ fontSize: '0.65rem' }}>Done</span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.825rem', color: isDone ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: isDone ? 'line-through' : 'none', marginTop: '0.15rem' }}>
                          {t.task}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge-clean badge-blue" style={{ fontSize: '0.7rem' }}>
                        {t.recommendedAction}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cross Navigation Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div className="module-card" style={{ padding: '1.25rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                Need to Log Overnight Tickets?
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                Log fresh customer verbatims or drop CSVs to feed the adaptive learning engine.
              </p>
              <button 
                className="btn-clean btn-clean-secondary"
                onClick={onNavigateToCapture}
                style={{ fontSize: '0.775rem' }}
              >
                Go to Intake Hub <ArrowRight size={13} />
              </button>
            </div>

            <div className="module-card" style={{ padding: '1.25rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                Pending 48-Hour SLA Request?
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                Generate rapid ad-hoc intelligence memos with synthesized recommendations.
              </p>
              <button 
                className="btn-clean btn-clean-secondary"
                onClick={onNavigateToReports}
                style={{ fontSize: '0.775rem' }}
              >
                Open SLA Copilot <ArrowRight size={13} />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* VIEW 3: ONLINE KNOWLEDGE & CBN SOLUTIONS RETRIEVER */}
      {activeTab === 'online_solutions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Search & Filter Toolbar */}
          <div className="module-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              
              <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
                <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search online solutions, CBN guidelines, McKinsey benchmarks, or NDPR..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem 0.55rem 2.2rem',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSolutionCategory(cat)}
                    style={{
                      padding: '0.45rem 0.75rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-medium)',
                      background: solutionCategory === cat ? 'var(--accent-primary)' : 'var(--bg-surface-elevated)',
                      color: solutionCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                      fontSize: '0.75rem',
                      fontWeight: solutionCategory === cat ? 700 : 500,
                      cursor: 'pointer'
                    }}
                  >
                    {cat === 'all' ? 'All Sources' : cat}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Solutions List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredSolutions.map(sol => (
              <div key={sol.id} className="module-card" style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <span className="badge-clean badge-blue" style={{ fontSize: '0.7rem' }}>
                      {sol.category}
                    </span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.35rem' }}>
                      {sol.title}
                    </h3>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 600, marginTop: '0.15rem' }}>
                      Official Citation: {sol.citation}
                    </div>
                  </div>

                  <button
                    className="btn-clean btn-clean-secondary"
                    onClick={() => handleCopyCitation(sol)}
                    style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    {copiedId === sol.id ? <Check size={13} color="var(--accent-emerald)" /> : <Copy size={13} />}
                    {copiedId === sol.id ? 'Copied Citation!' : 'Cite in Briefing'}
                  </button>
                </div>

                <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.85rem 1rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Executive Summary: </strong>
                  {sol.summary}
                </div>

                <div style={{ background: 'rgba(37, 99, 235, 0.05)', padding: '0.85rem 1rem', borderRadius: '6px', borderLeft: '3px solid var(--accent-primary)', fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--accent-primary)' }}>Actionable Application for Rosabon: </strong>
                  {sol.actionableApplication}
                </div>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                  {sol.tags.map(t => (
                    <span key={t} style={{ fontSize: '0.675rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--text-muted)' }}>
                      #{t}
                    </span>
                  ))}
                </div>

              </div>
            ))}

            {filteredSolutions.length === 0 && (
              <div className="module-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <Globe size={32} color="var(--text-muted)" style={{ margin: '0 auto 0.75rem auto' }} />
                <h4 style={{ color: 'var(--text-primary)' }}>No matching online solution found</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  Try adjusting your search query or switch categories.
                </p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Modal: Train / Add New Operational Learning */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem'
        }}>
          <div className="module-card" style={{ maxWidth: '520px', width: '100%', padding: '1.75rem', position: 'relative' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              Train PulseIQ Adaptive Engine
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Log an operational observation from your daily work to permanently optimize automated recommendations.
            </p>

            <form onSubmit={handleAddLearning} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.3rem' }}>
                  Operational Insight / Pattern Observed:
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g., When repeat borrowers receive an automated SMS with pre-approval status on Day 2, facility drawdown increases by 40%..."
                  value={newInsightText}
                  onChange={(e) => setNewInsightText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.75rem',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="btn-clean btn-clean-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-clean btn-clean-primary"
                >
                  Save to Adaptive Knowledge Base
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

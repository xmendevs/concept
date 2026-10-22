import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Award, 
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { INITIAL_RECOMMENDATIONS } from '../../data/mockData';

export default function TrackerModule() {
  const [recommendations, setRecommendations] = useState(INITIAL_RECOMMENDATIONS);
  const [showModal, setShowModal] = useState(false);
  const [showFramework, setShowFramework] = useState(false);

  const [newRec, setNewRec] = useState({
    title: '',
    departmentTarget: 'Credit Appraisal & Risk',
    sourceInsight: '',
    owner: '',
    retentionLink: '',
    financialImpact: '',
    status: 'In Review with Stakeholder',
    adoptionStatus: 'Proposed',
    progress: 30
  });

  const total = recommendations.length;
  const adopted = recommendations.filter(r => r.adoptionStatus === 'Adopted').length;
  const adoptionRate = Math.round((adopted / (total || 1)) * 100);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newRec.title) return;

    setRecommendations([
      {
        id: `REC-RSB-0${recommendations.length + 1}`,
        ...newRec,
        proposedDate: new Date().toISOString().split('T')[0]
      },
      ...recommendations
    ]);
    setShowModal(false);
    setNewRec({
      title: '',
      departmentTarget: 'Credit Appraisal & Risk',
      sourceInsight: '',
      owner: '',
      retentionLink: '',
      financialImpact: '',
      status: 'In Review with Stakeholder',
      adoptionStatus: 'Proposed',
      progress: 30
    });
  };

  const handleUpdate = (id, newStatus, newProgress, newAdoption) => {
    setRecommendations(recommendations.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status: newStatus,
          progress: newProgress,
          adoptionStatus: newAdoption
        };
      }
      return r;
    }));
  };

  return (
    <div className="animate-module" style={{ maxWidth: '1050px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Module Title & Quick Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#60a5fa', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Target size={14} /> Module 4: Impact & Performance Scorecard
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.2rem' }}>
            Action Tracking & Role KPIs
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem' }}>
            Track recommendation adoption by business units (&ge;40% target) and strategic retention initiatives.
          </p>
        </div>

        <button 
          className="btn-clean btn-clean-primary"
          onClick={() => setShowModal(true)}
          style={{ fontSize: '0.8rem' }}
        >
          <Plus size={14} /> Propose Recommendation
        </button>
      </div>

      {/* 4 Clean Primary KPI Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        
        <div className="module-card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Recommendation Adoption</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', margin: '0.2rem 0' }}>
            {adoptionRate}%
          </div>
          <span style={{ fontSize: '0.7rem', color: '#34d399' }}>✓ Exceeding target (&ge;40%)</span>
        </div>

        <div className="module-card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Retention Initiatives Linked</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#60a5fa', margin: '0.2rem 0' }}>
            {recommendations.length} Active
          </div>
          <span style={{ fontSize: '0.7rem', color: '#60a5fa' }}>✓ Met annual target (&ge;4)</span>
        </div>

        <div className="module-card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Ad-Hoc SLA Turnaround</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a78bfa', margin: '0.2rem 0' }}>
            26.4h
          </div>
          <span style={{ fontSize: '0.7rem', color: '#a78bfa' }}>✓ Under SLA limit (&le;48h)</span>
        </div>

        <div className="module-card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Data Cleanliness Score</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fbbf24', margin: '0.2rem 0' }}>
            99.4%
          </div>
          <span style={{ fontSize: '0.7rem', color: '#fbbf24' }}>✓ Exceeding target (&ge;98%)</span>
        </div>

      </div>

      {/* Active Recommendations Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
            Active Business Unit Initiatives ({recommendations.length})
          </h3>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            Translating customer feedback into organizational impact
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {recommendations.map(rec => {
            const isAdopted = rec.adoptionStatus === 'Adopted';
            return (
              <div 
                key={rec.id}
                className="module-card"
                style={{
                  padding: '1.25rem',
                  borderLeft: `4px solid ${isAdopted ? '#10b981' : '#f59e0b'}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>{rec.id}</span>
                      <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>{rec.title}</strong>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.25rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                      <span style={{ color: '#60a5fa' }}>{rec.departmentTarget}</span>
                      <span>•</span>
                      <span>Owner: <strong style={{ color: '#e2e8f0' }}>{rec.owner}</strong></span>
                      <span>•</span>
                      <span style={{ color: '#d1fae5' }}>{rec.financialImpact}</span>
                    </div>
                  </div>

                  <span className={`badge-clean ${isAdopted ? 'badge-green' : 'badge-yellow'}`}>
                    {rec.adoptionStatus}
                  </span>
                </div>

                <div style={{ marginTop: '0.65rem', background: '#0a0f18', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: '#818cf8', fontWeight: 600 }}>Retention Link:</span> {rec.retentionLink}
                </div>

                {/* Status & Progress */}
                <div style={{ marginTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                    <span>Status: <strong style={{ color: '#f8fafc' }}>{rec.status}</strong></span>
                    <span>({rec.progress}%)</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {rec.status !== 'Implemented' && (
                      <button
                        className="btn-clean btn-clean-secondary"
                        onClick={() => handleUpdate(rec.id, 'Implemented', 100, 'Adopted')}
                        style={{ fontSize: '0.725rem', padding: '0.25rem 0.55rem' }}
                      >
                        ✓ Mark Implemented
                      </button>
                    )}
                    {rec.adoptionStatus !== 'Adopted' && (
                      <button
                        className="btn-clean btn-clean-secondary"
                        onClick={() => handleUpdate(rec.id, 'In Implementation', 75, 'Adopted')}
                        style={{ fontSize: '0.725rem', padding: '0.25rem 0.55rem', color: '#34d399' }}
                      >
                        ★ Stakeholder Approved
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Propose Recommendation Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem'
        }}>
          <div className="module-card" style={{ maxWidth: '550px', width: '100%', background: '#0d131f' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.35rem' }}>
              Propose Strategic VoC Recommendation
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
              Submits a formal recommendation to business unit leadership to count toward your &ge;40% adoption target.
            </p>

            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Recommendation Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Express Collateral Review Protocol for Returning SME Borrowers"
                  value={newRec.title}
                  onChange={e => setNewRec({ ...newRec, title: e.target.value })}
                  className="input-clean"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Target Department
                  </label>
                  <input
                    type="text"
                    value={newRec.departmentTarget}
                    onChange={e => setNewRec({ ...newRec, departmentTarget: e.target.value })}
                    className="input-clean"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Designated Owner
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Head of Credit Underwriting"
                    value={newRec.owner}
                    onChange={e => setNewRec({ ...newRec, owner: e.target.value })}
                    className="input-clean"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Customer Retention Link (Mandatory KPI)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Protects ₦140M in SME commercial lending from rival bank defection"
                  value={newRec.retentionLink}
                  onChange={e => setNewRec({ ...newRec, retentionLink: e.target.value })}
                  className="input-clean"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Projected Financial Impact
                </label>
                <input
                  type="text"
                  placeholder="e.g. Preserves ₦22M in annual net interest margin"
                  value={newRec.financialImpact}
                  onChange={e => setNewRec({ ...newRec, financialImpact: e.target.value })}
                  className="input-clean"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  className="btn-clean btn-clean-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-clean btn-clean-primary"
                >
                  Propose Recommendation
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

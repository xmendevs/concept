import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Target, 
  PlusCircle, 
  User, 
  DollarSign, 
  ShieldAlert, 
  ChevronRight, 
  Award,
  Sparkles
} from 'lucide-react';
import { INITIAL_RECOMMENDATIONS } from '../data/mockData';

export default function ActionTracker() {
  const [recommendations, setRecommendations] = useState(INITIAL_RECOMMENDATIONS);
  const [showModal, setShowModal] = useState(false);

  // New Recommendation Form State
  const [newRec, setNewRec] = useState({
    title: '',
    departmentTarget: 'Credit Appraisal & Risk',
    sourceInsight: 'Customer feedback on appraisal bottlenecks',
    owner: 'Department Head',
    retentionLink: 'Mitigates customer defection to competitors',
    financialImpact: '+₦15M incremental business volume',
    status: 'In Review with Stakeholder',
    adoptionStatus: 'Proposed',
    progress: 25
  });

  const total = recommendations.length;
  const adopted = recommendations.filter(r => r.adoptionStatus === 'Adopted').length;
  const adoptionRate = Math.round((adopted / (total || 1)) * 100);
  const retentionLinked = recommendations.filter(r => r.retentionLink).length;

  const handleCreateRecommendation = (e) => {
    e.preventDefault();
    if (!newRec.title) return;

    const item = {
      id: `REC-RSB-0${recommendations.length + 1}`,
      ...newRec,
      proposedDate: new Date().toISOString().split('T')[0]
    };

    setRecommendations([item, ...recommendations]);
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
      progress: 25
    });
  };

  const handleUpdateStatus = (id, newStatus, newProgress, newAdoption) => {
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
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Banner: KPI Accountability (Adoption & Retention) */}
      <div style={{
        background: 'linear-gradient(90deg, #064e3b 0%, #111827 50%, #1e1b4b 100%)',
        border: '1px solid #10b981',
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
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'rgba(16, 185, 129, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(16, 185, 129, 0.4)'
          }}>
            <Target size={24} color="#34d399" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#f8fafc' }}>
                Closed-Loop Recommendation & Retention Tracker
              </h3>
              <span className="badge badge-emerald">
                Adoption: {adoptionRate}% (Target &ge;40%)
              </span>
              <span className="badge badge-indigo">
                {retentionLinked} Retention Actions (Target &ge;4)
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Translates qualitative VoC findings into approved organizational changes, fulfilling your core Financial & Stakeholder KRAs.
            </p>
          </div>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
          style={{ fontSize: '0.8rem' }}
        >
          <PlusCircle size={15} /> Propose Recommendation
        </button>
      </div>

      {/* Recommendations Cards Pipeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1' }}>
            Active Business Unit Implementations ({recommendations.length})
          </span>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            Click status pills to update implementation lifecycle
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {recommendations.map(rec => {
            const isAdopted = rec.adoptionStatus === 'Adopted';
            return (
              <div 
                key={rec.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: '#111827',
                  border: isAdopted ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid #1f2937',
                  borderLeft: `4px solid ${isAdopted ? '#10b981' : '#f59e0b'}`
                }}
              >
                <div>
                  {/* Card Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', fontWeight: 600 }}>
                      {rec.id}
                    </span>
                    <span className={`badge ${isAdopted ? 'badge-emerald' : 'badge-amber'}`}>
                      {rec.adoptionStatus}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.4rem', lineHeight: '1.4' }}>
                    {rec.title}
                  </h4>

                  {/* Target Unit & Owner */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                    <span style={{ color: '#60a5fa', fontWeight: 600 }}>{rec.departmentTarget}</span>
                    <span>•</span>
                    <span>Owner: <strong style={{ color: '#e2e8f0' }}>{rec.owner}</strong></span>
                  </div>

                  {/* Source VoC Insight Link */}
                  <div style={{ marginTop: '0.6rem', background: '#0b0f19', padding: '0.5rem 0.65rem', borderRadius: '6px', border: '1px solid #1e293b', fontSize: '0.75rem', color: '#94a3b8' }}>
                    <span style={{ color: '#818cf8', fontWeight: 600 }}>VoC Evidence:</span> {rec.sourceInsight}
                  </div>

                  {/* Financial & Retention Impact */}
                  <div style={{ marginTop: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                      <TrendingUp size={14} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ color: '#d1fae5' }}><strong>Impact:</strong> {rec.financialImpact}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                      <Target size={14} color="#38bdf8" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ color: '#e0f2fe' }}><strong>Retention Link:</strong> {rec.retentionLink}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Progress & Status Switcher */}
                <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #1f2937' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                    <span style={{ color: '#94a3b8' }}>Status: <strong>{rec.status}</strong></span>
                    <span style={{ color: '#34d399', fontWeight: 700 }}>{rec.progress}%</span>
                  </div>

                  <div style={{ height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                    <div style={{ width: `${rec.progress}%`, height: '100%', background: rec.progress === 100 ? '#10b981' : '#3b82f6', borderRadius: '3px' }} />
                  </div>

                  {/* Interactive Status Transition buttons */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {rec.status !== 'Implemented' && (
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleUpdateStatus(rec.id, 'Implemented', 100, 'Adopted')}
                        style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}
                      >
                        ✓ Mark Implemented
                      </button>
                    )}
                    {rec.adoptionStatus !== 'Adopted' && (
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleUpdateStatus(rec.id, 'In Implementation', 75, 'Adopted')}
                        style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', color: '#34d399' }}
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

      {/* MODAL: Propose New Recommendation */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem'
        }}>
          <div className="card" style={{ maxWidth: '600px', width: '100%', background: '#0f172a', border: '1px solid #334155' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.5rem' }}>
              Propose New Strategic VoC Recommendation
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
              Submits a formal recommendation to business unit leadership to count toward your &ge;40% adoption target.
            </p>

            <form onSubmit={handleCreateRecommendation} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.25rem', fontWeight: 600 }}>
                  Initiative Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Express Collateral Verification Protocol for Tier-1 SMEs"
                  value={newRec.title}
                  onChange={e => setNewRec({ ...newRec, title: e.target.value })}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.25rem', fontWeight: 600 }}>
                    Target Department
                  </label>
                  <input
                    type="text"
                    value={newRec.departmentTarget}
                    onChange={e => setNewRec({ ...newRec, departmentTarget: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.25rem', fontWeight: 600 }}>
                    Designated Stakeholder / Owner
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Head of Credit Appraisal"
                    value={newRec.owner}
                    onChange={e => setNewRec({ ...newRec, owner: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.25rem', fontWeight: 600 }}>
                  Source VoC Evidence (Quotes or IDs)
                </label>
                <input
                  type="text"
                  placeholder="e.g. VOC-RSB-101 (Client threatened to move ₦25M REAP placement)"
                  value={newRec.sourceInsight}
                  onChange={e => setNewRec({ ...newRec, sourceInsight: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.25rem', fontWeight: 600 }}>
                  Customer Retention Link (Mandatory KPI)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Protects ₦120M in SME commercial lending from commercial bank defection"
                  value={newRec.retentionLink}
                  onChange={e => setNewRec({ ...newRec, retentionLink: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.25rem', fontWeight: 600 }}>
                  Projected Financial Impact / ROI
                </label>
                <input
                  type="text"
                  placeholder="e.g. +₦28M annual revenue preservation"
                  value={newRec.financialImpact}
                  onChange={e => setNewRec({ ...newRec, financialImpact: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
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

import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  PlusCircle, 
  ShieldCheck, 
  Download, 
  RefreshCw, 
  Layers, 
  FileText,
  UserCheck
} from 'lucide-react';
import { DEPARTMENTS, ROSABON_PRODUCTS, THEMES } from '../data/mockData';

export default function IngestionHub({ vocData, onAddVoCItem, onBulkAdd }) {
  const [activeSubTab, setActiveSubTab] = useState('upload'); // 'upload' | 'logger' | 'audit'

  // Quick RM Logger Form State
  const [formData, setFormData] = useState({
    customerName: '',
    customerTier: 'Retail Salary Earner',
    department: 'sales_rm',
    channel: 'RM 1-on-1 Client Visit',
    loanProduct: ROSABON_PRODUCTS[0],
    loanAmount: '₦1,500,000',
    date: new Date().toISOString().split('T')[0],
    qualitativeText: '',
    sentiment: 'Negative',
    urgency: 'Medium',
    churnRisk: false,
    npsScore: 5,
    csatScore: 3,
    cesScore: 4,
    selectedThemes: [THEMES[0]],
    actionOwner: 'Head of Relationship Management'
  });

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [importedRowsCount, setImportedRowsCount] = useState(0);

  // Handle Form Submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.qualitativeText) {
      alert('Please provide Customer Name and Feedback Text.');
      return;
    }

    const newItem = {
      id: `VOC-RSB-${Math.floor(100 + Math.random() * 900)}`,
      ...formData,
      npsCategory: formData.npsScore >= 9 ? 'Promoter' : formData.npsScore >= 7 ? 'Passive' : 'Detractor',
      sentimentScore: formData.sentiment === 'Positive' ? 0.85 : formData.sentiment === 'Neutral' ? 0.0 : -0.85,
      themes: formData.selectedThemes,
      status: formData.churnRisk ? 'Action Required' : 'Logged'
    };

    onAddVoCItem(newItem);
    alert(`Successfully logged VoC record for ${formData.customerName}! Stored in centralized research repository.`);
    
    // Reset form
    setFormData({
      ...formData,
      customerName: '',
      qualitativeText: '',
      churnRisk: false
    });
  };

  // Simulate File Upload / Parse
  const handleSimulateFileUpload = () => {
    const mockBatch = [
      {
        id: `VOC-RSB-${Math.floor(200 + Math.random() * 800)}`,
        customerName: 'Dangote Flour Logistics Contractor',
        customerTier: 'Commercial SME (Tier 1)',
        department: 'sales_rm',
        channel: 'RM Field Visit (Apapa Port)',
        loanProduct: 'Rosabon Fleet & Commercial Lease',
        loanAmount: '₦68,000,000',
        date: '2026-10-21',
        qualitativeText: 'Client needs 5 additional 30-ton haulage trucks under operating lease before peak harvest season. Commended RM swift documentation support and competitive lease rentals.',
        sentiment: 'Positive',
        sentimentScore: 0.92,
        urgency: 'Low',
        churnRisk: false,
        npsCategory: 'Promoter',
        npsScore: 10,
        csatScore: 5,
        cesScore: 1,
        themes: ['Relationship Manager (RM) Responsiveness'],
        status: 'Closed Loop',
        actionOwner: 'Commercial Fleet Director'
      },
      {
        id: `VOC-RSB-${Math.floor(200 + Math.random() * 800)}`,
        customerName: 'Ifeanyi Okoli',
        customerTier: 'Retail Salary Earner',
        department: 'cx',
        channel: 'Zendesk Ticket #49102',
        loanProduct: 'Rosabon Quick Cash (Instant Salary Advance)',
        loanAmount: '₦180,000',
        date: '2026-10-21',
        qualitativeText: 'Loan was approved in app but bank transfer disbursement failed with error 504. Money has not hit my GTBank account after 4 hours. Urgent assistance needed.',
        sentiment: 'Negative',
        sentimentScore: -0.88,
        urgency: 'Critical',
        churnRisk: false,
        npsCategory: 'Detractor',
        npsScore: 2,
        csatScore: 1,
        cesScore: 7,
        themes: ['Disbursement Speed & Appraisal SLA', 'Mobile App, Portal & Biometric Usability'],
        status: 'Action Required',
        actionOwner: 'Payment Gateway Engineering'
      },
      {
        id: `VOC-RSB-${Math.floor(200 + Math.random() * 800)}`,
        customerName: 'Victoria Island MediCare Clinic',
        customerTier: 'Mid-Market Enterprise',
        department: 'credit_accounts',
        channel: 'Account Officer Restructuring Call',
        loanProduct: 'Rosabon Consumer Asset Lease (Vehicle/Equipment)',
        loanAmount: '₦22,000,000',
        date: '2026-10-20',
        qualitativeText: 'Clinic acquired medical ultrasound equipment on lease. Requested slight adjustment to monthly payment date to align with NHIS HMO insurance reimbursement dates.',
        sentiment: 'Neutral',
        sentimentScore: 0.1,
        urgency: 'Medium',
        churnRisk: false,
        npsCategory: 'Passive',
        npsScore: 8,
        csatScore: 4,
        cesScore: 3,
        themes: ['Tenure Flexibility & Restructuring Hardship'],
        status: 'In Review',
        actionOwner: 'Credit Committee'
      }
    ];

    onBulkAdd(mockBatch);
    setImportedRowsCount(mockBatch.length);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 5000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Subtab Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1f2937', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[
            { id: 'upload', label: 'Universal File Upload (CSV/Excel)', icon: UploadCloud },
            { id: 'logger', label: 'Quick RM / Field Debrief Logger', icon: PlusCircle },
            { id: 'audit', label: 'Data Integrity & Governance Audit (≥98%)', icon: ShieldCheck },
          ].map(sub => {
            const Icon = sub.icon;
            const isActive = activeSubTab === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setActiveSubTab(sub.id)}
                className="btn"
                style={{
                  background: isActive ? '#1e293b' : 'transparent',
                  color: isActive ? '#60a5fa' : '#94a3b8',
                  borderColor: isActive ? '#3b82f6' : 'transparent',
                  fontSize: '0.825rem'
                }}
              >
                <Icon size={16} />
                {sub.label}
              </button>
            );
          })}
        </div>

        <span className="badge badge-indigo">
          Department Ingestion Engine
        </span>
      </div>

      {/* VIEW 1: Universal CSV/Excel Upload */}
      {activeSubTab === 'upload' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
          
          {/* Upload Dropzone */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>
                  Drag & Drop Feedback Datasets
                </h3>
                <span className="badge badge-emerald">Auto-Column Mapper</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                Supports raw exports from Zendesk (CX), Google Forms, CRM (Sales/RMs), Mixpanel (Product), App Store reviews (Marketing), and Core Credit Spreadsheets.
              </p>

              {/* Dropzone Box */}
              <div 
                style={{
                  border: '2px dashed #3b82f6',
                  borderRadius: '12px',
                  background: 'rgba(59, 130, 246, 0.05)',
                  padding: '2.5rem 1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
                onClick={handleSimulateFileUpload}
              >
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'rgba(59, 130, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}>
                  <UploadCloud size={28} color="#60a5fa" />
                </div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>
                  Click to select CSV / Excel file or drag here
                </h4>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.35rem' }}>
                  Auto-detects: Customer, Feedback, Rating, Department, Product, Date
                </p>
                <div style={{ marginTop: '1rem', display: 'inline-flex', gap: '0.5rem' }}>
                  <button className="btn btn-primary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>
                    <FileSpreadsheet size={15} /> Choose Local File
                  </button>
                  <button 
                    className="btn btn-secondary" 
                    onClick={(e) => { e.stopPropagation(); handleSimulateFileUpload(); }}
                    style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                  >
                    <RefreshCw size={14} /> Ingest Sample Batch (3 items)
                  </button>
                </div>
              </div>

              {uploadSuccess && (
                <div style={{
                  marginTop: '1rem',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  color: '#34d399'
                }}>
                  <CheckCircle2 size={16} />
                  <span>Successfully mapped & ingested <strong>{importedRowsCount} new records</strong>. Automated PII scrubbing and sentiment scoring applied.</span>
                </div>
              )}
            </div>

            {/* Standard Template Download */}
            <div style={{ 
              marginTop: '1.5rem', 
              paddingTop: '1rem', 
              borderTop: '1px solid #1f2937', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Need to distribute standardized templates to RMs or CX teams?
              </span>
              <button 
                className="btn btn-secondary"
                onClick={() => alert('Downloading Rosabon_VoC_Standard_Ingestion_Template.csv')}
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              >
                <Download size={14} /> Template (.CSV)
              </button>
            </div>
          </div>

          {/* Department Data Pipeline Status */}
          <div className="card">
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
              Multi-Department Intake Streams
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Real-time synchronization across all 7 internal feedback pipelines:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {DEPARTMENTS.filter(d => d.id !== 'all').map(dept => {
                const count = vocData.filter(v => v.department === dept.id).length;
                return (
                  <div key={dept.id} style={{
                    background: '#1a2234',
                    border: '1px solid #283548',
                    borderRadius: '8px',
                    padding: '0.65rem 0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: dept.color }} />
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f1f5f9' }}>
                        {dept.name}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        <strong>{count}</strong> entries
                      </span>
                      <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                        Connected
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* VIEW 2: Quick RM / Field Debrief Logger */}
      {activeSubTab === 'logger' && (
        <div className="card">
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
              Relationship Manager (RM) & Field Debrief Logger
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Instantly log qualitative customer conversations, credit appraisal rejection debriefs, or high-value client meeting notes.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.35rem', fontWeight: 600 }}>
                Customer / Enterprise Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Genesis Haulage Ltd / Chinedu Eze"
                value={formData.customerName}
                onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                style={{ width: '100%' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.35rem', fontWeight: 600 }}>
                Customer Tier
              </label>
              <select
                value={formData.customerTier}
                onChange={e => setFormData({ ...formData, customerTier: e.target.value })}
                style={{ width: '100%' }}
              >
                <option>Commercial SME (Tier 1)</option>
                <option>Commercial Fleet Client (Tier 1)</option>
                <option>Mid-Market Enterprise</option>
                <option>Tier 1 (High-Net-Worth Individual)</option>
                <option>Retail Salary Earner</option>
                <option>Retail Civil Servant</option>
                <option>Micro-Entrepreneur</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.35rem', fontWeight: 600 }}>
                Source Department
              </label>
              <select
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                style={{ width: '100%' }}
              >
                {DEPARTMENTS.filter(d => d.id !== 'all').map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.35rem', fontWeight: 600 }}>
                Rosabon Loan or Investment Product
              </label>
              <select
                value={formData.loanProduct}
                onChange={e => setFormData({ ...formData, loanProduct: e.target.value })}
                style={{ width: '100%' }}
              >
                {ROSABON_PRODUCTS.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.35rem', fontWeight: 600 }}>
                Exposure / Loan Amount (₦)
              </label>
              <input
                type="text"
                placeholder="e.g. ₦15,000,000"
                value={formData.loanAmount}
                onChange={e => setFormData({ ...formData, loanAmount: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.35rem', fontWeight: 600 }}>
                Touchpoint Channel
              </label>
              <input
                type="text"
                placeholder="e.g. RM Client Visit (Abuja) / WhatsApp"
                value={formData.channel}
                onChange={e => setFormData({ ...formData, channel: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>

            {/* Qualitative Feedback Text */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.35rem', fontWeight: 600 }}>
                Qualitative Customer Feedback / Conversation Transcript *
              </label>
              <textarea
                rows={4}
                placeholder="Enter exact verbatim customer quotes, objections, service praise, or friction notes..."
                value={formData.qualitativeText}
                onChange={e => setFormData({ ...formData, qualitativeText: e.target.value })}
                style={{ width: '100%' }}
                required
              />
            </div>

            {/* Sentiment & Urgency */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.35rem', fontWeight: 600 }}>
                Assessed Sentiment
              </label>
              <select
                value={formData.sentiment}
                onChange={e => setFormData({ ...formData, sentiment: e.target.value })}
                style={{ width: '100%' }}
              >
                <option value="Positive">Positive (Praise / Loyalty)</option>
                <option value="Neutral">Neutral (Inquiry / Restructuring)</option>
                <option value="Negative">Negative (Complaint / Friction)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.35rem', fontWeight: 600 }}>
                Urgency Level
              </label>
              <select
                value={formData.urgency}
                onChange={e => setFormData({ ...formData, urgency: e.target.value })}
                style={{ width: '100%' }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical (Immediate Escalation)</option>
              </select>
            </div>

            {/* Churn Risk Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.25rem' }}>
              <input
                type="checkbox"
                id="churnRisk"
                checked={formData.churnRisk}
                onChange={e => setFormData({ ...formData, churnRisk: e.target.checked })}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <label htmlFor="churnRisk" style={{ fontSize: '0.8rem', color: formData.churnRisk ? '#fb7185' : '#cbd5e1', fontWeight: 600, cursor: 'pointer' }}>
                Flag as Potential Churn / Flight Risk (Threatening defection)
              </label>
            </div>

            {/* Submit Button */}
            <div style={{ gridColumn: '1 / -1', marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setFormData({ ...formData, customerName: '', qualitativeText: '' })}
              >
                Clear
              </button>
              <button type="submit" className="btn btn-primary">
                <PlusCircle size={16} /> Save to VoC Repository
              </button>
            </div>

          </form>
        </div>
      )}

      {/* VIEW 3: Data Integrity & Governance Audit */}
      {activeSubTab === 'audit' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                Data Integrity, Quality Assurance & NDPR Compliance
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Validates customer intelligence datasets to maintain &ge;98% data hygiene and privacy governance
              </p>
            </div>
            <span className="badge badge-emerald" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>
              99.4% Error-Free (Target: &ge;98%)
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            
            <div style={{ background: '#1a2234', border: '1px solid #283548', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontWeight: 700, fontSize: '0.85rem' }}>
                <CheckCircle2 size={16} /> Schema & Field Completeness
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                100% of records contain valid Customer Identifier, Department Tag, Loan Product, and Timestamp.
              </p>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.5rem' }}>
                0 Missing Mandatory Fields
              </div>
            </div>

            <div style={{ background: '#1a2234', border: '1px solid #283548', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem' }}>
                <UserCheck size={16} /> PII Redaction & Data Privacy
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                Automated regex mask active for Bank Verification Numbers (BVN), Credit Card Numbers, and NIN under NDPR compliance.
              </p>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.5rem' }}>
                100% Redaction Active
              </div>
            </div>

            <div style={{ background: '#1a2234', border: '1px solid #283548', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a78bfa', fontWeight: 700, fontSize: '0.85rem' }}>
                <ShieldCheck size={16} /> Centralized Knowledge Base Health
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                All customer interview transcripts, survey exports, and RM notes indexed in unified queryable format.
              </p>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.5rem' }}>
                100% Repository Compliance
              </div>
            </div>

          </div>

          <div style={{ marginTop: '1.5rem', background: '#0f172a', padding: '1rem', borderRadius: '8px', border: '1px solid #1e293b' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '0.5rem' }}>
              Governance Checklist for Management Audits
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem', fontSize: '0.75rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={14} color="#34d399" /> No unencrypted BVN/NIN in free text
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={14} color="#34d399" /> Deduplication hash applied to all rows
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={14} color="#34d399" /> Role-based access control enabled
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={14} color="#34d399" /> Audit trail logged with analyst timestamps
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

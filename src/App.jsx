import React, { useState, useEffect, Component } from 'react';
import Header from './components/Header';
import CaptureModule from './components/modules/CaptureModule';
import ExplorerModule from './components/modules/ExplorerModule';
import StudioModule from './components/modules/StudioModule';
import TrackerModule from './components/modules/TrackerModule';
import PowerBIDashboard from './components/modules/PowerBIDashboard';
import { INITIAL_VOC_DATA } from './data/mockData';

// Error Boundary to prevent any blank page crashes
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Customer Intelligence App Error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--bg-surface)', margin: '2rem auto', maxWidth: '600px', borderRadius: '10px', border: '1px solid var(--border-medium)' }}>
          <h3 style={{ color: 'var(--accent-rose)', marginBottom: '0.5rem' }}>Unable to load view</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            An unexpected error occurred. Click below to refresh the active workspace.
          </p>
          <button 
            className="btn-clean btn-clean-primary" 
            onClick={() => this.setState({ hasError: false })}
          >
            Refresh View
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [vocData, setVocData] = useState(() => {
    const saved = localStorage.getItem('rosabon_voc_records');
    return saved ? JSON.parse(saved) : INITIAL_VOC_DATA;
  });

  const [activeModule, setActiveModule] = useState('capture');
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeMonth, setActiveMonth] = useState('October 2026');

  // Theme Management (Light vs Dark)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('rosabon_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('rosabon_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Sync VoC data with localStorage
  useEffect(() => {
    localStorage.setItem('rosabon_voc_records', JSON.stringify(vocData));
  }, [vocData]);

  // Handlers
  const handleAddVoCItem = (newItem) => {
    setVocData([newItem, ...vocData]);
  };

  const handleBulkAdd = (newBatch) => {
    setVocData([...newBatch, ...vocData]);
  };

  const handleDeleteVoCItem = (id) => {
    setVocData(prev => prev.filter(item => item.id !== id));
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  const handleClearAllVoC = () => {
    setVocData([]);
    setSelectedItem(null);
  };

  const handleSelectVoC = (item) => {
    setSelectedItem(item);
    setActiveModule('explorer');
  };

  // Monthly Cycle Reset / Change
  const handleResetMonth = (action) => {
    if (action === 'Clear') {
      setVocData([]);
    } else {
      // Start new month (e.g. November 2026)
      setActiveMonth(action);
      // Can start with empty or fresh records
    }
  };

  const handleRestoreSamples = () => {
    setVocData(INITIAL_VOC_DATA);
    setActiveMonth('October 2026');
  };

  // Filter records by active month if specified
  const filteredByMonth = activeMonth === 'All Time'
    ? vocData
    : vocData.filter(d => {
        if (!d.date) return true;
        // October 2026 matches '2026-10'
        if (activeMonth === 'October 2026') return d.date.startsWith('2026-10');
        if (activeMonth === 'November 2026') return d.date.startsWith('2026-11');
        if (activeMonth === 'December 2026') return d.date.startsWith('2026-12');
        return true;
      });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-app)', transition: 'background-color 0.2s ease' }}>
      
      {/* 1. Header with Light/Dark toggle & Month Cycle Manager */}
      <Header
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        vocCount={filteredByMonth.length}
        onQuickLog={() => setActiveModule('capture')}
        theme={theme}
        toggleTheme={toggleTheme}
        activeMonth={activeMonth}
        onChangeMonth={setActiveMonth}
        onResetMonth={handleResetMonth}
        onRestoreSamples={handleRestoreSamples}
      />

      {/* 2. Main Workspace Container with Error Boundary */}
      <main style={{ 
        flex: 1, 
        maxWidth: '1280px', 
        width: '100%', 
        margin: '1.75rem auto 3rem auto', 
        padding: '0 1.5rem' 
      }}>
        <ErrorBoundary>
          {activeModule === 'capture' && (
            <CaptureModule
              vocData={filteredByMonth}
              onAddVoCItem={handleAddVoCItem}
              onBulkAdd={handleBulkAdd}
              onDeleteVoCItem={handleDeleteVoCItem}
              onClearAll={handleClearAllVoC}
              onRestoreSamples={handleRestoreSamples}
              onNavigate={setActiveModule}
            />
          )}

          {activeModule === 'explorer' && (
            <ExplorerModule
              vocData={filteredByMonth}
              selectedItem={selectedItem}
              onSelectItem={setSelectedItem}
              onCloseDrawer={() => setSelectedItem(null)}
              onDeleteItem={handleDeleteVoCItem}
              onClearAll={handleClearAllVoC}
              onRestoreSamples={handleRestoreSamples}
              onNavigateToCapture={() => setActiveModule('capture')}
              onNavigateToReports={() => setActiveModule('reports')}
            />
          )}

          {activeModule === 'reports' && (
            <StudioModule vocData={filteredByMonth} />
          )}

          {activeModule === 'tracker' && (
            <TrackerModule />
          )}

          {activeModule === 'powerbi' && (
            <PowerBIDashboard vocData={filteredByMonth} />
          )}
        </ErrorBoundary>
      </main>

      {/* 3. Global Footer (Hidden in print) */}
      <footer className="no-print" style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
        padding: '1rem 1.5rem',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        transition: 'background-color 0.2s ease'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <strong>Rosabon Financial Services</strong> • Customer Intelligence Engine
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>
            Active Cycle: <strong>{activeMonth}</strong> • Adoption Target: &ge;40% • SLA Responsiveness: &le;48h
          </div>
        </div>
      </footer>

    </div>
  );
}

import React, { useState, useEffect, useMemo, Component } from 'react';
import Header from './components/Header';
import CaptureModule from './components/modules/CaptureModule';
import ExplorerModule from './components/modules/ExplorerModule';
import StudioModule from './components/modules/StudioModule';
import TrackerModule from './components/modules/TrackerModule';
import PowerBIDashboard from './components/modules/PowerBIDashboard';
import { INITIAL_VOC_DATA, ROSABON_PRODUCTS } from './data/mockData';

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
  const [activeProduct, setActiveProduct] = useState('all'); // 'all' | product name

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

  // Dynamically load standard + custom products
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
    setActiveProduct('all');
  };

  const handleSelectVoC = (item) => {
    setSelectedItem(item);
    setActiveModule('explorer');
  };

  // Monthly Cycle Reset / Change
  const handleResetMonth = (action) => {
    if (action === 'Clear') {
      setVocData([]);
      setActiveProduct('all');
    } else {
      setActiveMonth(action);
    }
  };

  const handleRestoreSamples = () => {
    setVocData(INITIAL_VOC_DATA);
    setActiveMonth('October 2026');
    setActiveProduct('all');
    setSelectedItem(null);
  };

  // Filter records by active month AND global active product
  const filteredRecords = useMemo(() => {
    return vocData.filter(d => {
      // Month filter
      if (activeMonth !== 'All Time') {
        if (!d.date) return true;
        if (activeMonth === 'October 2026' && !d.date.startsWith('2026-10')) return false;
        if (activeMonth === 'November 2026' && !d.date.startsWith('2026-11')) return false;
        if (activeMonth === 'December 2026' && !d.date.startsWith('2026-12')) return false;
      }
      // Product Scope filter
      if (activeProduct !== 'all' && d.loanProduct !== activeProduct) {
        return false;
      }
      return true;
    });
  }, [vocData, activeMonth, activeProduct]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-app)', transition: 'background-color 0.2s ease' }}>
      
      {/* 1. Header with Light/Dark toggle, Month Cycle Manager & Global Product Scope */}
      <Header
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        vocCount={filteredRecords.length}
        totalVocCount={vocData.length}
        onQuickLog={() => setActiveModule('capture')}
        theme={theme}
        toggleTheme={toggleTheme}
        activeMonth={activeMonth}
        onChangeMonth={setActiveMonth}
        onResetMonth={handleResetMonth}
        onRestoreSamples={handleRestoreSamples}
        activeProduct={activeProduct}
        availableProducts={availableProducts}
        onChangeProduct={setActiveProduct}
      />

      {/* 2. Main Workspace Container with Error Boundary */}
      <main style={{ 
        flex: 1, 
        maxWidth: '1280px', 
        width: '100%', 
        margin: '1.75rem auto 3rem auto', 
        padding: '0 1.5rem' 
      }}>
        {/* Active Product Scope Banner when filtered */}
        {activeProduct !== 'all' && (
          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid var(--accent-primary)',
            borderRadius: '8px',
            padding: '0.6rem 1rem',
            marginBottom: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: 'var(--text-primary)',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>🔍 Global Product Scope:</span>
              <span>Showing intelligence exclusively for <strong>{activeProduct}</strong> ({filteredRecords.length} records in view)</span>
            </div>
            <button
              onClick={() => setActiveProduct('all')}
              style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-medium)',
                color: 'var(--accent-primary)',
                borderRadius: '5px',
                padding: '0.2rem 0.65rem',
                fontSize: '0.725rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Reset to All Products
            </button>
          </div>
        )}

        <ErrorBoundary>
          {activeModule === 'capture' && (
            <CaptureModule
              vocData={filteredRecords}
              allVocData={vocData}
              onAddVoCItem={handleAddVoCItem}
              onBulkAdd={handleBulkAdd}
              onDeleteVoCItem={handleDeleteVoCItem}
              onClearAll={handleClearAllVoC}
              onRestoreSamples={handleRestoreSamples}
              onNavigate={setActiveModule}
              activeProduct={activeProduct}
              onChangeProduct={setActiveProduct}
            />
          )}

          {activeModule === 'explorer' && (
            <ExplorerModule
              vocData={filteredRecords}
              allVocData={vocData}
              selectedItem={selectedItem}
              onSelectItem={setSelectedItem}
              onCloseDrawer={() => setSelectedItem(null)}
              onDeleteItem={handleDeleteVoCItem}
              onClearAll={handleClearAllVoC}
              onRestoreSamples={handleRestoreSamples}
              onNavigateToCapture={() => setActiveModule('capture')}
              onNavigateToReports={() => setActiveModule('reports')}
              activeProduct={activeProduct}
              onChangeProduct={setActiveProduct}
              availableProducts={availableProducts}
            />
          )}

          {activeModule === 'reports' && (
            <StudioModule 
              vocData={filteredRecords} 
              activeProduct={activeProduct}
              onChangeProduct={setActiveProduct}
            />
          )}

          {activeModule === 'tracker' && (
            <TrackerModule />
          )}

          {activeModule === 'powerbi' && (
            <PowerBIDashboard 
              vocData={filteredRecords} 
              allVocData={vocData}
              activeProduct={activeProduct}
              onChangeProduct={setActiveProduct}
              availableProducts={availableProducts}
            />
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

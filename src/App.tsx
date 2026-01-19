import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { TrainingConfig } from './types';
import Sidebar from './components/Sidebar/Sidebar';
import TrainingPage from './pages/TrainingPage';
import ChordListPage from './pages/ChordListPage';
import HistoryPage from './pages/HistoryPage';
import HelpPage from './pages/HelpPage';
import './App.css';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [config, setConfig] = useState<TrainingConfig>({
    scale: 'Mayor',
    barreOption: 'Con cejilla',
    duration: 15
  });

  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">GUITAR CHORD TRAINER</h1>
          <p className="app-subtitle">Practica acordes a tu ritmo</p>
        </header>

        <div className="app-content">
          <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
          
          <div className="main-panel">
            <Routes>
              <Route path="/" element={<Navigate to="/training" replace />} />
              <Route path="/training" element={<TrainingPage config={config} onConfigChange={setConfig} />} />
              <Route path="/chords" element={<ChordListPage config={config} />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/help" element={<HelpPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

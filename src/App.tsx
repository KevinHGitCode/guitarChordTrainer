import { useState, useCallback } from 'react';
import type { TrainingConfig } from './types';
import Sidebar from './components/Sidebar';
import Training from './components/Training';
import ChordList from './components/ChordList';
import Configuration from './components/Configuration';
import AdvancedConfiguration from './components/AdvancedConfiguration';
import TrainingStats from './components/TrainingStats';
import { chords } from './chordData';
import './App.css';

type Mode = 'training' | 'chordList';

function App() {
  const [mode, setMode] = useState<Mode>('training');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chordCount, setChordCount] = useState(0);
  const [practiceTime, setPracticeTime] = useState('0:00');
  const [config, setConfig] = useState<TrainingConfig>({
    scale: 'Mayor',
    barreOption: 'Con cejilla',
    duration: 15
  });

  const handleStatsChange = useCallback((count: number, time: string) => {
    setChordCount(count);
    setPracticeTime(time);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">GUITAR CHORD TRAINER</h1>
        <p className="app-subtitle">Practica acordes a tu ritmo</p>
      </header>

      <div className="app-content">
        <Sidebar 
          currentMode={mode} 
          onModeChange={setMode}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <div className="main-panel">
          {mode === 'training' ? (
            <div className="training-panel">
              <Training config={config} onStatsChange={handleStatsChange} />
              <div className="config-panel">
                <TrainingStats chordCount={chordCount} practiceTime={practiceTime} />
                <Configuration config={config} onConfigChange={setConfig} />
                <AdvancedConfiguration
                  config={config}
                  onConfigChange={setConfig}
                  chords={chords}
                />
              </div>
            </div>
          ) : (
            <ChordList chords={chords} scale={config.scale} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

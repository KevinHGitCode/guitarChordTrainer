import { useState, useCallback } from 'react';
import type { TrainingConfig } from './types';
import Sidebar from './components/Sidebar';
import Training from './components/Training';
import ChordList from './components/ChordList';
import Configuration from './components/Configuration';
import AdvancedConfiguration from './components/AdvancedConfiguration';
import TrainingStats from './components/TrainingStats';
import TrainingHistory from './components/TrainingHistory';
import Help from './components/Help';
import { chords } from './chordData';
import './App.css';

type Mode = 'training' | 'chordList' | 'history' | 'help';

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

  const saveTrainingSession = useCallback((chordCount: number, practiceTimeSeconds: number) => {
    if (chordCount === 0 && practiceTimeSeconds === 0) return; // Don't save empty sessions
    
    const sessions = JSON.parse(localStorage.getItem('trainingSessions') || '[]');
    const newSession = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      chordCount,
      practiceTime: practiceTimeSeconds,
      scale: config.scale,
      difficulty: config.barreOption
    };
    sessions.unshift(newSession); // Add to beginning
    localStorage.setItem('trainingSessions', JSON.stringify(sessions));
  }, [config.scale, config.barreOption]);

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
              <Training 
                config={config} 
                onStatsChange={handleStatsChange}
                onSaveSession={saveTrainingSession}
              />
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
          ) : mode === 'chordList' ? (
            <ChordList chords={chords} scale={config.scale} />
          ) : mode === 'history' ? (
            <TrainingHistory />
          ) : (
            <Help />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

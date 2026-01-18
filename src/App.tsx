import { useState } from 'react';
import type { TrainingConfig } from './types';
import Sidebar from './components/Sidebar';
import Training from './components/Training';
import ChordList from './components/ChordList';
import Configuration from './components/Configuration';
import AdvancedConfiguration from './components/AdvancedConfiguration';
import { chords } from './chordData';
import './App.css';

type Mode = 'training' | 'chordList';

function App() {
  const [mode, setMode] = useState<Mode>('training');
  const [config, setConfig] = useState<TrainingConfig>({
    scale: 'Mayor',
    barreOption: 'Con cejilla',
    duration: 15
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">GUITAR CHORD TRAINER</h1>
        <p className="app-subtitle">Practica acordes a tu ritmo</p>
      </header>

      <div className="app-content">
        <Sidebar currentMode={mode} onModeChange={setMode} />
        
        <div className="main-panel">
          {mode === 'training' ? (
            <div className="training-panel">
              <div className="config-panel">
                <Configuration config={config} onConfigChange={setConfig} />
                <AdvancedConfiguration
                  config={config}
                  onConfigChange={setConfig}
                  chords={chords}
                />
              </div>
              <Training config={config} />
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

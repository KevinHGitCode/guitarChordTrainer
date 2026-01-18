import { useState, useCallback } from 'react';
import type { TrainingConfig } from '../types';
import Training from '../components/Training/Training';
import TrainingStats from '../components/TrainingStats/TrainingStats';
import Configuration from '../components/Configuration/Configuration';
import AdvancedConfiguration from '../components/AdvancedConfiguration/AdvancedConfiguration';
import { chords } from '../chordData';

type TrainingPageProps = {
  config: TrainingConfig;
  onConfigChange: (config: TrainingConfig) => void;
};

export default function TrainingPage({ config, onConfigChange }: TrainingPageProps) {
  const [chordCount, setChordCount] = useState(0);
  const [practiceTime, setPracticeTime] = useState('0:00');

  const handleStatsChange = useCallback((count: number, time: string) => {
    setChordCount(count);
    setPracticeTime(time);
  }, []);

  const saveTrainingSession = useCallback((chordCount: number, practiceTimeSeconds: number) => {
    if (chordCount === 0 && practiceTimeSeconds === 0) return;
    
    const sessions = JSON.parse(localStorage.getItem('trainingSessions') || '[]');
    const newSession = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      chordCount,
      practiceTime: practiceTimeSeconds,
      scale: config.scale,
      difficulty: config.barreOption
    };
    sessions.unshift(newSession);
    localStorage.setItem('trainingSessions', JSON.stringify(sessions));
  }, [config.scale, config.barreOption]);

  return (
    <div className="training-panel">
      <Training 
        config={config} 
        onStatsChange={handleStatsChange}
        onSaveSession={saveTrainingSession}
      />
      <div className="config-panel">
        <TrainingStats chordCount={chordCount} practiceTime={practiceTime} />
        <Configuration config={config} onConfigChange={onConfigChange} />
        <AdvancedConfiguration
          config={config}
          onConfigChange={onConfigChange}
          chords={chords}
        />
      </div>
    </div>
  );
}

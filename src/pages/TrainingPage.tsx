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
  onSaveSession: (
    chordCount: number,
    practiceTimeSeconds: number,
    chordStats: Record<string, number>
  ) => void;
};

export default function TrainingPage({ config, onConfigChange, onSaveSession }: TrainingPageProps) {
  const [chordCount, setChordCount] = useState(0);
  const [practiceTime, setPracticeTime] = useState('0:00');
  

  const handleStatsChange = useCallback((count: number, time: string) => {
    setChordCount(count);
    setPracticeTime(time);
  }, []);

  return (
    <div className="training-panel">
      <Training 
        config={config} 
        onStatsChange={handleStatsChange}
        onSaveSession={onSaveSession}
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

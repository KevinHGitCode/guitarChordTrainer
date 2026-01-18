import './TrainingStats.css';

interface TrainingStatsProps {
  chordCount: number;
  practiceTime: string;
}

export default function TrainingStats({ chordCount, practiceTime }: TrainingStatsProps) {
  return (
    <div className="training-stats-panel">
      <div className="stat-item">
        <span className="stat-label">Acordes practicados:</span>
        <span className="stat-value">{chordCount}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Tiempo de práctica:</span>
        <span className="stat-value">{practiceTime}</span>
      </div>
    </div>
  );
}


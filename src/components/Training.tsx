import { useState, useEffect, useRef, useMemo } from 'react';
import type { Chord, TrainingConfig } from '../types';
import { getChordsByConfig } from '../chordData';
import './Training.css';

interface TrainingProps {
  config: TrainingConfig;
}

export default function Training({ config }: TrainingProps) {
  const chords = useMemo<Chord[]>(() => 
    getChordsByConfig(config.scale, config.barreOption, config.selectedChords),
    [config.scale, config.barreOption, config.selectedChords]
  );
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(config.duration);
  const [isPaused, setIsPaused] = useState(false);
  const [chordCount, setChordCount] = useState(0);
  const [practiceTime, setPracticeTime] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const chordsRef = useRef<Chord[]>(chords);

  // Update chords ref when chords change
  useEffect(() => {
    chordsRef.current = chords;
  }, [chords]);

  const nextChord = () => {
    if (chordsRef.current.length === 0) return;
    setCurrentChordIndex((prev) => (prev + 1) % chordsRef.current.length);
    setChordCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (!isPaused && chords.length > 0) {
      // Chord timer
      setTimeRemaining(config.duration);
      timerRef.current = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            nextChord();
            return config.duration;
          }
          return prev - 1;
        });
      }, 1000);

      // Practice time counter
      intervalRef.current = window.setInterval(() => {
        setPracticeTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, config.duration, chords.length]);

  // Reset chord index when chords change
  useEffect(() => {
    if (chords.length > 0) {
      setCurrentChordIndex(0);
    }
  }, [chords]);

  const restart = () => {
    setCurrentChordIndex(0);
    setTimeRemaining(config.duration);
    setChordCount(0);
    setPracticeTime(0);
    startTimeRef.current = Date.now();
    setIsPaused(false);
  };

  const togglePause = () => {
    if (isPaused) {
      startTimeRef.current = Date.now() - practiceTime * 1000;
    }
    setIsPaused(!isPaused);
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (chords.length === 0) {
    return (
      <div className="training">
        <div className="no-chords">
          <p>No hay acordes disponibles con la configuración seleccionada.</p>
          <p>Por favor, ajusta los filtros en la configuración.</p>
        </div>
      </div>
    );
  }

  const currentChord = chords[currentChordIndex];
  const progress = ((config.duration - timeRemaining) / config.duration) * 100;

  return (
    <div className="training">
      <div className="training-stats">
        <div className="stat-item">
          <span className="stat-label">Acordes practicados:</span>
          <span className="stat-value">{chordCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Tiempo de práctica:</span>
          <span className="stat-value">{formatTime(practiceTime)}</span>
        </div>
      </div>

      <div className="chord-display">
        <div className="chord-image-container">
          <img
            src={currentChord.imageUrl}
            alt={currentChord.displayName}
            className="chord-image"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QWNvcmRlIGRlIGd1aXRhcnI8L3RleHQ+PC9zdmc+';
            }}
          />
        </div>
        
        <div className="chord-name-large">{currentChord.name}</div>
        <div className="chord-name-full">{currentChord.displayName}</div>
      </div>

      <div className="timer-section">
        <div className="timer-label">Tiempo restante:</div>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="timer-value">{timeRemaining}s</div>
      </div>

      <div className="training-controls">
        <button
          className={`control-button pause-button ${isPaused ? 'paused' : ''}`}
          onClick={togglePause}
        >
          {isPaused ? '▶ CONTINUAR' : 'II PAUSA'}
        </button>
        <button
          className="control-button restart-button"
          onClick={restart}
        >
          🔄 REINICIAR
        </button>
      </div>
    </div>
  );
}


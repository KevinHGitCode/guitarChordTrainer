import { useState, useEffect, useRef, useMemo } from 'react';
import type { Chord, TrainingConfig } from '../types';
import { getChordsByConfig } from '../chordData';
import './Training.css';

interface TrainingProps {
  config: TrainingConfig;
  onStatsChange: (chordCount: number, practiceTime: string) => void;
}

export default function Training({ config, onStatsChange }: TrainingProps) {
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

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  // Update stats in parent
  useEffect(() => {
    const hours = Math.floor(practiceTime / 3600);
    const minutes = Math.floor((practiceTime % 3600) / 60);
    const secs = practiceTime % 60;
    const formattedTime = hours > 0
      ? `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      : `${minutes}:${secs.toString().padStart(2, '0')}`;
    onStatsChange(chordCount, formattedTime);
  }, [chordCount, practiceTime, onStatsChange]);

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
      <div className="training-left">

        <div className="chord-name-large">{currentChord.name}</div>
        <div className="chord-name-full">{currentChord.displayName}</div>

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
            {isPaused ? (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                CONTINUAR
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
                PAUSA
              </>
            )}
          </button>
          <button
            className="control-button restart-button"
            onClick={restart}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
              <path d="M3 21v-5h5"/>
            </svg>
            REINICIAR
          </button>
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
      </div>
    </div>
  );
}


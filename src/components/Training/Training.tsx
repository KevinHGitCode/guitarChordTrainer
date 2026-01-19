import { useState, useEffect, useRef, useMemo } from 'react';
import type { Chord, TrainingConfig } from '../../types';
import { getChordsByConfig } from '../../chordData';
import './Training.css';

interface TrainingProps {
  config: TrainingConfig;
  onStatsChange: (chordCount: number, practiceTime: string) => void;
  onSaveSession?: (
    chordCount: number,
    practiceTimeSeconds: number,
    chordStats: Record<string, number>
  ) => void;
}

export default function Training({ config, onStatsChange, onSaveSession }: TrainingProps) {
  const chords = useMemo<Chord[]>(() => 
    getChordsByConfig(config.scale, config.barreOption, config.selectedChords),
    [config.scale, config.barreOption, config.selectedChords]
  );

  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(config.duration);
  const [isPaused, setIsPaused] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [chordCount, setChordCount] = useState(0);
  const [practiceTime, setPracticeTime] = useState(0);
  const [chordStats, setChordStats] = useState<Record<string, number>>({});
  const [renderTrigger, setRenderTrigger] = useState(0);

  const intervalRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const chordsRef = useRef<Chord[]>(chords);
  const currentChordIndexRef = useRef(0);

  useEffect(() => {
    chordsRef.current = chords;
  }, [chords]);

  const nextChord = () => {
    if (chordsRef.current.length === 0) return;

    const current = chordsRef.current[currentChordIndexRef.current].name;
    console.log(`Contando acorde: ${current}`);

    setChordStats(prev => ({
      ...prev,
      [current]: (prev[current] || 0) + 1
    }));

    currentChordIndexRef.current = (currentChordIndexRef.current + 1) % chordsRef.current.length;
    setRenderTrigger(prev => prev + 1);
    setChordCount((prev) => prev + 1);
  };


  useEffect(() => {
    if (hasStarted && !isPaused && chords.length > 0) {
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

      intervalRef.current = window.setInterval(() => {
        setPracticeTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hasStarted, isPaused, config.duration, chords.length]);

  useEffect(() => {
    if (chords.length > 0) {
      currentChordIndexRef.current = 0;
      setRenderTrigger(prev => prev + 1);
    }
  }, [chords]);

  useEffect(() => {
    const hours = Math.floor(practiceTime / 3600);
    const minutes = Math.floor((practiceTime % 3600) / 60);
    const secs = practiceTime % 60;
    const formattedTime = hours > 0
      ? `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      : `${minutes}:${secs.toString().padStart(2, '0')}`;

    onStatsChange(chordCount, formattedTime);
  }, [chordCount, practiceTime, onStatsChange]);

  const finalizarSesion = () => {
    if (onSaveSession && (chordCount > 0 || practiceTime > 0)) {
      onSaveSession(chordCount, practiceTime, chordStats);
    }

    currentChordIndexRef.current = 0;
    setTimeRemaining(config.duration);
    setChordCount(0);
    setPracticeTime(0);
    setIsPaused(true);
    setHasStarted(false);
    setChordStats({});
    setRenderTrigger(prev => prev + 1);
  };

  const handleMainButton = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setIsPaused(false);
      startTimeRef.current = Date.now();
      return;
    }

    if (isPaused) {
      setIsPaused(false);
      startTimeRef.current = Date.now() - practiceTime * 1000;
    } else {
      setIsPaused(true);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.code === 'Space' &&
        e.target === document.body &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        handleMainButton();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleMainButton]);

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

  const currentChord = chords[currentChordIndexRef.current];
  const progress = ((config.duration - timeRemaining) / config.duration) * 100;

  let mainButtonText = 'INICIAR';
  if (hasStarted && !isPaused) mainButtonText = 'PAUSA';
  if (hasStarted && isPaused) mainButtonText = 'CONTINUAR';

  let mainButtonIcon =
    !hasStarted
      ? 'https://api.iconify.design/heroicons:play-solid.svg?color=white'
      : isPaused
      ? 'https://api.iconify.design/heroicons:play-solid.svg?color=white'
      : 'https://api.iconify.design/heroicons:pause-solid.svg?color=white';

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
            onClick={handleMainButton}
          >
            <img src={mainButtonIcon} className="control-icon" />
            {mainButtonText}
          </button>

          {hasStarted && (chordCount > 0 || practiceTime > 0) && (
            <button
              className="control-button restart-button"
              onClick={finalizarSesion}
            >
              <img src="https://api.iconify.design/heroicons:stop-solid.svg?color=white" className="control-icon" />
              FINALIZAR
            </button>
          )}
        </div>
      </div>

      <div className="chord-display-wrapper">
        <div className="chord-display">
          <img
            src={currentChord.imageUrl}
            alt={currentChord.displayName}
            className="chord-image"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QWNvcmRlIGRlIGd1aXRhcnI8L3RleHQ+PC9zdmc+';
            }}
          />
        </div>
      </div>
    </div>
  );
}

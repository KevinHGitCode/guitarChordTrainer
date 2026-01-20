import type { Chord } from '../../types';
import ChordCard from './ChordCard';

interface ChordGridProps {
  chords: Chord[];
  onChordVisibilityToggle: (chordName: string) => void;
}

export default function ChordGrid({
  chords,
  onChordVisibilityToggle,
}: ChordGridProps) {
  return (
    <div className="chord-grid">
      {chords.map((chord) => (
        <ChordCard
          key={chord.name}
          chord={chord}
          onVisibilityToggle={onChordVisibilityToggle}
        />
      ))}
    </div>
  );
}

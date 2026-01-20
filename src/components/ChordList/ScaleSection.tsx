import type { Chord } from '../../types';
import ScaleHeader from './ScaleHeader';
import ChordGrid from './ChordGrid';

interface ScaleSectionProps {
  scale: string;
  chords: Chord[];
  isExpanded: boolean;
  openMenuScale: string | null;
  hiddenChords: Set<string>;
  onToggleExpand: (scale: string) => void;
  onMenuToggle: (scale: string) => void;
  onChordVisibilityToggle: (chordName: string) => void;
  onHideSharps: (chords: Chord[]) => void;
  onHideBarre: (chords: Chord[]) => void;
  onShowAll: (chords: Chord[]) => void;
  originalScaleChords: Chord[];
}

export default function ScaleSection({
  scale,
  chords,
  isExpanded,
  openMenuScale,
  hiddenChords,
  onToggleExpand,
  onMenuToggle,
  onChordVisibilityToggle,
  onHideSharps,
  onHideBarre,
  onShowAll,
  originalScaleChords,
}: ScaleSectionProps) {
  return (
    <div className="scale-section">
      <ScaleHeader
        scale={scale}
        chordCount={chords.length}
        isExpanded={isExpanded}
        onToggleExpand={() => onToggleExpand(scale)}
        openMenuScale={openMenuScale}
        onMenuToggle={() => onMenuToggle(scale)}
        onHideSharps={() => onHideSharps(originalScaleChords)}
        onHideBarre={() => onHideBarre(originalScaleChords)}
        onShowAll={() => onShowAll(originalScaleChords)}
        scaleChords={originalScaleChords}
        hiddenChords={hiddenChords}
      />

      {isExpanded && (
        <ChordGrid
          chords={chords}
          onChordVisibilityToggle={onChordVisibilityToggle}
        />
      )}
    </div>
  );
}

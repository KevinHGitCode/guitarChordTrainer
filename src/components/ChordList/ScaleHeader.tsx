import type { Chord } from '../../types';

interface ScaleHeaderProps {
  scale: string;
  chordCount: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  openMenuScale: string | null;
  onMenuToggle: () => void;
  onHideSharps: () => void;
  onHideBarre: () => void;
  onShowAll: () => void;
  scaleChords: Chord[];
  hiddenChords: Set<string>;
}

export default function ScaleHeader({
  scale,
  chordCount,
  isExpanded,
  onToggleExpand,
  openMenuScale,
  onMenuToggle,
  onHideSharps,
  onHideBarre,
  onShowAll,
  scaleChords,
  hiddenChords,
}: ScaleHeaderProps) {
  const isMenuOpen = openMenuScale === scale;

  const hasSharpsVisible = scaleChords.some(
    (c) => c.name.includes('#') && !hiddenChords.has(c.name)
  );

  const hasBarreVisible = scaleChords.some(
    (c) => c.hasBarre && !hiddenChords.has(c.name)
  );

  const isAllVisible = scaleChords.every((c) => !hiddenChords.has(c.name));

  return (
    <div className="scale-header">
      <div className="scale-title-container">
        <button
          className={`expand-button ${isExpanded ? 'expanded' : ''}`}
          onClick={onToggleExpand}
        >
          ▶
        </button>
        <h3 className="scale-title">{scale}</h3>
        <span className="chord-count">({chordCount})</span>
      </div>

      <div className="menu-container">
        <button className="menu-button" onClick={onMenuToggle}>
          ⋮
        </button>

        {isMenuOpen && (
          <div className="menu-dropdown">
            <button
              className="menu-item"
              onClick={() => {
                onHideSharps();
                onMenuToggle();
              }}
            >
              <span>Semitonos (#)</span>
              {hasSharpsVisible && <span className="menu-indicator">◉</span>}
            </button>
            <button
              className="menu-item"
              onClick={() => {
                onHideBarre();
                onMenuToggle();
              }}
            >
              <span>Cejilla</span>
              {hasBarreVisible && <span className="menu-indicator">◉</span>}
            </button>
            <div className="menu-divider" />
            <button
              className="menu-item"
              onClick={() => {
                onShowAll();
                onMenuToggle();
              }}
            >
              <span>Mostrar todos</span>
              {isAllVisible && <span className="menu-check">✓</span>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

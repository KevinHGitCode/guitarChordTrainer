import { useState, useMemo } from 'react';
import type { Chord } from '../../types';
import './ChordList.css';

interface ChordListProps {
  chords: Chord[];
  scale: string;
}

interface ScaleSection {
  scale: string;
  chords: Chord[];
}

export default function ChordList({ chords, scale }: ChordListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedScales, setExpandedScales] = useState<Set<string>>(new Set(['Mayor', 'Menor']));
  const [hiddenChords, setHiddenChords] = useState<Set<string>>(new Set());
  const [openMenuScale, setOpenMenuScale] = useState<string | null>(null);

  // Agrupar acordes por escala
  const scaleSections = useMemo<ScaleSection[]>(() => {
    const scales = new Map<string, Chord[]>();
    chords.forEach(chord => {
      if (!scales.has(chord.scale)) {
        scales.set(chord.scale, []);
      }
      scales.get(chord.scale)!.push(chord);
    });
    
    return Array.from(scales.entries())
      .map(([scale, chords]) => ({ scale, chords: chords.sort((a, b) => a.name.localeCompare(b.name)) }))
      .sort((a, b) => a.scale.localeCompare(b.scale));
  }, [chords]);

  // Filtrar acordes por búsqueda
  const filteredSections = useMemo(() => {
    return scaleSections.map(section => ({
      ...section,
      chords: section.chords.filter(chord => {
        const matchesSearch = 
          chord.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          chord.displayName.toLowerCase().includes(searchTerm.toLowerCase());
        const isNotHidden = !hiddenChords.has(chord.name);
        return matchesSearch && isNotHidden;
      })
    })).filter(section => section.chords.length > 0);
  }, [scaleSections, searchTerm, hiddenChords]);

  const toggleScaleExpand = (scale: string) => {
    const newExpanded = new Set(expandedScales);
    if (newExpanded.has(scale)) {
      newExpanded.delete(scale);
    } else {
      newExpanded.add(scale);
    }
    setExpandedScales(newExpanded);
  };

  const toggleChordVisibility = (chordName: string) => {
    const newHidden = new Set(hiddenChords);
    if (newHidden.has(chordName)) {
      newHidden.delete(chordName);
    } else {
      newHidden.add(chordName);
    }
    setHiddenChords(newHidden);
  };

  const hideSharpsForScale = (scaleChords: Chord[]) => {
    scaleChords.forEach(chord => {
      if (chord.name.includes('#')) {
        setHiddenChords(prev => new Set(prev).add(chord.name));
      }
    });
  };

  const hideBarreForScale = (scaleChords: Chord[]) => {
    scaleChords.forEach(chord => {
      if (chord.hasBarre) {
        setHiddenChords(prev => new Set(prev).add(chord.name));
      }
    });
  };

  const showAllForScale = (scaleChords: Chord[]) => {
    const newHidden = new Set(hiddenChords);
    scaleChords.forEach(chord => {
      newHidden.delete(chord.name);
    });
    setHiddenChords(newHidden);
  };

  const isAllVisibleForScale = (scaleChords: Chord[]) => {
    return scaleChords.every(chord => !hiddenChords.has(chord.name));
  };

  const areAllHiddenForScale = (scaleChords: Chord[]) => {
    return scaleChords.every(chord => hiddenChords.has(chord.name));
  };

  return (
    <div className="chord-list-container">
      <div className="header-container">
        <h2 className="chord-list-title">Lista de Acordes</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar acorde..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Secciones por escala */}
      <div className="scales-container">
        {filteredSections.length === 0 ? (
          <div className="no-results">
            <p>No se encontraron acordes que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          filteredSections.map((section) => {
            // Obtener la escala original sin filtrar por búsqueda
            const originalScaleChords = scaleSections.find(s => s.scale === section.scale)?.chords || section.chords;
            
            return (
            <div key={section.scale} className="scale-section">
              <div className="scale-header">
                <div className="scale-title-container">
                  <button
                    className={`expand-button ${expandedScales.has(section.scale) ? 'expanded' : ''}`}
                    onClick={() => toggleScaleExpand(section.scale)}
                  >
                    ▶
                  </button>
                  <h3 className="scale-title">{section.scale}</h3>
                  <span className="chord-count">({section.chords.length})</span>
                </div>

                <div className="menu-container">
                  <button
                    className="menu-button"
                    onClick={() => setOpenMenuScale(openMenuScale === section.scale ? null : section.scale)}
                  >
                    ⋮
                  </button>

                  {openMenuScale === section.scale && (
                    <div className="menu-dropdown">
                      <button
                        className="menu-item"
                        onClick={() => {
                          hideSharpsForScale(originalScaleChords);
                          setOpenMenuScale(null);
                        }}
                      >
                        <span>Semitonos (#)</span>
                        {originalScaleChords.some(c => c.name.includes('#') && !hiddenChords.has(c.name)) && (
                          <span className="menu-indicator">◉</span>
                        )}
                      </button>
                      <button
                        className="menu-item"
                        onClick={() => {
                          hideBarreForScale(originalScaleChords);
                          setOpenMenuScale(null);
                        }}
                      >
                        <span>Cejilla</span>
                        {originalScaleChords.some(c => c.hasBarre && !hiddenChords.has(c.name)) && (
                          <span className="menu-indicator">◉</span>
                        )}
                      </button>
                      <div className="menu-divider" />
                      <button
                        className="menu-item"
                        onClick={() => {
                          showAllForScale(originalScaleChords);
                          setOpenMenuScale(null);
                        }}
                      >
                        <span>Mostrar todos</span>
                        {isAllVisibleForScale(originalScaleChords) && (
                          <span className="menu-check">✓</span>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {expandedScales.has(section.scale) && (
                <div className="chord-grid">
                  {section.chords.map((chord) => (
                    <div
                      key={chord.name}
                      className="chord-card"
                      onContextMenu={(e) => {
                        e.preventDefault();
                        toggleChordVisibility(chord.name);
                      }}
                    >
                      <div className="chord-card-image">
                        <img
                          src={chord.imageUrl}
                          alt={chord.displayName}
                          className="chord-card-img"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QWNvcmRlPC90ZXh0Pjwvc3ZnPg==';
                          }}
                        />
                      </div>
                      <div className="chord-card-info">
                        <div className="chord-card-name">{chord.name}</div>
                        <div className="chord-card-full-name">{chord.displayName}</div>
                        {chord.hasBarre && (
                          <span className="chord-card-barre">Cejilla</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            );
          })
        )}
      </div>
    </div>
  );
}

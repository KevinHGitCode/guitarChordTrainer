import { useState, useMemo } from 'react';
import type { Chord } from '../../types';
import SearchBar from './SearchBar';
import ScaleSection from './ScaleSection';
import './ChordList.css';

interface ChordListProps {
  chords: Chord[];
  scale: string;
}

interface ScaleSectionData {
  scale: string;
  chords: Chord[];
}

/**
 * ChordList - Contenedor / Orquestador
 * 
 * Responsabilidades:
 * - Gestionar estado global (searchTerm, expandedScales, hiddenChords, openMenuScale)
 * - Lógica de filtrado y agrupación (useMemo)
 * - Funciones de negocio (hideSharps, hideBarre, etc.)
 * - Coordinar componentes hijos
 * 
 * NO renderiza detalles específicos, solo coordina
 */
export default function ChordList({ chords, scale }: ChordListProps) {
  // =====================
  // ESTADO GLOBAL
  // =====================
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedScales, setExpandedScales] = useState<Set<string>>(new Set(['Mayor', 'Menor']));
  const [hiddenChords, setHiddenChords] = useState<Set<string>>(new Set());
  const [openMenuScale, setOpenMenuScale] = useState<string | null>(null);

  // =====================
  // LÓGICA DE AGRUPACIÓN
  // =====================
  const scaleSections = useMemo<ScaleSectionData[]>(() => {
    const scales = new Map<string, Chord[]>();
    chords.forEach(chord => {
      if (!scales.has(chord.scale)) {
        scales.set(chord.scale, []);
      }
      scales.get(chord.scale)!.push(chord);
    });
    
    return Array.from(scales.entries())
      .map(([scale, chords]) => ({ 
        scale, 
        chords: chords.sort((a, b) => a.name.localeCompare(b.name)) 
      }))
      .sort((a, b) => a.scale.localeCompare(b.scale));
  }, [chords]);

  // =====================
  // LÓGICA DE FILTRADO
  // =====================
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

  // =====================
  // FUNCIONES DE NEGOCIO
  // =====================
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

  const toggleMenuScale = (scale: string) => {
    setOpenMenuScale(openMenuScale === scale ? null : scale);
  };

  // =====================
  // RENDERIZADO
  // =====================
  return (
    <div className="chord-list-container">
      <div className="header-container">
        <h2 className="chord-list-title">Lista de Acordes</h2>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      <div className="scales-container">
        {filteredSections.length === 0 ? (
          <div className="no-results">
            <p>No se encontraron acordes que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          filteredSections.map((section) => {
            const originalScaleChords = scaleSections.find(
              (s) => s.scale === section.scale
            )?.chords || section.chords;

            return (
              <ScaleSection
                key={section.scale}
                scale={section.scale}
                chords={section.chords}
                isExpanded={expandedScales.has(section.scale)}
                openMenuScale={openMenuScale}
                hiddenChords={hiddenChords}
                onToggleExpand={toggleScaleExpand}
                onMenuToggle={toggleMenuScale}
                onChordVisibilityToggle={toggleChordVisibility}
                onHideSharps={hideSharpsForScale}
                onHideBarre={hideBarreForScale}
                onShowAll={showAllForScale}
                originalScaleChords={originalScaleChords}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

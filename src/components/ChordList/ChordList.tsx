import { useState } from 'react';
import type { Chord } from '../../types';
import './ChordList.css';

interface ChordListProps {
  chords: Chord[];
  scale: string;
}

export default function ChordList({ chords, scale }: ChordListProps) {
  const [hideSharps, setHideSharps] = useState(false);

  const filteredChords = chords.filter(chord => {
    const matchesScale = scale === 'Ambos' || chord.scale === scale;
    const noSharps = hideSharps ? !chord.name.includes('#') : true;
    return matchesScale && noSharps;
  });

  return (
    <div className="chord-list-container">
      <h2 className="chord-list-title">Lista de Acordes</h2>

      {/* Checkbox */}
      <label className="sharp-filter">
        <input
          type="checkbox"
          checked={hideSharps}
          onChange={() => setHideSharps(!hideSharps)}
        />
        Ocultar sostenidos (#)
      </label>

      <div className="chord-grid">
        {filteredChords.map((chord) => (
          <div key={chord.name} className="chord-card">
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
    </div>
  );
}

import { useState, useEffect } from 'react';
import type { TrainingConfig, SavedConfig, Chord } from '../../types';
import './AdvancedConfiguration.css';

interface AdvancedConfigurationProps {
  config: TrainingConfig;
  onConfigChange: (config: TrainingConfig) => void;
  chords: Chord[];
}

export default function AdvancedConfiguration({
  config,
  onConfigChange,
  chords
}: AdvancedConfigurationProps) {
  const [savedConfigs, setSavedConfigs] = useState<SavedConfig[]>(() => {
    const stored = localStorage.getItem('savedChordConfigs');
    return stored ? JSON.parse(stored) : [];
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedChords, setSelectedChords] = useState<string[]>(
    config.selectedChords || []
  );
  const [configName, setConfigName] = useState('');

  useEffect(() => {
    onConfigChange({
      ...config,
      selectedChords: selectedChords.length > 0 ? selectedChords : undefined,
      difficulty: selectedChords.length > 0 ? 'Personalizado' : config.difficulty
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChords]);

  const toggleChord = (chordName: string) => {
    setSelectedChords(prev =>
      prev.includes(chordName)
        ? prev.filter(c => c !== chordName)
        : [...prev, chordName]
    );
  };

  const saveConfig = () => {
    if (!configName.trim() || savedConfigs.length >= 5) return;

    const newConfig: SavedConfig = {
      ...config,
      id: Date.now().toString(),
      name: configName.trim(),
      selectedChords: selectedChords.length > 0 ? selectedChords : undefined
    };

    const updated = [...savedConfigs, newConfig];
    setSavedConfigs(updated);
    localStorage.setItem('savedChordConfigs', JSON.stringify(updated));
    setConfigName('');
  };

  const loadConfig = (savedConfig: SavedConfig) => {
    onConfigChange({
      scale: savedConfig.scale,
      barreOption: savedConfig.barreOption,
      duration: savedConfig.duration,
      selectedChords: savedConfig.selectedChords,
      difficulty: savedConfig.difficulty
    });
    setSelectedChords(savedConfig.selectedChords || []);
  };

  const deleteConfig = (id: string) => {
    const updated = savedConfigs.filter(c => c.id !== id);
    setSavedConfigs(updated);
    localStorage.setItem('savedChordConfigs', JSON.stringify(updated));
  };

  const clearSelection = () => {
    setSelectedChords([]);
  };

  return (
    <div className="advanced-configuration">
      <button
        className="toggle-advanced"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        {showAdvanced ? '▼' : '▶'} Configuración Avanzada
      </button>

      {showAdvanced && (
        <div className="advanced-content">
          <div className="chord-selector">
            <h4>Seleccionar Acordes:</h4>
            <div className="chord-checkboxes">
              {chords.map(chord => (
                <label key={chord.name} className="chord-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedChords.includes(chord.name)}
                    onChange={() => toggleChord(chord.name)}
                  />
                  <span>{chord.displayName}</span>
                </label>
              ))}
            </div>
            <button
              className="clear-button"
              onClick={clearSelection}
              disabled={selectedChords.length === 0}
            >
              Limpiar Selección
            </button>
            {selectedChords.length > 0 && (
              <p className="selected-count">
                {selectedChords.length} acorde(s) seleccionado(s)
              </p>
            )}
          </div>

          <div className="save-config-section">
            <h4>Guardar Configuración:</h4>
            <div className="save-controls">
              <input
                type="text"
                placeholder="Nombre de la configuración"
                value={configName}
                onChange={(e) => setConfigName(e.target.value)}
                className="config-name-input"
                maxLength={30}
              />
              <button
                className="save-button"
                onClick={saveConfig}
                disabled={!configName.trim() || savedConfigs.length >= 5}
              >
                Guardar ({savedConfigs.length}/5)
              </button>
            </div>
          </div>

          {savedConfigs.length > 0 && (
            <div className="saved-configs">
              <h4>Configuraciones Guardadas:</h4>
              <div className="saved-configs-list">
                {savedConfigs.map(savedConfig => (
                  <div key={savedConfig.id} className="saved-config-item">
                    <div className="saved-config-info">
                      <span className="saved-config-name">{savedConfig.name}</span>
                      <span className="saved-config-details">
                        {savedConfig.scale} • {savedConfig.barreOption} • {savedConfig.selectedChords?.length || 'Todos'} acordes
                      </span>
                    </div>
                    <div className="saved-config-actions">
                      <button
                        className="load-button"
                        onClick={() => loadConfig(savedConfig)}
                      >
                        Cargar
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => deleteConfig(savedConfig.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


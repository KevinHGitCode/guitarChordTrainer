import { useState, useEffect } from 'react';
import type { TrainingConfig, SavedConfig } from '../../types';
import { getChordsByConfig, applySuperficialFilters, chords as allChords } from '../../chordData';
import './AdvancedConfiguration.css';

interface AdvancedConfigurationProps {
  config: TrainingConfig;
  onConfigChange: (config: TrainingConfig) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdvancedConfiguration({
  config,
  onConfigChange,
  isOpen,
  onClose
}: AdvancedConfigurationProps) {
  const [savedConfigs, setSavedConfigs] = useState<SavedConfig[]>(() => {
    const stored = localStorage.getItem('savedChordConfigs');
    return stored ? JSON.parse(stored) : [];
  });
  // Guarda si el usuario realmente cambió acordes (clickeó checkboxes)
  const [userToggledChords, setUserToggledChords] = useState(false);
  // Estado local para lo que se muestra (incluye pre-marcados mientras esté abierto)
  const [displayedChords, setDisplayedChords] = useState<string[]>(
    config.selectedChords || []
  );
  // Track si hubo cambios para saber si guardar al cerrar
  const [hasChanges, setHasChanges] = useState(false);
  const [configName, setConfigName] = useState('');
  const [barreFilter, setBarreFilter] = useState<'none' | 'exclude-barre' | 'only-barre'>(
    config.barreFilter || 'none'
  );
  const [sharpsFilter, setSharpFilter] = useState<'none' | 'exclude-sharps' | 'only-sharps'>(
    config.sharpsFilter || 'none'
  );

  // Mostrar TODOS los acordes, no solo los de la escala
  const allChordsToDisplay = allChords;

  // Pre-marcar acordes de la escala seleccionada SOLO VISUALMENTE cuando se abre sin selectedChords
  useEffect(() => {
    if (isOpen) {
      if (!config.selectedChords && !config.configName) {
        // Sin acordes seleccionados: pre-marcar acordes de la escala para visual
        const scaleChords = allChords
          .filter(chord => chord.scale === config.scale)
          .map(chord => chord.name);
        setDisplayedChords(scaleChords);
      } else if (config.selectedChords) {
        // Con acordes ya seleccionados: mostrar esos
        setDisplayedChords(config.selectedChords);
      } else {
        // Sin acordes y sin config: mostrar vacío
        setDisplayedChords([]);
      }
      setHasChanges(false);
      setUserToggledChords(false); // Reset al abrir
    }
  }, [isOpen, config.scale, config.configName, config.selectedChords]);

  // Cargar filtros cuando se abre la modal
  useEffect(() => {
    if (isOpen) {
      setBarreFilter(config.barreFilter || 'none');
      setSharpFilter(config.sharpsFilter || 'none');
    }
  }, [isOpen, config.barreFilter, config.sharpsFilter]);

  // Solo sincronizar con padre cuando se cierren, si hay cambios
  useEffect(() => {
    if (!isOpen && hasChanges) {
      // Solo guardar acordes si el usuario realmente los cambió (clickeó checkboxes)
      if (userToggledChords) {
        // Usuario cambió acordes
        onConfigChange({
          ...config,
          selectedChords: displayedChords.length > 0 ? displayedChords : undefined,
          barreFilter: barreFilter !== 'none' ? barreFilter : undefined,
          sharpsFilter: sharpsFilter !== 'none' ? sharpsFilter : undefined
        });
      } else {
        // Solo cambió filtros, no tocar selectedChords
        onConfigChange({
          ...config,
          barreFilter: barreFilter !== 'none' ? barreFilter : undefined,
          sharpsFilter: sharpsFilter !== 'none' ? sharpsFilter : undefined
        });
      }
      setHasChanges(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const toggleChord = (chordName: string) => {
    setDisplayedChords(prev =>
      prev.includes(chordName)
        ? prev.filter(c => c !== chordName)
        : [...prev, chordName]
    );
    setUserToggledChords(true); // El usuario realmente cambió acordes
    setHasChanges(true);
  };

  const handleBarreFilterChange = (value: 'none' | 'exclude-barre' | 'only-barre') => {
    setBarreFilter(value);
    setHasChanges(true);
  };

  const handleSharpsFilterChange = (value: 'none' | 'exclude-sharps' | 'only-sharps') => {
    setSharpFilter(value);
    setHasChanges(true);
  };

  const handleTestConfig = () => {
    // Obtener los acordes según la configuración
    const baseChords = displayedChords.length > 0
      ? getChordsByConfig(config.scale, displayedChords)
      : getChordsByConfig(config.scale);
    
    // Aplicar los filtros superficiales
    const filteredChords = applySuperficialFilters(baseChords, barreFilter, sharpsFilter);
    
    console.log('=== TEST CONFIGURACIÓN ===');
    console.log('Escala:', config.scale);
    console.log('Acordes personalizados:', displayedChords.length > 0 ? 'Sí' : 'No');
    if (barreFilter !== 'none' || sharpsFilter !== 'none') {
      console.log('⚠️ Filtros activos - algunos acordes pueden estar ocultos');
    }
    console.log('Total de acordes:', filteredChords.length);
    console.log('Acordes:', filteredChords.map(c => c.displayName));
    console.log('==========================');
  };

  const saveConfig = () => {
    if (!configName.trim() || savedConfigs.length >= 5) return;

    const newConfig: SavedConfig = {
      ...config,
      id: Date.now().toString(),
      name: configName.trim(),
      selectedChords: displayedChords.length > 0 ? displayedChords : undefined
    };

    const updated = [...savedConfigs, newConfig];
    setSavedConfigs(updated);
    localStorage.setItem('savedChordConfigs', JSON.stringify(updated));
    setConfigName('');
  };

  const loadConfig = (savedConfig: SavedConfig) => {
    setDisplayedChords(savedConfig.selectedChords || []);
    setBarreFilter(savedConfig.barreFilter || 'none');
    setSharpFilter(savedConfig.sharpsFilter || 'none');
    onConfigChange({
      scale: savedConfig.scale,
      duration: savedConfig.duration,
      selectedChords: savedConfig.selectedChords,
      configName: savedConfig.name,
      barreFilter: savedConfig.barreFilter,
      sharpsFilter: savedConfig.sharpsFilter
    });
  };

  const deleteConfig = (id: string) => {
    const updated = savedConfigs.filter(c => c.id !== id);
    setSavedConfigs(updated);
    localStorage.setItem('savedChordConfigs', JSON.stringify(updated));
  };

  const clearSelection = () => {
    setDisplayedChords([]);
    setUserToggledChords(true); // El usuario cambió acordes (los limpió)
    setHasChanges(true);
  };

  if (!isOpen) return null;

  return (
    <div className="advanced-configuration-overlay">
      <div className="advanced-configuration-modal">
        <div className="modal-header">
          <h2>Configuración Avanzada</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="modal-content">
          {/* Filtros */}
          <div className="filters-section">
            <h4>Filtros Superficiales</h4>
            <p className="filter-hint">Estos filtros no cambian tu selección, solo ocultarán acordes</p>
            
            <div className="filter-group">
              <span className="filter-label">Cejilla:</span>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="barre-filter"
                    value="none"
                    checked={barreFilter === 'none'}
                    onChange={() => handleBarreFilterChange('none')}
                  />
                  Sin filtro
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="barre-filter"
                    value="exclude-barre"
                    checked={barreFilter === 'exclude-barre'}
                    onChange={() => handleBarreFilterChange('exclude-barre')}
                  />
                  Anular con cejilla
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="barre-filter"
                    value="only-barre"
                    checked={barreFilter === 'only-barre'}
                    onChange={() => handleBarreFilterChange('only-barre')}
                  />
                  Solo con cejilla
                </label>
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Semitonos (#):</span>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="sharps-filter"
                    value="none"
                    checked={sharpsFilter === 'none'}
                    onChange={() => handleSharpsFilterChange('none')}
                  />
                  Sin filtro
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="sharps-filter"
                    value="exclude-sharps"
                    checked={sharpsFilter === 'exclude-sharps'}
                    onChange={() => handleSharpsFilterChange('exclude-sharps')}
                  />
                  Anular semitonos
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="sharps-filter"
                    value="only-sharps"
                    checked={sharpsFilter === 'only-sharps'}
                    onChange={() => handleSharpsFilterChange('only-sharps')}
                  />
                  Solo semitonos
                </label>
              </div>
            </div>
          </div>

          {/* Selector de Acordes */}
          <div className="chord-selector">
            <h4>Seleccionar Acordes Personalizados</h4>
            <div className="selection-controls">
              <button className="clear-button" onClick={clearSelection}>
                Limpiar Selección
              </button>
              <button
                className="test-config-button"
                onClick={handleTestConfig}
                title="Ver en consola los acordes que permite esta configuración"
              >
                🧪 Testear
              </button>
            </div>

            <div className="chord-checkboxes">
              {allChordsToDisplay.map(chord => {
                const isFiltered = 
                  (barreFilter === 'exclude-barre' && chord.hasBarre) ||
                  (barreFilter === 'only-barre' && !chord.hasBarre) ||
                  (sharpsFilter === 'exclude-sharps' && chord.name.includes('#')) ||
                  (sharpsFilter === 'only-sharps' && !chord.name.includes('#'));

                return (
                  <label key={chord.name} className={`chord-checkbox ${isFiltered ? 'filtered' : ''}`}>
                    <input
                      type="checkbox"
                      checked={displayedChords.includes(chord.name)}
                      onChange={() => toggleChord(chord.name)}
                    />
                    <span>{chord.displayName}</span>
                  </label>
                );
              })}
            </div>

            {displayedChords.length > 0 && (
              <p className="selected-count">
                {displayedChords.length} acorde(s) seleccionado(s)
              </p>
            )}
          </div>

          {/* Guardar configuración */}
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

          {/* Configuraciones guardadas */}
          {savedConfigs.length > 0 && (
            <div className="saved-configs">
              <h4>Configuraciones Guardadas:</h4>
              <div className="saved-configs-list">
                {savedConfigs.map(savedConfig => (
                  <div key={savedConfig.id} className="saved-config-item">
                    <div className="saved-config-info">
                      <span className="saved-config-name">{savedConfig.name}</span>
                      <span className="saved-config-details">
                        {savedConfig.scale} • {savedConfig.selectedChords?.length || 'Todos'} acordes
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

        <div className="modal-footer">
          <button className="close-modal-button" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}


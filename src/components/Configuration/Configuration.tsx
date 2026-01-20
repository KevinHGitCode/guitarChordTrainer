import type { TrainingConfig, Scale } from '../../types';
import './Configuration.css';

interface ConfigurationProps {
  config: TrainingConfig;
  onConfigChange: (config: TrainingConfig) => void;
  onOpenAdvanced: () => void;
}

export default function Configuration({ config, onConfigChange, onOpenAdvanced }: ConfigurationProps) {
  const handleScaleChange = (scale: Scale) => {
    onConfigChange({
      ...config,
      scale,
      selectedChords: undefined, // limpiar acordes personalizados
      configName: undefined // limpiar el nombre de configuración guardada
    });
  };

  const handleDurationChange = (duration: number) => {
    onConfigChange({
      ...config,
      duration
    });
  };



  return (
    <div className="configuration">
      <h3 className="config-title">
        <img src="https://api.iconify.design/heroicons:cog-6-tooth-solid.svg?color=white" alt="config" className="config-icon" />
        Configuración
      </h3>

      <div className="config-group">
        <label htmlFor="scale">
          Escala:
          {(config.barreFilter && config.barreFilter !== 'none') || (config.sharpsFilter && config.sharpsFilter !== 'none') ? (
            <span className="filter-indicator" title="Filtros superficiales activos">🔍</span>
          ) : null}
        </label>
        <select
          id="scale"
          value={config.configName ? 'config' : (config.selectedChords && config.selectedChords.length > 0 ? 'Personalizada' : config.scale)}
          onChange={(e) => {
            const value = e.target.value;
            if (value !== 'Personalizada' && value !== 'config') {
              handleScaleChange(value as Scale);
            }
          }}
        >
          <option value="Mayor">Mayor</option>
          <option value="Menor">Menor</option>
          {config.configName && (
            <option value="config">{config.configName}</option>
          )}
          {!config.configName && config.selectedChords && config.selectedChords.length > 0 && (
            <option value="Personalizada">Personalizada</option>
          )}
        </select>
      </div>

      <div className="config-group">
        <label htmlFor="duration">
          Duración del acorde (segundos): <span className="duration-value">{config.duration}</span>
        </label>
        <input
          type="range"
          id="duration"
          min="1"
          max="60"
          value={config.duration}
          onChange={(e) => handleDurationChange(parseInt(e.target.value))}
          className="duration-slider"
        />
      </div>

      <div className="config-group">
        <button
          className="advanced-config-button"
          onClick={onOpenAdvanced}
        >
          ⚙️ Configuración Avanzada
        </button>
      </div>
    </div>
  );
}


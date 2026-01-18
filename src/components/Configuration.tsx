import type { TrainingConfig, Scale, BarreOption } from '../types';
import './Configuration.css';

interface ConfigurationProps {
  config: TrainingConfig;
  onConfigChange: (config: TrainingConfig) => void;
}

export default function Configuration({ config, onConfigChange }: ConfigurationProps) {
  const handleChange = (field: keyof TrainingConfig, value: string | number) => {
    onConfigChange({
      ...config,
      [field]: value
    });
  };

  return (
    <div className="configuration">
      <h3 className="config-title">
        <span className="config-icon">⚙️</span>
        Configuración
      </h3>
      
      <div className="config-group">
        <label htmlFor="scale">Escala:</label>
        <select
          id="scale"
          value={config.scale}
          onChange={(e) => handleChange('scale', e.target.value as Scale)}
        >
          <option value="Mayor">Mayor</option>
          <option value="Menor">Menor</option>
        </select>
      </div>

      <div className="config-group">
        <label htmlFor="barreOption">Dificultad:</label>
        <select
          id="barreOption"
          value={config.barreOption}
          onChange={(e) => handleChange('barreOption', e.target.value as BarreOption)}
        >
          <option value="Sin cejilla">Fácil (Sin cejilla)</option>
          <option value="Con cejilla">Intermedio (Con cejilla)</option>
          <option value="Ambos">Ambos</option>
        </select>
      </div>

      <div className="config-group">
        <label htmlFor="duration">
          Duración del acorde (segundos): {config.duration}
        </label>
        <input
          type="range"
          id="duration"
          min="1"
          max="60"
          value={config.duration}
          onChange={(e) => handleChange('duration', parseInt(e.target.value))}
          className="duration-slider"
        />
      </div>
    </div>
  );
}


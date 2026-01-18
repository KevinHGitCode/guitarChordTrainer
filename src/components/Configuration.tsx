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
        <svg className="config-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
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


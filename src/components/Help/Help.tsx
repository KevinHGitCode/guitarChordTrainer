import './Help.css';

export default function Help() {
  return (
    <div className="help">
      <div className="help-content">
        <section className="help-section">
          <h2 className="help-title">Acerca de Guitar Chord Trainer</h2>
          <p className="help-description">
            Guitar Chord Trainer es una aplicación web diseñada para ayudarte a practicar y agilizar 
            el cambio de acordes de guitarra. Practica a tu propio ritmo, personaliza tu experiencia 
            de entrenamiento y lleva un registro de tu progreso.
          </p>
        </section>

        <section className="help-section">
          <h3 className="help-subtitle">Atajos de Teclado</h3>
          <div className="shortcuts-list">
            <div className="shortcut-item">
              <kbd className="shortcut-key">Espacio</kbd>
              <span className="shortcut-description">Pausar / Reanudar entrenamiento</span>
            </div>
          </div>
        </section>

        <section className="help-section">
          <h3 className="help-subtitle">Características</h3>
          <ul className="features-list">
            <li>Practica acordes mayores y menores</li>
            <li>Selecciona dificultad (con o sin cejilla)</li>
            <li>Configura la duración de cada acorde (1-60 segundos)</li>
            <li>Guarda hasta 5 configuraciones personalizadas</li>
            <li>Registra tus entrenamientos y estadísticas</li>
            <li>Visualiza diagramas de acordes en tiempo real</li>
          </ul>
        </section>

        <section className="help-section">
          <h3 className="help-subtitle">About</h3>
          <div className="about-info">
            <div className="about-item">
              <span className="about-label">Creado por:</span>
              <span className="about-value">Kevin Diaz</span>
            </div>
            <div className="about-item">
              <span className="about-label">Fecha:</span>
              <span className="about-value">18-01-26</span>
            </div>
            <div className="about-item">
              <span className="about-label">Versión:</span>
              <span className="about-value">1.0.0</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


import './SessionSummary.css';

interface SessionSummaryProps {
  chordStats: Record<string, number>;
  onClose: () => void;
}

export default function SessionSummary({ chordStats, onClose }: SessionSummaryProps) {
  const sortedChords = Object.entries(chordStats)
    .sort(([, a], [, b]) => b - a);

  const totalPractices = Object.values(chordStats).reduce((sum, count) => sum + count, 0);

  return (
    <div className="session-summary-overlay">
      <div className="session-summary-modal">
        <div className="summary-header">
          <h2>Resumen de Acordes</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-label">Total de Acordes Practicados:</span>
            <span className="stat-value">{totalPractices}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Acordes Únicos:</span>
            <span className="stat-value">{sortedChords.length}</span>
          </div>
        </div>

        <div className="chords-list">
          <h3>Desglose por Acorde</h3>
          <div className="chords-table">
            {sortedChords.length === 0 ? (
              <p className="no-chords">No hay acordes registrados</p>
            ) : (
              sortedChords.map(([chord, count]) => (
                <div key={chord} className="chord-row">
                  <span className="chord-name">{chord}</span>
                  <div className="chord-bar-container">
                    <div
                      className="chord-bar"
                      style={{
                        width: `${(count / Math.max(...Object.values(chordStats))) * 100}%`
                      }}
                    />
                  </div>
                  <span className="chord-count">{count}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <button className="close-modal-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import SessionSummary from '../SessionSummary/SessionSummary';
import './TrainingHistory.css';

interface TrainingSession {
  id: string;
  date: string;
  chordCount: number;
  practiceTime: number;
  scale: string;
  difficulty: string;
  chordStats?: Record<string, number>;
}

export default function TrainingHistory() {
  const [sessions, setSessions] = useState<TrainingSession[]>(() => {
    const stored = localStorage.getItem('trainingSessions');
    return stored ? JSON.parse(stored) : [];
  });

  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('trainingSessions');
    if (stored) {
      setSessions(JSON.parse(stored));
    }
  }, []);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const clearHistory = () => {
    if (confirm('¿Estás seguro de que quieres eliminar todo el historial?')) {
      localStorage.removeItem('trainingSessions');
      setSessions([]);
    }
  };

  const deleteSession = (id: string) => {
    if (!confirm('¿Eliminar esta sesión?')) return;

    const updatedSessions = sessions.filter(s => s.id !== id);
    setSessions(updatedSessions);
    localStorage.setItem('trainingSessions', JSON.stringify(updatedSessions));
  };

  const viewSessionInConsole = (session: TrainingSession) => {
    console.log('Sesión:', session);
    setSelectedSession(session);
  };

  const totalChords = sessions.reduce((sum, session) => sum + session.chordCount, 0);
  const totalTime = sessions.reduce((sum, session) => sum + session.practiceTime, 0);

  return (
    <div className="training-history">
      <div className="history-header">
        <h2 className="history-title">Historial de Entrenamientos</h2>
        {sessions.length > 0 && (
          <button className="clear-history-button" onClick={clearHistory}>
            Limpiar Historial
          </button>
        )}
      </div>

      <div className="history-stats">
        <div className="stat-card">
          <div className="stat-label">Total de Sesiones</div>
          <div className="stat-value">{sessions.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Acordes</div>
          <div className="stat-value">{totalChords}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Tiempo Total</div>
          <div className="stat-value">{formatTime(totalTime)}</div>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="no-sessions">
          <p>No hay entrenamientos registrados todavía.</p>
          <p>Comienza a practicar para ver tus estadísticas aquí.</p>
        </div>
      ) : (
        <div className="sessions-list">
          {sessions.map((session) => (
            <div key={session.id} className="session-card">
              <div className="session-date">{formatDate(session.date)}</div>

              <div className="session-details">
                <div className="session-detail">
                  <span className="detail-label">Acordes:</span>
                  <span className="detail-value">{session.chordCount}</span>
                </div>

                <div className="session-detail">
                  <span className="detail-label">Tiempo:</span>
                  <span className="detail-value">{formatTime(session.practiceTime)}</span>
                </div>

                <div className="session-detail">
                  <span className="detail-label">Escala:</span>
                  <span className="detail-value">{session.scale}</span>
                </div>

                <div className="session-detail">
                  <span className="detail-label">Dificultad:</span>
                  <span className="detail-value">{session.difficulty}</span>
                </div>
              </div>

              <div className="session-actions">
                {session.chordStats && Object.keys(session.chordStats).length > 0 && (
                  <button
                    className="view-session-button"
                    onClick={() => viewSessionInConsole(session)}
                  >
                    Ver
                  </button>
                )}

                <button
                  className="delete-session-button"
                  onClick={() => deleteSession(session.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedSession && selectedSession.chordStats && (
        <SessionSummary
          chordStats={selectedSession.chordStats}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  );
}


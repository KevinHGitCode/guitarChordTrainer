import './Sidebar.css';

type Mode = 'training' | 'chordList';

interface SidebarProps {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ currentMode, onModeChange, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button className={`sidebar-toggle ${collapsed ? 'icon-rotated' : ''}`} onClick={onToggleCollapse} title={collapsed ? 'Expandir' : 'Colapsar'}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      {!collapsed && (
        <nav className="sidebar-nav">
          <button
            className={`nav-button ${currentMode === 'training' ? 'active' : ''}`}
            onClick={() => onModeChange('training')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 12a4 4 0 0 1-3-3.75V3.75a10 10 0 0 1 5.25-2.75 4 4 0 0 1 6.5 0A10 10 0 0 1 21 3.75v4.5a4 4 0 0 1-3 3.75"/>
              <path d="M6 12v8a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-8"/>
            </svg>
            <span>Entrenamiento</span>
          </button>
          <button
            className={`nav-button ${currentMode === 'chordList' ? 'active' : ''}`}
            onClick={() => onModeChange('chordList')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
            </svg>
            <span>Lista de Acordes</span>
          </button>
        </nav>
      )}
    </div>
  );
}


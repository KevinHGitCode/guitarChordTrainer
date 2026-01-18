import './Sidebar.css';

type Mode = 'training' | 'chordList' | 'history' | 'help';

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
        <img src="https://api.iconify.design/heroicons:chevron-left-solid.svg?color=white" alt="toggle" className="sidebar-toggle-icon" />
      </button>
      <nav className={`sidebar-nav ${collapsed ? 'collapsed' : ''}`}>
        <button
          className={`nav-button ${currentMode === 'training' ? 'active' : ''}`}
          onClick={() => onModeChange('training')}
        >
          <img src="https://api.iconify.design/heroicons:musical-note-solid.svg?color=currentColor" alt="training" className="nav-icon" />
          <span>Entrenamiento</span>
        </button>
        <button
          className={`nav-button ${currentMode === 'chordList' ? 'active' : ''}`}
          onClick={() => onModeChange('chordList')}
        >
          <img src="https://api.iconify.design/heroicons:document-text-solid.svg?color=currentColor" alt="chord list" className="nav-icon" />
          <span>Lista de Acordes</span>
        </button>
        <button
          className={`nav-button ${currentMode === 'history' ? 'active' : ''}`}
          onClick={() => onModeChange('history')}
        >
          <img src="https://api.iconify.design/heroicons:chart-bar-solid.svg?color=currentColor" alt="history" className="nav-icon" />
          <span>Historial</span>
        </button>
      </nav>
      <div className={`sidebar-footer ${collapsed ? 'collapsed' : ''}`}>
        <button
          className={`nav-button footer-button ${currentMode === 'help' ? 'active' : ''}`}
          onClick={() => onModeChange('help')}
        >
          <img src="https://api.iconify.design/heroicons:question-mark-circle-solid.svg?color=currentColor" alt="help" className="nav-icon" />
          <span>Ayuda</span>
        </button>
      </div>
    </div>
  );
}


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
      <button className="sidebar-toggle" onClick={onToggleCollapse} title={collapsed ? 'Expandir' : 'Colapsar'}>
        {collapsed ? '▶' : '◀'}
      </button>
      {!collapsed && (
        <nav className="sidebar-nav">
          <button
            className={`nav-button ${currentMode === 'training' ? 'active' : ''}`}
            onClick={() => onModeChange('training')}
          >
            🎸 Entrenamiento
          </button>
          <button
            className={`nav-button ${currentMode === 'chordList' ? 'active' : ''}`}
            onClick={() => onModeChange('chordList')}
          >
            📋 Lista de Acordes
          </button>
        </nav>
      )}
    </div>
  );
}


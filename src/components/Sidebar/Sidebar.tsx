import { useLocation, Link } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button className={`sidebar-toggle ${collapsed ? 'icon-rotated' : ''}`} onClick={onToggleCollapse} title={collapsed ? 'Expandir' : 'Colapsar'}>
        <img src="https://api.iconify.design/heroicons:chevron-left-solid.svg?color=white" alt="toggle" className="sidebar-toggle-icon" />
      </button>
      <nav className={`sidebar-nav ${collapsed ? 'collapsed' : ''}`}>
        <Link
          to="/training"
          className={`nav-button ${isActive('/training') ? 'active' : ''}`}
        >
          <img src="https://api.iconify.design/heroicons:musical-note-solid.svg?color=currentColor" alt="training" className="nav-icon" />
          <span>Entrenamiento</span>
        </Link>
        <Link
          to="/chords"
          className={`nav-button ${isActive('/chords') ? 'active' : ''}`}
        >
          <img src="https://api.iconify.design/heroicons:document-text-solid.svg?color=currentColor" alt="chord list" className="nav-icon" />
          <span>Lista de Acordes</span>
        </Link>
        <Link
          to="/history"
          className={`nav-button ${isActive('/history') ? 'active' : ''}`}
        >
          <img src="https://api.iconify.design/heroicons:chart-bar-solid.svg?color=currentColor" alt="history" className="nav-icon" />
          <span>Historial</span>
        </Link>
      </nav>
      <div className={`sidebar-footer ${collapsed ? 'collapsed' : ''}`}>
        <Link
          to="/help"
          className={`nav-button footer-button ${isActive('/help') ? 'active' : ''}`}
        >
          <img src="https://api.iconify.design/heroicons:question-mark-circle-solid.svg?color=currentColor" alt="help" className="nav-icon" />
          <span>Ayuda</span>
        </Link>
      </div>
    </div>
  );
}


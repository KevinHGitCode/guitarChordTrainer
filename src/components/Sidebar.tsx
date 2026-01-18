import { useState } from 'react';
import './Sidebar.css';

type Mode = 'training' | 'chordList';

interface SidebarProps {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
}

export default function Sidebar({ currentMode, onModeChange }: SidebarProps) {
  return (
    <div className="sidebar">
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
    </div>
  );
}


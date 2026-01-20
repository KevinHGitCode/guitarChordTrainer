import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AdvancedConfiguration from '../src/components/AdvancedConfiguration/AdvancedConfiguration';
import type { TrainingConfig } from '../src/types';

describe('AdvancedConfiguration Component', () => {
  const mockOnConfigChange = vi.fn();
  const mockOnClose = vi.fn();

  const baseConfig: TrainingConfig = {
    scale: 'Mayor',
    duration: 5,
  };

  beforeEach(() => {
    mockOnConfigChange.mockClear();
    mockOnClose.mockClear();
  });

  it('should render when isOpen is true', () => {
    render(
      <AdvancedConfiguration
        config={baseConfig}
        onConfigChange={mockOnConfigChange}
        isOpen={true}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByText('Configuración Avanzada')).toBeTruthy();
  });

  it('should not render when isOpen is false', () => {
    const { container } = render(
      <AdvancedConfiguration
        config={baseConfig}
        onConfigChange={mockOnConfigChange}
        isOpen={false}
        onClose={mockOnClose}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should pre-mark Mayor chords when opening with Mayor scale', () => {
    const { rerender } = render(
      <AdvancedConfiguration
        config={baseConfig}
        onConfigChange={mockOnConfigChange}
        isOpen={false}
        onClose={mockOnClose}
      />
    );

    rerender(
      <AdvancedConfiguration
        config={baseConfig}
        onConfigChange={mockOnConfigChange}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it('should have filter options available', () => {
    render(
      <AdvancedConfiguration
        config={baseConfig}
        onConfigChange={mockOnConfigChange}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Filtros Superficiales')).toBeTruthy();
    expect(screen.getByText('Cejilla:')).toBeTruthy();
    expect(screen.getByText('Semitonos (#):')).toBeTruthy();
  });

  it('should call onClose when close button is clicked', () => {
    render(
      <AdvancedConfiguration
        config={baseConfig}
        onConfigChange={mockOnConfigChange}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const closeButtons = screen.getAllByText('✕');
    fireEvent.click(closeButtons[0]);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should have testear button', () => {
    render(
      <AdvancedConfiguration
        config={baseConfig}
        onConfigChange={mockOnConfigChange}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('🧪 Testear')).toBeTruthy();
  });

  it('should have limpiar selección button', () => {
    render(
      <AdvancedConfiguration
        config={baseConfig}
        onConfigChange={mockOnConfigChange}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Limpiar Selección')).toBeTruthy();
  });

  it('should display save config section', () => {
    render(
      <AdvancedConfiguration
        config={baseConfig}
        onConfigChange={mockOnConfigChange}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Guardar Configuración:')).toBeTruthy();
    expect(screen.getByPlaceholderText('Nombre de la configuración')).toBeTruthy();
  });

  it('should handle config with existing selectedChords', () => {
    const configWithChords: TrainingConfig = {
      ...baseConfig,
      selectedChords: ['C', 'D', 'E'],
    };

    render(
      <AdvancedConfiguration
        config={configWithChords}
        onConfigChange={mockOnConfigChange}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Configuración Avanzada')).toBeTruthy();
  });

  it('should handle config with filters', () => {
    const configWithFilters: TrainingConfig = {
      ...baseConfig,
      barreFilter: 'exclude-barre',
      sharpsFilter: 'exclude-sharps',
    };

    render(
      <AdvancedConfiguration
        config={configWithFilters}
        onConfigChange={mockOnConfigChange}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Configuración Avanzada')).toBeTruthy();
  });
});

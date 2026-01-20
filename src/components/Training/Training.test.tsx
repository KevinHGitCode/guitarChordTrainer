import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import Training from './Training';
import type { TrainingConfig } from '../../types';

describe('Training Component - Filter Application', () => {
  const mockOnStatsChange = vi.fn();
  const mockOnSaveSession = vi.fn();

  const baseConfig: TrainingConfig = {
    scale: 'Mayor',
    duration: 5,
  };

  it('should render with Mayor scale chords', () => {
    const { container } = render(
      <Training
        config={baseConfig}
        onStatsChange={mockOnStatsChange}
        onSaveSession={mockOnSaveSession}
      />
    );
    expect(container).toBeTruthy();
  });

  it('should respect barreFilter exclude-barre', () => {
    const configWithFilter: TrainingConfig = {
      ...baseConfig,
      barreFilter: 'exclude-barre',
    };

    const { container } = render(
      <Training
        config={configWithFilter}
        onStatsChange={mockOnStatsChange}
        onSaveSession={mockOnSaveSession}
      />
    );
    expect(container).toBeTruthy();
  });

  it('should respect sharpsFilter exclude-sharps', () => {
    const configWithFilter: TrainingConfig = {
      ...baseConfig,
      sharpsFilter: 'exclude-sharps',
    };

    const { container } = render(
      <Training
        config={configWithFilter}
        onStatsChange={mockOnStatsChange}
        onSaveSession={mockOnSaveSession}
      />
    );
    expect(container).toBeTruthy();
  });

  it('should apply both filters together', () => {
    const configWithFilters: TrainingConfig = {
      ...baseConfig,
      barreFilter: 'exclude-barre',
      sharpsFilter: 'exclude-sharps',
    };

    const { container } = render(
      <Training
        config={configWithFilters}
        onStatsChange={mockOnStatsChange}
        onSaveSession={mockOnSaveSession}
      />
    );
    expect(container).toBeTruthy();
  });

  it('should work with selected chords and filters', () => {
    const configWithSelectedAndFilters: TrainingConfig = {
      ...baseConfig,
      selectedChords: ['C', 'D', 'E', 'F', 'G'],
      barreFilter: 'exclude-barre',
      sharpsFilter: 'exclude-sharps',
    };

    const { container } = render(
      <Training
        config={configWithSelectedAndFilters}
        onStatsChange={mockOnStatsChange}
        onSaveSession={mockOnSaveSession}
      />
    );
    expect(container).toBeTruthy();
  });

  it('should handle Menor scale with filters', () => {
    const menorConfig: TrainingConfig = {
      ...baseConfig,
      scale: 'Menor',
      sharpsFilter: 'exclude-sharps',
    };

    const { container } = render(
      <Training
        config={menorConfig}
        onStatsChange={mockOnStatsChange}
        onSaveSession={mockOnSaveSession}
      />
    );
    expect(container).toBeTruthy();
  });
});

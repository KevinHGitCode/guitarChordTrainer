import { describe, it, expect } from 'vitest';
import { chords, getChordsByConfig, applySuperficialFilters } from '../src/chordData';

describe('Chord filtering functions', () => {
  describe('getChordsByConfig', () => {
    it('should filter chords by scale - Mayor', () => {
      const result = getChordsByConfig('Mayor');
      const mayorChords = result.filter(c => c.scale === 'Mayor');
      expect(mayorChords.length).toBe(result.length);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should filter chords by scale - Menor', () => {
      const result = getChordsByConfig('Menor');
      const menorChords = result.filter(c => c.scale === 'Menor');
      expect(menorChords.length).toBe(result.length);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should filter chords by selected chords', () => {
      const selectedNames = ['C', 'D', 'E'];
      const result = getChordsByConfig('Mayor', selectedNames);
      expect(result.length).toBe(3);
      result.forEach(chord => {
        expect(selectedNames).toContain(chord.name);
      });
    });

    it('should return all Mayor chords when no selectedChords specified', () => {
      const result = getChordsByConfig('Mayor');
      const mayorChords = chords.filter(c => c.scale === 'Mayor');
      expect(result.length).toBe(mayorChords.length);
    });
  });

  describe('applySuperficialFilters', () => {
    const testChords = chords.filter(c => c.scale === 'Mayor');

    it('should exclude barre chords', () => {
      const result = applySuperficialFilters(testChords, 'exclude-barre', 'none');
      const hasNoBarre = result.every(c => !c.hasBarre);
      expect(hasNoBarre).toBe(true);
      expect(result.length).toBeLessThan(testChords.length);
    });

    it('should only show barre chords', () => {
      const result = applySuperficialFilters(testChords, 'only-barre', 'none');
      const allBarre = result.every(c => c.hasBarre);
      expect(allBarre).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should exclude sharps', () => {
      const result = applySuperficialFilters(testChords, 'none', 'exclude-sharps');
      const noSharps = result.every(c => !c.name.includes('#'));
      expect(noSharps).toBe(true);
      expect(result.length).toBeLessThan(testChords.length);
    });

    it('should only show sharps', () => {
      const result = applySuperficialFilters(testChords, 'none', 'only-sharps');
      const allSharps = result.every(c => c.name.includes('#'));
      expect(allSharps).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should combine barre and sharps filters', () => {
      const result = applySuperficialFilters(testChords, 'exclude-barre', 'exclude-sharps');
      const valid = result.every(c => !c.hasBarre && !c.name.includes('#'));
      expect(valid).toBe(true);
    });

    it('should not filter when no filters applied', () => {
      const result = applySuperficialFilters(testChords, 'none', 'none');
      expect(result.length).toBe(testChords.length);
    });
  });

  describe('Integration: Full filtering pipeline', () => {
    it('should apply scale + sharps filters correctly', () => {
      // Get Mayor chords
      const baseChords = getChordsByConfig('Mayor');
      // Then exclude sharps
      const filtered = applySuperficialFilters(baseChords, 'none', 'exclude-sharps');

      filtered.forEach(chord => {
        expect(chord.scale).toBe('Mayor');
        expect(chord.name.includes('#')).toBe(false);
      });
    });

    it('should handle Mayor scale with all filters', () => {
      const baseChords = getChordsByConfig('Mayor');
      const filtered = applySuperficialFilters(baseChords, 'exclude-barre', 'exclude-sharps');

      const mayorCount = chords.filter(
        c => c.scale === 'Mayor' && !c.hasBarre && !c.name.includes('#')
      ).length;

      expect(filtered.length).toBe(mayorCount);
    });

    it('should handle Menor scale with filters', () => {
      const baseChords = getChordsByConfig('Menor');
      const filtered = applySuperficialFilters(baseChords, 'exclude-barre', 'exclude-sharps');

      const menorCount = chords.filter(
        c => c.scale === 'Menor' && !c.hasBarre && !c.name.includes('#')
      ).length;

      expect(filtered.length).toBe(menorCount);
    });

    it('should exclude sharps from Mayor and get correct count', () => {
      const baseChords = getChordsByConfig('Mayor');
      const noSharps = applySuperficialFilters(baseChords, 'none', 'exclude-sharps');

      // Mayor chords without sharps: C, D, E, F, G, A, B = 7
      expect(noSharps.length).toBe(7);
      expect(noSharps.map(c => c.name).sort()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
    });
  });
});

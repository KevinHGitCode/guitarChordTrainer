import type { Chord } from './types';

export const chords: Chord[] = [
  // Acordes Mayores
  {
    name: 'C',
    displayName: 'Do Mayor',
    scale: 'Mayor',
    hasBarre: false,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/C_major_chord_for_guitar_(open).svg'
  },
  {
    name: 'C#',
    displayName: 'Do♯ Mayor (Cejilla)',
    scale: 'Mayor',
    hasBarre: true,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/C_sharp_major_chord_for_guitar.svg'
  },
  {
    name: 'D',
    displayName: 'Re Mayor',
    scale: 'Mayor',
    hasBarre: false,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/D_major_chord_for_guitar_(open).svg'
  },
  {
    name: 'D#',
    displayName: 'Re♯ Mayor (Cejilla)',
    scale: 'Mayor',
    hasBarre: true,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/D_sharp_major_chord_for_guitar.svg'
  },
  {
    name: 'E',
    displayName: 'Mi Mayor',
    scale: 'Mayor',
    hasBarre: false,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/E_major_chord_for_guitar_(open).svg'
  },
  {
    name: 'F',
    displayName: 'Fa Mayor (Cejilla)',
    scale: 'Mayor',
    hasBarre: true,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/F_major_chord_for_guitar_(open).svg'
  },
  {
    name: 'F#',
    displayName: 'Fa♯ Mayor (Cejilla)',
    scale: 'Mayor',
    hasBarre: true,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/F_sharp_major_chord_for_guitar.svg'
  },
  {
    name: 'G',
    displayName: 'Sol Mayor',
    scale: 'Mayor',
    hasBarre: false,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/G_major_chord_for_guitar_(open).svg'
  },
  {
    name: 'G#',
    displayName: 'Sol♯ Mayor (Cejilla)',
    scale: 'Mayor',
    hasBarre: true,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/G_sharp_major_chord_for_guitar.svg'
  },
  {
    name: 'A',
    displayName: 'La Mayor',
    scale: 'Mayor',
    hasBarre: false,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/A_major_chord_for_guitar_(open).svg'
  },
  {
    name: 'A#',
    displayName: 'La♯ Mayor (Cejilla)',
    scale: 'Mayor',
    hasBarre: true,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/B_flat_(A_sharp)_major_chord_for_guitar.svg'
  },
  {
    name: 'B',
    displayName: 'Si Mayor',
    scale: 'Mayor',
    hasBarre: false,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/B_major_chord_for_guitar.svg'
  },
  // Acordes Menores
  {
    name: 'Cm',
    displayName: 'Do Menor',
    scale: 'Menor',
    hasBarre: true,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/C_minor_chord_for_guitar.svg'
  },
  {
    name: 'C#m',
    displayName: 'Do♯ Menor (Cejilla)',
    scale: 'Menor',
    hasBarre: true,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/C_sharp_%28D_flat%29_minor_chord_for_guitar_(open).svg'
  },
  {
    name: 'Dm',
    displayName: 'Re Menor',
    scale: 'Menor',
    hasBarre: false,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/D_minor_chord_for_guitar_(open).svg'
  },
  {
    name: 'D#m',
    displayName: 'Re♯ Menor (Cejilla)',
    scale: 'Menor',
    hasBarre: true,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/D_sharp_(E_flat)_minor_chord_for_guitar.svg'
  },
  {
    name: 'Em',
    displayName: 'Mi Menor',
    scale: 'Menor',
    hasBarre: false,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/E_minor_chord_for_guitar_(open).svg'
  },
  {
    name: 'Fm',
    displayName: 'Fa Menor (Cejilla)',
    scale: 'Menor',
    hasBarre: true,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/F_minor_chord_for_guitar.svg'
  },
  {
    name: 'F#m',
    displayName: 'Fa♯ Menor (Cejilla)',
    scale: 'Menor',
    hasBarre: true,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/F_sharp_(G_flat)_minor_chord_for_guitar.svg'
  },
  {
    name: 'Gm',
    displayName: 'Sol Menor (Cejilla)',
    scale: 'Menor',
    hasBarre: true,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/G_minor_chord_for_guitar.svg'
  },
  {
    name: 'G#m',
    displayName: 'Sol♯ Menor (Cejilla)',
    scale: 'Menor',
    hasBarre: true,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/G_sharp_(A_flat)_minor_chord_for_guitar.svg'
  },
  {
    name: 'Am',
    displayName: 'La Menor',
    scale: 'Menor',
    hasBarre: false,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/A_minor_chord_for_guitar_(open).svg'
  },
  {
    name: 'A#m',
    displayName: 'La♯ Menor (Cejilla)',
    scale: 'Menor',
    hasBarre: true,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/A_sharp_(B_flat)_minor_chord_for_guitar.svg'
  },
  {
    name: 'Bm',
    displayName: 'Si Menor (Cejilla)',
    scale: 'Menor',
    hasBarre: true,
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/B_minor_chord_for_guitar.svg'
  }
];

export const getChordsByConfig = (
  scale: string,
  barreOption: string,
  selectedChords?: string[]
): Chord[] => {
  let filtered = chords;

  // Filter by scale
  if (scale !== 'Ambos') {
    filtered = filtered.filter(chord => chord.scale === scale);
  }

  // Filter by barre option
  if (barreOption === 'Con cejilla') {
    filtered = filtered.filter(chord => chord.hasBarre);
  } else if (barreOption === 'Sin cejilla') {
    filtered = filtered.filter(chord => !chord.hasBarre);
  }
  // 'Ambos' includes all

  // Filter by selected chords (custom config)
  if (selectedChords && selectedChords.length > 0) {
    filtered = filtered.filter(chord => selectedChords.includes(chord.name));
  }

  return filtered;
};


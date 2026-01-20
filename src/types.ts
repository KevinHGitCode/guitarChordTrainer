console.log("Types loaded");


export type Scale = 'Mayor' | 'Menor';

export interface Chord {
  name: string;
  displayName: string;
  scale: Scale;
  hasBarre: boolean;
  imageUrl: string;
}

export interface TrainingConfig {
  scale: Scale;
  duration: number;
  selectedChords?: string[]; // chord names for custom config
  configName?: string; // name of loaded saved config
  barreFilter?: 'none' | 'exclude-barre' | 'only-barre'; // visual filter for barre chords
  sharpsFilter?: 'none' | 'exclude-sharps' | 'only-sharps'; // visual filter for sharps
}

export interface SavedConfig extends TrainingConfig {
  id: string;
  name: string;
}

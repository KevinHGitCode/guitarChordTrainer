console.log("Types loaded");


export type Scale = 'Mayor' | 'Menor';
export type Difficulty = 'Fácil' | 'Intermedio' | 'Avanzado' | 'Personalizado';
export type BarreOption = 'Con cejilla' | 'Sin cejilla' | 'Ambos';

export interface Chord {
  name: string;
  displayName: string;
  scale: Scale;
  hasBarre: boolean;
  imageUrl: string;
}

export interface TrainingConfig {
  scale: Scale;
  barreOption: BarreOption;
  duration: number;
  selectedChords?: string[]; // chord names for custom config
  difficulty?: Difficulty;
}

export interface SavedConfig extends TrainingConfig {
  id: string;
  name: string;
}

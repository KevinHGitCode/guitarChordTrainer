import type { TrainingConfig } from '../types';
import ChordList from '../components/ChordList/ChordList';
import { chords } from '../chordData';

type ChordListPageProps = {
  config: TrainingConfig;
};

export default function ChordListPage({ config }: ChordListPageProps) {
  return <ChordList chords={chords} />;
}

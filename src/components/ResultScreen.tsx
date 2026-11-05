import { score } from '../game/match';
import type { RoundResult } from '../game/match';
import { ROUND_COUNT } from '../rounds/types';
import type { Round } from '../rounds/types';
import { RoundImage } from './RoundImage';
import { formatTime } from './formatTime';

interface Props {
  round: Round;
  teams: [string, string];
  results: RoundResult[];
  onNext: () => void;
}

export function ResultScreen({ round, teams, results, onNext }: Props) {
  const result = results[results.length - 1];
  const [a, b] = score(results);
  return (
    <>
      <header className="bar">
        <span>Round {round.id}</span>
        <span>{result.winner === null ? 'Draw' : `${teams[result.winner]} wins the round`}</span>
        <span className="times">
          {teams[0]} {formatTime(result.times[0])} · {teams[1]} {formatTime(result.times[1])}
        </span>
        <span className="timer">
          {a} – {b}
        </span>
        <button onClick={onNext} autoFocus>
          {round.id === ROUND_COUNT ? 'Final result' : 'Next round'}
        </button>
      </header>
      <RoundImage round={round} reveal />
    </>
  );
}

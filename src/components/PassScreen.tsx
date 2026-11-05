import { ROUND_COUNT } from '../rounds/types';
import type { Round } from '../rounds/types';

interface Props {
  round: Round;
  team: string;
  onStart: () => void;
  onRestart: () => void;
}

export function PassScreen({ round, team, onStart, onRestart }: Props) {
  return (
    <div className="card">
      <p className="eyebrow">Round {round.id} of {ROUND_COUNT}</p>
      <h1>{team}, your turn</h1>
      <p>
        Find <strong>{round.name}</strong>. The timer starts when you press Start. A wrong click costs 2 seconds.
      </p>
      <button onClick={onStart} autoFocus>
        Start
      </button>
      <button className="link" onClick={() => confirm('Restart the whole match?') && onRestart()}>
        Restart match
      </button>
    </div>
  );
}

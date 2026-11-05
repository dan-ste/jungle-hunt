import { overallWinner, score } from '../game/match';
import type { RoundResult } from '../game/match';
import { rounds } from '../rounds';
import { formatTime } from './formatTime';

interface Props {
  teams: [string, string];
  results: RoundResult[];
  onRestart: () => void;
}

export function FinalScreen({ teams, results, onRestart }: Props) {
  const winner = overallWinner(results);
  const [a, b] = score(results);
  return (
    <div className="card wide">
      <p className="eyebrow">Final result</p>
      <h1>{winner === null ? "It's a draw!" : `${teams[winner]} wins the match!`}</h1>
      <p className="score">
        {teams[0]} {a} – {b} {teams[1]}
      </p>
      <table>
        <thead>
          <tr>
            <th>Round</th>
            <th>Hidden</th>
            <th>{teams[0]}</th>
            <th>{teams[1]}</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{rounds[index].name}</td>
              <td>{formatTime(result.times[0])}</td>
              <td>{formatTime(result.times[1])}</td>
              <td>{result.winner === null ? '—' : teams[result.winner]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onRestart}>New match</button>
    </div>
  );
}

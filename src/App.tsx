import { RoundImage } from './components/RoundImage';
import { rounds } from './rounds';

const params = new URLSearchParams(location.search);
const debug = params.has('debug');
const round = rounds[Number(params.get('round') ?? 1) - 1] ?? rounds[0];

export function App() {
  return (
    <div className="app">
      <header className="bar">
        <span>Round {round.id} of {rounds.length}</span>
        <span>Find {round.name}</span>
        <span className="timer">0.0 s</span>
      </header>
      <RoundImage round={round} debug={debug} />
    </div>
  );
}

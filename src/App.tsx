import { useEffect, useReducer } from 'react';
import { FinalScreen } from './components/FinalScreen';
import { PassScreen } from './components/PassScreen';
import { ResultScreen } from './components/ResultScreen';
import { RoundImage } from './components/RoundImage';
import { RoundPlay } from './components/RoundPlay';
import { SetupScreen } from './components/SetupScreen';
import { reduce } from './game/match';
import { loadMatch, saveMatch } from './game/storage';
import { rounds } from './rounds';
import { ROUND_COUNT } from './rounds/types';

const params = new URLSearchParams(location.search);
const debug = params.has('debug');
const viewedRound = params.has('round') ? rounds[Number(params.get('round')) - 1] : undefined;

export function App() {
  const [match, dispatch] = useReducer(reduce, undefined, loadMatch);
  const round = rounds[match.round - 1];

  useEffect(() => saveMatch(match), [match]);

  if (viewedRound) {
    return (
      <div className="app">
        <header className="bar">
          <span>Round {viewedRound.id} of {ROUND_COUNT}</span>
          <span>{viewedRound.name}</span>
        </header>
        <RoundImage round={viewedRound} outline />
      </div>
    );
  }

  return (
    <div className="app">
      {match.phase === 'setup' && <SetupScreen onStart={(teams) => dispatch({ type: 'setTeams', teams })} />}
      {match.phase === 'pass' && (
        <PassScreen
          round={round}
          team={match.teams[match.lead]}
          onStart={() => dispatch({ type: 'start' })}
          onRestart={() => dispatch({ type: 'reset' })}
        />
      )}
      {match.phase === 'playing' && (
        <RoundPlay
          key={`${match.round}-${match.lead}`}
          round={round}
          team={match.teams[match.lead]}
          debug={debug}
          onFinish={(time) => dispatch({ type: 'finish', time })}
        />
      )}
      {match.phase === 'result' && (
        <ResultScreen round={round} teams={match.teams} results={match.results} onNext={() => dispatch({ type: 'next' })} />
      )}
      {match.phase === 'final' && (
        <FinalScreen teams={match.teams} results={match.results} onRestart={() => dispatch({ type: 'reset' })} />
      )}
    </div>
  );
}

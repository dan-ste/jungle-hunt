import { useEffect, useState } from 'react';
import { hitsTarget } from '../game/hitTest';
import type { Point } from '../game/hitTest';
import { PENALTY_MS } from '../game/match';
import type { RoundTime } from '../game/match';
import type { Round } from '../rounds/types';
import { RoundImage } from './RoundImage';
import { formatTime } from './formatTime';

const MISS_FLASH_MS = 1000;

interface Props {
  round: Round;
  team: string;
  debug: boolean;
  onFinish: (time: RoundTime) => void;
}

export function RoundPlay({ round, team, debug, onFinish }: Props) {
  const [startedAt] = useState(() => Date.now());
  const [penalty, setPenalty] = useState(0);
  const [missedAt, setMissedAt] = useState<number | null>(null);
  const now = useNow();
  const elapsed = now - startedAt + penalty;

  function onPick(point: Point) {
    if (debug) console.log(`x: ${Math.round(point.x)}, y: ${Math.round(point.y)}`);
    if (hitsTarget(round.target, point)) {
      onFinish(Date.now() - startedAt + penalty);
    } else {
      setPenalty((current) => current + PENALTY_MS);
      setMissedAt(Date.now());
    }
  }

  return (
    <>
      <header className="bar">
        <span>Round {round.id}</span>
        <span>{team}</span>
        <span>Find {round.name}</span>
        <button className="link" onClick={() => onFinish(null)}>
          Give up
        </button>
        <span className="timer">{formatTime(elapsed)}</span>
      </header>
      <RoundImage round={round} outline={debug} onPick={onPick} />
      {missedAt !== null && now - missedAt < MISS_FLASH_MS && <div className="toast">Not there. +2 s</div>}
    </>
  );
}

function useNow(): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(id);
  }, []);
  return now;
}

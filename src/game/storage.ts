import { initialMatch } from './match';
import type { Match, Phase } from './match';

const KEY = 'jungle-hunt-match';
const PHASES: Phase[] = ['setup', 'pass', 'playing', 'result', 'final'];

export function loadMatch(): Match {
  try {
    const saved = localStorage.getItem(KEY);
    if (!saved) return initialMatch;
    const match = JSON.parse(saved) as Match;
    if (!isUsable(match)) return initialMatch;
    return match.phase === 'playing' ? { ...match, phase: 'pass' } : match;
  } catch {
    return initialMatch;
  }
}

export function saveMatch(match: Match): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(match));
  } catch {
    return;
  }
}

function isUsable(match: Match): boolean {
  return (
    PHASES.includes(match.phase) &&
    Array.isArray(match.teams) &&
    match.teams.length === 2 &&
    Array.isArray(match.results) &&
    Number.isInteger(match.round) &&
    (match.phase !== 'result' || match.results.length === match.round)
  );
}

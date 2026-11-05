import { ROUND_COUNT } from '../rounds/types';

export type Team = 0 | 1;
export type RoundTime = number | null;
export type Phase = 'setup' | 'pass' | 'playing' | 'result' | 'final';

export interface RoundResult {
  times: [RoundTime, RoundTime];
  winner: Team | null;
}

export interface Match {
  teams: [string, string];
  phase: Phase;
  round: number;
  lead: Team;
  firstTime: RoundTime;
  results: RoundResult[];
}

export type Action =
  | { type: 'setTeams'; teams: [string, string] }
  | { type: 'start' }
  | { type: 'finish'; time: RoundTime }
  | { type: 'next' }
  | { type: 'reset' };

export const PENALTY_MS = 2000;

export const initialMatch: Match = {
  teams: ['Team A', 'Team B'],
  phase: 'setup',
  round: 1,
  lead: 0,
  firstTime: null,
  results: [],
};

export function reduce(match: Match, action: Action): Match {
  switch (action.type) {
    case 'setTeams':
      return { ...initialMatch, teams: action.teams, phase: 'pass' };
    case 'start':
      return { ...match, phase: 'playing' };
    case 'finish': {
      if (match.lead === 0) {
        return { ...match, phase: 'pass', lead: 1, firstTime: action.time };
      }
      const times: [RoundTime, RoundTime] = [match.firstTime, action.time];
      return {
        ...match,
        phase: 'result',
        results: [...match.results, { times, winner: roundWinner(times) }],
      };
    }
    case 'next':
      if (match.round >= ROUND_COUNT) return { ...match, phase: 'final' };
      return { ...match, phase: 'pass', round: match.round + 1, lead: 0, firstTime: null };
    case 'reset':
      return initialMatch;
  }
}

export function roundWinner([a, b]: [RoundTime, RoundTime]): Team | null {
  if (a === null && b === null) return null;
  if (a === null) return 1;
  if (b === null) return 0;
  if (a === b) return null;
  return a < b ? 0 : 1;
}

export function score(results: RoundResult[]): [number, number] {
  return results.reduce<[number, number]>(
    (totals, result) => {
      if (result.winner !== null) totals[result.winner] += 1;
      return totals;
    },
    [0, 0],
  );
}

export function overallWinner(results: RoundResult[]): Team | null {
  const [a, b] = score(results);
  if (a === b) return null;
  return a > b ? 0 : 1;
}

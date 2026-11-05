import { describe, expect, it } from 'vitest';
import { initialMatch, overallWinner, reduce, roundWinner } from './match';
import type { Action, Match } from './match';

function play(match: Match, actions: Action[]): Match {
  return actions.reduce(reduce, match);
}

describe('roundWinner', () => {
  it('gives the round to the faster lead', () => {
    expect(roundWinner([12400, 9800])).toBe(1);
  });

  it('gives the round to the lead who did not give up', () => {
    expect(roundWinner([null, 40000])).toBe(1);
  });

  it('has no winner on a tie or when both gave up', () => {
    expect(roundWinner([5000, 5000])).toBeNull();
    expect(roundWinner([null, null])).toBeNull();
  });
});

describe('reduce', () => {
  it('hides the first time until both leads have played, then records the round', () => {
    const afterFirst = play(initialMatch, [
      { type: 'setTeams', teams: ['Sloths', 'Toucans'] },
      { type: 'start' },
      { type: 'finish', time: 8000 },
    ]);
    expect(afterFirst).toMatchObject({ phase: 'pass', lead: 1, results: [] });

    const afterSecond = play(afterFirst, [{ type: 'start' }, { type: 'finish', time: 6500 }]);
    expect(afterSecond.phase).toBe('result');
    expect(afterSecond.results).toEqual([{ times: [8000, 6500], winner: 1 }]);

    expect(reduce(afterSecond, { type: 'next' })).toMatchObject({ phase: 'pass', round: 2, lead: 0, firstTime: null });
  });

  it('ends the match after round 20', () => {
    const lastRound: Match = { ...initialMatch, phase: 'result', round: 20 };
    expect(reduce(lastRound, { type: 'next' }).phase).toBe('final');
  });
});

describe('overallWinner', () => {
  it('counts round wins and ignores draws', () => {
    const results = [
      { times: [1000, 2000] as [number, number], winner: 0 as const },
      { times: [3000, 3000] as [number, number], winner: null },
      { times: [null, 2000] as [null, number], winner: 1 as const },
      { times: [1000, 2000] as [number, number], winner: 0 as const },
    ];
    expect(overallWinner(results)).toBe(0);
  });
});

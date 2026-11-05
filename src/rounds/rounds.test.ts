import { describe, expect, it } from 'vitest';
import { rounds, validateRounds } from './index';

describe('rounds.json', () => {
  it('has 20 valid rounds', () => {
    expect(validateRounds(rounds)).toEqual([]);
  });
});

describe('validateRounds', () => {
  it('reports a target outside the image', () => {
    const broken = rounds.map((round) =>
      round.id === 3 ? { ...round, target: { ...round.target, x: round.width - 10 } } : round,
    );
    expect(validateRounds(broken)).toEqual(['round 3: target is outside the image']);
  });
});

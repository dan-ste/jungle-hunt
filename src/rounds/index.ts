import data from './rounds.json';
import { ROUND_COUNT } from './types';
import type { Round } from './types';

export const rounds: Round[] = data.map((round) => ({
  ...round,
  image: `${import.meta.env.BASE_URL}rounds/${round.image}`,
}));

export function validateRounds(list: Round[]): string[] {
  const problems: string[] = [];
  if (list.length !== ROUND_COUNT) problems.push(`expected ${ROUND_COUNT} rounds, got ${list.length}`);
  list.forEach((round, index) => {
    const { target } = round;
    if (round.id !== index + 1) problems.push(`round at position ${index + 1} has id ${round.id}`);
    if (target.width <= 0 || target.height <= 0) problems.push(`round ${round.id}: target has no size`);
    if (target.x < 0 || target.y < 0 || target.x + target.width > round.width || target.y + target.height > round.height) {
      problems.push(`round ${round.id}: target is outside the image`);
    }
  });
  return problems;
}

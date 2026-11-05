import type { RoundTime } from '../game/match';

export function formatTime(time: RoundTime): string {
  return time === null ? 'gave up' : `${(time / 1000).toFixed(1)} s`;
}

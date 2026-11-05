import type { Rect, Round } from '../rounds/types';

export interface Point {
  x: number;
  y: number;
}

export function hitsTarget(target: Rect, point: Point): boolean {
  return (
    point.x >= target.x &&
    point.x <= target.x + target.width &&
    point.y >= target.y &&
    point.y <= target.y + target.height
  );
}

export function toImagePoint(round: Round, box: DOMRect, clientX: number, clientY: number): Point {
  return {
    x: ((clientX - box.left) / box.width) * round.width,
    y: ((clientY - box.top) / box.height) * round.height,
  };
}

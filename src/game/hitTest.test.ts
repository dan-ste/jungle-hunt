import { describe, expect, it } from 'vitest';
import { hitsTarget, toImagePoint } from './hitTest';
import { rounds } from '../rounds';

const target = { x: 100, y: 200, width: 36, height: 72 };

describe('hitsTarget', () => {
  it('is true inside the target', () => {
    expect(hitsTarget(target, { x: 120, y: 250 })).toBe(true);
  });

  it('is false just outside the target', () => {
    expect(hitsTarget(target, { x: 137, y: 250 })).toBe(false);
  });
});

describe('toImagePoint', () => {
  it('maps a click on a scaled image back to image pixels', () => {
    const box = { left: 50, top: 20, width: 960, height: 540 } as DOMRect;
    expect(toImagePoint(rounds[0], box, 50 + 480, 20 + 135)).toEqual({ x: 960, y: 270 });
  });
});

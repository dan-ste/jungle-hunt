export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Round {
  id: number;
  name: string;
  image: string;
  width: number;
  height: number;
  target: Rect;
}

export const ROUND_COUNT = 20;

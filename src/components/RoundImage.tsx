import type { MouseEvent } from 'react';
import { toImagePoint } from '../game/hitTest';
import type { Point } from '../game/hitTest';
import type { Round } from '../rounds/types';

interface Props {
  round: Round;
  outline?: boolean;
  reveal?: boolean;
  onPick?: (point: Point) => void;
}

export function RoundImage({ round, outline = false, reveal = false, onPick }: Props) {
  const { target } = round;
  const box = {
    left: `${(target.x / round.width) * 100}%`,
    top: `${(target.y / round.height) * 100}%`,
    width: `${(target.width / round.width) * 100}%`,
    height: `${(target.height / round.height) * 100}%`,
  };

  function onClick(event: MouseEvent<HTMLDivElement>) {
    if (!onPick) return;
    const point = toImagePoint(round, event.currentTarget.getBoundingClientRect(), event.clientX, event.clientY);
    onPick(point);
  }

  return (
    <div className="stage">
      <div
        className={onPick ? 'frame clickable' : 'frame'}
        style={{ aspectRatio: `${round.width} / ${round.height}` }}
        onClick={onClick}
      >
        <img src={round.image} alt="" draggable={false} />
        {outline && <div className="target outline" style={box} />}
        {reveal && <div className="target reveal" style={box} />}
      </div>
    </div>
  );
}

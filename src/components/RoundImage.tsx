import type { Round } from '../rounds/types';

interface Props {
  round: Round;
  debug: boolean;
}

export function RoundImage({ round, debug }: Props) {
  const { target } = round;
  return (
    <div className="stage">
      <div className="frame" style={{ aspectRatio: `${round.width} / ${round.height}` }}>
        <img src={round.image} alt="" draggable={false} />
        {debug && (
          <div
            className="target-debug"
            style={{
              left: `${(target.x / round.width) * 100}%`,
              top: `${(target.y / round.height) * 100}%`,
              width: `${(target.width / round.width) * 100}%`,
              height: `${(target.height / round.height) * 100}%`,
            }}
          />
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import type { FormEvent } from 'react';

interface Props {
  onStart: (teams: [string, string]) => void;
}

export function SetupScreen({ onStart }: Props) {
  const [teams, setTeams] = useState<[string, string]>(['Team A', 'Team B']);

  function submit(event: FormEvent) {
    event.preventDefault();
    onStart([teams[0].trim() || 'Team A', teams[1].trim() || 'Team B']);
  }

  return (
    <form className="card" onSubmit={submit}>
      <h1>Jungle Hunt</h1>
      <p>20 rounds. One teammate hidden in each. The faster lead wins the round.</p>
      <label>
        First team
        <input value={teams[0]} onChange={(event) => setTeams([event.target.value, teams[1]])} autoFocus />
      </label>
      <label>
        Second team
        <input value={teams[1]} onChange={(event) => setTeams([teams[0], event.target.value])} />
      </label>
      <button type="submit">Start match</button>
    </form>
  );
}

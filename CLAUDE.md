# Jungle Hunt

A "Where's Waldo" style game for a hackathon. Each round shows a cartoon Costa Rica jungle scene with one Visible team member hidden in it. Two team leads race to find them.

Several people work on this at the same time, each with their own Claude Code on their own machine. This file is the only context every Claude shares, so keep it up to date.

## Game rules

- 20 rounds. Each round is a different image with a different team member hidden in it.
- Two teams, each with a lead who plays. The match runs on one screen (hot seat): the first lead plays the round, then the second lead plays the same round. There is no server.
- A timer runs per player. It starts when the image appears and stops on a correct click. The faster time wins the round. A wrong click adds 2 seconds. "Give up" records no time.
- The first lead's time stays hidden until both have played. The round result then shows both times, reveals the team member, and saves the round winner.
- After round 20 the final screen lists every round and names the overall winner.
- Layout: the image in the centre, the timer top right.
- Match state is kept in `localStorage`, so a reload does not lose progress.

## Stack and commands

- Vite + React + TypeScript. No backend. Deployed to GitHub Pages at https://dan-ste.github.io/jungle-hunt/ on every push to `main`.
- Node 22 (`nvm use`), pnpm.
- `pnpm install` — install
- `pnpm dev` — run at http://localhost:5190/jungle-hunt/ (`?round=7` opens a round, `?debug` outlines the target)
- `pnpm test` — unit tests (Vitest)
- `pnpm build` — type-check and build. Run it before every PR.
- `pnpm mocks` — regenerate the 20 mock rounds

## Layout

- `src/rounds/types.ts` — the round format. This is the contract between code and art. Change it only after telling the team.
- `src/rounds/rounds.json` — the 20 rounds: image file, team member name, and their rectangle. `src/rounds/index.ts` loads and validates it.
- `public/rounds/` — the round images.
- `src/components/RoundImage.tsx` — draws a round scaled to fit, with the `?debug` outline.
- `src/App.tsx` — the app shell.
- `scripts/generate-mocks.mjs` — writes mock rounds (busy shapes with a small striped figure hidden among them).

## Round format

- One entry per round in `rounds.json`: `id` (1–20, in order), `name`, `image` (file name under `public/rounds/`), `width`, `height`, and `target`.
- `target` is the team member's rectangle in image pixels, `x`/`y` top-left. Make it tight around the drawing. A click inside it counts.
- To set a target, open the round with `?debug`, adjust the numbers in `rounds.json`, and check the outline sits on the character.

## Art spec

- One image per round, landscape 1920 × 1080, PNG or JPG, under about 1 MB. Save as `public/rounds/round-07.png` and update `image`, `name` and `target` for that round.
- The team member is drawn into the scene itself, not a separate layer. Cartoon style, Costa Rica jungle, full of animals.
- Keep the character small and partly covered, but at least half of the face visible.
- Get each person's OK before adding their cartoon.

## Who works on what

Pick one area, write your name next to it, and stay inside its files. This avoids merge conflicts.

- Round play (image, timer, hit test, wrong-click penalty, give up) — _free_
- Match flow (team setup, pass screens, round result, scoreboard, final winner, localStorage) — _free_
- Art (20 images, targets) — _free_

## Team rules

- Pull `main` before starting each task.
- One branch per task: `<name>/<short-task>`. Small PRs. Merge to `main` at least every hour or two.
- Do not add a dependency or change the round format without telling the team.
- When you learn something every Claude should know, add it to this file in the same PR.
- Personal notes go in `CLAUDE.local.md` and personal settings in `.claude/settings.local.json`. Both are git-ignored.

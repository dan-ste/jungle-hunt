import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const WIDTH = 1920;
const HEIGHT = 1080;
const ROUND_COUNT = 20;
const SHAPES = 220;
const PALETTE = ['#2f8f3a', '#4fb04a', '#1f5a24', '#8b5a2b', '#ffd23f', '#ff9f1c', '#4fb8e8', '#9b5de5'];

function makeRandom(seed) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function shape(random) {
  const fill = PALETTE[Math.floor(random() * PALETTE.length)];
  const x = Math.round(random() * WIDTH);
  const y = Math.round(random() * HEIGHT);
  const size = Math.round(20 + random() * 90);
  const kind = random();
  if (kind < 0.4) return `<circle cx="${x}" cy="${y}" r="${size / 2}" fill="${fill}"/>`;
  if (kind < 0.7) return `<rect x="${x}" y="${y}" width="${size}" height="${size * 0.7}" rx="8" fill="${fill}" transform="rotate(${Math.round(random() * 90)} ${x} ${y})"/>`;
  return `<polygon points="${x},${y} ${x + size},${y + size / 3} ${x + size / 4},${y + size}" fill="${fill}"/>`;
}

function waldo(x, y, width, height) {
  const head = height * 0.3;
  return `<g transform="translate(${x} ${y})">
    <rect x="${width * 0.15}" y="${head}" width="${width * 0.7}" height="${height - head}" fill="#fff" stroke="#111" stroke-width="2"/>
    <rect x="${width * 0.15}" y="${head + (height - head) * 0.2}" width="${width * 0.7}" height="${(height - head) * 0.2}" fill="#e8312c"/>
    <rect x="${width * 0.15}" y="${head + (height - head) * 0.6}" width="${width * 0.7}" height="${(height - head) * 0.2}" fill="#e8312c"/>
    <circle cx="${width / 2}" cy="${head / 2 + 2}" r="${head / 2}" fill="#f1c27d" stroke="#111" stroke-width="2"/>
  </g>`;
}

mkdirSync(join(root, 'public/rounds'), { recursive: true });

const rounds = Array.from({ length: ROUND_COUNT }, (_, index) => {
  const id = index + 1;
  const random = makeRandom(id * 7919);
  const target = { width: 36, height: 72, x: 0, y: 0 };
  target.x = Math.round(120 + random() * (WIDTH - 240 - target.width));
  target.y = Math.round(140 + random() * (HEIGHT - 200 - target.height));
  const shapes = Array.from({ length: SHAPES }, () => shape(random));
  const file = `round-${String(id).padStart(2, '0')}.svg`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#e6f8d2"/>
  ${shapes.slice(0, SHAPES / 2).join('\n  ')}
  ${waldo(target.x, target.y, target.width, target.height)}
  ${shapes.slice(SHAPES / 2).join('\n  ')}
  <text x="40" y="80" font-family="sans-serif" font-size="56" font-weight="bold" fill="#1d2b1f">MOCK ROUND ${id}</text>
</svg>
`;
  writeFileSync(join(root, 'public/rounds', file), svg);
  return { id, name: `Teammate ${id}`, image: file, width: WIDTH, height: HEIGHT, target };
});

writeFileSync(join(root, 'src/rounds/rounds.json'), JSON.stringify(rounds, null, 2) + '\n');
console.log(`wrote ${ROUND_COUNT} mock rounds`);

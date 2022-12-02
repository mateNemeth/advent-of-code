import { readFileSync } from 'fs';
import path from 'path';

const data = readFileSync(path.resolve(__dirname, './input.txt'))
  .toString()
  .split('\n')
  .map((line) => line.split(' ')) as Codes[][];

const RESULTS = ['win', 'lose', 'draw'] as const;
type Results = typeof RESULTS[number];

const HANDS = ['rock', 'paper', 'scissor'] as const;
type Hands = typeof HANDS[number];

const ENEMY_CODES = ['A', 'B', 'C'] as const;
const SELF_CODES = ['X', 'Y', 'Z'] as const;
type Codes = typeof ENEMY_CODES[number] | typeof SELF_CODES[number];

const HAND_CODES: Record<Codes, Hands> = {
  A: 'rock',
  B: 'paper',
  C: 'scissor',
  X: 'rock',
  Y: 'paper',
  Z: 'scissor',
};

const SCORES: Record<Results | Hands, number> = {
  lose: 0,
  draw: 3,
  win: 6,
  rock: 1,
  paper: 2,
  scissor: 3,
};

const getScore = (result: Results, hand: Hands): number => {
  return SCORES[result] + SCORES[hand];
};

const mod = (a: number, b: number) => {
  const c = a % b;
  return c < 0 ? c + b : c;
};

const getResult_A = (a: Codes, b: Codes): Results => {
  const enemy = HANDS.indexOf(HAND_CODES[a]);
  const self = HANDS.indexOf(HAND_CODES[b]);

  if (self === enemy) return 'draw';
  if (mod(enemy - self, HANDS.length) < HANDS.length / 2) {
    return 'lose';
  } else {
    return 'win';
  }
};

let score = 0;

data.forEach((game) => {
  const result = getResult_A(game[0], game[1]);
  score += getScore(result, HAND_CODES[game[1]]);
});

console.log(score);

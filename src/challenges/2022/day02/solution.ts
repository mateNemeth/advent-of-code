import { readFileSync } from 'fs';
import path from 'path';

const data = readFileSync(path.resolve(__dirname, './input.txt'))
  .toString()
  .split('\n')
  .map((line) => line.split(' ')) as Codes[][];

const WinMap = new Map<Hands, Hands>();
WinMap.set('paper', 'rock');
WinMap.set('rock', 'scissor');
WinMap.set('scissor', 'paper');

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

const RESULT_CODES: Record<typeof SELF_CODES[number], Results> = {
  X: 'lose',
  Y: 'draw',
  Z: 'win',
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

const getResultByHand = (a: Codes, b: Codes): Results => {
  const enemy = HAND_CODES[a];
  const self = HAND_CODES[b];

  if (self === enemy) return 'draw';
  return WinMap.get(self).includes(enemy) ? 'win' : 'lose';
};

const getHandByResult = (a: Codes, b: Codes): Hands => {
  const enemy = HAND_CODES[a];
  const result = RESULT_CODES[b];
  const losingHand = WinMap.get(enemy);
  if (result === 'draw') return enemy;
  return result === 'lose' ? losingHand : HANDS.find((h) => h !== enemy && h !== losingHand);
};

let score_A = 0;
let score_B = 0;

data.forEach((game) => {
  const result_A = getResultByHand(game[0], game[1]);
  score_A += getScore(result_A, HAND_CODES[game[1]]);
  const hand_B = getHandByResult(game[0], game[1]);
  score_B += getScore(RESULT_CODES[game[1]], hand_B);
});

console.log(`Part one: ${score_A}`);
console.log(`Part two: ${score_B}`);

import { readFileSync } from 'fs';
import path from 'path';

const data = readFileSync(path.resolve(__dirname, './input.txt')).toString().split('\n');

const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const splitSacks = (str: string) => {
  return [str.slice(0, str.length / 2), str.slice(str.length / 2)];
};

let result_A = 0;
data.forEach((sack) => {
  const [first, second] = splitSacks(sack);
  const firstMap = new Map();
  first.split('').forEach((letter) => firstMap.set(letter, letter));
  for (let i = 0; i < second.length; i++) {
    if (firstMap.has(second[i])) {
      result_A += LETTERS.indexOf(second[i]) + 1;
      break;
    }
  }
});

let result_B = 0;
let cursor = 0;
while (data.slice(cursor, cursor + 3).length) {
  const group = data.slice(cursor, cursor + 3).sort((a, b) => a.length - b.length);
  for (let i = 0; i < group[0].length; i++) {
    const letter = group[0][i];
    if (group[1].includes(letter) && group[2].includes(letter)) {
      result_B += LETTERS.indexOf(group[0][i]) + 1;
      break;
    }
  }
  cursor += 3;
}

console.log(`Part A: ${result_A}`);
console.log(`Part B: ${result_B}`);

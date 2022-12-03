import { readFileSync } from 'fs';
import path from 'path';

const data = readFileSync(path.resolve(__dirname, './input.txt')).toString().split('\n');

const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const splitSacks = (str: string) => {
  return [str.slice(0, str.length / 2), str.slice(str.length / 2)];
};

let result = 0;
data.forEach((sack) => {
  const [first, second] = splitSacks(sack);
  const firstMap = new Map();
  first.split('').forEach((letter) => firstMap.set(letter, letter));
  for (let i = 0; i < second.length; i++) {
    if (firstMap.has(second[i])) {
      result += LETTERS.indexOf(second[i]) + 1;
      break;
    }
  }
});

console.log(result);

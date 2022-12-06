import { readFileSync } from 'fs';
import path from 'path';

const data = readFileSync(path.resolve(__dirname, './input.txt')).toString();
const testData = readFileSync(path.resolve(__dirname, './testinput.txt')).toString();

const characters = data.split('');

const getDistinctCharactersFromString = (count: number) => {
  let repeatedIdx: number | null = null;
  const lastLetters = [];

  for (let i = 0; i < characters.length; i++) {
    const found = lastLetters.findIndex((letter) => letter === characters[i]);
    if (found >= 0) lastLetters.splice(0, found + 1);
    lastLetters.push(characters[i]);
    if (lastLetters.length === count) {
      console.log(lastLetters);
      repeatedIdx = i + 1;
      break;
    }
  }

  return repeatedIdx;
};

console.log(`Part A: ${getDistinctCharactersFromString(4)}`);
console.log(`Part B: ${getDistinctCharactersFromString(14)}`);

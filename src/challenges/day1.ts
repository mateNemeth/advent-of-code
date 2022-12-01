import { readFileSync } from 'fs';
import path from 'path';

const data = readFileSync(path.resolve(__dirname, './day1.txt'))
  .toString()
  .split('\n\n')
  .map((line) => line.split('\n'));

let highest = 0;

for (const elf of data) {
  const total = elf.reduce((acc, curr) => acc + +curr, 0);
  highest = Math.max(highest, total);
}

console.log(highest);

import { readFileSync } from 'fs';
import path from 'path';

const data = readFileSync(path.resolve(__dirname, './day1.txt'))
  .toString()
  .split('\n\n')
  .map((line) => line.split('\n'));

const totalMap = new Map();
const calcElfTotal = (elf: string[]) => {
  if (totalMap.has(elf)) return totalMap.get(elf);

  const elfTotal = elf.reduce((acc, curr) => acc + +curr, 0);
  totalMap.set(elf, elfTotal);
  return elfTotal;
};

const orderedByCalories = data.sort((a, b) => (calcElfTotal(a) > calcElfTotal(b) ? -1 : 1));

const getSumOfFirstN = (n: number) => {
  let totalFirstN = 0;
  for (let i = n; i > 0; i--) {
    totalFirstN += totalMap.get(orderedByCalories[i - 1]);
  }
  return totalFirstN;
};

// Part A
console.log(`Part A: ${getSumOfFirstN(1)}`);

// Part B
console.log(`Part B: ${getSumOfFirstN(3)}`);

import { readFileSync } from 'fs';
import path from 'path';

const data = readFileSync(path.resolve(__dirname, './input.txt')).toString().split('\n');
const start = data.slice(0, data.findIndex((l) => l === '') - 1);
const procedures = data.slice(data.findIndex((l) => l === '') + 1);

const createStacks = () => {
  const stacks: string[][] = [];
  [...start].reverse().map((row) => {
    const r = row.match(/.{1,4}/g);
    r.forEach((crate, idx) => {
      if (crate.trim() !== '') {
        if (stacks[idx] === undefined) {
          stacks[idx] = [];
        }
        stacks[idx].push(crate.trim());
      }
    });
  });
  return stacks;
};

const runProcedures = (multiple?: boolean) => {
  const stacks = createStacks();
  procedures.map((p) => {
    const parsed = p.match(/\d+/g);
    const toMove = stacks[+parsed[1] - 1].splice(-parsed[0]);
    if (multiple !== true) {
      toMove.reverse();
    }
    stacks[+parsed[2] - 1] = stacks[+parsed[2] - 1].concat(toMove);
  });
  return stacks;
};

const result_A = runProcedures();
const result_B = runProcedures(true);

console.log(`Part A: ${result_A.map((stack) => stack.pop()?.replace('[', '').replace(']', '')).join('')}`);
console.log(`Part B: ${result_B.map((stack) => stack.pop()?.replace('[', '').replace(']', '')).join('')}`);

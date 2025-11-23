const { performance } = require('perf_hooks');
const { findSimilarIds } = require('../../utils/pokemonUtils');

// Recreate baseline implementation (no cached ID strings) to compare
const POKEMON_IDS = Array.from({ length: 1010 }, (_, i) => i + 1);
function baselineFindSimilarIds(input) {
  let processedInput = input;
  if (/^\d+$/.test(input)) {
    processedInput = parseInt(input, 10).toString();
  }
  const inputStr = processedInput.toString();
  const suggestions = [];
  if (/^\d+$/.test(inputStr)) {
    for (let id of POKEMON_IDS) {
      const idStr = id.toString();
      if (idStr.includes(inputStr) && id.toString() !== inputStr) {
        suggestions.push(id);
      }
      if (suggestions.length >= 6) break;
    }

    if (suggestions.length === 0 && inputStr.length <= 3) {
      const paddedInput = inputStr.padStart(3, '0');
      const paddedNum = parseInt(paddedInput);
      if (paddedNum >= 1 && paddedNum <= 1010 && paddedNum.toString() !== inputStr) {
        suggestions.push(paddedNum);
      }

      const numInput = parseInt(inputStr);
      if (numInput >= 1 && numInput <= 1010 && numInput.toString() !== inputStr) {
        suggestions.push(numInput);
      }
    }
  }
  return suggestions.slice(0, 6);
}

// Warm-up
for (let i = 0; i < 1000; i++) {
  findSimilarIds((i % 1010).toString());
  baselineFindSimilarIds((i % 1010).toString());
}

function bench(fn, label) {
  const iterations = 20000;
  const inputs = [];
  for (let i = 0; i < iterations; i++) {
    inputs.push((Math.floor(Math.random() * 1010) + 1).toString());
  }

  const t0 = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn(inputs[i]);
  }
  const t1 = performance.now();
  console.log(`${label}: ${((t1 - t0)).toFixed(2)} ms for ${iterations} runs`);
}

bench(baselineFindSimilarIds, 'baselineFindSimilarIds');
bench(findSimilarIds, 'optimized findSimilarIds');

// Quick correctness check
console.log('sample baseline:', baselineFindSimilarIds('010'));
console.log('sample optimized:', findSimilarIds('010'));

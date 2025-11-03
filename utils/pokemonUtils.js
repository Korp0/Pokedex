// Pokemon database with IDs (first 1010 Pokemon as of 2024)
const POKEMON_IDS = Array.from({length: 1010}, (_, i) => i + 1);

// Function to find similar Pokemon IDs
function findSimilarIds(input) {
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

// Utility function to capitalize Pokemon names properly
function capitalizeName(name) {
  return name.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
}

module.exports = { findSimilarIds, capitalizeName };
// Pokemon database with IDs (first 1010 Pokemon as of 2024)
const POKEMON_IDS = Array.from({length: 1010}, (_, i) => i + 1);
// Cached string representations for the default ID list to avoid repeated toString() calls
const POKEMON_ID_STRS = POKEMON_IDS.map((id) => id.toString());

// Function to find similar Pokemon IDs
// Accepts optional `ids` array for easier testing; defaults to full POKEMON_IDS
function findSimilarIds(input, ids = POKEMON_IDS) {
  const originalInput = input.toString();
  let processedInput = input;
  if (/^\d+$/.test(input)) {
    processedInput = parseInt(input, 10).toString();
  }
  
  const inputStr = processedInput.toString();
  const suggestions = [];
  
  if (/^\d+$/.test(inputStr)) {
    if (ids === POKEMON_IDS) {
      // fast path for the default ID list using cached strings
      for (let i = 0; i < POKEMON_IDS.length; i++) {
        const id = POKEMON_IDS[i];
        const idStr = POKEMON_ID_STRS[i];
        if (idStr.includes(inputStr) && idStr !== inputStr) {
          suggestions.push(id);
        }
        if (suggestions.length >= 6) break;
      }
    } else {
      // fallback for custom id lists (used in tests)
      for (let id of ids) {
        const idStr = id.toString();
        if (idStr.includes(inputStr) && id.toString() !== inputStr) {
          suggestions.push(id);
        }
        if (suggestions.length >= 6) break;
      }
    }
    
    // Use the original input (preserving leading zeros) for the padded fallback
    if (suggestions.length === 0 && originalInput.length <= 3) {
      const paddedInput = originalInput.padStart(3, '0');
      const paddedNum = parseInt(paddedInput);
      if (paddedNum >= 1 && paddedNum <= 1010 && paddedNum.toString() !== inputStr) {
        suggestions.push(paddedNum);
      }
      
      const numInput = parseInt(originalInput);
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
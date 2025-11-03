const { findSimilarIds } = require("./pokemonUtils");

// Function to display Pokémon not found message with suggestions
function showPokemonNotFound(input) {
  const defaultCards = document.getElementById("defaultCards");
  const pokemonCard = document.getElementById("pokemonCard");

  defaultCards.classList.add("hidden");

  const suggestions = findSimilarIds(input);

  let suggestionText = "";
  if (suggestions.length > 0) {
    suggestionText = `
      <div class="suggestions-section">
        <p class="suggestion-text">Try these IDs:</p>
        <div class="suggestion-buttons">
          ${suggestions
            .map(
              (id) => `
            <button class="suggestion-btn" onclick="searchSuggestedPokemon(${id})" data-id="${id}">
              #${id.toString().padStart(3, "0")}
            </button>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  pokemonCard.innerHTML = `
    <div class="error-container">
      <h2 class="error-title">❌ Pokémon Not Found</h2>
      ${suggestionText}
      <button id="backToDefault" class="back-btn" onclick="showDefaultCards()">Back to Home</button>
    </div>
  `;

  pokemonCard.classList.remove("hidden");
}

// Function to show empty search error
function showEmptySearchError() {
  const pokemonCard = document.getElementById("pokemonCard");
  const defaultCards = document.getElementById("defaultCards");

  defaultCards.classList.add("hidden");
  pokemonCard.innerHTML = `
    <div class="error-container">
      <h2 class="error-title">⚠️ Empty Search</h2>
      <p class="error-message">Please enter a Pokémon name or ID to search!</p>
      <button id="backToDefault" class="back-btn">Back to Home</button>
    </div>
  `;
  pokemonCard.classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("pokemonInput").focus();
  }, 100);
}

// Function to show timeout error
function showTimeoutError() {
  const pokemonCard = document.getElementById("pokemonCard");
  const defaultCards = document.getElementById("defaultCards");

  defaultCards.classList.add("hidden");
  pokemonCard.innerHTML = `
    <div class="error-container">
      <h2 class="error-title">⏰ Request Timeout</h2>
      <p class="error-message">The request is taking too long. Please check your internet connection and try again.</p>
      <button id="backToDefault" class="back-btn">Back to Home</button>
    </div>
  `;
  pokemonCard.classList.remove("hidden");
}

// Function to return to default cards view
function showDefaultCards() {
  const card = document.getElementById("pokemonCard");
  const defaultCards = document.getElementById("defaultCards");

  card.classList.add("hidden");
  defaultCards.classList.remove("hidden");

  const input = document.getElementById("pokemonInput");
  if (input) input.value = "";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

module.exports = {
  showPokemonNotFound,
  showEmptySearchError,
  showTimeoutError,
  showDefaultCards,
};

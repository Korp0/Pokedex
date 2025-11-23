/**
 * @jest-environment jsdom
 */

const {
  showPokemonNotFound,
  showEmptySearchError,
  showTimeoutError,
  showDefaultCards,
} = require("../utils/pokemonDom");

// Mock browser APIs not implemented by jsdom
beforeAll(() => {
  window.scrollTo = jest.fn();
});
describe("pokemonDom.js", () => {
  let defaultCards, pokemonCard, input;

  beforeEach(() => {
    // Reset DOM before each test
    document.body.innerHTML = `
      <div id="defaultCards"></div>
      <div id="pokemonCard"></div>
      <input id="pokemonInput" />
    `;

    defaultCards = document.getElementById("defaultCards");
    pokemonCard = document.getElementById("pokemonCard");
    input = document.getElementById("pokemonInput");
  });

  // ---------------------
  // showPokemonNotFound
  // ---------------------
  test("showPokemonNotFound hides default cards and shows error", () => {
    showPokemonNotFound("9999");

    expect(defaultCards.classList.contains("hidden")).toBe(true);
    expect(pokemonCard.innerHTML).toMatch("❌ Pokémon Not Found");
    expect(pokemonCard.classList.contains("hidden")).toBe(false);
  });

  test("showPokemonNotFound renders suggestion buttons when suggestions exist", () => {
    showPokemonNotFound("2");

    const buttons = pokemonCard.querySelectorAll(".suggestion-btn");
    expect(buttons.length).toBeGreaterThan(0);

    // Buttons should have proper dataset and padded ID text
    expect(buttons[0].dataset.id).toBeDefined();
    expect(buttons[0].textContent.trim()).toMatch(/^#\d{3}$/);
  });

  // ---------------------
  // showEmptySearchError
  // ---------------------
  test("showEmptySearchError displays warning and focuses input", () => {
    jest.useFakeTimers(); // mock timers for setTimeout

    showEmptySearchError();

    expect(defaultCards.classList.contains("hidden")).toBe(true);
    expect(pokemonCard.innerHTML).toMatch("⚠️ Empty Search");

    // Run pending timers to simulate focus after 100ms
    jest.runAllTimers();
    expect(document.activeElement).toBe(input);

    jest.useRealTimers();
  });

  // ---------------------
  // showTimeoutError
  // ---------------------
  test("showTimeoutError displays timeout message", () => {
    showTimeoutError();

    expect(defaultCards.classList.contains("hidden")).toBe(true);
    expect(pokemonCard.innerHTML).toMatch("⏰ Request Timeout");
    expect(pokemonCard.classList.contains("hidden")).toBe(false);
  });

  // ---------------------
  // showDefaultCards
  // ---------------------
  test("showDefaultCards resets view and clears input", () => {
    // Prepare state: pokemonCard visible, input filled
    pokemonCard.classList.remove("hidden");
    defaultCards.classList.add("hidden");
    input.value = "pikachu";

    showDefaultCards();

    expect(pokemonCard.classList.contains("hidden")).toBe(true);
    expect(defaultCards.classList.contains("hidden")).toBe(false);
    expect(input.value).toBe("");
  });
});

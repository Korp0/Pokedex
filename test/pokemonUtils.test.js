// Import the functions
const { findSimilarIds, capitalizeName } = require("../utils/pokemonUtils");

// Mock dataset for predictable tests (1–20 only for speed)
const SMALL_IDS = Array.from({ length: 20 }, (_, i) => i + 1);

describe("findSimilarIds", () => {
  test("finds IDs containing input substring", () => {
    expect(findSimilarIds("2", SMALL_IDS)).toEqual(
      expect.arrayContaining([12, 20])
    );
  });

  test("does not include the exact input itself", () => {
    expect(findSimilarIds("5", SMALL_IDS)).not.toContain(5);
  });

  test("returns empty array for out-of-range number", () => {
    expect(findSimilarIds("9999", SMALL_IDS)).toEqual([]);
  });

  test("returns empty array for non-numeric input", () => {
    expect(findSimilarIds("abc", SMALL_IDS)).toEqual([]);
  });

  test("leading zeros are ignored", () => {
    expect(findSimilarIds("07", SMALL_IDS)).toEqual(
      expect.arrayContaining([17, 27])
    );
  });
});

describe("capitalizeName", () => {
  test("capitalizes simple lowercase names", () => {
    expect(capitalizeName("pikachu")).toBe("Pikachu");
  });

  test("handles hyphenated names correctly", () => {
    expect(capitalizeName("mr-mime")).toBe("Mr Mime");
  });

  test("converts uppercase names properly", () => {
    expect(capitalizeName("HO-OH")).toBe("Ho Oh");
  });

  test("works with mixed-case names", () => {
    expect(capitalizeName("cHaRiZaRd")).toBe("Charizard");
  });
});

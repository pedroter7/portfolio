import {
  getNonHeterogeneousEnumValuesAsArray,
  getRandomNonHeterogeneousEnumValue,
} from "./enumUtil";

enum testEnum1 {
  V1 = 0,
  V2 = 1,
  V3 = 2,
  V4 = 3,
}

enum testEnum2 {
  V1 = "Value1",
  V2 = "Value2",
  V3 = "Value3",
  V4 = "Value4",
}

describe("getNonHeterogeneousEnumValuesAsArray", () => {
  it("Successfully returns an array with all testEnum1 values", () => {
    const enumValues = getNonHeterogeneousEnumValuesAsArray(testEnum1);
    expect(enumValues.length).toBe(4);
    expect(enumValues).toContain(testEnum1.V1);
    expect(enumValues).toContain(testEnum1.V2);
    expect(enumValues).toContain(testEnum1.V3);
    expect(enumValues).toContain(testEnum1.V4);
  });

  it("Successfully returns an array with all testEnum2 values", () => {
    const enumValues = getNonHeterogeneousEnumValuesAsArray(testEnum2);
    expect(enumValues.length).toBe(4);
    expect(enumValues).toContain(testEnum2.V1);
    expect(enumValues).toContain(testEnum2.V2);
    expect(enumValues).toContain(testEnum2.V3);
    expect(enumValues).toContain(testEnum2.V4);
  });
});

describe("getRandomNonHeterogeneousEnumValue", () => {
  it("Successfully returns a random value for testEnum1", () => {
    const enumValues = [testEnum1.V1, testEnum1.V2, testEnum1.V3, testEnum1.V4];
    const randomValue = getRandomNonHeterogeneousEnumValue(testEnum1);
    expect(enumValues).toContain(randomValue);
  });

  it("Successfully returns a random value for testEnum2", () => {
    const enumValues = [testEnum2.V1, testEnum2.V2, testEnum2.V3, testEnum2.V4];
    const randomValue = getRandomNonHeterogeneousEnumValue(testEnum2);
    expect(enumValues).toContain(randomValue);
  });
});

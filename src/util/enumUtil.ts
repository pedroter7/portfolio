function getNonHeterogeneousEnumValuesAsArray<T>(anEnum: T): T[keyof T][] {
  let enumValues = Object.values(anEnum as { [s: string]: unknown });
  if (typeof enumValues[enumValues.length - 1] === "string") {
    return enumValues as T[keyof T][];
  }
  const half = enumValues.length / 2;
  return enumValues.slice(half) as T[keyof T][];
}

function getRandomNonHeterogeneousEnumValue<T>(anEnum: T): T[keyof T] {
  const enumValues = getNonHeterogeneousEnumValuesAsArray(anEnum);
  const randomIndex = Math.floor(Math.random() * (enumValues.length - 1))
  return enumValues[randomIndex];
}

export { getNonHeterogeneousEnumValuesAsArray, getRandomNonHeterogeneousEnumValue };

export enum WaterUnit {
  Oz = 'oz',
  Ml = 'ml',
}

const CONVERSION_FACTOR = 31.25; // 8oz -> 250ml

export function switchUnit(unit: WaterUnit): WaterUnit {
  return unit === WaterUnit.Oz ? WaterUnit.Ml : WaterUnit.Oz;
}

export function displayAmount(unit: WaterUnit, amountOz: number): number {
  return unit === WaterUnit.Oz 
    ? amountOz 
    : Math.round(amountOz * CONVERSION_FACTOR);
}

export function processInput(unit: WaterUnit, inputAmount: number): number {
  return unit === WaterUnit.Oz 
    ? inputAmount 
    : Math.round(inputAmount / CONVERSION_FACTOR);
}

export function getStep(unit: WaterUnit): number {
  return displayAmount(unit, 4);
}

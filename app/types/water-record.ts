import { WaterUnit, displayAmount } from "./water-unit";

export type WaterRecord = {
  amountOz: number;
  timestamp: number;
};

export function addRecord(
  records: WaterRecord[],
  amount: number): WaterRecord[] {
  const newRecord: WaterRecord = {
    amountOz: amount,
    timestamp: Date.now(),
  };
  return [...records, newRecord];
}

export function formatRecords(
  records: WaterRecord[],
  unit: WaterUnit) {
  return records.map(r => ({
    ...r, 
    displayAmount: displayAmount(unit, r.amountOz),
    unitLabel: unit
  })).reverse();
}

"use client";
import {
  useState,
  useEffect } from 'react';

import {
  WaterRecord,
  addRecord } from './types/water-record';

import {
  WaterUnit,
  switchUnit,
  displayAmount,
  processInput,
  getStep,
  getMinAmount,
  getMaxAmount } from './types/water-unit';

export function useWaterTracker() {
  const [total, setTotal] = useState<number>(0);
  const [amount, setAmount] = useState<number>(8);
  const [goal, setGoal] = useState<number>(64);
  const [records, setRecords] = useState<WaterRecord[]>([]);
  const [unit, setUnit] = useState<WaterUnit>(WaterUnit.Oz);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const waterTotal = localStorage.getItem('waterTotal');
    const waterGoal = localStorage.getItem('waterGoal');
    const savedUnit = localStorage.getItem('waterUnit');
    const records = localStorage.getItem('waterRecords');

    if (waterTotal) setTotal(JSON.parse(waterTotal));
    if (waterGoal) setGoal(JSON.parse(waterGoal));
    if (savedUnit) setUnit(JSON.parse(savedUnit) as WaterUnit);
    if (records) setRecords(JSON.parse(records));

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return; // Prevent overwriting with defaults

    localStorage.setItem('waterTotal', JSON.stringify(total));
    localStorage.setItem('waterGoal', JSON.stringify(goal));
    localStorage.setItem('waterUnit', JSON.stringify(unit));
    localStorage.setItem('waterRecords', JSON.stringify(records));
  }, [total, goal, records, unit]);

  const addWater = () => {
    setTotal(prev => prev + amount);
    setRecords(prev => addRecord(prev, amount));
  };

  const resetWater = () => {
    setTotal(0);
    setRecords([]);
  };

  const handleAmountChange = (val: number) => {
    setAmount(processInput(unit, val));
  };

  const changeWaterGoal = (newGoal: number) => {
    if (newGoal <= 0) setGoal(0);
    setGoal(processInput(unit, newGoal));
  }

  const toggleUnit = () => setUnit((prev: WaterUnit) => switchUnit(prev));

  return {
    total : displayAmount(unit, total),
    amount : displayAmount(unit, amount),
    goal : displayAmount(unit, goal),
    step : getStep(unit),
    min : getMinAmount(unit),
    max : getMaxAmount(unit),
    unit,
    toggleUnit,
    addWater,
    resetWater,
    changeWaterGoal,
    handleAmountChange,
    isHydrated,
    records,
  };
}

"use client";
import { useState, useEffect } from 'react';

type WaterRecord = {
    amountOz: number,
    timestamp: number,
}

export function useWaterTracker() {
  const [total, setTotal] = useState<number>(0);
  const [amount, setAmount] = useState<number>(8);
  const [goal, setGoal] = useState<number>(64);
  const [records, setRecords] = useState<WaterRecord[]>([]);
  const [unit, setUnit] = useState<'oz' | 'ml'>('oz');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const waterTotal = localStorage.getItem('waterTotal');
    const waterGoal = localStorage.getItem('waterGoal');
    const savedUnit = localStorage.getItem('waterUnit');
    const records = localStorage.getItem('waterRecords');

    console.log("waterTotal:", waterTotal);
    console.log("waterGoal:", waterGoal);
    console.log("savedUnit:", savedUnit);
    console.log("records:", records);

    if (waterTotal) setTotal(JSON.parse(waterTotal));
    if (waterGoal) setGoal(JSON.parse(waterGoal));
    if (savedUnit) setUnit(JSON.parse(savedUnit) as 'oz' | 'ml');
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
    let record = {
        amountOz: unit === 'oz' ? amount : amount / 30,
        timestamp: Date.now(),
    }
    setRecords(prev => [...prev, record]);
  };

  const resetWater = () => {
    setTotal(0);
    setRecords([]);
  };

  const handleAmountChange = (val: number) => {
    setAmount(unit === 'oz' ? val : val / 30);
  };

  const changeWaterGoal = (newGoal: number) => {
    if (newGoal <= 0) setGoal(0);
    setGoal(unit === 'oz' ? newGoal : newGoal / 30);
  }

  const step = unit === 'oz' ? 4 : 120;

  // Helper to convert values for display
  const displayTotal = unit === 'oz' ? total : Math.round(total * 30);
  const displayGoal = unit === 'oz' ? goal : Math.round(goal * 30);
  const displayAmount = unit === 'oz' ? amount : Math.round(amount * 30);
  const displayRecords = records.map(record => ({
    amount: unit === 'oz' ? record.amountOz : Math.round(record.amountOz * 30),
    timestamp: record.timestamp,
  }));

  const toggleUnit = () => setUnit(prev => prev === 'oz' ? 'ml' : 'oz');

  return {
    total : displayTotal,
    amount : displayAmount,
    goal : displayGoal,
    step,
    unit,
    toggleUnit,
    addWater,
    resetWater,
    changeWaterGoal,
    handleAmountChange,
    isHydrated,
    records : displayRecords,
  };
}

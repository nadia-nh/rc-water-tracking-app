"use client";
import { useState, useEffect } from 'react';

export function useWaterTracker() {
  const [total, setTotal] = useState<number>(0);
  const [amount, setAmount] = useState<number>(8);
  const [goal, setGoal] = useState<number>(64);
  const [unit, setUnit] = useState<'oz' | 'ml'>('oz');

  useEffect(() => {
    const waterTotal = localStorage.getItem('waterTotal');
    const waterGoal = localStorage.getItem('waterGoal');
    const savedUnit = localStorage.getItem('waterUnit');

    if (waterTotal) setTotal(JSON.parse(waterTotal));
    if (waterGoal) setGoal(JSON.parse(waterGoal));
    if (savedUnit) setUnit(JSON.parse(savedUnit) as 'oz' | 'ml');
  }, []);

  useEffect(() => {
    localStorage.setItem('waterTotal', JSON.stringify(total));
    localStorage.setItem('waterGoal', JSON.stringify(goal));
    localStorage.setItem('waterUnit', JSON.stringify(unit));
  }, [total, goal, unit]);

  const addWater = () => setTotal(prev => prev + amount);
  const resetWater = () => setTotal(0);

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
  };
}

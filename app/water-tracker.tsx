"use client";
import { useState, useEffect } from 'react';

export function useWaterTracker() {
  const [total, setTotal] = useState<number>(0);
  const [amount, setAmount] = useState<number>(8);
  const [goal, setGoal] = useState<number>(64);

  useEffect(() => {
    const waterTotal = localStorage.getItem('waterTotal');
    const waterGoal = localStorage.getItem('waterGoal');
    if (waterTotal) setTotal(JSON.parse(waterTotal));
    if (waterGoal) setGoal(JSON.parse(waterGoal));
  }, []);

  useEffect(() => {
    localStorage.setItem('waterTotal', JSON.stringify(total));
    localStorage.setItem('waterGoal', JSON.stringify(goal));
  }, [total, goal]);

  const addWater = () => setTotal(prev => prev + amount);
  
  const resetWater = () => setTotal(0);

  const handleAmountChange = (val: number) => {
    setAmount(val >= 4 ? val : 4);
  };

  const changeWaterGoal = (newGoal: number) => {
    setGoal(newGoal >= 0 ? newGoal : 0);
  }

  return {
    total,
    amount,
    goal,
    addWater,
    resetWater,
    handleAmountChange,
    changeWaterGoal
  };
}

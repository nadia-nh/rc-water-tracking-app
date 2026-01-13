"use client";
import { useState, useEffect } from 'react';

export function useWaterTracker() {
  const [total, setTotal] = useState<number>(0);
  const [amount, setAmount] = useState<number>(8);
  const goal = 64;

  useEffect(() => {
    const saved = localStorage.getItem('waterTotal');
    if (saved) setTotal(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('waterTotal', JSON.stringify(total));
  }, [total]);

  const addWater = () => setTotal(prev => prev + amount);
  
  const resetWater = () => setTotal(0);

  const handleAmountChange = (val: number) => {
    setAmount(val >= 4 ? val : 4);
  };

  return {
    total,
    amount,
    goal,
    addWater,
    resetWater,
    handleAmountChange
  };
}

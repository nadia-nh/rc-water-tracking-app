"use client";
import { useEffect, useState } from "react";
import { useWaterTracker } from "./water-tracker";

function Skeleton() {
  return (
    <div className="card skeleton-container">
      {/* 1. Toggle & Goal Area */}
      <div className="skeleton-block skeleton-top" />
      
      {/* 2. Bottle Area */}
      <div className="skeleton-block skeleton-middle" />
      
      {/* 3. Controls & Reset Area */}
      <div className="skeleton-block skeleton-bottom" />
    </div>
  );
}

export default function Home() {
  const { 
    total,
    amount,
    goal,
    step,
    unit,
    toggleUnit,
    addWater,
    resetWater,
    handleAmountChange,
    changeWaterGoal,
    isHydrated } = useWaterTracker();
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasShownSuccess, setHasShownSuccess] = useState(false);
  const [tempGoal, setTempGoal] = useState(goal);

  const fillPercentage = Math.min((total / goal) * 100, 100);

  useEffect(() => {
    if (!hasShownSuccess &&fillPercentage === 100 && total > 0) {
      setShowSuccess(true);
      setHasShownSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [fillPercentage, total]);

  const handleResetWater = () => {
    setHasShownSuccess(false);
    setShowSuccess(false);
    resetWater();
  };

  const saveGoal = () => {
    setIsEditingGoal(false);
    changeWaterGoal(tempGoal);
  }

  if (!isHydrated) {
    return <Skeleton />;
  }

  return (
    <div className="card">

      {showSuccess && (
        <div className="success-toast">
          🎉 Goal Reached! Stay hydrated!
        </div>
        )
      }

      <div className="unit-toggle-container">
        <button className="unit-toggle-btn" onClick={toggleUnit}>
          {unit.toUpperCase()}
        </button>
      </div>

      <h2 className="title">Stay Hydrated</h2>
      <div className="goal-container">
        <span>Goal: </span>
        {isEditingGoal ? (
          <input 
            className="goal-input-active"
            type="number" 
            autoFocus 
            value={tempGoal} 
            onChange={(e) => setTempGoal(Number(e.target.value))}
            onBlur={saveGoal}
            onKeyDown={(e) => e.key === 'Enter' && saveGoal()}
          />
        ) : (
          <span 
            className="goal-text-editable" 
            onClick={() => {setTempGoal(goal); setIsEditingGoal(true)}}
          >
            {goal}
          </span>
        )}
        <span>{unit}</span>
      </div>
      
      {/* The Nalgene Bottle UI */}
      <div className="bottle-container">
        <div className="bottle-cap"></div>
        <div className="bottle-body">
          {/* Measurement marks on the side */}
          <div className="bottle-marks">
            <span>-</span><span>-</span><span>-</span><span>-</span>
          </div>
          {/* The Water Fill */}
          <div 
            className="water-fill" 
            style={{ height: `${fillPercentage}%` }}
          ></div>
          <div className="bottle-label">{total} {unit}</div>
        </div>
      </div>

      <div className="input-group-merged">
        <input 
          className="amount-input"
          type="number" 
          value={amount} 
          step={step}
          min={step}
          onChange={(e) => handleAmountChange(Number(e.target.value))}
        />
        <button className="log-btn-side" onClick={addWater}>
          + Drink
        </button>
      </div>

      <button className="reset-btn" onClick={handleResetWater}>
        Reset Progress
      </button>
    </div>
  );
}

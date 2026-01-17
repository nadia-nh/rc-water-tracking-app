"use client";
import { useEffect, useState } from "react";
import { useWaterTracker } from "./water-tracker";
import Link from 'next/link';

function Skeleton() {
  return (
    <div className="card skeleton-container">
      <div className="skeleton-block skeleton-top" />
      <div className="skeleton-block skeleton-middle" />
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
    min,
    max,
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
    if (!hasShownSuccess && fillPercentage === 100 && total > 0) {
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

      <div className="top-actions-container">
        <Link href="/history" className="action-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          History
        </Link>

        <button className="action-btn" onClick={toggleUnit}>
          {unit.toUpperCase()}
        </button>
      </div>

      <h2 className="title">Stay Hydrated 💧</h2>
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

      <div className="logger-container">
        <div className="glass-selector">
          {/* Decrease Button */}
          <button 
            className="nav-arrow-btn" 
            onClick={() => handleAmountChange(amount - step)}
            disabled={amount <= min}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          {/* The Glass (Action Button) */}
          <div className="vessel-group">
            <button className="mini-glass-btn" onClick={addWater}>
              <div 
                className="mini-water-fill" 
                style={{ height: `${(amount / max) * 100}%` }} 
              />
            </button>
            
            <div className="amount-display">
              {amount} <small> {unit} </small>
            </div>
          </div>

          {/* Increase Button */}
          <button 
            className="nav-arrow-btn" 
            onClick={() => handleAmountChange(amount + step)}
            disabled={amount >= max}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>

      <button className="reset-btn" onClick={handleResetWater}>
        Reset Progress
      </button>
    </div>
  );
}

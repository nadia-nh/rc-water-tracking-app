"use client";
import { useState } from "react";
import { useWaterTracker } from "./water-tracker";

export default function Home() {
  const { total, amount, goal, addWater, resetWater, handleAmountChange, changeWaterGoal } = useWaterTracker();
  const [isEditingGoal, setIsEditingGoal] = useState(false);

  const fillPercentage = Math.min((total / goal) * 100, 100);

  return (
    <div className="card">
      <h2 className="title">Stay Hydrated</h2>
      <div className="goal-container">
        <span>Goal: </span>
        {isEditingGoal ? (
          <input 
            className="goal-input-active"
            type="number" 
            autoFocus 
            value={goal} 
            onChange={(e) => changeWaterGoal(Number(e.target.value))}
            onBlur={() => setIsEditingGoal(false)}
            onKeyDown={(e) => e.key === 'Enter' && setIsEditingGoal(false)}
          />
        ) : (
          <span 
            className="goal-text-editable" 
            onClick={() => setIsEditingGoal(true)}
          >
            {goal}
          </span>
        )}
        <span>oz</span>
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
          <div className="bottle-label">{total} oz</div>
        </div>
      </div>

      <div className="input-group-merged">
        <input 
          className="amount-input"
          type="number" 
          value={amount} 
          step="4" 
          min="4"  
          onChange={(e) => handleAmountChange(Number(e.target.value))}
        />
        <button className="log-btn-side" onClick={addWater}>
          + Drink
        </button>
      </div>

      <button className="reset-btn" onClick={() => resetWater()}>
        Reset Progress
      </button>
    </div>
  );
}

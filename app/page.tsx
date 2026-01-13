"use client";
import { useWaterTracker } from "./water-tracker";

export default function Home() {
  const { total, amount, goal, addWater, resetWater, handleAmountChange } = useWaterTracker();

  return (
    <div className="card">
      <h2 className="title">Stay Hydrated</h2>
      <p className="goal-text">Goal: {goal}oz</p>
      
      <div className="progress-circle">
        <h1 className="total-display">{total}</h1>
        <span className="unit">oz</span>
      </div>

      <div className="input-section">
        <p className="label">Log Amount (oz)</p>
        <input 
          className="amount-input"
          type="number" 
          value={amount} 
          step="4" 
          min="4"  
          onChange={(e) => handleAmountChange(Number(e.target.value))}
        />
        <button className="log-btn" onClick={addWater}>
          Drink +{amount}oz
        </button>
      </div>

      <button className="reset-btn" onClick={() => resetWater()}>
        Reset Progress
      </button>
    </div>
  );
}

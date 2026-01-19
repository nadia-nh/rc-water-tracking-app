"use client";
import { useEffect, useState } from "react";
import { useWaterTracker } from "./water-tracker";
import { Skeleton } from "./components/skeleton";
import { ArrowIcon, HistoryIcon } from "./components/icons";
import { SuccessToast } from "./components/success-toast";
import Link from 'next/link';

export default function Home() {
  const { 
    total,
    amount,
    goal,
    step,
    min,
    max,
    unit,
    switchUnitLabel,
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

  const bottleFill = Math.min((total / goal) * 100, 100);
  const glassFill = (amount / max) * 100;

  useEffect(() => {
    if (!hasShownSuccess && bottleFill === 100 && total > 0) {
      setShowSuccess(true);
      setHasShownSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [bottleFill, total]);

  const handleResetWater = () => {
    setHasShownSuccess(false);
    setShowSuccess(false);
    resetWater();
  };

  const saveGoal = () => {
    setIsEditingGoal(false);
    changeWaterGoal(tempGoal);
  }

  const onGoalValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempGoal(Number(e.target.value));
  }

  const onGoalEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveGoal();
    }
  }

  const onGoalClick = () => {
    setTempGoal(goal);
    setIsEditingGoal(true);
  }

  function InputGoal () {
    return (
      <input 
        className="goal-input-active"
        type="number" 
        autoFocus 
        value={tempGoal}
        onChange={onGoalValueChange}
        onBlur={saveGoal}
        onKeyDown={onGoalEditKeyDown}
      />
    );
  }

  function GoalText() {
    return (
      <span className="goal-text-editable" onClick={onGoalClick}>
        {goal}
      </span>
    );
  }

  if (!isHydrated) {
    return <Skeleton />;
  }

  return (
    <div className="card">
      {showSuccess && <SuccessToast />}

      <header className="title">Stay Hydrated 💧</header>
      
      {/* The Main water bottle */}
      <div className="bottle-container">
        <div className="bottle-cap"></div>
        <div className="bottle-body">
          <div className="bottle-marks">
            <span>-</span><span>-</span><span>-</span><span>-</span>
          </div>
          <div className="water-fill"
            style={{ height: `${bottleFill}%` }}>
          </div>
          <div className="bottle-label">
            {total} / {isEditingGoal ? <InputGoal /> : <GoalText />} {unit}
          </div>
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
            <ArrowIcon direction="left" />
          </button>

          {/* The Glass (Action Button) */}
          <div className="vessel-group">
            <button className="mini-glass-btn" onClick={addWater}>
              <div 
                className="mini-water-fill" 
                style={{ height: `${glassFill}%` }} 
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
            <ArrowIcon direction="right" />
          </button>
        </div>
      
      </div>

      <footer className="bottom-actions-container">
        <Link href="/history" className="action-btn">
          <HistoryIcon /> History
        </Link>

        <button className="action-btn" onClick={handleResetWater}>
          Reset
        </button>
        
        <button className="action-btn" onClick={toggleUnit}>
          {switchUnitLabel} 
        </button>
      </footer>
    </div>
  );
}

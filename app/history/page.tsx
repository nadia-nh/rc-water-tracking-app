"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

type WaterRecord = {
  amountOz: number;
  timestamp: number;
};

export default function HistoryPage() {
  const [records, setRecords] = useState<WaterRecord[]>([]);
  const [unit, setUnit] = useState<'oz' | 'ml'>('oz');

  useEffect(() => {
    const saved = localStorage.getItem('waterRecords');
    const savedUnit = localStorage.getItem('waterUnit');
    if (saved) setRecords(JSON.parse(saved));
    if (savedUnit) setUnit(JSON.parse(savedUnit));
  }, []);

  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="card">
      <div className="history-header">
        <Link href="/" className="back-link">← Back</Link>
        <h2 className="title">History</h2>
      </div>

      <div className="records-list">
        {records.length === 0 ? (
          <p className="empty-text">No records yet. Start drinking!</p>
        ) : (
          records.slice().reverse().map((record, index) => (
            <div key={index} className="record-item">
              <div className="record-info">
                <span className="record-date">{formatDate(record.timestamp)}</span>
                <span className="record-time">{formatTime(record.timestamp)}</span>
              </div>
              <span className="record-amount">
                +{unit === 'oz' ? record.amountOz : Math.round(record.amountOz * 30)} {unit}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
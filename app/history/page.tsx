"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { WaterRecord, formatRecords } from '../types/water-record';
import { WaterUnit } from '../types/water-unit';

export default function HistoryPage() {
  const [records, setRecords] = useState<WaterRecord[]>([]);
  const [unit, setUnit] = useState<WaterUnit>(WaterUnit.Oz);
  const formatted = formatRecords(records, unit);

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
          formatted.map((record, index) => (
            <div key={index} className="record-item">
              <div className="record-info">
                <span className="record-date">{formatDate(record.timestamp)}</span>
                <span className="record-time">{formatTime(record.timestamp)}</span>
              </div>
              <span className="record-amount">
                +{record.displayAmount} {record.unitLabel}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
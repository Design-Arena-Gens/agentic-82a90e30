"use client";
import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import type { SeriesPoint, MacdPoint, ZeroLagMacdParams } from '../lib/zeroLagMacd';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

export default function MacdChart({ series, macd, params }: { series: SeriesPoint[]; macd: MacdPoint[]; params: ZeroLagMacdParams; }) {
  const labels = macd.map(m => m.time);

  const { macdLine, signalLine, histData, dotsData } = useMemo(() => {
    const macdLine = macd.map(m => m.macd);
    const signalLine = macd.map(m => m.signal);
    const histData = macd.map(m => m.hist);
    const dotsData = params.showDotsAbove
      ? macd.map((m, i) => ({ x: labels[i], y: m.hist > 0 ? m.hist * 1.05 : m.hist * 1.05 }))
      : [] as any[];
    return { macdLine, signalLine, histData, dotsData };
  }, [macd, params.showDotsAbove]);

  const data = {
    labels,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Histogram',
        data: histData,
        backgroundColor: histData.map(v => v >= 0 ? '#22c55e' : '#ef4444'),
        borderWidth: 0,
        barPercentage: 1.0,
        categoryPercentage: 1.0,
      },
      params.showDotsAbove ? {
        type: 'scatter' as const,
        label: 'Dots',
        data: dotsData,
        pointRadius: 2,
        pointHoverRadius: 3,
        backgroundColor: '#eab308',
        borderColor: '#eab308',
        showLine: false,
      } : (null as any),
      {
        type: 'line' as const,
        label: 'MACD',
        data: macdLine,
        borderColor: '#60a5fa',
        tension: 0.2,
        pointRadius: 0,
        borderWidth: 2,
        yAxisID: 'y',
      },
      {
        type: 'line' as const,
        label: 'Signal',
        data: signalLine,
        borderColor: '#f59e0b',
        tension: 0.2,
        pointRadius: 0,
        borderWidth: 2,
        yAxisID: 'y',
      },
    ].filter(Boolean),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' as const },
    plugins: {
      legend: { labels: { color: '#e5e7eb' } },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af', maxRotation: 0, autoSkip: true, maxTicksLimit: 12 },
        grid: { color: 'rgba(255,255,255,0.05)' },
      },
      y: {
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(255,255,255,0.05)' },
      },
    },
  } as const;

  return (
    <div style={{ height: 420 }}>
      <Chart type='bar' data={data as any} options={options as any} />
    </div>
  );
}

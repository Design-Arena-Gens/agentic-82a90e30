"use client";
import React, { useMemo, useState } from 'react';
import { parseCsvToSeries, SeriesPoint, ZeroLagMacdParams, computeZeroLagMacd, generateSampleSeries } from '../lib/zeroLagMacd';
import ParameterForm from '../components/ParameterForm';
import MacdChart from '../components/MacdChart';

export default function Page() {
  const [series, setSeries] = useState<SeriesPoint[]>(generateSampleSeries(400));
  const [params, setParams] = useState<ZeroLagMacdParams>({
    fastLength: 12,
    slowLength: 26,
    signalLength: 9,
    macdEmaLength: 9,
    maTypeSignal: 'EMA',
    applyMacdEma: true,
    showDotsAbove: false,
  });

  const macd = useMemo(() => computeZeroLagMacd(series, params), [series, params]);

  return (
    <div>
      <div className="section">
        <ParameterForm
          params={params}
          onChange={setParams}
          onLoadSample={() => setSeries(generateSampleSeries(400))}
          onFileLoaded={(csv) => setSeries(parseCsvToSeries(csv))}
        />
      </div>

      <div className="section">
        <div className="controls" style={{ justifyContent: 'space-between' }}>
          <div className="small">Data points: {series.length} ? MACD points: {macd.length}</div>
          <button className="button secondary" onClick={() => setSeries(generateSampleSeries(400))}>Reset to Sample</button>
        </div>
      </div>

      <div className="canvas-card">
        <MacdChart series={series} macd={macd} params={params} />
      </div>
    </div>
  );
}

"use client";
import React, { useRef } from 'react';
import type { ZeroLagMacdParams } from '../lib/zeroLagMacd';

export default function ParameterForm({
  params,
  onChange,
  onLoadSample,
  onFileLoaded,
}: {
  params: ZeroLagMacdParams;
  onChange: (p: ZeroLagMacdParams) => void;
  onLoadSample: () => void;
  onFileLoaded: (csv: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="controls" style={{ marginBottom: 12 }}>
        <button className="button" onClick={onLoadSample}>Load Sample</button>
        <button className="button secondary" onClick={() => fileRef.current?.click()}>Upload CSV</button>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          style={{ display: 'none' }}
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            const text = await f.text();
            onFileLoaded(text);
            e.currentTarget.value = '';
          }}
        />
      </div>

      <div className="grid">
        <div className="grid-1">
          <label>Fast period</label>
          <input type="number" min={1} value={params.fastLength}
            onChange={(e) => onChange({ ...params, fastLength: Number(e.target.value) })} />
        </div>
        <div className="grid-1">
          <label>Slow period</label>
          <input type="number" min={1} value={params.slowLength}
            onChange={(e) => onChange({ ...params, slowLength: Number(e.target.value) })} />
        </div>
        <div className="grid-1">
          <label>Signal period</label>
          <input type="number" min={1} value={params.signalLength}
            onChange={(e) => onChange({ ...params, signalLength: Number(e.target.value) })} />
        </div>
        <div className="grid-1">
          <label>MACD EMA length</label>
          <input type="number" min={1} value={params.macdEmaLength}
            onChange={(e) => onChange({ ...params, macdEmaLength: Number(e.target.value) })} />
        </div>
        <div className="grid-1">
          <label>Signal MA Type</label>
          <select value={params.maTypeSignal}
            onChange={(e) => onChange({ ...params, maTypeSignal: e.target.value as any })}>
            <option value="EMA">EMA</option>
            <option value="SMA">SMA (Glaz mode)</option>
          </select>
        </div>
        <div className="grid-1" style={{ display: 'flex', alignItems: 'flex-end' }}>
          <label style={{ visibility: 'hidden' }}>apply</label>
          <div className="controls">
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={params.applyMacdEma}
                onChange={(e) => onChange({ ...params, applyMacdEma: e.target.checked })} />
              Apply EMA on MACD
            </label>
          </div>
        </div>
      </div>

      <div className="controls" style={{ marginTop: 8 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={params.showDotsAbove}
            onChange={(e) => onChange({ ...params, showDotsAbove: e.target.checked })} />
          Show dots above histogram
        </label>
      </div>
    </div>
  );
}

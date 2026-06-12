import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

export function CandlestickChart({ data, currentPrice }) {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const seriesRef = useRef();
  const volumeSeriesRef = useRef();
  const smaSeriesRef = useRef();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: 'solid', color: 'transparent' },
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 450,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });
    
    chartRef.current = chart;

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });

    const volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '', 
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    const smaSeries = chart.addLineSeries({
      color: 'rgba(59, 130, 246, 0.8)', 
      lineWidth: 2,
      crosshairMarkerVisible: false,
      lastValueVisible: false,
      priceLineVisible: false,
    });

    seriesRef.current = candlestickSeries;
    volumeSeriesRef.current = volumeSeries;
    smaSeriesRef.current = smaSeries;
    
    if (data && data.length > 0) {
      candlestickSeries.setData(data);

      
      const volumeData = data.map(d => ({
        time: d.time,
        value: d.volume || Math.random() * 100000 + 10000,
        color: d.close > d.open ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)',
      }));
      volumeSeries.setData(volumeData);

      
      const smaData = [];
      const period = 5;
      for (let i = 0; i < data.length; i++) {
        if (i < period - 1) continue; 
        let sum = 0;
        for (let j = 0; j < period; j++) {
          sum += data[i - j].close;
        }
        smaData.push({ time: data[i].time, value: sum / period });
      }
      smaSeries.setData(smaData);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data]);

  useEffect(() => {
    
    if (currentPrice && seriesRef.current && data && data.length > 0) {
      const lastCandle = data[data.length - 1];
      const newCandle = {
        time: lastCandle.time,
        open: lastCandle.open,
        high: Math.max(lastCandle.high, currentPrice),
        low: Math.min(lastCandle.low, currentPrice),
        close: currentPrice,
      };
      seriesRef.current.update(newCandle);

      
      if (volumeSeriesRef.current) {
        const lastVol = data[lastCandle.length - 1]?.volume || 50000;
        volumeSeriesRef.current.update({
          time: lastCandle.time,
          value: lastVol + Math.random() * 1000,
          color: currentPrice > lastCandle.open ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)'
        });
      }
    }
  }, [currentPrice, data]);

  return (
    <div className="relative w-full">
      {/* Legend */}
      <div className="absolute top-2 left-4 z-10 flex gap-4 text-xs font-mono">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-gray-300">SMA (5)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-gray-500"></div>
          <span className="text-gray-300">Volume</span>
        </div>
      </div>
      <div ref={chartContainerRef} className="w-full h-[450px]" />
    </div>
  );
}

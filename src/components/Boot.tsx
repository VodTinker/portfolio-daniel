import { useState, useEffect } from 'react';
import { PIXEL_DATA } from '../utils/pixelData';

interface BootProps {
  onDone: () => void;
}

export default function Boot({ onDone }: BootProps) {
  const [lines, setLines] = useState<Array<(typeof PIXEL_DATA.bootSeq)[number]>>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const seq = PIXEL_DATA.bootSeq;
    const timers: ReturnType<typeof setTimeout>[] = [];
    seq.forEach(l => {
      timers.push(setTimeout(() => {
        setLines(prev => [...prev, l]);
      }, l.t));
    });
    const doneTimer = setTimeout(() => onDone(), 1500);
    timers.push(setTimeout(() => setDone(true), 900));
    timers.push(doneTimer);
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div id="boot" className={done ? 'done' : ''}>
      <div>
        <span className="ok">VOD-OS</span>{' '}
        <span style={{ color: '#888' }}>v2.4.1</span>
      </div>
      <div style={{ marginTop: 12 }}>
        {lines.map((l, i) => (
          <div key={i} className={`line ${l.type}`}>{l.text}</div>
        ))}
        <div className="line"><span className="cursor">▌</span></div>
      </div>
    </div>
  );
}

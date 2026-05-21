import { useMemo } from 'react';

const PALETTE: Record<string, string | null> = {
  '.': null,
  K: '#000000', V: '#5b21b6', P: '#a855f7', M: '#ec4899', p: '#f9a8d4',
  C: '#06b6d4', c: '#67e8f9', i: '#a5f3fc', G: '#fbbf24', g: '#fde68a',
  W: '#ffffff', w: '#fef9ff', S: '#b4a5e8', D: '#1a0b3d', R: '#ff4d6d',
  r: '#ffa9b9', Y: '#0b0420', L: '#4ade80', T: '#0d6b80', O: '#f59e0b',
  s: '#ffe0bd', h: '#ffcca0', H: '#d49b75', b: '#1e3a8a', B: '#3b82f6',
  E: '#fcd34d', e: '#7dd3fc', N: '#581c87',
};

function gridToShadow(grid: string, scale: number): string {
  const rows = grid.split('\n').filter(Boolean);
  const shadows: string[] = [];
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      const c = PALETTE[ch];
      if (!c) return;
      shadows.push(`${x * scale}px ${y * scale}px 0 0 ${c}`);
    });
  });
  return shadows.join(', ');
}

function spriteSize(grid: string, scale: number) {
  const rows = grid.split('\n').filter(Boolean);
  const w = Math.max(...rows.map(r => r.length));
  const h = rows.length;
  return { w: w * scale, h: h * scale };
}

interface SpriteProps {
  grid: string;
  scale?: number;
  animated?: boolean;
  style?: React.CSSProperties;
}

export function Sprite({ grid, scale = 4, animated = false, style = {} }: SpriteProps) {
  const shadow = useMemo(() => gridToShadow(grid, scale), [grid, scale]);
  const { w, h } = spriteSize(grid, scale);
  return (
    <div className="sprite-box" style={{ position: 'relative', width: w, height: h, ...style }}>
      <div style={{
        position: 'absolute', width: scale, height: scale, left: 0, top: 0,
        background: 'transparent', boxShadow: shadow,
        animation: animated ? `idle-bob calc(2.4s / var(--anim-mult)) steps(2) infinite` : 'none',
        transform: 'translateZ(0)',
        willChange: 'transform',
      }} />
    </div>
  );
}

export const SPRITE_AVATAR = `
..........KKKKKKKKKK........
........KKVVVVVVVVVVKK......
.......KVVVVVVVVVVVVVVK.....
......KVVVNNNNNNNNNNVVVK....
.....KVVNNNsssssssNNNVVK....
.....KVNNssssssssssNNVVK....
....KVVNsssshhhhssssNVVK....
....KCCKsshKKshKKsshsKCCK...
....KCWCKshKshhKshhsKCWCK...
....KCWCKsshhsshhshsKCWCK...
....KCCKssssssssssssKCCK....
.....KVNssseeeeessssNVK.....
.....KVNssRRRRRRRsssNVK.....
......KVNsssssssssNVK.......
......KVVNNsssssNNVVK.......
.......KVVKKKKKKKVVK........
......KVVKDDDDDDDKVVK.......
.....KVVVKDcccccDKVVVK......
....KVVPPVKDcLLcDKVPPVVK....
....KVPPPPVKDcccDKVPPPPVK...
....KVPPPVVKDDDDDKVVPPPVK...
....KVVPVK..KKKKK..KVPVVK...
.....KVVK....KKK....KVVK....
......KVK....KKK....KVK.....
......KVVK..KDDDK..KVVK.....
.....KVVPVK.KDDDK.KVPVVK....
....KVPPVVK.KDDDK.KVVPPVK...
....KVPPVK..KDDDK..KVPPVK...
....KVPVK...KKKKK...KVPVK...
....KVVK....KCKKCK...KVVK...
....KKK.....KCKKCK....KKK...
............KKKKKKKK........`;

export const SPRITE_AVATAR_S = `
................
................
.....KKKKKK.....
...KKCCCCCCKK...
..KCciciciicCK..
.KCiciciciciciK.
.KCcKKicicKKcCK.
.KCiKKicicKKiCK.
.KCiciciciciciK.
.KCcicicicicCCK.
..KCcicicicCCK..
...KKCCCCCCKK...
.....KKKKKK.....
................
................
................
................
................`;

export const SPRITE_SERVER = `
.KKKKKKKKKKKKKK.
KVVVVVVVVVVVVVVK
KVLLLLLLLLLLLLVK
KVLKKKKKKKKKKLVK
KVLKLLKLLKLLLLVK
KVLLLLLLLLLLLLVK
KVLLLLLLLLLLLLVK
KVLKKKKKKKKKKLVK
KVLKLLKLLKLLLLVK
KVLLLLLLLLLLLLVK
KVLLLLLLLLLLLLVK
KVLKKKKKKKKKKLVK
KVLKLLKLLKLLLLVK
KVLLLLLLLLLLLLVK
KVLLLLLLLLLLLLVK
KVVVVVVVVVVVVVVK
.KKKKKKKKKKKKKK.`;

export const SPRITE_GEAR = `
....KKKK....
...KSSSSK...
..KSSWWSSK..
KKSSWWWWSSKK
KSSWWKKWWSSK
KSSWKKKKWSSK
KSSWKKKKWSSK
KSSWWKKWWSSK
KKSSWWWWSSKK
..KSSWWSSK..
...KSSSSK...
....KKKK....`;

export const SPRITE_MUSHROOM = `
....KKKKKKKKK....
...KRRRRRRRRRK...
..KRWWRRRRRWRRK..
.KRRWWRRRRRRWWRK.
.KRWWRRRWRRRRWRK.
KRRRWWWRWRRRRRRK.
KRWWRRRWWWRRRWWK.
.KRRRRRWWWRRRRK..
..KKKKKKKKKKKK...
...KKsssssssK....
..KKshhhhhhhKK...
..KshhhhhhhhhK...
..KKshhhhhhhKK...
...KKKKKKKKKK....`;

export const SPRITE_SWORD = `
....KCCK....
...KCWWCK...
...KCWWCK...
...KCWWCK...
...KCWWCK...
...KCWWCK...
...KCWWCK...
...KCWWCK...
..KCWWWWCK..
.KGCWWWWCGK.
KGgGCWWCGgGK
KGggGCCGggGK
KGgggGGgggGK
.KGgggggggK.
..KGggggGK..
...KGggGK...
....KGGK....
.....KK.....`;

export const SPRITE_STAR = `
.......KK.......
......KGGK......
.....KGggGK.....
....KGggggGK....
....KGggggGK....
KKKKKGggggGKKKKK
KGgggggggggggGK.
.KGgggggggggGK..
..KGggggggGK....
...KGggGGgGK....
...KGgGKKGgGK...
..KGgGK.KGgGK...
.KGgGK...KGgGK..
KGGK......KGGK..`;

export const SPRITE_HEART = `
.KRRK..KRRK.
KRRRRKKRRRRK
KRrrRRRRrrRK
KRrrrrrrrrRK
.KRrrrrrrRK.
..KRrrrrRK..
...KRrrRK...
....KRRK....
.....KK.....`;

export const SPRITE_CLOUD = `
....KKKK......
..KKWWWWKKK...
.KWWWWWWWWWK..
KWWWWWWWWWWWK.
KWWWWWWWWWWWK.
.KWWWWWWWWWK..
..KKKKKKKKK...`;

export const SPRITE_CHEST = `
....KKKKKKKKKKKKKK....
...KVVVVVVVVVVVVVVK...
..KVKKKKKKKKKKKKKKVK..
.KVKGGGGGGGGGGGGGGKVK.
.KVKgggggggggggggKVK..
.KVKgKKKKKKKKKKKgKVK..
.KVKgKgggggggggKgKVK..
.KVKgKgKKKKKKKgKgKVK..
.KVKgKgKggGgKKgKgKVK..
.KVKgKgKKKKKKKgKgKVK..
.KVKgKgggggggggKgKVK..
.KVKgKKKKKKKKKKKgKVK..
.KVKgggggggggggggKVK..
.KVKGGGGGGGGGGGGGGKVK.
.KVKKKKKKKKKKKKKKKKVK.
..KVVVVVVVVVVVVVVVVK..
...KKKKKKKKKKKKKKKK...`;

export const SPRITE_MONITOR = `
..KKKKKKKKKKKKKKKKKK..
.KVVVVVVVVVVVVVVVVVVK.
.KVDDDDDDDDDDDDDDDDVK.
.KVDLLLLLLLLLLLLLLDVK.
.KVDLcccccccccccLLDVK.
.KVDLccCCCCCcccLLLDVK.
.KVDLccCCccCcccLLLDVK.
.KVDLccCccCCcccLLLDVK.
.KVDLccCCCCCcccLLLDVK.
.KVDLcccccccccccLLDVK.
.KVDLLLLLLLLLLLLLLDVK.
.KVDDDDDDDDDDDDDDDDVK.
.KVVVVVVVVVVVVVVVVVVK.
..KKKKKVVVVVVVVKKKKK..
.....KKVVVVVVVVKK.....
....KKVVVVVVVVVVKK....
...KKVVVVVVVVVVVVKK...`;

export const SPRITE_ANIME = `
.........KKKKKKKKKKKK...........
.......KKCCCCCCCCCCCCKK.........
......KCCccccccccccccCCK........
.....KCccccciiiiicccccccK.......
....KCccciiiiccciiiiicccCK......
....KCccciccccccciccccccCK......
...KCcccciccccccccciccccCK......
...KCcccciccccciicccciccCK......
...KCcccccCCCCCCCCCcciccCK......
...KCcccCKKKKKKKKKKCCcccCK......
...KCccCKsssssssssssKCcCK.......
...KCcCKssshhhhhhhssKCK.........
....KCKsssssssssssssKCK.........
.MMMKKsshhssssssssshhsKMMM......
MMMMKsshKsKEEsshEEsKshhKMMMM....
MMpMKshKWKEEEshEEEKWKshKMpMM....
MMMMKssKKKEEKshKEEEKKsshKMMM....
.MMKsssssssshhhsssssssKMM.......
..KsssshKKshhhshKKsshsK.........
..KKsssKRRsssssRRsssKK..........
...KKKsKRRRRRRRRRsKKK...........
.....KKsssRRRRRsssKK............
.....KVVssssssssVVK.............
....KVPPVNNNNNNNVPPVK...........
...KVPPPVNDDDDDDNVPPPVK.........
..KVPPVVVNDDRDDDNVVPPVK.........
..KVPVKKKNDDRRDDDNKKVPVK........
..KVVK..KNDDDDDDNK..KVVK........
..KVK....KNDDDDNK....KVK........
..KVK....KKKKKKKK....KVK........
..KVVK..KCKKKKKKCK..KVVK........
.KVPVVK.KCKKKKKKCK.KVVPVK.......
.KVPPVK.KCKKKKKKCK.KVPPVK.......
.KVVPVK.KKKKKKKKKK.KVPVVK.......
..KVVK...KCKKKKCK...KVVK........
...KKK...KKKKKKKK....KKK........`;

export const SPRITE_CHIBI = `
....KKKKKKKK....
...KCCCCCCCCK...
..KCcciiiiccCK..
..KcciccciccCK..
.KCccCKKKKCccCK.
.KCKsshhhhssKCK.
MMKshKEEEEhKshKM
MMKsKWKEEKWKsKMM
MMKsssKKKKKsssKM
.MKssRRRRRRRsKM.
..KKssRRRRRssKK.
...KVVssssVVK...
..KVPPVRRRVPPVK.
..KVPVKDDDKVPVK.
..KVVK.KKK.KVVK.
..KVK..KDK..KVK.
..KVK..KDK..KVK.
..KVVK.KDK.KVVK.
..KVK..KKK..KVK.
..KKK......KKK..`;

/* Netbird — pájaro naranja, vista lateral */
export const SPRITE_NETBIRD = `
...OOOO...
..OOOKOO..
.OOOOOOOGG
OOOOOOOOO.
OOOOOOOOO.
.OOOOOOOO.
..OOOOOO..
...OO.OO..
`;

/* Claude Code mascot — logo arco */
export const SPRITE_CLAW = `
.OOOOOOO.
OOOOOOOOO
..OO.OO..
`;

/* Homelab topology sprites */

export const SPRITE_GLOBE = `
..KKKKKK..
.KCCiCiCK.
KCiCiCiCiK
KCiCiCiCiK
KCiiiiiiCK
KCiCiCiCiK
.KCCiCiCK.
..KKKKKK..
`;

export const SPRITE_VPS_SERVER = `
.KTTTTTTK.
KTTTTTTTTK
KTTcLcLcTK
KTTTTTTTTK
KTTcGcLcTK
KTTTTTTTTK
KTTcLcGcTK
KTTTTTTTTK
.KTTTTTTK.
`;

export const SPRITE_DESKTOP = `
.KKKKKKKKK.
KVDDDDDDDVK
KVDcccccDVK
KVDccBccDVK
KVDcccccDVK
KVDDDDDDDVK
..KVVVVK...
.KVVVVVVK..
KKVVVVVVKK.
`;

export const SPRITE_PROXMOX_RACK = `
.KMMMMMMK.
KMMMMMMMMK
KMKLLGLKMK
KMMMMMMMMK
KMKGLLGKMK
KMMMMMMMMK
KMKLLGLKMK
KMMMMMMMMK
.KMMMMMMK.
`;

export const SPRITE_IPAD = `
KBBBBBBBBK
KBBBBBBBBK
KBBccccBBK
KBBccccBBK
KBBccecBBK
KBBccccBBK
KBBccecBBK
KBBccccBBK
KBBBBBBBBK
..KBBBBK..
...KBBK...
`;

export const SPRITE_PHONE = `
.KRRRRRRK.
.KRRRRRRK.
.KRccccRK.
.KRccccRK.
.KRccccRK.
.KRcercRK.
.KRccccRK.
.KRccccRK.
.KRccccRK.
.KRRRRRRK.
..KRRRRK..
...KRRK...
`;

export const SPRITE_COIN = `
..GGGG..
.GGggGG.
GgGGggGG
GgGGggGG
.GGggGG.
..GGGG..
`;

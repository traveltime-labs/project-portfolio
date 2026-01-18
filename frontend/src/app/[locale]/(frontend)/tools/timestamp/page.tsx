import TimestampChange from "./timestampChange";

/*
text/
├── page.tsx           ← /tools/text 入口，Server Component
├── timestampChange.tsx    ← Client Component，純畫面 + 使用 hook
└── useTextStats.ts    ← 自訂 hook，純邏輯（state & 計算）
*/


export default function Page() {
  return (
    <TimestampChange />
  );
}

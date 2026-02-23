/**
  modules: 負責「組合這個頁面的一些功能區塊」
  ex: 組合家具（PostList, CommentBtn），這房間只屬於這個房子
  * 
 */

import { BsTelephoneFill } from "react-icons/bs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const skills = [
  'HTML', 'Vue', 'React', 'Next.js', 'JavaScript', 'TypeScript', 'TailwindCSS', 'shadcn-ui', 'Node.js', 'Postgres'
];

const timeline = [
  { date: '2024-08', title: '加入 Traveltime Labs', desc: '擔任前端工程師，負責 UI 開發與元件化。' },
  { date: '2022-05', title: '自由接案', desc: '協助多個中小型專案完成前端實作與部署。' },
  { date: '2019-10', title: '開始寫技術文章', desc: '將工作中遇到的問題與解法整理成文章。' },
];

const works = [...Array(6)].map((_, i) => ({
  id: i,
  title: `Project ${i + 1}`,
  desc: '範例作品說明，展示技術與功能亮點。',
  img: 'https://avatar.vercel.sh/shadcn1'
}));

const Content = () => {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold">關於我</h1>
        <p className="text-slate-600 mt-2">前端工程師 — 喜歡把複雜的 UI 做得簡潔且易用。</p>
      </header>

      <main className="col-span-1 lg:col-span-2 space-y-8">

        {/* Timeline */}
        <section className="py-6">
        <h2 className="text-lg font-semibold mb-4">工作經歷</h2>
        <ul className="m-0 p-0 w-full list-none leading-[1.4em]">
          {[...Array(5)].map((_, i) => (
            /* 父層必須有 relative，marker 才能定位 */
            <li key={i} className="group relative pl-10 pb-10 last:pb-0">

              {/* 1. Timeline Info (日期) */}
              <div className="mb-[0.5em] text-[12px] font-bold tracking-[3px] uppercase whitespace-nowrap text-gray-500">
                <span>March 12, 2016</span>
              </div>

              {/* 2. Timeline Marker 容器 */}
              {/* 確保這個容器佔據左側空間 */}
              <div className="absolute top-0 bottom-0 left-0 w-[15px]">

                {/* 圓點 (原本的 :before) */}
                <div className="
          absolute top-[4px] left-0 z-10
          w-[15px] h-[15px] rounded-full 
          bg-blue-600 border-[3px] border-transparent 
          transition-all duration-300 ease-in-out
          group-hover:bg-white group-hover:border-blue-600
        " />

                {/* 垂直線 (原本的 :after) */}
                {/* z-0 確保它在圓點下方，last:hidden 確保最後一項沒線 */}
                <div className="
          absolute top-[24px] bottom-0 left-[6px] 
          w-[3px] bg-[#CCD5DB] 
        " />
              </div>

              {/* 3. Timeline Content */}
              <div className="relative">
                <h3 className="text-lg font-bold">Event Title {i + 1}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Nullam vel sem. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.
                </p>
              </div>
            </li>
          ))}
        </ul>
        </section>

        {/* <section className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">工作經歷</h2>
            <ul className="m-0 p-0 w-full list-none leading-[1.6em]">
              {timeline.map((t, idx) => (
                <li key={t.date + idx} className="group relative pl-14 pb-6">
                  <div className="absolute left-0 top-2 w-10 text-sm text-slate-400">{t.date}</div>
                  <div className="absolute left-8 top-4 w-3 h-3 rounded-full bg-blue-600" />
                  <div>
                    <h3 className="text-md font-bold">{t.title}</h3>
                    <p className="text-sm text-slate-600 mt-2">{t.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section> */}

        {/* 作品集 */}
        <section>
          <h2 className="text-lg font-semibold mb-4">作品集</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {works.map((w) => (
              <Card key={w.id} className="overflow-hidden">
                <div className="relative aspect-video">
                  <img src={w.img} alt={w.title} className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <CardHeader>
                  <CardAction>
                    <Badge variant="secondary">Featured</Badge>
                  </CardAction>
                  <CardTitle>{w.title}</CardTitle>
                  <CardDescription>{w.desc}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full">查看專案</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Content;

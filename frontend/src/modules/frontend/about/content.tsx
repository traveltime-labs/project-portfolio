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

import TimeLine from "@/components/TimeLine";

const skills = [
  'HTML', 'Vue', 'React', 'Next.js', 'JavaScript', 'TypeScript', 'TailwindCSS', 'shadcn-ui', 'Node.js', 'Postgres'
];

const timelineData = [
    { 
      year: '2024',
      data: [
        {
          date: '08-24', 
          title: '加入 Traveltime Labs', 
          desc: '擔任前端工程師，負責 UI 開發與元件化。', 
          link: '' 
        },
        {
          date: '08-20', 
          title: '餐加 Traveltime Labs', 
          desc: 'TEST。', 
          link: '' 
        }
      ]
    },
    { 
      year: '2022', 
      data: [
         { date: '05-10', title: '自由接案', desc: '協助多個中小型專案完成前端實作與部署。', link: '' },
      ]
    },
    {
      year: '2019',
      data: [
        { date: '10-10', title: '開始寫技術文章', desc: '將工作中遇到的問題與解法整理成文章。', link: '' },
      ]
    }
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
        <h1 className="text-3xl font-extrabold">about</h1>
        <p className="text-slate-600 mt-2">text。</p>
      </header>

      <main className="col-span-1 lg:col-span-2 space-y-8">

        {/* Timeline */}
        <section className="py-6">
          <h2 className="text-lg font-semibold mb-4">work history</h2>
          <TimeLine List={timelineData} />
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

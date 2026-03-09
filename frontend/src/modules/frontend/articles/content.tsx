/**
  modules: 負責「組合這個頁面的一些功能區塊」
  ex: 組合家具（PostList, CommentBtn），這房間只屬於這個房子
 */

import { Link } from "@/i18n/routing";

interface TimelineItem {
  date: string;
  title: string;
  desc?: string;
  link?: string;
}

interface TimelineGroup {
  year: string;
  data: TimelineItem[];
}

const Content: React.FC = () => {
  const timelineData: TimelineGroup[] = [
    {
      year: "2024",
      data: [
        { date: "08-24", title: "work1", desc: "work1 - cotnent", link: "" },
        { date: "08-20", title: "work2", desc: "TEST。", link: "" },
      ],
    },
    {
      year: "2022",
      data: [
        { date: "05-10", title: "work2", desc: "協助多個中小型專案完成前端實作與部署。", link: "/" },
      ],
    },
    {
      year: "2019",
      data: [
        { date: "10-10", title: "work3", desc: "將工作中遇到的問題與解法整理成文章。", link: "/" },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-extrabold mb-6">文章列表</h2>

      {timelineData.length > 0 ? (
        <div className="space-y-10">
          {timelineData.map((group) => (
            <section key={group.year} aria-labelledby={`year-${group.year}`}>
              <h3 id={`year-${group.year}`} className="text-xl font-semibold mb-4">
                {group.year}
              </h3>

              <ul className="relative border-l-2 border-gray-200 dark:border-gray-700 pl-6">
                {group.data.map((item) => (
                  <li
                    key={`${group.year}-${item.date}-${item.title}`}
                    className="mb-6 relative"
                    aria-label={`${item.title} ${item.date}`}
                  >
                    <span className="absolute -left-[31px] top-0 w-3 h-3 bg-white  border-2 border-indigo-500 rounded-full" />

                    <div className="flex flex-col sm:items-start gap-3">
                      <div className="w-24 flex-shrink-0 text-xs text-gray-500 font-medium">{item.date}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="text-lg font-bold leading-snug">{item.title}</h4>
                          {item.link ? (
                            <Link href={item.link} className="text-indigo-600 text-sm hover:underline">
                              連結
                            </Link>
                          ) : null}
                        </div>

                        {item.desc ? (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{item.desc}</p>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <div className="text-gray-500">沒有資料</div>
      )}
    </div>
  );
};

export default Content;

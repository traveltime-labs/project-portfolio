/**
  modules: 負責「組合這個頁面的一些功能區塊」
  ex: 組合家具（PostList, CommentBtn），這房間只屬於這個房子
  * 
 */

import { Link, usePathname } from "@/i18n/routing";
import TimeLine from "@/components/TimeLine";

// 歷史線性文章列表
// 2026 > 2025 > 2024
const Content = () => {

  const timelineData = [
    { 
      year: '2024',
      data: [
        {
          date: '08-24', 
          title: 'work1', 
          desc: 'work1 - cotnent', 
          link: '' 
        },
        {
          date: '08-20', 
          title: 'work2', 
          desc: 'TEST。', 
          link: '' 
        }
      ]
    },
    { 
      year: '2022', 
      data: [
         { date: '05-10', title: 'work2', desc: '協助多個中小型專案完成前端實作與部署。', link: '/' },
      ]
    },
    {
      year: '2019',
      data: [
        { date: '10-10', title: 'work3', desc: '將工作中遇到的問題與解法整理成文章。', link: '/' },
      ]
    }
  ];

  return (
    <div className="container mx-auto">
      <div> articles </div>
      <div>

        {
          timelineData.length > 0 ? (
            <TimeLine List={timelineData} />
          ) : (
            <div> nodata </div>
          )
        }

      </div>
    </div>
  );
};

export default Content;

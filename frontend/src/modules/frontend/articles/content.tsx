/**
  modules: 負責「組合這個頁面的一些功能區塊」
  ex: 組合家具（PostList, CommentBtn），這房間只屬於這個房子
  * 
 */

import { Link, usePathname } from "@/i18n/routing";

// 歷史線性文章列表
// 2026 > 2025 > 2024
const Content = () => {
  const fackData = [
    {
      year: 2025,
      data: [
        {
          name: 'aaaa',
          link: '/',
          createDate: '2025-06-05 10:00:00'
        },
        {
          name: 'aaaa',
          link: '/',
          createDate: '2025-06-05 10:00:00'
        }
      ]
    },
    {
      year: 2024,
      data: [
        {
          name: 'aaaa',
          link: '/',
          createDate: '2024-06-05 10:00:00'
        },
        {
          name: 'aaaa',
          link: '/',
          createDate: '2024-06-05 10:00:00'
        }
      ]
    }
  ]
  return (
    <div className="container mx-auto">
      <div> articles </div>
      <div>

        {
          fackData.length > 0 ? (
            fackData.map((item, i) => (
              // 1. 列表渲染需要加上 key
              <ul key={item.year}>
                <b>{item.year}</b>

                {/* 2. 在 JSX 內部寫邏輯，必須再次使用 { } 大括號包裹 */}
                {item.data.length > 0 ? (
                  item.data.map((a, b) => (
                    // 3. 內層 key 同樣重要，通常建議用 id 或具唯一性的值
                    <li key={b}>
                      <Link href={a.link}> {a.name} </Link>
                    </li>
                  ))
                ) : (
                  <li> no data </li>
                )}
              </ul>
            ))
          ) : (
            <div> nodata </div>
          )
        }

      </div>
    </div>
  );
};

export default Content;

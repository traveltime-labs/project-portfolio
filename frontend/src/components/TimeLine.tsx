
import { Link, usePathname } from "@/i18n/routing"; // 注意要用我們自定義的 Link

interface TimeLineItem {
    date: string;
    title?: string;
    desc?: string;
    link?: string;
}

interface TimeLineGroup {
    year: string;
    data: TimeLineItem[];
}

const TimeLine = ({ List }: { List: TimeLineGroup[] }) => {

    return (
        <div>
            <ul className="m-0 p-0 w-full list-none leading-[1.4em]">
                {List.map((group, i) => (
                    /* 父層必須有 relative，marker 才能定位 */
                    <li key={i} className="group relative pb-30 last:pb-0">

                        {/* 1. Timeline Info (日期) */}
                        <div className="mb-20 text-[12px] font-bold tracking-[3px] uppercase whitespace-nowrap text-gray-500 text-[24px] pl-10">
                            <span>{group.year}</span>
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



                        {group.data && group.data.length > 0 ? group.data.map((item, idx) => (
                            <div className="group relative pb-10 last:pb-0 pl-10" key={idx}>

                                {/* 1. Timeline Info (日期) */}
                                <div className="mb-[0.5em] text-[12px] font-bold tracking-[3px] uppercase whitespace-nowrap text-gray-500">
                                    <span>{item.date}</span>
                                </div>

                                {/* 2. Timeline Marker 容器 */}
                                {/* 確保這個容器佔據左側空間 */}
                                <div className="absolute top-0 bottom-0 left-0 w-[15px]">

                                    {/* 圓點 (原本的 :before) */}
                                    <div className="
                                        absolute top-[4px] left-[1px] z-10
                                        w-[12px] h-[12px] rounded-full 
                                        bg-blue-500 border-[3px] border-transparent 
                                        transition-all duration-300 ease-in-out
                                        group-hover:bg-white group-hover:border-blue-500
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
                                    <h3 className="text-lg font-bold">
                                        {item.title} 
                                    {
                                        item.link ? (
                                            <Link href={item.link}>連結</Link>
                                        ) : ''
                                    }
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                        {item.desc}
                                        
                                    </p>
                                </div>


                            </div>
                        )) : null}




                    </li>
                ))}
            </ul>
        </div>
    );
}


export default TimeLine;
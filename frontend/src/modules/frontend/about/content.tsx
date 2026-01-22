/**
  modules: 負責「組合這個頁面的一些功能區塊」
  ex: 組合家具（PostList, CommentBtn），這房間只屬於這個房子
  * 
 */

import { BsTelephoneFill } from "react-icons/bs";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const Content = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-flow-col grid-rows-2 gap-4">
        <div>
          <h2>TEST</h2>
          <div> frontend TEST </div>
          <div className="grid gap-2">
            <div><BsTelephoneFill /> </div>
            <div>test</div>
          </div>
        </div>
        <div>
          lardjkfal;dkfjag;aiodjfafadfmewjrjdfd da;dfjasdlfjadf edska;fd dajf;dslfs
        </div>
      </div>

      <hr />

      <div>
        {/* 技能 */}
        <ul>
          <li>html / vue / react next</li>
          <li>javscript / jquery / typescript</li>
          <li>scss / css / bootstrap / TailwindCss / shadcn ui</li>
          <li>node.js / netcore</li>
          <li>postsql</li>
        </ul>
      </div>

      <hr />

      {/* 工作經驗 */}
      <div>
        <h2>experience</h2>

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
      </div>

      <hr />


      {/* 作品集 */}
      <div>
        <h2 className="text-lg text-center">
          work data
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

          {[...Array(5)].map((_, i) =>
            <Card className="relative mx-auto w-full max-w-sm pt-0">
              <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
              <img
                src="https://avatar.vercel.sh/shadcn1"
                alt="Event cover"
                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
              />
              <CardHeader>
                <CardAction>
                  <Badge variant="secondary">Featured {i} </Badge>
                </CardAction>
                <CardTitle>Design systems meetup</CardTitle>
                <CardDescription>
                  A practical talk on component APIs, accessibility, and shipping
                  faster.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">View Event</Button>
              </CardFooter>
            </Card>
          )}


        </div>


      </div>
    </div>
  );
};

export default Content;

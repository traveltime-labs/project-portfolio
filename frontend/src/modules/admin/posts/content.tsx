"use client";


import Image from "next/image";
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button";

import usePostList from "@/hooks/admin/posts";
import PostEditor from "@/modules/admin/posts/postEditor";

// 列表頁
const Content = () => {

  const { openPostEditor, setOpenPostEditor, selectedPost, handleOpenPostEditor, handleDelete, posts, isLoading, error, changeEnable } = usePostList(); 

  if (isLoading) return <div>Loading...</div>
  if (error) return <div> Error </div>

  return (
    <div className="p-8 bg-white rounded-xl">
      <Button onClick={() => handleOpenPostEditor(true, null)}>
        新增文章
      </Button>

      <PostEditor 
        open={openPostEditor} 
        onOpenChange={setOpenPostEditor} 
        post={selectedPost} 
      />

        <table className=" w-full">
            <thead className="bg-gray-200 h-10">
                <tr>
                  <th>圖片</th>
                  <th>名稱</th>
                  <th>詳細資料</th>
                  <th>是否啟用</th>
                  <th>時間</th>
                  <th>狀態</th>
                  <th>功能</th>
                </tr>
            </thead>
            <tbody>
              { posts.length > 0 ? posts.map((post: Post) => (
                <tr key={post.id} className="border-b">
                    <td className="py-8">
                      <Image className="object-cover w-full h-full" src="/" alt="" width={400} height={225}/>
                    </td>
                    <td className="text-center">{post.title}</td>
                    <td className="text-left">
                      內容： {post.content} <br/>
                      連結： {post.link.page} <br/>
                    </td>
                     <td className="text-center">
                       <Switch 
                        checked={post.enable}
                        onCheckedChange={() => changeEnable(post)}  
                      />
                    </td>
                    <td className="text-center">
                      創建： {post.createdAt} <br/>
                      編輯： {post.updateAt}
                    </td>
                    <td className="text-center">
                     瀏覽數: - <br/>
                     點擊數: -
                    </td>
                    <td className="text-center">
                      <Button className="mr-2" 
                      onClick={() => handleOpenPostEditor(true, post)}>編輯</Button>
                      <Button onClick={() => handleDelete(post)}>刪除</Button>
                    </td>
                </tr>
              )) : (<tr>
                <td> - </td>
              </tr> )}
            </tbody>
        </table>
    </div>
  );
};

export default Content;

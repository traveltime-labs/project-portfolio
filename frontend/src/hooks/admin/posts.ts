"use client";

import { toast } from "sonner";
import { useState } from "react";
import usePosts from '@/hooks/admin/usePosts'

export default function usePostList() {

  const [checked, setChecked] = useState(true);
  const [openPostEditor, setOpenPostEditor] = useState(false); // 控制 PostEditor 開關
  const [selectedPost, setSelectedPost] = useState<Post | null>(null); // 選擇一筆資料

  const { posts, isLoading, error, savePost, isSaving, deletePost, isDeleting } = usePosts() // 文章列表數據

  // 編輯按鈕處理
  const handleOpenPostEditor = (isOpen: boolean, post: Post | null) => {
    setOpenPostEditor(isOpen);
    setSelectedPost(post);
  };

  // 刪除按鈕處理
  const handleDelete = (post: Post) => {
    if (post && post.id) {
      deletePost(post.id, {
        onSuccess: () => {
          toast.success("資料已刪除");
        },
        onError: (err) => {
          toast.error("儲存失敗");
          console.error(err)
        }
      });
    }
  };

  // 啟用
  const changeEnable = (post: Post) => {
    if (post) {
      post.enable = !post.enable;
      savePost(post, {
        onSuccess: () => {
          toast.success("資料已更新");
        },
        onError: (err) => {
          toast.error("儲存失敗");
          console.error(err)
        }
      })
    }
  }

  return {
    checked,
    setChecked,
    openPostEditor,
    setOpenPostEditor,
    selectedPost,
    setSelectedPost,
    handleOpenPostEditor,
    handleDelete,
    posts,
    isLoading,
    error,
    changeEnable
  };
}
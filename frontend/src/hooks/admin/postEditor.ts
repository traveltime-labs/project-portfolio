
import { toast } from "sonner";
import { useState, useEffect } from "react";
import usePosts from "@/hooks/admin/usePosts";

export const usePostEditor = (post: Post | null, onClose: () => void) => {
  const { savePost } = usePosts();
  const initForm = () => {
    return {
      title: '',
      content: '',
      tags: [],
      category: '',
      group: '',
      author: '',
      image: null,
      enable: true,
      link: { page: '', github: '/', npm: '/', web: '/' }
    }
  }

  const [form, setForm] = useState<Post>(initForm);

  // 監聽 post 是否有傳入, 更新表單內容 
  useEffect(() => {
    post ? setForm(post) : setForm(initForm)
  }, [post]);

  const submit = () => {
    const payload = {
      ...form,
      updatedAt: new Date().toISOString(),
      ...(post ? {} : {
        createdAt: new Date().toISOString() // 如果是新增，才加 createdAt
      })
    };

    savePost(payload, {
      onSuccess: () => {
        toast.success("資料已儲存");
        onClose(); // 執行關閉彈窗的 function
      },
      onError: (err) => {
        toast.error("儲存失敗");
        console.error(err)
      }
    });
  };

  return {
    form,
    setForm,
    submit,
  }
}
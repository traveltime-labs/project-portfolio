"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { addPost } from "@/services/post";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";

interface CommentEditorProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CommentEditor = ({ isOpen, setIsOpen }: CommentEditorProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate: addPostMutate, isPending} = useMutation({
    mutationFn: addPost,
  })

  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

  const queryClient = useQueryClient();

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const router = useRouter();

  const onPost = () => {
    if (isPending) return;
    if (!title || !content) return alert('please fill in all fields');
    addPostMutate({title, content}, {
      onSuccess: () => {
        setIsOpen(false);
        setTitle("");
        setContent("");
        queryClient.invalidateQueries({queryKey: ['posts', currentPage]}); // 刷新頁面
        // 如果不是在第一頁，跳轉到第一頁
        if(currentPage != '1') {
          console.log('不是在第一頁面')
          router.push('/?page=1')
        }
      }
    })
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => {}}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-closed:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/70" />
      <DialogPanel className="max-w-lg z-50 space-y-4 bg-[#131313] border border-white/10 p-4 rounded-lg">
        <DialogTitle className="font-bold text-white">
          What's on your mind?
        </DialogTitle>
        <input
          placeholder="Title"
          type="text"
          className="w-full h-[40px] border text-sm border-white/10 rounded-md p-2 focus:outline-none"
          value={title}
          onChange={onTitleChange}
        />
        <textarea
          placeholder="Comment"
          className="w-full h-[100px] border text-sm border-white/10 rounded-md p-2 focus:outline-none"
          value={content}
          onChange={onContentChange}
        />
        <div className="flex gap-4 text-sm justify-end">
          <button
            className="text-white/50 font-bold cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="text-white font-bold cursor-pointer"
            disabled={isPending}
            onClick={() => onPost()}
          >
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default CommentEditor;

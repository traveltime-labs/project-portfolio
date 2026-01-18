"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { usePostEditor } from "@/hooks/admin/postEditor";


interface PostEditorProps {
  open: boolean;
  post: Post | null,
  onOpenChange: (open: boolean) => void; // 讓子層可以通知父層關閉
  //setSelectedPost: void
}

const PostEditor = ({ open, onOpenChange, post }: PostEditorProps) => {
  const {
    form,
    setForm,
    submit,
  } = usePostEditor(post, () => onOpenChange(false));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="w-full text-right">
        {/* <DialogTrigger className="mb-5 bg-black text-white px-4 py-2 rounded-sm" 
          onClick={() => setIsOpen(true)}>
            
          新增文章
        </DialogTrigger> */}
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新增文章</DialogTitle>
          {/* <DialogDescription>
            新增文章
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="picture">圖片</Label>
            <Input id="picture" type="file" onChange={(e) =>
              setForm((prev) => ({ ...prev, image: e.target.files?.[0] || null }))
            }/>
          </div>

          {/*  選擇群組  */}
          <Select value={form.group} onValueChange={(value) =>
            setForm((prev) => ({ ...prev, group: value }))
          }>
            <SelectTrigger className="w-[180px]">
              <Label htmlFor="群組">選擇群組</Label>
              <SelectValue placeholder="選擇群組" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="小工具">小工具</SelectItem>
              <SelectItem value="套件">套件</SelectItem>
            </SelectContent>
          </Select>

          {/*  選擇分類  */}
          <Select value={form.category} onValueChange={(value) =>
            setForm((prev) => ({ ...prev, category: value }))
          }>
            <SelectTrigger className="w-[180px]">
              <Label htmlFor="category">選擇分類</Label>
              <SelectValue placeholder="選擇分類" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="小工具">小工具</SelectItem>
              <SelectItem value="套件">套件</SelectItem>
            </SelectContent>
          </Select>
          
          {/*  選擇標籤  */}
          選擇標籤（可多選）：
          {["JSON", "React", "壓縮"].map((tag) => (
            <div key={tag} className="flex items-center gap-1">
              <Checkbox id={tag}
                checked={form.tags.includes(tag)}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({
                    ...prev,
                    tags: checked
                      ? [...prev.tags, tag]
                      : prev.tags.filter((t) => t !== tag),
                  }))
                }
              />
              <Label htmlFor={tag} >{tag}</Label>
            </div>
          ))}

          {/*  連結設定  */}
            <div>
              <b>連結設定</b>
              <div className="grid gap-3">
                <Label htmlFor="page">Link: page</Label>
                <Input id="page" name="page"  
                  value={form.link.page} 
                  onChange={e => setForm((prev) => ({...prev, link: {
                    ...prev.link,
                    page: e.target.value
                  }}))}/>

                <Label htmlFor="github">Link: github</Label>
                <Input id="github" name="github"
                  value={form.link.github} 
                  onChange={e => setForm((prev) => ({...prev, link: {
                    ...prev.link,
                    github: e.target.value
                  }}))}/>

                <Label htmlFor="npm">Link: npm</Label>
                <Input id="npm" name="npm" 
                  value={form.link.npm} 
                  onChange={e => setForm((prev) => ({...prev, link: {
                    ...prev.link,
                    npm: e.target.value
                  }}))}/>
              </div>
            </div>

            {/*  標題  */}
            <div className="grid gap-3">
              <Label htmlFor="title">
                <b>title</b>
              </Label>
              <Input id="title" name="name" 
                value={form.title} 
                onChange={e => setForm((prev) => ({...prev, title: e.target.value}))}/>
            </div>

            {/*  編輯者  */}
            <div className="grid gap-3">
              <Label htmlFor="author">
                <b>author</b>
              </Label>
              <Input id="author" name="author" 
                value={form.author} 
                onChange={e => setForm((prev) => ({...prev, author: e.target.value}))}/>
            </div>

            {/*  詳細描述  */}
            <Textarea placeholder="詳細描述" value={form.content}
              onChange={e => setForm((prev) => ({...prev, content: e.target.value}))}/>

            {/*  是否啟用  */}
            <div>
              是否啟用：
              <Switch checked={form.enable} onCheckedChange={(checked) =>
                setForm((prev) => ({ ...prev, enable: checked }))
              }/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild >
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                取消
              </Button>
            </DialogClose>
            <Button type="submit" onClick={submit}>儲存</Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostEditor;

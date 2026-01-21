import { Button } from "@/components/ui/button"
import { FaArrowUp } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"


const AIChat = () => {
    return (
        <div className="w-full">
            <div className="border-1 flex items-center justify-between">
                工具列
                <IoClose/>
            </div>
            <div className="h-full max-h-[calc(100dvh-126px)] overflow-y-auto"> 

                {/* 左側 AI */}
                <div className="flex mb-8 ltr:ml-3" data-chat-source="service">
                    <Image className="object-cover " src="/" alt="" width={40} height={40}/>
                    <div className=" bg-gray-50 p-5">
                        <p>哈囉！歡迎來到華碩客服，我是您的專業AI助理。無論您對華碩的產品、服務或技術有任何疑問，都可以直接向我提問喔！不管是筆電、主機板、顯示器還是電競周邊，我都很樂意為您提供協助。請問有什麼我可以幫忙的呢？</p>
                    </div>
                    <div className="text-sm text-gray">10:20 AM</div>
                </div>

                {/* 右側 user*/}
                <div className="flex mb-8 flex-row-reverse items-end" data-chat-source="user">
                    <div className=" bg-gray-50 p-5">
                        <p>哈囉</p>
                    </div>
                    <div className="text-sm text-gray">10:25 AM</div>
                </div>
            </div>
            <div className="">
                <Textarea
                 className="rounded-0" 
                 placeholder="Type your message here." />
                 <div>
                    <Button>
                         <FaPlus/>
                         
                    </Button>
                  

                    <Button>
                        <IoMdSend />
                    </Button>
                 </div>
            </div>
        </div>
    )
}

export default AIChat
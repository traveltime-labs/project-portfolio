<script lang="ts" setup>
const openDropDown = ref(true)

// 有趣的想法, 開群組一起跟AI聊天ＸＤＤＤ

const talk範例 = [
    {
        id: "msg_1",  // 訊息唯一 ID，方便追蹤/標記已讀
        sender: {
            id: "user_001", // 使用者為一 id
            name: "你",
            type: "user", // 'user' | 'ai' | 'system'
            avatarUrl: "/avatars/me.png" // 頭像 URL
        },
        content: {
            type: "text", // 'text' | 'image' | 'file' | 'audio' | 'system' 
            text: "哈囉，你是誰？", // 若是 text 才有這欄
            file: {
                url: "/files/file1.pdf",
                fileName: "報告.pdf",
                fileType: "application/pdf"
            },
            image: { // 對應 type
                url: "/images/photo.jpg",
                caption: "這是今天拍的"
            }
        },
        timestamp: "2025-06-15T10:31:00+08:00"
    },
    {
        id: "msg_2",
        sender: {
            id: "gpt_4",
            name: "ChatGPT",
            type: "ai",
            avatarUrl: "/avatars/gpt.png"
        },
        content: {
            type: "text",
            text: "嗨！我是 ChatGPT，很高興見到你～"
        },
        timestamp: "2025-06-15T10:31:05+08:00",
        replyTo: "msg_1" // optional，如果是回覆某則訊息
    }
]

// 群聊
const groupFackData = [
    {
        "roomId": "room_ai_group_001", // 多加一個 roomID
        "senderId": "user_abc",
        "text": "Claude 跟 GPT 一起幫我想一下點子",
        "replyTo": "msg_54321"
    }

]



const customUser = {}
const user = {}

const isMobile = ref(false)

const fackTalk = [
    {
        id: "msg_1",  // 訊息唯一 ID，方便追蹤/標記已讀
        sender: {
            id: "user_001", // 使用者為一 id
            name: "你",
            type: "user", // 'user' | 'ai' | 'system'
            avatarUrl: "/avatars/me.png" // 頭像 URL
        },
        content: {
            type: "text", // 'text' | 'image' | 'file' | 'audio' | 'system' 
            text: "哈囉，你是誰？", // 若是 text 才有這欄
        },
        timestamp: "2025-06-15T10:31:00+08:00"
    },
    {
        id: "msg_2",
        sender: {
            id: "gpt_4",
            name: "ChatGPT",
            type: "ai",
            avatarUrl: "https://media.istockphoto.com/id/495114504/zh/%E7%85%A7%E7%89%87/winter-snowy-landscape.jpg?s=612x612&w=0&k=20&c=pIy9oHcR---t7GXCd5NvQbZZaAbEUAJ-k8c4bOy1fYs="
        },
        content: {
            type: "text",
            text: "嗨！我是 ChatGPT，很高興見到你～"
        },
        timestamp: "2025-06-15T10:31:05+08:00",
        replyTo: "msg_1" // optional，如果是回覆某則訊息
    },
    {
        id: "msg_3",
        sender: {
            id: "gpt_4",
            name: "ChatGPT",
            type: "ai",
            avatarUrl: "https://media.istockphoto.com/id/495114504/zh/%E7%85%A7%E7%89%87/winter-snowy-landscape.jpg?s=612x612&w=0&k=20&c=pIy9oHcR---t7GXCd5NvQbZZaAbEUAJ-k8c4bOy1fYs="
        },
        content: {
            type: "text",
            text: " I want to make an appointment tomorrow from 2:00 to 5:00pm?",
        },
        timestamp: "2025-06-15T10:31:00+08:00"
    },
    {
        id: "msg_4",  // 訊息唯一 ID，方便追蹤/標記已讀
        sender: {
            id: "user_001", // 使用者為一 id
            name: "你",
            type: "user", // 'user' | 'ai' | 'system'
            avatarUrl: "/avatars/me.png" // 頭像 URL
        },
        content: {
            type: "text", // 'text' | 'image' | 'file' | 'audio' | 'system' 
            text: "I want to make an appointment tomorrow from 2:00 to 5:00pm?", // 若是 text 才有這欄
        },
        timestamp: "2025-06-15T10:31:00+08:00"
    },
    {
        id: "msg_5",  // 訊息唯一 ID，方便追蹤/標記已讀
        sender: {
            id: "user_001", // 使用者為一 id
            name: "你",
            type: "user", // 'user' | 'ai' | 'system'
            avatarUrl: "/avatars/me.png" // 頭像 URL
        },
        content: {
            type: "text", // 'text' | 'image' | 'file' | 'audio' | 'system' 
            text: "If don’t like something, I’ll stay away from it.", // 若是 text 才有這欄
        },
        timestamp: "2025-06-15T10:31:00+08:00"
    },
    {
        id: "msg_6",
        sender: {
            id: "gpt_4",
            name: "ChatGPT",
            type: "ai",
            avatarUrl: "https://media.istockphoto.com/id/495114504/zh/%E7%85%A7%E7%89%87/winter-snowy-landscape.jpg?s=612x612&w=0&k=20&c=pIy9oHcR---t7GXCd5NvQbZZaAbEUAJ-k8c4bOy1fYs="
        },
        content: {
            type: "text",
            text: "I want more detailed information."
        },
        timestamp: "2025-06-15T10:31:05+08:00",
        replyTo: "msg_1" // optional，如果是回覆某則訊息
    },
    {
        id: "msg_7",  // 訊息唯一 ID，方便追蹤/標記已讀
        sender: {
            id: "user_001", // 使用者為一 id
            name: "你",
            type: "user", // 'user' | 'ai' | 'system'
            avatarUrl: "/avatars/me.png" // 頭像 URL
        },
        content: {
            type: "text", // 'text' | 'image' | 'file' | 'audio' | 'system' 
            text: "They got there early, and got really good seats.", // 若是 text 才有這欄
        },
        timestamp: "2025-06-15T10:31:00+08:00"
    },
    {
        id: "msg_8",  // 訊息唯一 ID，方便追蹤/標記已讀
        sender: {
            id: "user_001", // 使用者為一 id
            name: "你",
            type: "user", // 'user' | 'ai' | 'system'
            avatarUrl: "/avatars/me.png" // 頭像 URL
        },
        content: {
            type: "text", // 'text' | 'image' | 'file' | 'audio' | 'system' 
            text: "They got there early, and got really good seats.", // 若是 text 才有這欄
        },
        timestamp: "2025-06-15T10:31:00+08:00"
    },
    {
        id: "msg_9",
        sender: {
            id: "gpt_4",
            name: "ChatGPT",
            type: "ai",
            avatarUrl: "https://media.istockphoto.com/id/495114504/zh/%E7%85%A7%E7%89%87/winter-snowy-landscape.jpg?s=612x612&w=0&k=20&c=pIy9oHcR---t7GXCd5NvQbZZaAbEUAJ-k8c4bOy1fYs="
        },
        content: {
            type: "text",
            text: "Please preview the image, 小白！不要放棄！我等著你...",
            image: { // 對應 type
                url: "https://demo.tailadmin.com/src/images/chat/chat.jpg",
                caption: "這是今天拍的"
            }
        },
        timestamp: "2025-06-15T10:31:05+08:00",
        replyTo: "msg_1" // optional，如果是回覆某則訊息
    },
]

</script>

<template>
    <div class="chat flex h-full w-full">
        <!-- ====== Chat Box Start -->
        <div class="chat-container flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] w-full">

            <!-- 頂部工具欄 -->
            <div class="chat-top sticky flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800 xl:px-6">
                <div class="flex items-center gap-3">
                    <div class="relative h-12 w-full max-w-[48px] rounded-full">
                        <img src="https://media.istockphoto.com/id/495114504/zh/%E7%85%A7%E7%89%87/winter-snowy-landscape.jpg?s=612x612&w=0&k=20&c=pIy9oHcR---t7GXCd5NvQbZZaAbEUAJ-k8c4bOy1fYs="
                            alt="profile" class="h-full w-full overflow-hidden rounded-full object-cover object-center">
                        <span
                            class="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-[1.5px] border-white bg-success-500 dark:border-gray-900"></span>
                    </div>

                    <h5 class="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Lindsey Curtis
                    </h5>
                </div>

                <div class="flex items-center gap-3">
                    <button class="text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                        <IconPhone />
                    </button>

                    <button class="text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                        <IconCamera />
                    </button>

                    <div :class="{openDropDown: false}" class="relative -mb-1.5">
                        <button @click="openDropDown = !openDropDown"
                            :class="openDropDown ? 'text-gray-800 dark:text-white/90' : 'text-gray-700 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white/90'"
                            class="text-gray-700 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white/90">
                            <IconTool />
                        </button>
                        <div v-show="openDropDown" @click.outside="openDropDown = false"
                            class="absolute right-0 top-full z-40 w-40 space-y-1 rounded-2xl border border-gray-200 bg-white p-2 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
                            style="display: none;">
                            <button
                                class="flex w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                                View More
                            </button>
                            <button
                                class="flex w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 對話內容 -->
            <div class="chat-content custom-scrollbar max-h-full flex-1 space-y-6 overflow-auto  p-5 xl:space-y-8 xl:p-6">

                <div class="max-w-[350px]" v-for="(item, index) of fackTalk" :key="index"
                    :class="{ 'text-right ml-auto ': item.sender.type == 'user' }">
                    <div class="flex items-start gap-4"
                        :class="{ 'ml-auto max-w-max rounded-lg rounded-tr-sm  px-3 py-2': item.sender.type == 'user' }">

                        <!-- 頭貼 -->
                        <div class="h-10 w-full max-w-10 rounded-full" v-if="item.sender.type != 'user'">
                            <img :src="item.sender.avatarUrl" alt="profile"
                                class="h-full w-full overflow-hidden rounded-full object-cover object-center">
                        </div>

                        <!-- 內容 -->
                        <div v-if="item.content.type == 'text'">
                            <div class="mb-2 w-full max-w-[270px] overflow-hidden rounded-lg" v-if="item.content.image">
                                <img src="https://demo.tailadmin.com/src/images/chat/chat.jpg" alt="chat">
                            </div>
                            <div
                                :class="item.sender.type == 'user' ? 'ml-auto max-w-max rounded-lg rounded-tr-sm bg-brand-500 px-3 py-2 dark:bg-brand-500' : 'rounded-lg rounded-tl-sm bg-gray-100 px-3 py-2 dark:bg-white/5'">
                                <p
                                    :class="item.sender.type == 'user' ? 'text-sm text-white dark:text-white/90' : 'text-sm text-gray-800 dark:text-white/90'">
                                    {{ item.content.text }}
                                </p>
                            </div>
                            <p class="mt-2 text-theme-xs text-gray-500 dark:text-gray-400">
                                {{ item.sender.name }}, {{ item.timestamp }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!--底部發送訊息-->
            <div class="chat-bottom sticky bottom-0 border-t border-gray-200 p-3 dark:border-gray-800">
                <form class="flex items-center justify-between">
                    <div class="relative w-full">
                        <button
                            class="absolute left-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90 sm:left-3">
                            <IconSmile />
                        </button>

                        <input type="text" placeholder="Type a message"
                            class="h-9 w-full border-none bg-transparent pl-12 pr-5 text-sm text-gray-800 outline-hidden placeholder:text-gray-400 focus:border-0 focus:ring-0 dark:text-white/90">
                    </div>

                    <div class="flex items-center">
                        <button
                            class="mr-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                            <IconFile />
                        </button>

                        <button class="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                            <IconMic />
                        </button>

                        <button
                            class="ml-3 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white hover:bg-brand-600 xl:ml-5">
                            <IconSend />
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <!-- ====== Chat Box End -->
    </div>

</template>

<style lang="scss" >

.chat {
    .chat-top {
        
    }
}

// 側邊工具欄開啟的時候
.sideBarStyle {

}
</style>
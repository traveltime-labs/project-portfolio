//捲軸抵達位置
export const useScrollTo = () => {
    const scrollToSection = (className: string) => {
        const el = document.querySelector(`.${className}`)
        if (el) {
            el.scrollIntoView({behavior: 'smooth'})
        } else {
            console.warn(`找不到該元素.${className}`)
        }
    }
    return { scrollToSection }
}

// 遮罩呼叫
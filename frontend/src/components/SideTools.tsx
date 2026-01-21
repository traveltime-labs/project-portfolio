import { Button } from "@/components/ui/button"
import { FaArrowUp } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

type SideToolsProps = {
    toggleChat: () => void
}

const SideTools = ({ toggleChat } : SideToolsProps) => {
    return (
        <div className="fixed bottom-5 right-5 flex flex-col gap-2">
            <Button size="icon-lg" className="rounded-full">
                <FaArrowUp />
            </Button>
            <Button size="icon-lg" className="rounded-full" onClick={toggleChat}>
                <SiOpenai/>
            </Button>
        </div>
    )
}

export default SideTools
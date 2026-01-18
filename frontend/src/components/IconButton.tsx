"use client";
import { ReactNode } from "react"

interface IconButtonProps {
    children?: ReactNode;
    onClick?: () => void;
    className?: string;
    active?: boolean;
}

const IconButton = ({
    children,
    onClick,
    className,
    active
}: IconButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`
            p-1.5 rounded-md
            transition-colors
            hover:bg-black/50
            hover:text-white
            ${className}
            `}>
            {children}
        </button>
    )
    
}

export default IconButton;

type ContentProps = {
    title?: string,
    className?: string,
    children: React.ReactNode
}

function Content ({title, className, children}: ContentProps) {
    return (
        <div className={`border-1 rounded-2xl bg-white dark:bg-black ${className || ''}`}>
            <div className="py-5 px-8">
                {title && (
                    <h2 className="font-bold mb-4 text-2xl">{title}</h2>
                )}
                {children}
            </div>
        </div>
    )
}

export default Content;


type TextareaProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    id?: string;
  };
  

function TextArea (
    {
        value,
        onChange,
        placeholder = "輸入文字...",
        id = "inputText",
    }: TextareaProps
) {
    return (
        <textarea 
        placeholder="placeholder"
        className="border rounded-lg bg-gray-100 dark:bg-gray-950 p-4 mb-4 w-full min-h-80" 
        onChange={(e) => onChange(e.target.value)}>
        </textarea>
    )
}

export default TextArea;
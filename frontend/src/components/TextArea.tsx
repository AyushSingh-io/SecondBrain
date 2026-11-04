import type { Ref } from "react";

interface TextAreaProps {
    placeholder: string,
    label?: string,
    ref: Ref<HTMLTextAreaElement>
}

function TextArea({ placeholder, label, ref }: TextAreaProps) {


    return (
        <>
            <label htmlFor={placeholder}>{label}</label>
            <textarea
                ref={ref}
                className="px-4 py-2 border rounded-md w-full"
                id={placeholder}
                placeholder={placeholder}
            >

            </textarea>
        </>
    )

}

export default TextArea;
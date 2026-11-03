import type { Ref } from "react";

interface InputProps {
    placeholder : string,
    type : string,
    label? : string,
    ref : Ref<HTMLInputElement>
}

function Input({ placeholder, type, label , ref} : InputProps) {


    return (
        <>
            <label htmlFor={placeholder}>{label}</label>
            <input
                ref={ref}
                className="px-4 py-2 border rounded-md w-full"
                type={type}
                id={placeholder}
                placeholder={placeholder}
            />
        </>
    )

}

export default Input;
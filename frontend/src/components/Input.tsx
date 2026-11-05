import type { Ref } from "react";

interface InputProps {
    placeholder : string,
    type : string,
    label? : string,
    ref : Ref<HTMLInputElement>,
    maxlength? : number
}

function Input({ placeholder, type, label , ref , maxlength} : InputProps) {


    return (
        <>
            <label htmlFor={placeholder}>{label}</label>
            <input
                ref={ref}
                maxLength={maxlength}
                className="px-4 py-2 border rounded-md w-full"
                type={type}
                id={placeholder}
                placeholder={placeholder}
            />
        </>
    )

}

export default Input;
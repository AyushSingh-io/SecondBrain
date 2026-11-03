import type { ReactElement } from "react"

export interface ButtonProp {
    variation: "primary" | "secondary",
    size: "sm" | "md" | "lg",
    text: string,
    startIcon?: ReactElement, //ReactElement
    endIcon?: ReactElement,
    onClick: () => void
}

const defaultStyle = " rounded-md flex justify-center items-center gap-3 cursor-pointer transition-all duration-200 hover:scale-105"

const variationStyle = {
    "primary": "bg-indigo-600 text-white hover:bg-indigo-800",
    "secondary": "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
}

const sizeStyle = {
    "sm": "w-25 h-8",
    "md": "w-40 h-10",
    "lg": "w-50 h-12",
}

const Button = (props: ButtonProp) => {

    return (
        <button
            className={`${defaultStyle + " " + variationStyle[props.variation] + " " + sizeStyle[props.size]} `}
            onClick={props.onClick}>
            {props.startIcon} {props.text} {props.endIcon}
        </button>
    )
}

export default Button;
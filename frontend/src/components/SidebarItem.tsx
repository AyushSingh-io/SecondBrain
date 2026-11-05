import type { ReactElement } from "react";


function Sidebaritem({ text, icon, isActive, onClick }: {
    text: string,
    icon: ReactElement,
    onClick: () => void,
    isActive? : boolean
}) {

    return (
        <div onClick={onClick} className={`flex gap-6 items-center p-2 rounded-md cursor-pointer  ${isActive ? "text-indigo-600" : "text-black"} hover:bg-violet-200 `  }>
            {icon} {text}
        </div>
    )
}
export default Sidebaritem;
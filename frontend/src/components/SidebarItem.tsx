import type { ReactElement } from "react";


function Sidebaritem({ text, icon, onClick }: {
    text: string,
    icon: ReactElement,
    onClick: () => void
}) {

    return (
        <div onClick={onClick} className="flex gap-6 items-center p-2 rounded-md cursor-pointer hover:bg-violet-200">
            {icon} {text}
        </div>
    )
}
export default Sidebaritem;
import type { ReactElement } from "react";


function Sidebaritem({ text, icon }: {
    text: string,
    icon: ReactElement
}) {


    return (
        <div className="flex gap-6 items-center p-2 rounded-md cursor-pointer hover:bg-violet-200">
            {icon} {text}
        </div>
    )
}
export default Sidebaritem;
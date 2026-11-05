import Twittericon from "./icons/Twittericon"
import Videoicon from "./icons/Videoicon"
import Sidebaritem from "./SidebarItem"
import Brainicon from "./icons/Brainicon"
import Logouticon from "./icons/Logouticon"
import { useNavigate } from "react-router"
import Allicon from "./icons/Allicon"
import Notesicon from "./icons/Notesicon"
import Documenticon from "./icons/Documenticon"

function Sidebar({currentType , onChangeContentType} : {currentType : string  , onChangeContentType : (a : string) => void}) {
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.setItem("token" , "");
        navigate("/signin")
    }

    return (
        <div className="min-w-70 h-screen bg-violet-100 fixed top-0 left-0 px-8 py-4 ">
            <div className="text-xl font-semibold flex items-center gap-2">
                <Brainicon />
                Second Brain
            </div>

            <div className="my-6 flex flex-col gap-4">
                
                <Sidebaritem isActive={currentType === "all"} onClick= {() => onChangeContentType("all")} text="All" icon={<Allicon />} />
                <Sidebaritem isActive={currentType === "youtube"} onClick={() => onChangeContentType("youtube")} text="Youtube" icon={<Videoicon />} />
                <Sidebaritem isActive={currentType === "twitter"} onClick={() => onChangeContentType("twitter")} text="Twitter" icon={<Twittericon />} />
                <Sidebaritem isActive={currentType === "notes"} onClick={() => onChangeContentType("notes")} text="Notes" icon={<Notesicon />} />
                <Sidebaritem isActive={currentType === "document"} onClick={() => onChangeContentType("document")} text="Documents" icon={<Documenticon />} />
                
                
            </div>

            <div className="mx-4 absolute bottom-10 cursor-pointer flex justify-center items-center gap-2" onClick={onLogout}>
                <Logouticon/>
                Log Out
            </div>
        </div>
    )
}

export default Sidebar
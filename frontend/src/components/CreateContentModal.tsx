import Crossicon from "./icons/Crossicon";
import Input from "./Input";
import Button from "./Button";
import Plusicon from "./icons/Plusicon";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKENDURL } from "../config";
import { toast } from "sonner";

interface ModalProps {
    open: boolean,
    onClose: () => void
}


function CreateContenModal({ open, onClose }: ModalProps) {
    const [type, setType] = useState("youtube")  //or "twitter"

    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);


    async function onCreatingContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        try {
            const res = await axios.post(BACKENDURL + "/api/v1/content", {
                title,
                link,
                type
            }, {
                headers : {
                    "Authorization" : localStorage.getItem("token")
                }
            })
           
            toast.success("Content added successfully")
            onClose();

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        open &&

        <div>
            <div className="w-screen h-screen bg-gray-100  fixed z-2 top-0 left-0 opacity-80 flex justify-center items-center ">
            </div>


            <div className="w-screen h-screen   fixed z-3 top-0 left-0 flex justify-center items-center ">

                <div className="bg-white min-w-90 min-h-80 opacity-100 p-4  rounded-lg shadow-lg">
                    <div className="flex justify-end cursor-pointer">
                        <Crossicon onClose={onClose} />
                    </div>

                    <div className="flex flex-col gap-4">
                        <Input ref={titleRef} type={"text"} placeholder={"content title"} label={"Title : "} />
                        <Input ref={linkRef} type={"text"} placeholder={"content link"} label={"Link : "} />
                    </div>

                    <div className="flex gap-10 items-center my-6 justify-center">
                        <Button text="Youtube" variation={type === "youtube" ? "primary" : "secondary"} size="sm" onClick={() => setType("youtube")} />
                        <Button text="Twitter" variation={type === "twitter" ? "primary" : "secondary"} size="sm" onClick={() => setType("twitter")} />
                    </div>

                    <div className="flex justify-center my-6">
                        <Button variation="primary" size="md" text="Add Content" startIcon={<Plusicon />} onClick={onCreatingContent} ></Button>
                    </div>
                </div>

            </div>

        </div>


    )

}

export default CreateContenModal;

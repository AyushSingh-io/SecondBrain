import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import Input from "./Input"
import Crossicon from "./icons/Crossicon";
import Button from "./Button";
import axios from "axios";
import { BACKENDURL } from "../config";
import { toast } from "sonner";


interface ExtBrainProps {
    isOpen: boolean,
    onClose: () => void
}


function ExternalBrain(props: ExtBrainProps) {
    const [extBrain, setExtBrain] = useState([]);

    const shareLinkInputRef = useRef<HTMLInputElement>(null)

    const fetchExternalBrain = async () => {
        try {
            const shareLink = shareLinkInputRef?.current?.value;
            const res = await axios.get(
                BACKENDURL + '/api/v1/brain/' + shareLink,
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
            );
            console.log(res)

            setExtBrain(res.data.sharedContent)
            toast.success("Fetched External Brain successfully")

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        setExtBrain([]);
    }, [])

    return (
        props.isOpen &&
        <div>
            <div className="bg-gray-300 opacity-80 h-screen w-screen fixed z-10 top-0 left-0"></div>

            <div className="  h-screen w-screen fixed z-10 top-0 left-0 flex justify-center items-center">

                <div className="w-[80vw] h-[80vh] bg-white p-6 rounded-lg overflow-y-scroll">

                    <div className="flex justify-end cursor-pointer mb-2">
                        <Crossicon onClose={props.onClose} />
                    </div>

                    <div className="flex justify-center items-center w-full gap-2">
                        <Input placeholder="Enter ShareLink for external brain" type="text" ref={shareLinkInputRef} />
                        <Button variation="secondary" size='md' text="Show" onClick={fetchExternalBrain} />
                    </div>

                    <div className="flex flex-wrap justify-between items-center my-6">
                        {/* {show content cards} */}

                        {extBrain.length > 0 &&
                            extBrain.map((content : any) => (
                            <Card key={content.title + content.link} link={content.link} type={content.type} title={content.title} />
                        ))

                        }

                    </div>

                </div>
            </div>
        </div>
    )
}

export default ExternalBrain;
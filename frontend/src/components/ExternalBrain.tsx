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
    const [extBrain, setExtBrain] = useState(null);

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

            console.log("respons si ", res.data)
            setExtBrain(res.data.sharedContent)
            console.log("extbrain", extBrain)
            toast.success("Fetched External Brain successfully")

        } catch (error) {
            toast.error(error.message)
        }
    }

    const onClickCross = () => {
        setExtBrain(null);
        props.onClose();
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

                    <div className="flex justify-end cursor-pointer mb-2 hover:text-red-500">
                        <Crossicon onClose={onClickCross} />
                    </div>

                    <div className="flex justify-center items-center w-full gap-2">
                        <Input placeholder="Enter ShareLink for external brain" type="text" ref={shareLinkInputRef} />
                        <Button variation="secondary" size='md' text="Show" onClick={fetchExternalBrain} />
                    </div>

                    <div className="bg-gray-100 p-4 my-4 rounded-md">
                     
                        {!extBrain?.ownerOfBrain ? <div className="text-xl font-medium flex justify-center">No Content</div> : null}
                        {extBrain?.ownerOfBrain && <div className="text-lg font-medium ml-5 text-indigo-500">{extBrain?.ownerOfBrain}'s Brain :</div>}



                        {extBrain?.contents?.length &&  <div className="flex flex-wrap justify-start items-center my-4">
                            {/* {show content cards} */}

                            {extBrain?.contents?.length > 0 &&
                                extBrain?.contents?.map((content: any) => (
                                    <Card key={content.title + content.link} link={content.link} type={content.type} title={content.title} createdAt={content.createdAt} tags={content.tags} content={content.content} />

                                ))
                            }
                        </div>}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ExternalBrain;
import { useContext, useState } from 'react'
import Button from '../components/Button'
import Plusicon from '../components/icons/Plusicon.tsx'
import Shareicon from '../components/icons/Shareicon.tsx'
import Card from '../components/Card.tsx'
import CreateContenModal from '../components/CreateContentModal.tsx'
import Sidebar from '../components/Sidebar.tsx'
import useContent from '../hooks/useContent.tsx'
import { BACKENDURL } from '../config.ts'
import axios from 'axios'
import { toast } from 'sonner'
import ExternalBrain from '../components/ExternalBrain.tsx'
import Eyeicon from '../components/icons/Eyeicon.tsx'

function Dashboard() {
    const [open, setOpen] = useState(false)
    const [isOpenExternal, setIsOpenExternal] = useState(false);
    const [contentType , setContentType] = useState("all");

    const contents = useContent();

    const onShareBrain = async () => {
        try {
            const response = await axios.post(BACKENDURL + '/api/v1/brain/share', { share: true }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })

            await navigator.clipboard.writeText(response.data.shareLink);
            toast.info("ShareLink is  copied to clipboard")

        } catch (error) {
            toast.error(error.message)
        }
    }

    const deleteContent = async (contentId: any) => {
        try {
            const res = await axios.delete(BACKENDURL + "/api/v1/content" + contentId, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })

            toast.success("Deleted content successfully")

        } catch (error) {
            toast.error(error.message)
        }


    }

    const onChangeContentType = (newContentType: string) => {
        
        setContentType(newContentType);
    }

    return (
        <>
            <div>
                <CreateContenModal open={open} onClose={() => setOpen(false)} />
            </div>

            <div>
                <ExternalBrain isOpen={isOpenExternal} onClose={() => setIsOpenExternal(false)} />
            </div>

            <div className='flex'>
                <Sidebar currentType={contentType} onChangeContentType={onChangeContentType} />

                <div className='flex-1 ml-70 p-4 min-h-screen bg-gray-100'>

                    <div className='flex gap-4 justify-between items-center ' >

                        <div className='text-2xl font-medium'> All Notes </div>

                        <div className='flex gap-4 justify-end'>
                            <Button variation='primary' size='md' text='External Brain' startIcon={<Eyeicon />} onClick={() => setIsOpenExternal(true)} ></Button>

                            <Button variation='secondary' size='md' text='Share Link' startIcon={<Shareicon />} onClick={onShareBrain} ></Button>

                            <Button variation='primary' size='md' text='Add content' startIcon={<Plusicon />} onClick={() => setOpen(true)} ></Button>
                        </div>
                    </div>

                    <div className='flex flex-wrap my-8'>
                        {
                            contents && contents.map((content: any) => {

                                if(content.type === contentType || contentType === "all")
                                    return  <Card  key={content.title + content.link} link={content.link} type={content.type} title={content.title} tags={content.tags}
                                    onDelete={() => deleteContent(content._id)}
                                    createdAt={content.createdAt}  content={content.content}
                                />

                                return null;
                               
                            }
                        )
                        }

                        {/* <Card link='https://www.youtube.com/watch?v=YRnjGeQbsHQ&t=1s' type='youtube' title='Dbms one shot' tags={["#youtube", "#study"]}></Card>

                        <Card link='https://twitter.com/username/status/807811447862468608' type='twitter' title='Https tweet' tags={["#twitter", "#dev"]}></Card> */}

                    </div>

                </div>
            </div>

        </>
    )
}

export default Dashboard;

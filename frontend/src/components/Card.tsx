import { useEffect, useRef } from "react";
import Deleteicon from "./icons/Deleteicon";
import Shareicon from "./icons/Shareicon";
import Twittericon from "./icons/Twittericon";
import Videoicon from "./icons/Videoicon";

type ContentType = "youtube" | "twitter | notes"

interface CardProps {
    link: string,
    type: ContentType,
    title: string,
    tags?: string[],
    onDelete?: () => void,
    createdAt: string,
    updatedAt?: string,
    content?: string
}

function youtube(link: string) {
    // https://www.youtube.com/embed/YRnjGeQbsHQ?si=FPQIplgOwaKKF8BR

    let s: string = link.replace("watch", "embed")
    s = s.replace("?v=", "/")
    s = s.replace("&t=1s", "?start=1")
    console.log(s)

    return (
        <>
            <iframe className="w-full my-4 rounded-lg" src={s} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </>
    )
}
function twitter(link: string) {
    // https://twitter.com/username/status/807811447862468608
    //https://x.com/jack/status/20

    let s = link.replace("twitter.com", "x.com")
    console.log("after reaplcing , ", s);

    return (
        <>
            <blockquote className='twitter-tweet rounded-lg'>
                <a href={s}></a>
            </blockquote>
        </>
    )
}
function notes(content: string) {
    // https://twitter.com/username/status/807811447862468608
    //https://x.com/jack/status/20

    return (
        <div className="whitespace-pre-wrap max-h-50 overflow-hidden hover:overflow-y-scroll">
            {content}
        </div>
    )
}

const formatDate = (date: string) => {
    const d = new Date(date);

    const formattedDate = d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    return formattedDate
}

function Card(props: CardProps) {

    const tweetRef = useRef<HTMLDivElement>(null);
    console.log("props are this : ", props)

    useEffect(() => {
        if (props.type !== "twitter") return;

        window.twttr?.widgets?.load(tweetRef.current);

    }, [props.link, props.type])

    return (
        <div ref={(element) => {
            if (props.type !== "twitter") return;
            tweetRef.current = element
        }}
            className="max-w-72 min-w-72 h-90 p-4 m-4 bg-white rounded-md border border-gray-300 shadow-md hover:bg-gray-100 hover:border-indigo-300 hover:border-md hover:tranform hover:-translate-y-1 transition-transform duration-250 ">

            <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    {props.type === "twitter" ? <Twittericon /> : <Videoicon />}
                    {props.title}
                </div>
                <div className="flex gap-3 items-center">
                    <Shareicon />
                    <div onClick={props.onDelete}>
                        <Deleteicon />
                    </div>
                </div>
            </div>

            <div className="w-full my-4 whitespace-pre-wrap">
                {
                    props.type === "youtube" ? youtube(props.link) : props.type === "twitter" ? twitter(props.link) : notes(props.content as string)
                }

            </div>

            <div>
                {props.tags?.map((tag) => (
                    <span key={tag} className="text-sm text-indigo-600 classs bg-blue-100 p-1 rounded-lg">{tag}</span>
                ))}
            </div>

            <div className="text-sm text-gray-500 my-2" > Added on {formatDate(props.createdAt)}</div>
        </div>
    )
}

export default Card;
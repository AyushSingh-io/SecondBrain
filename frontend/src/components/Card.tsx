import { useEffect, useRef } from "react";
import Deleteicon from "./icons/Deleteicon";
import Shareicon from "./icons/Shareicon";
import Twittericon from "./icons/Twittericon";
import Videoicon from "./icons/Videoicon";

type ContentType = "youtube" | "twitter"

interface CardProps {
    link: string,
    type: ContentType,
    title: string,
    tags?: string[],
    onDelete?: () => void,
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

function Card(props: CardProps) {

    const tweetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (props.type !== "twitter") return;

        window.twttr?.widgets?.load(tweetRef.current);

    }, [props.link, props.type])

    return (
        <div ref={(element) => {
            if (props.type !== "twitter") return;
            tweetRef.current = element
        }}
            className="max-w-72 min-w-72 h-90 p-4 m-4 bg-white rounded-md border border-gray-300 ">

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

            <div className="w-full my-4">
                {props.type === "twitter" ? twitter(props.link) : youtube(props.link)}
            </div>

            <div>tags</div>
        </div>
    )
}

export default Card;
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKENDURL } from "../config";


export default function useContent() {
    const [content, setContent] = useState([]);

    // if (contentType === "all") contentType = "";
    // console.log("new Content type is :", contentType)

    function fetchContents() {
        axios.get(BACKENDURL + "/api/v1/content", {

            // params: {
            //     type: "all"
            // }
            // ,

            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
        ).then((res) =>{ setContent(res.data.contents) 

        }).catch((error) => console.log(error))
    }

    useEffect(() => {
        let t = setInterval(fetchContents, 5000);

        return () => {
            clearInterval(t)
        }

    }, [])

    return content;
}
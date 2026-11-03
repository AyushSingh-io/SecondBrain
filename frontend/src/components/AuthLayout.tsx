import { use, useEffect, type ReactElement } from "react"
import { useNavigate } from "react-router";

interface AuthLayoutProps {
    element: ReactElement
}


export default function AuthLayout(props: AuthLayoutProps) {
    const navigate = useNavigate()

    function checkAuth() {
        const token = localStorage.getItem("token");
        console.log(token)

        if (!token) {
            navigate("/signin");
        }
    }

    useEffect(() => {
        checkAuth();
    }, [])

    return (
        props.element
    )
}
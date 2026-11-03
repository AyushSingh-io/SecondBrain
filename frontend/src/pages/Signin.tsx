import Input from "../components/Input";
import Button from "../components/Button";
import { useRef } from "react";
import axios from "axios";
import { BACKENDURL } from "../config";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

function Signin() {
    const navigate = useNavigate();

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function onSignin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        try {
            const response = await axios.post(BACKENDURL + "/api/v1/signin", {
                username,
                password
            })

            const token = response.data.token;
            localStorage.setItem("token", token);
            toast.success("User logged in successfully")
            navigate("/");

        } catch (error) {
            toast.error(error.message)
        }


    }

    return (
        <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
            <div className="min-w-80 rounded-lg bg-white p-6 shadow-xl">

                <div className="flex flex-col gap-4">
                    <Input ref={usernameRef} placeholder={"Username"} type={"text"} label={"Username"} />
                    <Input ref={passwordRef} placeholder={"Password"} type={"password"} label={"Password"} />
                </div>

                <div className="flex justify-center my-6">
                    <Button variation="primary" size="md" text="Sign In" onClick={onSignin}></Button>
                </div>

                <div className="flex justify-center ">
                    <Link
                        to="/signup"
                        className="text-indigo-600 text-sm font-medium hover:underline"
                    >
                        Regiser new Account
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Signin;
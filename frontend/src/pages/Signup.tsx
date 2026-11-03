import Input from "../components/Input";
import Button from "../components/Button";
import { useRef, type Ref } from "react";
import { BACKENDURL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Link } from "react-router";

function Signup() {
    const navigate = useNavigate()

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function onSignup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        try {
            const response = await axios.post(BACKENDURL + "/api/v1/signup", {
                username,
                password
            })

            toast.success(response.data.message)

        } catch (error: any) {
            toast.error(error.message)
        }

        navigate("/signin")
    }

    return (
        <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
            <div className="min-w-80 rounded-md bg-white p-6 shadow-xl">

                <div className="flex flex-col gap-4">
                    <Input ref={usernameRef} placeholder={"Username"} type={"text"} label={"Username"} />
                    <Input ref={passwordRef} placeholder={"Password"} type={"password"} label={"Password"} />
                </div>

                <div className="flex justify-center my-6">
                    <Button variation="primary" size="md" text="Sign Up" onClick={onSignup}></Button>
                </div>
                <div className="flex justify-center ">
                    <Link
                        to="/signin"
                        className="text-indigo-600 text-sm font-medium hover:underline"
                    >
                        Already have an account
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Signup;
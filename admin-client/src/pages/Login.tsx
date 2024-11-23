import { ChangeEvent, MouseEvent, useState } from "react";
import InputField from "../components/InputField"
import { toast } from "react-toastify";
import axios from "axios";
import { backendurl } from "../Constants";
import { useNavigate } from "react-router-dom";



const Login = () => {

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate(); 

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 

        if (username.trim() === '' || password.trim() === '') {
            toast.error("Username / password is empty")
        }

        try {
            const response: any = await axios.post(`${backendurl}/admin/login`, {username, password}, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.status === 200) {
                console.log(response)
                const authToken = response.data.data.authToken; 
                localStorage.setItem(`authToken`,  `${authToken}`)
                navigate('/add-blog'); 
            } else {
                toast.error(response.data.message); 
            }
        } catch (err: any) {
            console.log(err); 
            // toast.error(err.response.data.message)
        }
    }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-[30rem] h-[25rem] border-2 rounded-xl flex-col">
            <div className="title flex justify-center items-center mt-8">
                <h1 className="font-bold text-3xl">Sign In as Admin</h1>
            </div>
            <div className="inputFields mt-8 ml-8 flex-col">
                <div>
                    <InputField onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        e.preventDefault(); 

                        setUsername(e.target.value); 

                    }} label="Username" placeholder="username"/>
                </div>
                <div>
                    <InputField onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        e.preventDefault(); 

                        setPassword(e.target.value); 

                    }} label="Password" placeholder="password"/>
                </div>
            </div>
            <div className="loginButton flex justify-center">
                <button onClick={handleSubmit} className="w-4/5 rounded-3xl h-12 text-center text-white bg-[#007aff]">Login</button>
            </div>
        </div>
    </div>
  )
}

export default Login
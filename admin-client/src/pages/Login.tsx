import InputField from "../components/InputField"


const Login = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-[30rem] h-[25rem] border-2 rounded-xl flex-col">
            <div className="title flex justify-center items-center mt-8">
                <h1 className="font-bold text-3xl">Sign In as Admin</h1>
            </div>
            <div className="inputFields mt-8 ml-8 flex-col">
                <div>
                    <InputField label="Username" placeholder="username"/>
                </div>
                <div>
                    <InputField label="Password" placeholder="password"/>
                </div>
            </div>
            <div className="loginButton flex justify-center">
                <button className="w-4/5 rounded-3xl h-12 text-center text-white bg-[#007aff]">Login</button>
            </div>
        </div>
    </div>
  )
}

export default Login
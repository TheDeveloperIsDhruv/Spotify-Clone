import React from "react";

const LoginPage=()=>{
    return(
        <div className="flex justify-center h-screen items-center">
            <div className="bg-gray-600 p-10 rounded-xl text-white w-1/3">
                    <h1 className="font-bold text-5xl items-center mb-8">Login Page</h1>
                    <div className="mb-8">
                        <h1 className="text-2xl mb-2">Email Address:</h1>
                        <input type="email" placeholder="Enter your email" className=" border-2 border-white focus:border-red-600 "/>
                    </div>
                    <div>
                        <h1 className="text-2xl mb-2">Password:</h1>
                        <input type="password" placeholder="Enter your password" className=" border-2 border-white focus:border-pink-600"/>
                    </div>



            </div>

        </div>
    )
}
export default LoginPage;
import React from "react";

const LoginPage=()=>{
    return(
        <div className="flex justify-center h-screen items-center">
            <div className="bg-gray-600 p-10 rounded-xl text-white w-2/4">
                    <h1 className="font-bold text-5xl items-center lg:ml-40 2xl:ml-52 mb-8">Login Page</h1>
                    <br />
                    <div className="flex flex-row mb-8  gap-2">
                        <h1 className="text-2xl mb-2">Email Address:</h1>
                        <input type="email" placeholder="Enter your email" className=" border-4 rounded-xl border-white focus:border-red-600 "/>
                    </div>
                    <div className="flex flex-row mb-8 gap-2">
                        <h1 className="text-2xl mb-2">Password:</h1>
                        <input type="password" placeholder="Enter your password" className=" border-4 rounded-xl border-white focus:border-pink-600"/>
                    </div>
                    <br />
                    <button className="ml-[40%] bg-blue h-15 w-22 border-2 font-bold text-xl rounded-xl hover:bg-green-700 ">Submit</button>
            </div>

        </div>
    )
}
export default LoginPage;
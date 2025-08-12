import React from "react";

const SignUp = () => {
     return(
            <div className="flex justify-center h-screen items-center">
            <div className="bg-gray-600 p-10 rounded-xl text-white w-2/4">
                    <h1 className="font-bold text-5xl ml-[25%] mb-8">SignUp Page</h1>
                    <div className="mb-8 flex gap-6">
                        <div className="flex ">
                        <h1 className="text-2xl mb-2">First Name:</h1>
                        <input type="email" placeholder="Enter your first name" className=" border-2 rounded-xl border-white focus:border-red-600 "/>
                        </div>
                        <div className="flex">
                               <h1 className="text-2xl mb-2">Last Name:</h1>
                               <input type="email" placeholder="Enter your last name" className=" border-2 rounded-xl border-white focus:border-red-600 "/>
                        </div>
                    </div>
                    <div className="mb-8 flex flex-row gap-4">
                        <h1 className="text-2xl mb-2">BOD:</h1>
                        <input type="date" placeholder="Enter your DOB" className=" border-2 rounded-xl border-white focus:border-red-600 "/>
                    </div>
                       
                    <div className="mb-8 flex flex-row gap-4">
                        <h1 className="text-2xl mb-2">Email Address:</h1>
                        <input type="email" placeholder="Enter your email" className=" border-2 rounded-xl border-white focus:border-red-600 "/>
                    </div>
                    
                    
                    <div className="flex flex-row gap-4">
                        <h1 className="text-2xl mb-2">Password:</h1>
                        <input type="password" placeholder="Enter your password" className=" border-2 rounded-xl border-white focus:border-pink-600"/>
                    </div>
                    <br />
                    <button className="ml-[40%] bg-blue h-15 w-22 border-2 font-bold text-xl rounded-xl hover:bg-green-700">Submit</button>
            </div>

        </div>
     );

}
export default SignUp;
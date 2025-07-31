import React from "react";

const SignUp = () => {
     return(
            <div className="flex justify-center h-screen items-center">
            <div className="bg-gray-600 p-10 rounded-xl text-white w-2/4">
                    <h1 className="font-bold text-5xl ml-[25%] mb-8">SignUp Page</h1>
                    <div className="mb-8 flex flex-row gap-6">
                        <div>
                        <h1 className="text-2xl mb-2">First Name:</h1>
                        <input type="email" placeholder="Enter your first name" className=" border-2 border-white focus:border-red-600 "/>
                        </div>
                        <br />
                        <div>
                               <h1 className="text-2xl mb-2">Last Name:</h1>
                               <input type="email" placeholder="Enter your last name" className=" border-2 border-white focus:border-red-600 "/>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h1 className="text-2xl mb-2">BOD:</h1>
                        <input type="date" placeholder="Enter your DOB" className=" border-2 border-white focus:border-red-600 "/>
                    </div>
                       
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
     );

}
export default SignUp;
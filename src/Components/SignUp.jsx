import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const SignUp = () => {
    const navigate=useNavigate();
    const [issubmited,onSubmited]=useState(false);
    const[formData,setformData]=useState({firstname:"",lastname:"",dob:"",email:"",password:"",})
    const[res,serverResponse]=useState("");
    
    const handleChange=(e)=>{
      setformData({...formData,[e.target.name]:e.target.value});
    }


    const handleClick = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3000/api/submit-signup', formData);
        // console.log(response.data);
        serverResponse(response.data);
    
        // Show button success state
        onSubmited(true);
        
        // Navigate after short delay
        setTimeout(() => {
          navigate("/login"); // Change this to your target route
        }, 1500);
    
      } catch (error) {
        // console.log(error.response.data);
        serverResponse(error.response.data);
        onSubmited(true);
        setTimeout(() => onSubmited(false), 2000);
      }
    };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black-900 via-green-700 to-black-200">
      <div className="backdrop-blur-sm bg-white/90 shadow-2xl rounded-2xl px-8 py-10 w-full max-w-lg">
      <h1 className="font-bold text-3xl md:text-6xl text-center text-gray-800 mb-2">Spotify Clone</h1>
        <h2 className="font-bold text-3xl md:text-2xl text-center text-gray-800 mb-2">
          Create Your Account
        </h2>
        <form className="space-y-6" >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label htmlFor="firstname" className="block text-gray-700 mb-1 font-medium">
                First Name
              </label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="e.g. Jane"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition"
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="lastName" className="block text-gray-700 mb-1 font-medium">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastname"
                type="text"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="e.g. Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="dob" className="block text-gray-700 mb-1 font-medium">
              Date of Birth
            </label>
            <input
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white focus:border-pink-600 focus:ring-2 focus:ring-pink-100 transition"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white focus:border-pink-600 focus:ring-2 focus:ring-pink-100 transition"
              required
            />
          </div>

          <button
            type="submit"
            onClick={handleClick}
            disabled={issubmited}
            className={`w-full py-2 font-bold rounded-lg shadow-lg text-lg tracking-wide transition
                ${issubmited ? 'bg-green-500' : 'bg-gradient-to-r from-black-900 via-green-700 to-black-200'} 
                text-white flex items-center justify-center relative`}
            >
             {issubmited ? (
                    res.message.length==13? (
                    <span className="flex items-center gap-2 animate-bounce text-l">
                    <span className="text-2xl animate-scale-150">🎉</span> Success!</span>
                    
                )
                : (
                  <span className="flex items-center gap-2 animate-bounce text-l text-red-500">
                    <span className="text-2xl animate-scale-150">❌</span> Error
                  </span>
                ) 
              ) : (
                    "Sign Up"
                )}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">Already have an account?</span>{" "}
          <a href="/login" className="text-green-600 hover:underline font-semibold">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
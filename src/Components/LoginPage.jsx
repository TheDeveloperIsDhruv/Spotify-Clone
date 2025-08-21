import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
        const navigate=useNavigate();
        const [isSubmitted, setIsSubmitted] = useState(false);
        const[formData,setFormData]=useState({email:'',password:'',});
        const[res,serverResponse]=useState("");
        const [isSuccess, setIsSuccess] = useState(false);
        const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        };
      
        const handleClick = async(e) => {
          e.preventDefault();
          try{
            const response=await axios.post('http://localhost:3000/api/submit-form', formData);
            serverResponse(response.data);
            setIsSuccess(true);
            setIsSubmitted(true);
            setTimeout(()=>{
              navigate('/');
            },1500);
          } 
          catch (error) {
            serverResponse(error.response.data);
            setIsSuccess(false);
            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 2000); 
          }
        
        };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black-900 to-blue-500">
      <div className="bg-white shadow-lg rounded-2xl px-10 py-12 w-full max-w-md">
    
        <div className="flex justify-center items-center mb-8">
         
          <div className="w-50 h-20 bg-blue-600 p-4 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg hover:bg-blue-700 hover:shadow-black hover:scale-110">
            <span>Spotify Clone</span>
          </div>
        </div>
        <h2 className="font-bold text-6xl text-center text-gray-800 mb-6">Sign In</h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <button
                type="submit"
                onClick={handleClick}
                disabled={isSubmitted}
                className={`w-full py-2 font-bold rounded-lg shadow-lg text-lg tracking-wide transition
                    ${isSubmitted ? 'bg-green-500' : 'bg-gradient-to-r from-black-900 via-blue-700 to-indigo-200'} 
                    text-white flex items-center justify-center relative`}
                > Login </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-600">Don’t have an account?</span>{" "}
          <a href="/signup" className="text-blue-600 hover:underline font-semibold">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
import React from "react";
import { useState } from "react";

const LoginPage = () => {
        const [isSubmitted, setIsSubmitted] = useState(false);
      
        const handleClick = (e) => {
          e.preventDefault();
          setIsSubmitted(true);
          setTimeout(() => setIsSubmitted(false), 2000); 
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
                >
                {isSubmitted ? (
                    <span className="flex items-center gap-2 animate-bounce text-l">
                    <span className="text-2xl animate-scale-150">🎶</span> Ready to listen!</span>
                ) : (
                    "Login"
                )}
        </button>
        </form>
        {/* Optional: Register link */}
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
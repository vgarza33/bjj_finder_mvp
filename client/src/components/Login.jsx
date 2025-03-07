import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    
    const { username, password } = credentials;
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };
    
    const login = async (e) => {
        e.preventDefault(); // Prevent form submission default behavior
        
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });
            
            // Check if the response is ok
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            
            // Parse the JSON response
            const data = await response.json();
            
            localStorage.setItem("token", data.token);
            // Redirect the user to the profile page

            // Dispatch event to notify Navbar of the login status change
            window.dispatchEvent(new Event('loginStatusChanged'));

            navigate("/");
        } catch (err) {
            console.error("Login error:", err);
            // Handle error appropriately - maybe set an error state to display to user
        }
    };
    
    
    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&amp;shade=600" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={login}>
                        <div>
                            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Username</label>
                            <div className="mt-2">
                                <input 
                                    value={username}
                                    onChange={handleChange}
                                    type="text" 
                                    name="username" 
                                    id="username" 
                                    autoComplete="username" 
                                    required 
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 outline-none placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 focus:border-transparent sm:text-sm/6" 
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                                {/* <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                </div> */}
                            </div>
                            <div className="mt-2">
                                <input 
                                    value={password}
                                    onChange={handleChange}
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    autoComplete="current-password" 
                                    required 
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 outline-none placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 focus:border-transparent sm:text-sm/6" 
                                />
                            </div>
                        </div>

                        <div>
                            <button 
                                type="submit" 
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Not a member?
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500"> Register</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
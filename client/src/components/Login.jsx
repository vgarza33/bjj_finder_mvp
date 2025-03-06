import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "test",
        password: "test",
      });
    
      const { username, password } = credentials;
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
      };
    
      const login = async () => {
        try {
          const { data } = await fetch("/api/auth/login", {
            method: "POST",
            data: credentials,
          });
    
          localStorage.setItem("token", data.token);
          // I would like to redirect the user to the profile page
          //navigate("/");
        } catch (err) {
          console.log(err);
        }
      };
    
      const logout = () => {
        localStorage.removeItem("token");
      };
    
    return (
    <div>
        <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&amp;shade=600" alt="Your Company" />
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <input type="email" name="email" id="email" autocomplete="email" required="" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 outline-none placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 focus:border-transparent sm:text-sm/6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input type="password" name="password" id="password" autocomplete="current-password" required="" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 outline-none placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 focus:border-transparent sm:text-sm/6" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Not a member?
        <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500"> Register</a>
      </p>
    </div>
  </div>
</div>
)
};

export default Login;
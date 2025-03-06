import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false)

    // useEffect(() => {
    //     //check if user is logged in from local storage
    //     const checkLoginStatus = () => {
    //         const
    //     }
    // })

    // const handleLogout = () = {

    // }


    return (
        <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">

                {/* Logo/Home link */}
                <div>
                    <Link to="/" className="text-gray-800 font-bold text-xl hover:text-blue-600 transition duration-300">
                        Home
                    </Link>
                </div>
                
                {/* Login/Register Button */}
                <div>
                    <Link to="/auth" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-300 inline-block">
                        Login/Register
                    </Link>
                </div>
            </div>
        </div>
    </nav>
    )
}

export default Navbar;
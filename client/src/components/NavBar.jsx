import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"))
    // !! booleanized in javascript

    const navigate = useNavigate();

    // Add an effect to listen for changes to localStorage
    useEffect(() => {
        // Function to check login status
        const checkLoginStatus = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };

        // Initial check
        checkLoginStatus();

        // Set up event listener for storage changes
        window.addEventListener('storage', checkLoginStatus);

        // Custom event for login/logout from other components
        window.addEventListener('loginStatusChanged', checkLoginStatus);

        // Cleanup
        return () => {
            window.removeEventListener('storage', checkLoginStatus);
            window.removeEventListener('loginStatusChanged', checkLoginStatus);
        };
    }, []);
   

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        window.dispatchEvent(new Event('loginStatusChanged'));
        navigate('/');
    }


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
                {!isLoggedIn ? (
                    <div>
                    <Link to="/auth" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-300 inline-block">
                        Login/Register
                    </Link>
                </div> 
                ) : (
                    <div>
                        <button 
                            onClick={handleLogout}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-300 inline-block"
                            >
                            Logout
                        </button>
                    </div>
                )
                }

            </div>
        </div>
    </nav>
    )
}

export default Navbar;
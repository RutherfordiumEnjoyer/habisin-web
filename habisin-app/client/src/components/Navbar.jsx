import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import useSound from "use-sound";


import clickSfx from "../assets/sounds/click.mp3";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  

  const [playClick] = useSound(clickSfx, { volume: 0.5 });

  const handleLogout = () => {
    playClick();
    logout();
    toast.success("Berhasil logout!");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:scale-105 transition transform">
          🍽️ <span className="hidden sm:inline">Habisin!</span>
        </Link>
        
        <div className="flex items-center gap-3 md:gap-5">
          
          <button 
            onClick={() => {
              toggleTheme();
              playClick();
            }}
            className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === "dark" ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </motion.div>
          </button>

          {user ? (
            <>
              <span className="hidden md:inline-block text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100/50 dark:bg-slate-800 px-3 py-1 rounded-full border border-gray-200 dark:border-slate-700">
                👤 {user.username}
              </span>
              <Link 
                to="/add"
                onClick={playClick}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                + Bagi
              </Link>
              <button 
                onClick={handleLogout} 
                className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-sm font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition shadow-md">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
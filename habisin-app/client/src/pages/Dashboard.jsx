import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import CampusMap from "../assets/campus-map.jpg";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import SkeletonCard from "../components/SkeletonCard";
import LeaderboardWidget from "../components/LeaderboardWidget";
import useSound from "use-sound";
import hoverSfx from "../assets/sounds/hover.mp3";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const { user } = useContext(AuthContext);
  
  const [playHover] = useSound(hoverSfx, { volume: 0.2 });

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Gagal memuat data makanan");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="font-medium text-gray-800 dark:text-gray-200">Yakin mau hapus postingan ini?</p>
        <div className="flex gap-2 justify-end mt-1">
          <button 
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 rounded hover:bg-gray-200 dark:hover:bg-slate-600 transition"
          >
            Batal
          </button>
          <button 
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await axios.delete(`http://localhost:5000/api/posts/${id}`);
                setPosts((prev) => prev.filter((post) => post._id !== id));
                toast.success("Postingan berhasil dihapus!", { icon: '🗑️' });
              } catch (error) {
                toast.error("Gagal menghapus post");
              }
            }}
            className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition"
          >
            Hapus
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: "top-center",
      style: {
        background: "#fff",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }
    });
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-4 gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    🗺️ Peta Persebaran
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Pantau lokasi makanan gratis.</p>
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-48">
                    <input 
                      type="text" 
                      placeholder="Cari..." 
                      className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none shadow-sm text-sm text-gray-800 dark:text-white placeholder-gray-400"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
                  </div>
                  <button 
                    onClick={() => setShowMap(!showMap)}
                    className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800 px-3 py-2 rounded-xl hover:bg-blue-100 dark:hover:bg-slate-700 border border-blue-100 dark:border-slate-700 whitespace-nowrap"
                  >
                    {showMap ? "⬆" : "⬇"}
                  </button>
                </div>
              </div>

              {showMap && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative w-full bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden"
                >
                  <img 
                    src={CampusMap} 
                    alt="Peta Kampus" 
                    className="w-full h-auto rounded-xl border border-gray-200 dark:border-slate-600 opacity-90 dark:opacity-80 hover:opacity-100 transition duration-300" 
                  />
                  
                  {filteredPosts.map((post) => {
                    const isTopHalf = post.coordinates?.y < 50;
                    const isHovered = hoveredPostId === post._id;

                    return post.coordinates?.x && (
                      <div
                        key={post._id}
                        // PERBAIKAN DISINI: Jika di-hover, z-index jadi 50 (paling atas), jika tidak z-10
                        className={`absolute group cursor-pointer ${isHovered ? 'z-50' : 'z-10'}`}
                        style={{ left: `${post.coordinates.x}%`, top: `${post.coordinates.y}%` }}
                        onMouseEnter={() => setHoveredPostId(post._id)}
                        onMouseLeave={() => setHoveredPostId(null)}
                      >
                        <span className={`absolute -top-1 -left-1 flex transition-all duration-300 ${isHovered ? 'h-6 w-6 -top-2 -left-2' : 'h-3 w-3 md:h-4 md:w-4'}`}>
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isHovered ? 'bg-yellow-400' : 'bg-red-400'}`}></span>
                          <span className={`relative inline-flex rounded-full h-full w-full border-2 border-white shadow-lg ${isHovered ? 'bg-yellow-500 scale-125' : 'bg-red-600'}`}></span>
                        </span>
                        
                        <div 
                          className={`
                            absolute left-1/2 transform -translate-x-1/2 w-56 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-2xl transition-all duration-300 pointer-events-none border border-gray-100 dark:border-slate-600
                            ${isTopHalf ? 'top-full mt-3' : 'bottom-full mb-3'}
                            ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-95'}
                            ${isHovered ? (isTopHalf ? 'translate-y-0' : 'translate-y-0') : (isTopHalf ? '-translate-y-2' : 'translate-y-4')}
                          `}
                        >
                          <div className="h-32 w-full overflow-hidden rounded-lg mb-2 bg-gray-100 dark:bg-slate-700 relative">
                            <img 
                              src={post.imageUrl || "https://via.placeholder.com/200?text=No+Image"} 
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-900/90 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                              {post.quantity} Porsi
                            </div>
                          </div>
                          <div className="text-left px-1">
                            <p className="font-bold text-gray-800 dark:text-white text-sm leading-tight mb-1 line-clamp-1">
                              {post.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              📍 {post.location}
                            </p>
                          </div>
                          
                          <div 
                            className={`
                              absolute left-1/2 transform -translate-x-1/2 border-8 border-transparent 
                              ${isTopHalf ? 'bottom-full border-b-white dark:border-b-slate-800' : 'top-full border-t-white dark:border-t-slate-800'}
                            `}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-1">
               <LeaderboardWidget />
            </div>

          </div>

          <div className="max-w-full mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-3">
              🍽️ Menu Tersedia 
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-gray-200 dark:border-slate-700">
                {loading ? "..." : filteredPosts.length} item
              </span>
            </h2>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <SkeletonCard key={n} />
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700 shadow-sm">
                <div className="text-6xl mb-4 opacity-50">🥘</div>
                <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">Tidak ada makanan yang ditemukan.</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Coba cari kata kunci lain atau jadilah yang pertama berbagi!</p>
              </div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {filteredPosts.map((post) => (
                  <motion.div 
                    key={post._id} 
                    variants={itemVariants}
                    whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                    className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border transition-all duration-300 flex flex-col h-full overflow-hidden group ${hoveredPostId === post._id ? 'ring-2 ring-blue-500 dark:ring-blue-400 scale-[1.02] shadow-xl' : 'border-gray-100 dark:border-slate-700 hover:shadow-xl'}`}
                    onMouseEnter={() => {
                      setHoveredPostId(post._id);
                      playHover();
                    }}
                    onMouseLeave={() => setHoveredPostId(null)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-60 transition duration-300 z-10"></div>
                      <img 
                        src={post.imageUrl || "https://via.placeholder.com/400x200?text=No+Image"} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 z-20 bg-white/95 dark:bg-slate-900/90 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold text-indigo-600 dark:text-indigo-400 shadow-md">
                        Sisa: {post.quantity}
                      </div>
                      <div className="absolute bottom-3 left-3 z-20 text-white opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <p className="text-xs font-light flex items-center gap-1 bg-black/30 px-2 py-1 rounded backdrop-blur-sm">
                          📍 {post.location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 flex flex-col flex-grow relative">
                      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow leading-relaxed">
                        {post.description}
                      </p>
                      
                      <div className="pt-3 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                            {post.poster?.username?.[0]?.toUpperCase() || "U"}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 dark:text-gray-500">Oleh</span>
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{post.poster?.username || "Anonim"}</span>
                          </div>
                        </div>

                        {user && user.id === post.poster?._id && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(post._id);
                            }}
                            className="text-xs text-red-500 hover:text-white hover:bg-red-500 border border-red-200 dark:border-red-900/50 px-3 py-1 rounded-lg transition duration-300"
                          >
                            Hapus
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
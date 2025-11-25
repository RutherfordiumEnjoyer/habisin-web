import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import CampusMap from "../assets/campus-map.jpg";
import useSound from "use-sound";
import successSfx from "../assets/sounds/success.mp3";
import toast from "react-hot-toast";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  
  const [coords, setCoords] = useState({ x: null, y: null }); 
  const [isMapOpen, setIsMapOpen] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [playSuccess] = useSound(successSfx, { volume: 0.6 });

  const handleMapClick = (e) => {
    e.stopPropagation(); 

    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setCoords({ x, y });
    setIsMapOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coords.x) return toast.error("Tolong pilih lokasi di peta!");
    
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("quantity", quantity);
    formData.append("coordinateX", coords.x);
    formData.append("coordinateY", coords.y);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      playSuccess();
      toast.success("Makanan berhasil dibagikan!", { duration: 4000 });
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal memposting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-slate-950 transition-colors duration-300 py-10 px-4">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md h-fit border border-gray-100 dark:border-slate-700 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Detail Makanan</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Judul</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-900 text-gray-900 dark:text-white" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  placeholder="Contoh: Nasi Kotak Sisa Seminar" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
                <textarea 
                  required 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-900 text-gray-900 dark:text-white" 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                  placeholder="Jelaskan kondisi makanan..." 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lokasi (Gedung/Ruang)</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-900 text-gray-900 dark:text-white" 
                  value={location} 
                  onChange={e => setLocation(e.target.value)} 
                  placeholder="Contoh: Plaza Dr. Angka" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Jumlah Porsi</label>
                  <input 
                    type="number" 
                    required 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-900 text-gray-900 dark:text-white" 
                    value={quantity} 
                    onChange={e => setQuantity(e.target.value)} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Foto Bukti</label>
                  <input 
                    type="file" 
                    required 
                    className="w-full mt-1 text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 dark:file:bg-slate-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-slate-600 transition" 
                    onChange={e => setImage(e.target.files[0])} 
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full px-4 py-3 font-bold text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition shadow-lg mt-4">
                {loading ? "Mengupload..." : "📍 Posting Makanan"}
              </button>
            </form>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md h-fit border border-gray-100 dark:border-slate-700 transition-colors duration-300">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-700 dark:text-white">📍 Tandai Lokasi (Wajib)</h3>
              <button 
                type="button"
                onClick={() => setIsMapOpen(true)}
                className="text-xs bg-blue-100 text-blue-700 dark:bg-slate-700 dark:text-blue-300 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-slate-600 font-bold"
              >
                🔍 Buka Peta Besar
              </button>
            </div>

            <div 
              className="relative border-2 border-blue-200 dark:border-slate-600 rounded-lg overflow-hidden cursor-pointer group hover:shadow-lg transition"
              onClick={() => setIsMapOpen(true)}
            >
              <img 
                src={CampusMap} 
                alt="Peta Kampus" 
                className="w-full object-cover opacity-90 group-hover:opacity-100 transition"
              />
              
              {coords.x && (
                <div 
                  className="absolute w-3 h-3 bg-red-600 rounded-full border border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                >
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent border-t-red-600"></div>
                </div>
              )}
              
              {!coords.x && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                  <span className="bg-white/90 dark:bg-slate-900/90 px-3 py-1 rounded-full text-xs font-bold shadow-sm text-gray-700 dark:text-white">
                    Klik untuk memilih lokasi
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">*Klik peta untuk memperbesar & menandai titik presisi.</p>
          </div>

        </div>
      </div>

      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative bg-white dark:bg-slate-800 p-2 rounded-xl shadow-2xl max-w-[95vw] max-h-[90vh] overflow-hidden flex flex-col border dark:border-slate-700">
            
            <div className="flex justify-between items-center p-2 border-b dark:border-slate-700 mb-2">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white">🎯 Klik Titik Lokasi Tepat</h3>
              <button 
                onClick={() => setIsMapOpen(false)}
                className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 font-bold text-xl px-2"
              >
                ✕
              </button>
            </div>

            <div className="overflow-auto relative cursor-crosshair flex-1">
              <img 
                src={CampusMap} 
                alt="Peta Besar" 
                className="min-w-[1000px] w-full object-contain"
                onClick={handleMapClick}
              />
              
              {coords.x && (
                <div 
                  className="absolute w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-xl transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                ></div>
              )}
            </div>
            
            <div className="p-2 bg-gray-50 dark:bg-slate-900 text-center text-sm text-gray-600 dark:text-gray-400">
              Geser (Scroll) untuk melihat area lain. Klik sekali untuk menetapkan lokasi.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPost;
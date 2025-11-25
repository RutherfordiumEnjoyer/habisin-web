import { useEffect, useState } from "react";
import axios from "axios";

const LeaderboardWidget = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/leaderboard");
        setUsers(res.data);
      } catch (error) {
        console.error("Gagal ambil leaderboard");
      }
    };
    fetchLeaderboard();
  }, []);

  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "👏";
  };

  return (
 
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-indigo-100 dark:border-slate-700 p-5 h-fit transition-colors duration-300">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        🏆 Pahlawan Pangan
      </h3>
      <div className="space-y-4">
        {users.map((user, index) => (
          <div key={user._id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">{getMedal(index)}</span>
              <div>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  {user.username}
                  {user.badges.length > 0 && (
                    <span className="ml-2 text-[10px] bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-1.5 py-0.5 rounded border border-yellow-200 dark:border-yellow-800">
                      {user.badges[0]}
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{user.badges.length} Badge dikoleksi</p>
              </div>
            </div>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-lg">
              {user.points} XP
            </span>
          </div>
        ))}
        
        {users.length === 0 && (
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">Belum ada data.</p>
        )}
      </div>
      
      <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-700 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">Bagikan makanan untuk naik peringkat!</p>
      </div>
    </div>
  );
};

export default LeaderboardWidget;
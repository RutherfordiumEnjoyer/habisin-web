const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col animate-pulse">
      <div className="h-52 bg-gray-200 w-full relative">
        <div className="absolute top-3 right-3 h-6 w-16 bg-gray-300 rounded-full"></div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col space-y-4">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        
        <div className="pt-4 mt-auto border-t border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="h-8 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
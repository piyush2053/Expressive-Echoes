import React, { Dispatch, SetStateAction } from "react";

interface AdminSidePanelProps {
  currentPage: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}

const AdminSidePanel: React.FC<AdminSidePanelProps> = ({ currentPage, setCurrentPage }) => {
  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-800 text-white flex flex-col lg:w-1/6 xl:w-1/5">
      <div className="p-4 flex justify-center mt-5">
        <h1 className="text-2xl font-bold">Admin</h1>
        <div className="rounded-full h-3 w-3 bg-[green] mt-3 ml-2"></div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <button
          className={`py-2 px-4 rounded-sm focus:outline-none ${currentPage === 'posts' ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`}
          onClick={() => handlePageChange('posts')}
        >
          Posts
        </button>
        <button
          disabled={true}
          className={`py-2 px-4 rounded-sm cursor-not-allowed focus:outline-none ${currentPage === 'users' ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`}
          onClick={() => handlePageChange('users')}
        >
          Users Management <div className="bg-[green] p-1 text-sm rounded-sm mt-1">Coming Soon</div>
        </button>
        <button
          disabled={true}
          className={`py-2 px-4 cursor-not-allowed rounded-sm focus:outline-none ${currentPage === 'content' ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`}
          onClick={() => handlePageChange('content')}
        >
          Content Review <div className="bg-[green] p-1 text-sm rounded-sm mt-1">Coming Soon</div>
        </button>
      </div>
    </div>
  );
};

export default AdminSidePanel;

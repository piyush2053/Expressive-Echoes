import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import AdminSidePanel from "../../Components/AdminPanel.tsx";
import PostHandle from "../../Components/PostHandle.tsx";

export default function Admin() {
    const [currentPage, setCurrentPage] = useState('posts');
    return (
        <div className="flex h-screen">
            <Helmet>
                <title>Admin</title>
            </Helmet>
            <AdminSidePanel setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            <div className="flex-1 p-4">
                {currentPage === 'posts' && <PostHandle/>}
                {currentPage === 'users' && <h2 className="text-2xl font-bold">Users Management Page</h2>}
                {currentPage === 'content' && <h2 className="text-2xl font-bold">Content Review Page</h2>}
            </div>
        </div>
    );
}

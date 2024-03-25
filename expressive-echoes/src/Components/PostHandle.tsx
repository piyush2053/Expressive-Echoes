import React, { useEffect, useState } from "react";
import { URL } from "../Utils/constants.js";
import { CircularProgress } from "@mui/material";
import { deleteBlog } from "../Utils/functions.ts";

interface Blog {
    _id:number
    id: number;
    title: string;
    thumbnail: string;
    content: string;
    date: string;
    userImage: string;
    author: string;
}

const PostHandle = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const isLocalhost = window.location.href.includes('localhost');
                const apiURL = isLocalhost ? URL.GETBLOGS_LOCAL : URL.GETBLOGS_PROD;
                const response = await fetch(apiURL, {
                    method: 'GET',
                });
                if (response.ok) {
                    const result = await response.json();
                    setBlogs(result);
                } else {
                    console.error('Error checking workflow configuration:', response.statusText);
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
        // eslint-disable-next-line 
    }, []);

    const handleDelete = async (blogId: number) => {
        try {
            const response = await deleteBlog(blogId)
            if (response) {
                const updatedBlogs = blogs.filter(blog => blog._id !== blogId);
                setBlogs(updatedBlogs);
            } else {
                console.error('Error deleting blog')
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    return (
        <div className="bg-gray-800 text-white w-full p-4">
            {isLoading ? (
                <div className="flex items-center justify-center h-full">
                    <CircularProgress color="inherit" size={30}/>
                </div>
            ) : (
                <table className="w-full table-fixed">
                    <thead>
                        <tr>
                            <th className="w-1/3">Title</th>
                            <th className="w-1/3">Author</th>
                            <th className="w-1/3">Thumbnail</th>
                            <th className="w-1/3">Date</th>
                            <th className="w-1/3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map(blog => (
                            <tr key={blog._id}>
                                <td>{blog.title}</td>
                                <td>{blog.author}</td>
                                <td><img src={blog.thumbnail} alt="" className="h-10 rounded-md" /></td>
                                <td>{blog.date}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(blog._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PostHandle;

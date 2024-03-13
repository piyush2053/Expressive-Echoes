import React, { useEffect, useState } from "react";
import { URL } from '../../Utils/contants.js';
import '../../index.css';
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header.tsx";
import { Helmet } from "react-helmet-async";
import { useProvider } from "../../Store/Provider.tsx";

interface Blog {
    id: number;
    title: string;
    thumbnail: string;
    content: string;
    date: string;
    userImage: string;
    author: string;
}
export default function Home() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { updateBlog } = useProvider();

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
                    updateBlog(result);
                } else {
                    console.error('Error checking workflow configuration:', response.statusText);
                }
            } catch (error) {
                console.log(error, 'error');
            }
        };
        fetchData();
        // eslint-disable-next-line 
    }, []);

    const navigate = useNavigate();

    const handleBlogPost = (title) => {
        navigate(`/blog/${title}`);
    };

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Helmet>
                <title>PlainBlogPost</title>
            </Helmet>
            <Header />
            <main className="min-h-screen fade-in">
                <div className="px-4 lg:px-6 xl:col-span-2 xl:px-8">
                    <div className="space-y-12">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
                                Recently Published
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">Where every post is a story waiting to be told</p>
                            <div className="flex items-center space-x-2 py-5">
                                <input
                                    type="text"
                                    placeholder="Search by title..."
                                    className="py-2 px-7 rounded-full bg-black text-white w-full shadow-xl hover:shadow-none"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="fade-in grid gap-4 sm:grid-cols-3">
                            {filteredBlogs.length === 0 ? (
                                <div className="text-center text-gray-500 dark:text-gray-400">
                                    No results for "{searchTerm}"
                                </div>
                            ) : (
                                filteredBlogs.map((value) => (
                                    <div key={value.id} className="fade-in space-y-2 cursor-pointer hover:bg-[#EEEEEE] rounded-lg p-2" onClick={() => handleBlogPost(value.title)}>
                                        <img alt="blogThumbnail" className="h-20 w-40 rounded-lg" src={value?.thumbnail} />
                                        <h2 className="text-2xl font-semibold tracking-tight">{value?.title}</h2>
                                        <p className="truncate">{value?.content}</p>
                                        <p className="text-gray-500 dark:text-gray-400">Posted on {value.date}</p>
                                        <div className="grid items-center gap-2 text-sm">
                                            <div className="flex items-center space-x-2">
                                                <img
                                                    alt="Author"
                                                    className="rounded-full"
                                                    height={20}
                                                    src={value?.userImage}
                                                    style={{
                                                        aspectRatio: "32/32",
                                                        objectFit: "cover",
                                                    }}
                                                    width={20}
                                                />
                                                <p className="font-medium">{value?.author}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

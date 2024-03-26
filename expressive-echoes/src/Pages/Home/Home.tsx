import React, { useEffect, useState } from "react";
import { URL } from '../../Utils/constants.js';
import '../../index.css';
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header.tsx";
import { Helmet } from "react-helmet-async";
import { useProvider } from "../../Store/Provider.tsx";
import { fetchUserDataByEmail } from "../../Utils/functions.ts";

interface Blog {
    id: number;
    title: string;
    thumbnail: string;
    content: string;
    date: string;
    userImage: string;
    author: string;
}

interface UserData {
    name: string;
    netImg: string;
}

export default function Home() {
    const [userData, setUserData] = useState<UserData>({ name: '', netImg: '' });
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { updateBlog } = useProvider();
    const [headerKey, setHeaderKey] = useState(0);
    const Navigate = useNavigate()

    const fetchUser = async () => {
        const email = localStorage.getItem('email');
        if (email) {
            try {
                const userData = await fetchUserDataByEmail(email);
                if (userData) {
                    setUserData(userData);
                    localStorage.setItem('name', userData.name);
                    localStorage.setItem('img', userData.netImg);
                } else {
                    console.error('User data is null.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        } else {
            alert('Something weird, Please login again!')
            setTimeout(() => {
                Navigate('/')
            }, 1500)
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const isLocalhost = window.location.href.includes('localhost');
                const apiURL = isLocalhost ? URL.GETBLOGS_LOCAL : URL.GETBLOGS_PROD;
                const response = await fetch(apiURL, {
                    method: 'GET',
                });
                if (response.ok) {
                    setIsLoading(false)
                    const result = await response.json();
                    setBlogs(result);
                    updateBlog(result);
                } else {
                    setIsLoading(false)
                    console.error('Error checking workflow configuration:', response.statusText);
                }
            } catch (error) {
                setIsLoading(false)
                console.log(error, 'error');
            }
        };
        fetchUser();
        fetchData();
        // eslint-disable-next-line 
    }, []);

    useEffect(() => {
        setHeaderKey(prevKey => prevKey + 1);
    }, [userData]);

    const navigate = useNavigate();

    const handleBlogPost = (title) => {
        navigate(`/blog/${title}`);
    };

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const items = Array.from({ length: 8 }, (_, index) => index);
    return (
        <div>
            <Helmet>
                <title>PlainBlogPost</title>
            </Helmet>
            <Header name={userData?.name} img={userData?.netImg} key={headerKey} />
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
                        {isLoading ?
                            <div className="fade-in grid gap-4 sm:grid-cols-4">
                                {items.map((item, index) => (
                                    <div key={index} className="fade-in animate-pulse space-y-2 cursor-pointer rounded-lg p-2 shadow-2xl mb-10">
                                        <div className="h-20 rounded-lg animate-pulse bg-[#90A4AE]"></div>
                                        <p className="text-2xl font-semibold animate-pulse tracking-tight bg-[#90A4AE] rounded-lg"></p>
                                        <p className="truncate bg-[#90A4AE] animate-pulse rounded-lg"></p>
                                        <p className="text-gray-500 dark:text-gray-400 bg-[#90A4AE] rounded-lg animate-pulse"></p>
                                        <div className="grid items-center gap-2 text-sm">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-20 h-20 bg-[#90A4AE] rounded-full animate-pulse"></div>
                                                <p className="font-medium bg-[#90A4AE] animate-pulse"></p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div> :
                            <div className="fade-in grid gap-4 sm:grid-cols-4">
                                {filteredBlogs.length === 0 ? (
                                    <div className="text-center text-gray-500 dark:text-gray-400">
                                        No results for "{searchTerm}"
                                    </div>
                                ) : (
                                    filteredBlogs.map((value) => (
                                        <div key={value.id} className="fade-in space-y-2 cursor-pointer rounded-lg p-2 hover:shadow-2xl mb-10" onClick={() => handleBlogPost(value.title)}>
                                            <img alt="blogThumbnail" className="h-20 rounded-lg" src={value?.thumbnail} />
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
                            </div>}

                    </div>
                </div>
            </main>
        </div>
    );
}

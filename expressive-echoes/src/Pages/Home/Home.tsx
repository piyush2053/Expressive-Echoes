import React, { useEffect, useState } from "react"
import { URL } from '../../Utils/contants'
import '../../index.css'
import { useNavigate } from "react-router-dom"
import Header from "../../Components/Header.tsx"
import { Helmet } from "react-helmet-async"
import { useProvider } from "../../Store/Provider.tsx"
export default function Home() {
    const [blogs, setBlogs] = useState([])
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
                    setBlogs(result)
                    updateBlog(result)
                } else {
                    console.error('Error checking workflow configuration:', response.statusText);
                }
            } catch (error) {
                console.log(error, 'error')
            }
        };
        fetchData();
    }, [])
    const navigate = useNavigate()
    const handleBlogPost = (title) => {
        navigate(`/blog/${title}`)
    }
    return (
        <div className="bg-gray-100 dark:bg-gray-850">
            <Helmet>
                <title>PlainBlogPost</title>
            </Helmet>
            <Header />
            <main className="min-h-screen grid gap-12 lg:gap-0 lg:grid-cols-[300px_1fr] xl:grid-cols-[350px_1fr]">
                <div className="px-4 lg:px-6 xl:col-span-2 xl:px-8">
                    <div className="space-y-12">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
                                Recently Published
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">Where every post is a story waiting to be told</p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                            {blogs.map((value) => {
                                return (
                                    <div className="space-y-2 cursor-pointer hover:bg-[#EEEEEE] rounded-lg p-2" onClick={() => handleBlogPost(value.title)}>
                                        <img alt="blogThumbnail" className="h-20 w-40 rounded-lg" src={value?.thumbnail}></img>
                                        <h2 className="text-2xl font-semibold tracking-tight">{value?.title}</h2>
                                        <p className="truncate">{value?.content}</p>
                                        <p className="text-gray-500 dark:text-gray-400">Posted on {value.date}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

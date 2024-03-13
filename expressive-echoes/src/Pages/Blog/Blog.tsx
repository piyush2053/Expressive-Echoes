import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import '../../index.css';
import { URL } from '../../Utils/contants.js'
import { useProvider } from "../../Store/Provider.tsx";
import Header from "../../Components/Header.tsx";

export default function Blog() {
    const [Title, setTitle] = useState("");
    const [Blog, setBlog] = useState([]);
    const BlogFromStore = useProvider();
    const { updateBlog } = useProvider();

    const fetchData = async () => {
        try {
            const isLocalhost = window.location.href.includes('localhost');
            const apiURL = isLocalhost ? URL.GETBLOGS_LOCAL : URL.GETBLOGS_PROD;
            const response = await fetch(apiURL, {
                method: 'GET',
            });
            if (response.ok) {
                const result = await response.json();
                updateBlog(result);
            } else {
                console.error('Error checking workflow configuration:', response.statusText);
            }
        } catch (error) {
            console.log(error, 'error');
        }
    };


    useEffect(() => {
        setBlog(BlogFromStore.Blog);
        const path = window.location.pathname;
        const text = path.split("/blog/")[1];
        setTitle(decodeURIComponent(text));

    }, [BlogFromStore]);
    let SelectedBlog = []
    for (let i = 0; i < Blog.length; i++) {
        if (Blog[i].title === Title) {
            SelectedBlog.push(Blog[i])
        }
    }
    if (SelectedBlog[0]) {
        console.log(SelectedBlog)
    }else{
        fetchData();
        return;
    }
    return (
        <div >
            <Helmet>
                <title>{Title}</title>
            </Helmet>
            <Header />
            <div className="fade-in items-start gap-4 px-4 py-6  md:items-center md:px-6 md:py-12 lg:gap-6 lg:px-10">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{SelectedBlog[0]?.title}</h1>
                    <p className="text-gray-500 dark:text-gray-400">Posted on {SelectedBlog[0]?.date}</p>
                    <img
                        alt="thumbnail"
                        className="aspect-video rounded-lg object-cover overflow-hidden"
                        height={400}
                        src={SelectedBlog[0]?.thumbnail}
                        width={550}
                    />
                    <div className="prose prose-gray max-w-none not-italic">
                        <p>{SelectedBlog[0]?.content}</p>
                    </div>
                </div>
                <div className="grid items-center gap-2 text-sm pt-6">
                    <div className="flex items-center space-x-2">
                        <img
                            alt="Author"
                            className="rounded-full"
                            height={32}
                            src={SelectedBlog[0]?.userImage}
                            style={{
                                aspectRatio: "32/32",
                                objectFit: "cover",
                            }}
                            width={32}
                        />
                        <p className="font-medium">{SelectedBlog[0]?.author}</p>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">{SelectedBlog[0]?.email}</p>
                </div>
            </div>
        </div>
    );
}

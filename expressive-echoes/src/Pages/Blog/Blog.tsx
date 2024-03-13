import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import '../../index.css';
import { useProvider } from "../../Store/Provider.tsx";
import Header from "../../Components/Header.tsx";

export default function Blog() {
    const [Title, setTitle] = useState("");
    const [Blog, setBlog] = useState([]);
    const BlogFromStore = useProvider();

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
    console.log(SelectedBlog,"SelectedBlog")
    return (
        <div className="border-b border-gray-200 dark:border-gray-750">
            <Helmet>
                <title>{Title}</title>
            </Helmet>
            <Header/>
            <div className="bg-black m-5 p-5 rounded-lg flex items-center justify-center">
            <h1 className="text-4xl text-white">{SelectedBlog[0]?.title}</h1>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import '../index.css'
export default function Header() {
    const [blogPage, setBlogPage] = useState(false)
    const [contactPage, setContactPage] = useState(false)
    useEffect(() => {
        const path = window.location.pathname;
        const text = path.split("/")[1];
        if (decodeURIComponent(text) === 'publish') {
            setBlogPage(true)
        }
        else if (decodeURIComponent(text) === 'contact') {
            setContactPage(true)
        }
    }, [])
    return (
        <div className="dark:border-gray-750 ml-3">
            <div className="px-4 py-6 md:px-6 lg:py-8 lg:grid lg:gap-0 lg:grid-cols-[1fr_300px]">
                <div className="flex items-center space-x-4">
                    <Link className={`font-semibold tracking-tight ${contactPage ? 'text-gray-500': ''}`} to='/'>
                        PlainBlogPost
                    </Link>
                    <div className="ml-auto flex items-center space-x-4 lg:space-x-6">
                        <Link className={`font-semibold leading-6 ${contactPage ? 'text-black': 'text-gray-500'}`} to="/contact">
                            Contact
                        </Link>
                    </div>
                    <span className="relative">
                        {blogPage ? <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-[#7E57C2] opacity-75 "></span> : null}
                        <Link className={`${blogPage ? 'bg-[#1E88E5] ml-2' : 'bg-[#212121]'} py-1 px-3 rounded-lg text-white hover:text-black hover:bg-white`} to='/publish'>Post Blog</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

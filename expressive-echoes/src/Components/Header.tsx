import React from "react"
import { Link } from "react-router-dom"
import '../index.css'
export default function Header() {
    return (
        <div className="dark:border-gray-750 ml-3">
            <div className="px-4 py-6 md:px-6 lg:py-8 lg:grid lg:gap-0 lg:grid-cols-[1fr_300px]">
                <div className="flex items-center space-x-4">
                    <Link className="flex space-x-2 items-center" to='/'>
                        <span className="font-semibold tracking-tight">PlainBlogPost</span>
                    </Link>
                    <div className="ml-auto flex items-center space-x-4 lg:space-x-6">
                        <Link className="font-medium text-base leading-6 text-gray-500 dark:text-gray-400" to="/contact">
                            Contact
                        </Link>
                    </div>
                    <Link className="bg-[#212121] py-1 px-3 rounded-lg text-white hover:text-black hover:bg-white" to='/publish'>Post Blog</Link>
                </div>
            </div>
        </div>
    )
}

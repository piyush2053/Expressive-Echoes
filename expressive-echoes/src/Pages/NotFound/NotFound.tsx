import React from "react";
import { Helmet } from "react-helmet-async";
import '../../index.css';
import Header from "../../Components/Header.tsx";

export default function ErrorPage() {

    return (
        <div >
            <Helmet>
                <title>Page Not Found</title>
            </Helmet>
            <Header />
            <div className="fade-in flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl mb-10 mt-10">
                    Page Not Found
                </h1>
                <p className="text-gray-500 dark:text-gray-400">Where every post is a story waiting to be told</p>
            </div>
        </div>

    );
}

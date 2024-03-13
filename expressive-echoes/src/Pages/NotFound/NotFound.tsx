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
                <p className="text-gray-500 dark:text-gray-400">Oops! It seems like you've landed on the wrong URL. Please navigate back to the <a href="/" className="text-blue-500 font-semibold">Homepage</a> for the information you're looking for, or feel free to contact us for further assistance.</p>
                <div className="flex gap-2 justify-center mt-10">
                    <div className='flex justify-start' style={{ flexDirection: 'column' }}>
                        <h2 className="text-2xl font-bold">Piyush Patel</h2>
                        <a href='https://piyush2053.github.io/PortFolio/' rel="noreferrer" target='_blank' className='text-white font-semibold bg-[#424242] px-2 rounded-full'>Contact</a>
                    </div>
                    <img src='https://piyush2053.github.io/PortFolio/assets/images/me.jpeg' alt='piyush patel' className='mt-1 rounded-full h-[50px] w-[50px]'></img>
                </div>
            </div>
        </div>

    );
}

import React from "react"
import '../../index.css'
import Header from "../../Components/Header.tsx"
import { Helmet } from "react-helmet-async";
export default function About() {
    return (
        <div >
            <Helmet>
                <title>Contact us</title>
            </Helmet>
            <Header />
            <div className="fade-in px-5">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl mb-10 mt-10 ml-4">
                    Contact Us
                </h1>
                <div className="fade-in px-5">
                <p className="text-gray-500 dark:text-gray-400 mb-5">Welcome to PlainBlogPost!</p>
                    <p className="text-gray-500 dark:text-gray-400">At PlainBlogPost, we believe that everyone has a story to share and a unique perspective to offer. Our platform is designed to empower users like you to write and publish your thoughts, ideas, and experiences through blogs. Whether you're a seasoned writer or just starting out, PlainBlogPost is the perfect place to express yourself and connect with a community of like-minded individuals.

                    Our mission is to provide a user-friendly and inclusive space where creativity thrives. We encourage diversity in content, welcoming blogs on a wide range of topics including but not limited to lifestyle, technology, travel, food, fashion, and more. Your voice matters, and we're here to amplify it.

                    Why choose PlainBlogPost?

                    Simple Publishing: Our intuitive interface makes it easy to create and publish blogs without any technical hassle.
                    Engage with Others: Connect with fellow bloggers, read their stories, and engage in meaningful discussions through comments and sharing.
                    Explore Diverse Content: Discover a variety of blogs on topics that interest you, broadening your horizons and expanding your knowledge.
                    Grow Your Audience: Reach a wider audience and build a community around your passion and expertise.
                    Whether you're here to share your insights, learn something new, or simply enjoy reading engaging content, PlainBlogPost has something for everyone. Join us today and start your blogging journey!
                    </p>
                    <p className="mt-7 text-gray-500 dark:text-gray-400">Happy Blogging,</p>
                    <p className="text-gray-500 dark:text-gray-400">The PlainBlogPost Team</p>
                    </div>
                <div className="fade-in flex gap-2 ml-5 mt-10">
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

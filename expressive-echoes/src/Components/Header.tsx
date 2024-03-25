import React, { useEffect, useState, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../index.css'

interface HeaderProps {
  name: string;
  img: string;
}

const Header: FC<HeaderProps> = ({ name: propUsername, img: propImgUrl }) => {
  const [name, setName] = useState(propUsername);
  const [img, setImg] = useState(propImgUrl);
  const [blogPage, setBlogPage] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [contactPage, setContactPage] = useState(false);
  const Navigate = useNavigate()

  useEffect(() => {
    const path = window.location.pathname;
    const text = path.split("/")[1];
    if (decodeURIComponent(text) === 'publish') {
      setBlogPage(true);
    } else if (decodeURIComponent(text) === 'contact') {
      setContactPage(true);
    }
  }, []);

  useEffect(() => {
    if (!name || !img) {
      const storedName = localStorage.getItem('name');
      const storedImg = localStorage.getItem('img');
      if (storedName) setName(storedName);
      if (storedImg) setImg(storedImg);
    }
  }, [name, img]);

  
  const handleLogout = () => {
    localStorage.clear();
    Navigate('/')
  };


  return (
    <div className="dark:border-gray-750 ml-3">
      <div className="px-4 py-6">
        <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <Link className={`font-semibold tracking-tight ${contactPage ? 'text-gray-500' : ''}`} to='/home'>
            PlainBlogPost
          </Link>
          <div className="ml-auto flex items-center space-x-4 lg:space-x-6">
            <Link className={`font-semibold leading-6 ${contactPage ? 'text-black' : 'text-gray-500'}`} to="/contact">
              Contact
            </Link>
          </div>
          <span className="relative">
            {blogPage ? <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-[#7E57C2] opacity-75 "></span> : null}
            <Link className={`${blogPage ? 'bg-[#1E88E5] ml-2' : 'bg-[#212121]'} py-1 px-3 rounded-lg text-white hover:text-black hover:bg-white`} to='/publish'>Post Blog</Link>
          </span>
          </div>
          <div className="flex px-5 py-3 fade-in">
          <h1 className="font-semibold leading-6 mt-2 mr-3">Welcome, {name}</h1>
          <div className="relative" onMouseEnter={() => setShowLogout(true)} onMouseLeave={() => setShowLogout(false)}>
              <img src={img || 'https://i.pinimg.com/originals/7d/34/d9/7d34d9d53640af5cfd2614c57dfa7f13.png'} alt="User" className="h-10 w-10 rounded-full" />
              {showLogout && (
                <button onClick={handleLogout} className="absolute right-4 bg-black z-10 text-white px-2 rounded-sm">Logout</button>
              )}
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

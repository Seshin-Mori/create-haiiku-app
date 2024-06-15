import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, getCurrentUser } from "../utils/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='bg-gray-800 p-4 text-white'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <button onClick={toggleMenu} className='md:hidden'>
            <svg
              className='w-6 h-6 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16m-7 6h7'
              ></path>
            </svg>
          </button>
          <div className='hidden md:flex space-x-4'>
            <Link to='/'>
              <button className='bg-blue-500 px-3 py-2 rounded'>
                トップページ
              </button>
            </Link>
            <Link to='/create'>
              <button className='bg-blue-500 px-3 py-2 rounded'>
                新規俳句作成
              </button>
            </Link>
            <Link to='/completed'>
              <button className='bg-blue-500 px-3 py-2 rounded'>
                完成した俳句一覧
              </button>
            </Link>
            <Link to='/masterpieces'>
              <button className='bg-blue-500 px-3 py-2 rounded'>
                名作俳句
              </button>
            </Link>
          </div>
        </div>
        {user && (
          <div className='flex items-center space-x-4'>
            <span>{user.username}</span>
            <button
              onClick={handleLogout}
              className='bg-red-500 px-3 py-2 rounded'
            >
              ログアウト
            </button>
          </div>
        )}
      </div>
      {isOpen && (
        <div className='md:hidden'>
          <Link to='/'>
            <button className='block w-full text-left bg-blue-500 px-3 py-2 rounded mt-2'>
              トップページ
            </button>
          </Link>
          <Link to='/create'>
            <button className='block w-full text-left bg-green-500 px-3 py-2 rounded mt-2'>
              新規俳句作成
            </button>
          </Link>
          <Link to='/completed'>
            <button className='block w-full text-left bg-blue-500 px-3 py-2 rounded mt-2'>
              完成した俳句一覧
            </button>
          </Link>
          <Link to='/masterpieces'>
            <button className='block w-full text-left bg-blue-500 px-3 py-2 rounded mt-2'>
              名作俳句
            </button>
          </Link>
          {user && (
            <button
              onClick={handleLogout}
              className='block w-full text-left bg-red-500 px-3 py-2 rounded mt-2'
            >
              ログアウト
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

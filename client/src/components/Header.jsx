// import { FsSearch } from 'react-icon/fs'
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import React from 'react'

function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-4' >

            {/* Logo */}
            <Link to="/" >
                <h1 className='font-bold flex flex-wrap text-sm sm:text-xl gap-1' >
                    <span className='text-slate-500' >Mern</span>
                    <span className='text-slate-600'>-</span>
                    <span className='text-slate-700' >Estate</span>
                </h1>
            </Link>

            {/* Search Bar */}
            <form action="" className='bg-slate-100 p-3 rounded-lg flex items-center hover:shadow-md'>
                <input
                    id='search'
                    name='search' 
                    type="text" 
                    placeholder='Search...' 
                    className='bg-transparent focus:outline-none w-24 sm:w-64' 
                />
                <button type='submit' className='text-slate-600 hover:text-slate-800 ml-2'>
                    <FaSearch />
                </button>
            </form>

            {/* Navigation Link */}
            <ul className='flex gap-4' >
                <Link to="" >
                    <li className='sm:inline text-slate-700 hover:underline'>Home</li>
                </Link>
                <Link to="/about">
                    <li className='sm:inline text-slate-700 hover:underline' >About</li>
                </Link>
                <Link to="/sign-in">
                    <li className='sm:inline text-slate-700 hover:underline' >Sign IN</li>
                </Link>
            </ul>
        </div>
    </header>
  )
}

export default Header
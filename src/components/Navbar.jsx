import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-slate-700 text-white py-2 items-center">
        <div className="logo">
            <span className="font-extrabold text-5xl mx-8">iTask</span>
        </div>

        <ul className="flex gap-8 mx-9 ">
            <li className='cursor-pointer font-bold'>Home</li>
            <li className="cursor-pointer font-bold whitespace-nowrap">Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar

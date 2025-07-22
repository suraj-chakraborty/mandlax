import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "../assets/Frame57.png"
import camera from "../assets/cctv.png"
import dashboard from "../assets/dashboard.png"
import users from "../assets/users.png"
import incidents from "../assets/incidents.png"
import scenes from "../assets/scenes.png"
import avatar from "../assets/Avatar.png"
import arrow from "../assets/chevron-down.png"

const Navbar = () => {
    return (
        <div className="w-full h-10 flex flex-row align-middle justify-between bg-gray-900 text-white p-10">
            <div className="flex align-middle items-center">
                <Image src={logo} alt="logo image" />
            </div>
            <div className="flex flex-row gap-4 justify-between align-middle items-center">
                <Link className='flex flex-row gap-1' href="">
                    <span className='content-center'><Image src={dashboard} alt="cam" /></span>
                    <span>Dashboard</span>
                </Link>
                <Link className='flex flex-row gap-1' href=""><span className='content-center'><Image src={camera} alt="cam" /></span> <span>Cameras</span></Link>
                <Link className='flex flex-row gap-1' href=""><span className='content-center'><Image src={scenes} alt="cam" /></span><span>Screens</span></Link>
                <Link className='flex flex-row gap-1' href=""><span className='content-center'><Image src={incidents} alt="cam" /></span><span>Incidents</span></Link>
                <Link className='flex flex-row gap-1' href=""><span className='content-center'><Image src={users} alt="cam" /></span><span>Users</span></Link>
            </div>
            <div className="flex flex-row align-middle items-center">
                <div className="flex align-middle items-center pr-3">
                    <Image src={avatar} alt="logo image" />
                </div>
                <div className="flex flex-col gap-0">
                    <span><b>Mohammed Ajhas</b></span>
                    <span>ajhas@mandlac.com</span></div>
                <Image src={arrow} alt="logo image" />
            </div>
        </div>
    )
}

export default Navbar
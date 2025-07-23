
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "@/app/assets/Frame57.png"
import camera from "@/app/assets/cctv.png"
import dashboard from "@/app/assets/dashboard.png"
import users from "@/app/assets/users.png"
import incidents from "@/app/assets/incidents.png"
import scenes from "@/app/assets/scenes.png"
import avatar from "@/app/assets/Avatar.png"
import arrow from "@/app/assets/chevron-down.png"

const Navbar = () => {
    return (
        <div className="w-full h-full flex flex-row align-middle justify-between bg-gray-900 text-white p-4">
            <div className="flex align-middle items-center">
                <Image src={logo} alt="logo image" />
            </div>
            <div className="flex flex-row gap-4 justify-between align-middle items-center content-center" >
                <Link className='flex flex-row gap-1' href="">
                    <span className='content-center'>
                        <Image src={dashboard} alt="dashboard" width={20} height={20} />
                    </span>
                    <span>Dashboard</span>
                </Link>
                <Link className='flex flex-row gap-1' href=""><span className='content-center'><Image src={camera} alt="cam" width={30} height={30} /></span> <span>Cameras</span></Link>
                <Link className='flex flex-row gap-1' href=""><span className='content-center'><Image src={scenes} alt="cam" width={30} height={30} /></span><span>Screens</span></Link>
                <Link className='flex flex-row gap-1' href=""><span className='content-center'><Image src={incidents} alt="cam" width={30} height={30} /></span><span>Incidents</span></Link>
                <Link className='flex flex-row gap-1' href=""><span className='content-center'><Image src={users} alt="cam" width={30} height={30} /></span><span>Users</span></Link>
            </div>
            <div className="flex flex-row align-middle items-center">
                <div className="flex align-middle items-center pr-3">
                    <Image src={avatar} alt="logo image" />
                </div>
                <div className="flex flex-col gap-0">
                    <span><b>Mohammed Ajhas</b></span>
                    <span>ajhas@mandlac.com</span></div>
                <Image src={arrow} alt="logo image" width={20} height={20} />
            </div>
        </div>
    )
}

export default Navbar
import React from 'react'
import Logo from '../assets/logo.svg';

export default function Header() {
  return (
    <div className='bg-gray-900 p-2 pl-0'>
        <div className='flex items-center justify-center '>
            <img width="50" src={Logo} alt="logo" />
            <p className='text-white'>React Wallet</p>
        </div>
    </div>
  )
}

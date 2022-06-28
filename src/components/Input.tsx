import React from 'react'

interface input {
    placeholder: string,
    onChange: any,
    type: string,
    label?: string
}

export default function Input({placeholder, onChange, type, label}: input) {
  return (
    <div className='grid text-left'>
    <label className=' text-gray-600 text-sm' htmlFor="">{label}</label>
    <input 
    className=' bg-gray-100 p-2 rounded shadow outline-none px-4'
    type={type} 
    placeholder={placeholder} 
    onChange={onChange} />
    </div>
  )
}

import React from 'react'

interface button {
    title: string,
    className?: string,
    onClick?: () => void
}

export default function Button({title, onClick, className}:button) {
  return (
    <button
    className={`${className} bg-sky-400 m-3 cursor-pointer p-2 rounded shadow transition-all hover:bg-sky-500 hover:text-white`}
    onClick={onClick}>{title}</button>
  )
}

import React from 'react'

interface heading {
    text: string,
    className?: string
}

export default function Heading({text, className}:heading) {
  return (
    <p 
    className={`${className} mt-5 mb-5 text-2xl text-gray-600`}>
        {text}
    </p>
  )
}

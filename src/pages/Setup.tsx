import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Heading from '../components/Heading';

export default function Setup() {

  const navigate = useNavigate();

  const buttonActions = [
    {
      title: "Create new wallet",
      action: () => navigate('/create')
    },
    {
      title: "Import a wallet",
      action: () => navigate('/import')
    },
    {
      title: "Connect hardware wallet",
      action: () => navigate('/hardware')
    },
  ]
  return (
    <div className='text-center p-5'>
      <p className='mt-5 text-gray-600 text-3xl font-mono underline'>Welcome!</p>
      <Heading text="How would you like to setup your wallet?" />
      {
        buttonActions.map((button, index) => {
          return (
            <Button title={button.title} onClick={button.action} />
          )
        })
      }
    </div>
  )
}

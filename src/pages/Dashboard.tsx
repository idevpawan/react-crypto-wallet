import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button'

export default function Dashboard() {
    const [account, setAccount] = useState({});
    useEffect(() => {
        //@ts-ignore
        const getItem = JSON.parse(localStorage.getItem('account'));
        setAccount(getItem)
    }, [])
    const navigate = useNavigate()
  return (
    <div className='p-5'>
        <label className='text-sm text-gray-500' htmlFor="">Network: </label>
        <select className='text-sm'>
            <option value={
                //@ts-ignore
                account.chainId
            }>{
                //@ts-ignore
            account?.chainName}</option>
        </select>
        <div className='border shadow-md rounded-lg p-3 bg-zinc-100'>
            <p className='text-xs text-gray-500'>Address</p>
            <p className='text-sm '>{
                //@ts-ignore
            account?.address?.slice(0, 15) + "..." + account?.address?.slice(-15)}</p>
            <div className='flex mt-1 items-center'>
                <p className='text-sm text-gray-500'>Balance: </p>
                <p className='text-sm ml-1 '>{
                    //@ts-ignore
                account?.balance} ETH</p>
            </div>
        </div>
        <div className='flex justify-evenly'>
            <Button onClick={() => navigate('/send')} className='text-sm mx-1 px-2' title='Send' />
            <Button className='text-sm px-2 mx-1' title='Receive' />
            <Button className='text-sm px-2 mx-1' title='Swap' />
            <Button className='text-sm px-2 mx-1' title='Bridge' />
        </div>
    </div>
  )
}

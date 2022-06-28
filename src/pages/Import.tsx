import { providers, utils, Wallet } from 'ethers';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button'
import Heading from '../components/Heading'
import Input from '../components/Input'

export default function Import() {

  const [mnemonic, setMnemonic] = useState('');

  const navigate = useNavigate();

  const onImport = async() => {
    console.log(mnemonic)
    if(!mnemonic) {
      alert("No passphrase or invalid passphrase")
    } else {
      var rinkeby = "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
      const provider = new providers.JsonRpcProvider(rinkeby);

      const path = "m/44'/60'/0'/0/0";
            const wallet = Wallet.fromMnemonic(mnemonic).connect(provider);
            const balance = utils.formatEther(await provider.getBalance(wallet.address) )
            const accounts = [];
            accounts.push({
                address: wallet.address,
                pvtKey: wallet.privateKey,
                mnemonic,
                chainId: provider.network.chainId,
                chainName: provider.network.name,
                balance
            })
            localStorage.setItem('account', JSON.stringify(accounts[0]))
            if(localStorage.getItem('account')) {
                navigate('/dashboard')
            }
    }
  }

  return (
    <div className='text-center p-5'>
      <Heading text='Import a wallet' />
      <Input 
      placeholder='Enter your passphrase' 
      type='text' 
      onChange={(e: any) => setMnemonic(e.target.value)}
      label='Passphrase' />
      <Button onClick={onImport} className='mt-10' title='Import Wallet' />
    </div>
  )
}

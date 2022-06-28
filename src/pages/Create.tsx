import React, { useState } from 'react'
import Button from '../components/Button'
import Heading from '../components/Heading'
import Input from '../components/Input'

import * as bip39 from 'bip39';
import { useNavigate } from 'react-router-dom';
import { providers, utils, Wallet } from 'ethers';

export default function Create() {

    var rinkeby = "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

const provider = new providers.JsonRpcProvider(rinkeby)

    const [password, setPassword] = useState('');
    const [mnemonic, setMnemonic] = useState('');
    const [isGenerated, setIsGenerated] = useState(false)

    const navigate = useNavigate();

    const onProceed = async() => {
        if(!password || !isGenerated) {
            alert('Either the password is empty or mnemonic is not generated!')
        } else {
            const path = "m/44'/60'/0'/0/0";
            const wallet = Wallet.fromMnemonic(mnemonic, path).connect(provider);
            const balance = utils.formatEther(await provider.getBalance(wallet.address) )
            console.log(balance)
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

    const copyPhrase = () => {
        if(mnemonic) {
            navigator.clipboard.writeText(mnemonic);
        }
    }

    const generatePhrase = () => {
        const mn = bip39.generateMnemonic();
        console.log(mn)
        const validateMn = bip39.validateMnemonic(mn);
        if(validateMn) {
            setMnemonic(mn);
            setIsGenerated(validateMn);
        }
    }

  return (
    <div className='text-center p-5'>
        <Heading text="Create a new wallet" />

        <div>
            <Input label='Password' onChange={(e:any) => setPassword(e.target.value)} placeholder="Create new password" type='password' />
        </div>

        {
            isGenerated?
            (
                <>
                <div className=' border-solid border rounded-md border-sky-400 p-5 mt-5'>
                    <p className=' text-gray-600'>{mnemonic}</p>
                    <p onClick={copyPhrase} className='mt-4 text-xs text-gray-500 cursor-pointer'>Click to Copy</p>
                </div>
                </>
            ) : (
                <>
                <div className=' border-solid border rounded-md border-sky-400 p-5 mt-5 flex justify-center'>
                    <p className='bg-gray-200 rounded-lg p-2 cursor-pointer w-5/12 shadow text-xs' onClick={generatePhrase}>Click to Generate</p>
                </div>
                </>
            )
        }
        <Button className='mt-5' onClick={onProceed} title="Proceed" />
    </div>
  )
}

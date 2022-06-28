import { ethers, utils } from 'ethers';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Heading from '../components/Heading'
import Input from '../components/Input'

export default function Send() {
  const [receipent, setReceipent] = useState("");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("")
  const [isTxDone, setIsTxDone] = useState(false)

  const balance = JSON.parse(localStorage.getItem('account')!).balance

  const navigate = useNavigate()

  const onConfirm = async() => {
    if(!receipent || !amount) {
      console.log('No receipent or no amount!')
    }else {
      var rinkeby = "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
    const provider = new ethers.providers.JsonRpcProvider(rinkeby);
        const getMnemonic = JSON.parse(localStorage.getItem('account')!).mnemonic
        const wallet = ethers.Wallet.fromMnemonic(getMnemonic, "m/44'/60'/0'/0/0").connect(provider);
        const gasPrice = provider.getGasPrice();
        try{
          const tx = {
            to: receipent,
            from: wallet.address,
            value: ethers.utils.parseUnits(amount, 'ether'),
            gasLimit: utils.hexlify(100000), // 100 gwei
            gasPrice: gasPrice,
            nonce: provider.getTransactionCount(wallet.address, 'latest'),
        };
        const transcation = await wallet.sendTransaction(tx);
        setTxHash(transcation.hash)
        console.log(transcation)
        setIsTxDone(true)
        } catch (err) {
          console.log(err)
        }
    }
  }

  return (
    <div className='text-center p-5'>
      {
        isTxDone?
        (
          <div className=' block'>
            <Heading text='Success!' />
            <div className=''>
              Transcation hash: <a className='text-sky-400 underline break-words text-xs' href={`https://rinkeby.etherscan.io/tx/${txHash}`} target="_blank">{txHash}</a>
            </div>
              <Button className='mt-10' onClick={() => navigate('/dashboard')} title="Back" />
          </div>
        ) : (
          <>
          <Heading text='Send Transcation' />
          <p className='mb-5 text-sm'>Current Balance: {balance} ETH</p>
          <div>
            <Input label='Address' type='text' placeholder='Enter receipent address' onChange={(e:any) => setReceipent(e.target.value)} />
          </div>
          <div className='mt-5'>
            <Input label='Amount' type='number' placeholder='Enter amount' onChange={(e:any) => setAmount(e.target.value)} />
          </div>
          <div className='mt-5'>
            <Button onClick={onConfirm} title='Confirm' />
            <Button onClick={() => navigate('/dashboard')} title='Cancle' />
          </div>
          </>
        )
      }
    </div>
  )
}

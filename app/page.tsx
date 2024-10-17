

'use client' 

import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css'; 
import React from 'react';
import {MdArrowForward} from 'react-icons/md'; 
import { useEffect, useState } from 'react'; 
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import LotteryEntrance from '@/app/ui/LotteryEntrance/page';
import Footer from '@/app/ui/Footer/page';

export default function Page() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();  
  const { switchChain, chains } = useSwitchChain(); 
  const { connectors, connect } = useConnect(); 
   
  const [isCorrectChain, setIsCorrectChain] = useState(false); 

  useEffect(() => {
    const sepoliaChainId = 11155111; 
    const fujiChainId = 43113; 

    const isCorrectChain = chains.some((chain) => chain.id === sepoliaChainId || chain.id === fujiChainId);
    setIsCorrectChain(isCorrectChain); 
  }, [chains]);

  return (
    <main className="flex min-h-screen flex-col p-6 w-full">
      <div className="flex flex-col md:flex-row gap-10 items-start justify-between max-w-screen-2xl mx-auto w-full">
        {/* Left side : text content */}
        <div className="w-full p-16 md:w-full" style={{ width: '1000px' }}> 
          <div className="rounded-lg bg-opacity-30 backdrop-filter backdrop-blur-md bg-[#0a0a0a] p-12 md:p-20 w-full border-2 border-[#ffffaf] ">
            <p className="text-lg text-center text-[#ffffaf] md:text-2xl md:leading-normal">
              <span role="img" aria-label="flamingo" style={{ fontSize: '36px', verticalAlign: 'middle' }}>
                🦩
              </span>{' '}
              <strong>Welcome to Decentralized Lottery</strong>{' '} 
              <span role="img" aria-label="sparkles" style={{ fontSize: '36px', verticalAlign: 'middle' }}>
                ✨       
              </span>
              <br />
              <br /> 
              Backend by <strong>Chainlink VRF & Automation</strong>  {''} {''} <br /> 
              Frontend by <strong>TypeScript, NextjsV14, Wagmi &  RainbowKit SDK</strong> 
              <br /> 
              <strong>ERC4337 compliant coming soon... </strong>
              <br />
              <br/>
              Test it for <strong>only 0.01 Sepolia Eth or 0.01 Fuji Avax</strong>
              <br /> 
              <br /> 
              A randomly picked winner selected 
              every <span className='blink'><strong>10 minutes</strong></span><br /> 
              {''} by tamper-proof decentralized oracles
              <br/> 
            </p>
            <div className='mt-8 flex flex-col bg-transparent items-center gap-4'> 
              <ConnectButton showBalance={false}/> 
              
              {isConnected && isCorrectChain && <LotteryEntrance />}            

              {isConnected && (
                <button onClick={() => disconnect()} className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded">                    
                  <MdArrowForward size={20} /> 
                  <span className="text-white"> Disconnect Wallet </span>
                </button>
              )}
            </div> 
          </div>
        </div> 
      </div>
      
      <Footer /> 
    </main>
  );
}
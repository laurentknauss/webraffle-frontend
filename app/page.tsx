'use client' 

import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css'; 
import React from 'react';
import {MdArrowForward, MdArrowBack} from 'react-icons/md'; 

//import Image from 'next/image';
//import Link from 'next/link';
import { useEffect, useState } from 'react'; 
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
//import { metaMask } from 'wagmi/connectors';

import  LotteryEntrance  from '@/app/ui/LotteryEntrance/page';

export default function Page() {
  // The 'useAccount' hook checks if the user is connected to a wallet.
  const { isConnected } = useAccount();
  const { disconnect} = useDisconnect();  
  // The 'useSwitchChain' hook allows the user to switch between chains.
  const { switchChain, chains } = useSwitchChain(); 
  const { connectors, connect}  = useConnect(); 
  const metaMaskConnector = connectors.find((connector) => connector.name === 'MetaMask'); 


  const [isCorrectChain, setIsCorrectChain] = useState(false); 

// Check if the user is connected to Sepolia or Fuji
useEffect(() => {
  const sepoliaChainId = 11155111; 
  const fujiChainId = 43113; 

  const isCorrectChain = chains.some((chain) => chain.id === sepoliaChainId || chain.id === fujiChainId);
      setIsCorrectChain(isCorrectChain); 
}, [chains]);



  return (


    <main className="flex min-h-screen flex-col p-6   w-full">

     {/* Flex container for text and connect button (left side*
      <div className="flex flex-col  justify-between gap-6 md:w-1/2"> </div> */}


        {/*<div className="flex flex-col justify-center gap-6 rounded-lg bg-[#0a0a0a]
              mt-10 mb-12 mr-8 ml-8 pl-4 pr-16 px-22 py-20 md:w-full md:px-24">  </div> */}
          

          <div className="flex flex-col md:flex-row gap-10 items-start justify-between max-w-7xl mx-auto w-full">

          {/* Left side : text content */} 
          <div className="w-full p-16 md:w-9/10" style={{ width: '1200px' }}> 
          <div className="rounded-lg bg-[#0a0a0a] p-12 md:p-20 w-full">
          <p className="text-lg text-center text-[#fc74a6] md:text-2xl md:leading-normal">
          
          <span
          role="img"  aria-label="flamingo"   style={{ fontSize: '36px', verticalAlign: 'middle' }} // Adjust size and alignment
        >🦩
        </span>{' '}

        <strong>Welcome to Decentralized Lottery</strong>{' '} 
        <span  role="img" aria-label="sparkles" style={{ fontSize: '36px', verticalAlign: 'middle' }} // Adjust size and alignment
        >✨       
        </span>
       
               
            
            
            <br />
            < br /> 
            Backend by <strong>Chainlink VRF & Automation</strong>  {''} {''} <br /> 
            Frontend by <strong>TypeScript, NextjsV14 &  Rainbow SDK</strong> 
            <br />
            <br/>
            Available on Sepolia & Fuji testnets for only 0.01 eth/avax
            <br />
            <h1 className='text-justify text-center'>A randomly picked winner selected <br /> 
             every <span className='blink'><strong>10 minutes</strong> </span> 
            by tamper-proof decentralized oracles</h1> 
            <br /> 
            
            <p className="text-sm"> Crafted by {' '} 
            <a href="https://knauss.dev" className="text-[#fafafa]">
              Laurent Knauss </a>  {' '} {''} blockchain engineer
               </p>           
          
          </p>

            <div className='mt-8 flex flex-col bg-transparent items-center gap-4'> 
          <ConnectButton showBalance={false}/> 
            

            
            {isConnected && !isCorrectChain && ( 
              <div className="text-center">
                <p> Switch to Sepolia or Fuji to play </p>
            <button   onClick={() => switchChain({ chainId: 11155111 })}> 
              Switch to Sepolia 
            </button> 
            <button onClick={() => switchChain({ chainId: 43113 })}> 
              Switch to Fuji 
            </button> 

              </div> 
            )} 
              
                  
            
            
            {isConnected && isCorrectChain &&  <LotteryEntrance /> }            

              
              {isConnected && (
              <button onClick={() => disconnect()} className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded">                    
             <MdArrowForward size={20} /> 
                <span className="text-white"> Disconnect Wallet </span>
              </button>
              )} 
              </div> 
      </div>
      </div> 
           

          {/* Right side : images */}
<div className="pt-16 w-full md:w-1/10" style={{ width:'200px'}}>
        <div className="bg-transparent rounded-lg p-4 flex flex-col items-center gap-4">
          {["/chainlink.png", "/sepolia.png", "/avax.png", "/wagmi.png", "/rainbow.png"].map((src, index) => (
            <img key={index} src={src} alt={`Logo ${index + 1}`} width={80} height={80} className="rounded" />
          ))}
          </div> 
        </div> 
        </div>
      
    
    </main>
  );
}

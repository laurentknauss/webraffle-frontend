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


    <main className="flex min-h-screen flex-col p-6 
    w-full">
      {/* Flex container for images and text */} 
      <div style={{ width: '170%', margin: '0 auto', }}
       className='flex flex-col   md:flex-row gap-10 items-center justify-between'
       > 


      {/* Flex container for text and connect button (left side*/} 
      <div className="flex flex-col  justify-between gap-6 md:w-1/2"> 
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-[#0a0a0a]
              mt-10 mb-12 mr-8 ml-8 pl-4 pr-16 px-22 py-20 md:w-full md:px-24">          
          
          <p className="text-lg text-[#fc74a6] md:text-2xl md:leading-normal">
          
          <span
          role="img"
          aria-label="flamingo"
          style={{ fontSize: '36px', verticalAlign: 'middle' }} // Adjust size and alignment
        >
          🦩
        </span>{' '}

       <strong>Welcome to Decentralized Lottery</strong>{' '} 
        <span
          role="img"
          aria-label="sparkles"
          style={{ fontSize: '36px', verticalAlign: 'middle' }} // Adjust size and alignment
        >✨
        
        </span>
       
       
         

            
            
            
             <br /> <br />
            
            Backend by <strong>Chainlink VRF & Automation</strong>{' '} <br /> 
             Frontend by <strong>Typescript, NextjsV14 &  Rainbow SDK</strong> . <br />
            <br/>
            Available on Sepolia & Fuji testnets for only 0.01 eth/avax <br/> 
            <br />
            A randomly picked winner selected every <span className='blink'><strong>10 minutes</strong></span> by 
            tamper-proof decentralized oracles <br /> 
            <br /> 
            
            <p className="text-sm"> Crafted by {' '} 
            <a href="https://knauss.dev" className="text-[#fafafa]">
              Laurent Knauss </a>  {' '} {''} blockchain engineer </p>           
          
          </p>

          <div style={{ display:"flex",
            padding: "12px", 
            justifyContent:"center", 
            
           background: "transparent",
           
          
          
        }}>       

          <ConnectButton showBalance={false}/> 
            

            
            {isConnected && !isCorrectChain && ( 
              <div>
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
              <button onClick={() => disconnect()} className="flex items-center">                    
              
                <MdArrowForward size={20} /> 
                Disconnect
              </button>
              )} 
              </div> 
      </div>
           
        
      
      
      

            {/*
          {/* Flex container for images (right side ) *
      <div style={{ width: '100%' }}
       className="mt-4 mb-4 pt-16 flex flex-col gap-10 
      h-auto   items-center justify-center rounded-lg bg-black  md:h-54 md:w-1/2">
        <img  src="/chainlink.png"         
          width={80}
          height={80}
          className="rounded"
          />
          <img  src="/sepolia.png"         
          width={80}
          height={80}
          className="rounded"
          />

<img  src="/avax.png"         
          width={80}
          height={80}
          className="rounded"
          />


<img  src="/wagmi.png"         
          width={80}
          height={80}
          className="rounded"
          />





<img  src="/rainbow.png"         
          width={80}
          height={80}
          className="rounded"
          />
          </div> */}
        </div> 
        </div>
      
    
    </main>
  );
}

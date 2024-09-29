

'use client' 

import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css'; 
import { gql, useQuery } from '@apollo/client'; 
//import { createClient, useQuery} from '@graphprotocol/client'
import React from 'react';
import {MdArrowForward} from 'react-icons/md'; 
import { useEffect, useState } from 'react'; 
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import  LotteryEntrance  from '@/app/ui/LotteryEntrance/page';
import Footer from '@/app/ui/Footer/page';



const GET_LAST_LOTTERY_PLAYER = gql`
{ 
  raffleEnters(first:1, orderBy: blockTimestamp, orderDirection: desc)
   # limit the query to fetch the most recent player 
     {
      id
      player
      blockTimestamp
    }
  
}
`; 

const GET_LAST_LOTTERY_BALANCE= gql`
{
balanceContracts(
    first:1,
    orderBy: blockTimestamp,
    orderDirection: desc
  ) 
  { 
    id 
    balance
    blockNumber
    blockTimestamp
  
  }
}
`;




const GET_LAST_LOTTERY_WINNER = gql` 
{
  winnerPickeds(first:1, # limit the query to fetch just one winner 
    orderBy:blockTimestamp, # order the events/results of the lottery  by block timestamp 
    orderDirection:desc # order the results in descending order so the most recent events (with the highest block number) are fetched first 
    ) 
    {
    id 
    player
    blockNumber
    blockTimestamp
  }
}
`; 

const GET_NUMBER_OF_PLAYERS = gql`
  query{ 
  playerCount(
    first : 1, 
    orderBy: updatedAtBlock, 
    orderDirection: desc) { 
    id
    count 
    updatedAtBlock
  }
  
}
`; 

function LastLotteryPlayer() { 
  const { loading, error, data } = useQuery(GET_LAST_LOTTERY_PLAYER, {
    fetchPolicy: 'no-cache', // fetch the data from the network and don't use the cache  
    pollInterval: 2000, // poll every 2 seconds 
  }); 

    if (loading) return <p>Fetching the last player ... just wait! </p>;

    if (error)  {
        console.error("Apollo Error: ", error); 
        console.error("GraphQl Error: ", error.graphQLErrors); 
        console.error("Network Error: ", error.networkError); 

      return <p> Error fetching the last player: {error.message} </p>;  
    } 
    if(!data || !data.raffleEnters || data.raffleEnters.length === 0) { 
      return <p> No player data available </p>; 
    } 
  const lastPlayer = data?.raffleEnters[0]?.player;

  return (
    <div className="text-center">
      <strong> Last player was wallet: {lastPlayer} </strong> 
    </div>
  );
}



function LastLotteryBalance() { 
  const { loading, error, data } = useQuery(GET_LAST_LOTTERY_BALANCE, {
    fetchPolicy: 'no-cache', // fetch the data from the network and don't use the cache  
    pollInterval: 3000, // poll every 3 seconds 
  }); 

    if (loading) return <p>Fetching the last balance ... just wait! </p>;

    if (error)  {
        console.error("Apollo Error: ", error); 
        return <p> Error fetching the last balance: {error.message} </p>; 
    } 

    console.log('Balance data:', data); 

     
    if(!data || !data.balanceContracts || data.balanceContracts.length === 0) { 
      return <p> No balance data available </p>; 
    } 

  const lastBalance = data?.balanceContracts[0]?.balance;

  return (
    <div className="text-center">
      <strong> Last balance was: {lastBalance} </strong> 
    </div>
  );
}

function NumberOfPlayers() { 
  const { loading, error, data } = useQuery(GET_NUMBER_OF_PLAYERS, {
    fetchPolicy: 'no-cache', // fetch the data from the network and don't use the cache  
    pollInterval: 50000, // poll every 5 seconds 
  }); 

    if (loading) return <p>Fetching the number of players ... just wait! </p>;

    if (error)  {
        console.error("Apollo Error: ", error); 
        console.error("GraphQl Error: ", error.graphQLErrors); 
        console.error("Network Error: ", error.networkError); 

      return <p> Error fetching the number of players: {error.message} </p>;  
    } 
    if(!data || !data.playerCounts || data.playerCounts.length === 0) { 
      return <p> No player data available </p>; 
    }


    const numberOfPlayers = data?.playerCounts[0]?.count || 0; 
    const updatedAtblock = data?.playerCounts[0]?.updatedAtBlock; 
  

    return (
      <div className="text-center">
        <strong> Current Number of players: {numberOfPlayers} </strong> 
        <p> Last update at block: {updatedAtblock} </p> 
      </div>
    );

}






function LastLotteryWinner() { 
  const { loading, error, data } = useQuery(GET_LAST_LOTTERY_WINNER, {
    fetchPolicy: 'network-only', // fetch the data from the network and don't use the cache  
    pollInterval: 10000, // poll every 10 seconds 
  }); 

    if (loading) return <p>A winner is picked ... just wait! </p>;

    if (error)  {
        console.error("Apoloo Error: ", error); 
        console.error("GraphQl Error: ", error.graphQLErrors); 
        console.error("Network Error: ", error.networkError); 

      return <p> Error fetching the winner: {error.message} </p>;  
    } 
    if(!data || !data.winnerPickeds || data.winnerPickeds.length === 0) { 
      return <p> No winner data available </p>; 
    } 
  const lastWinner = data?.winnerPickeds[0]?.player;

  return (
    <div className="text-center">
      <strong> Last winner was wallet: {lastWinner} </strong> 
    </div>
  );
}



export default function Page() {
  // The 'useAccount' hook checks if the user is connected to a wallet.
  const { isConnected } = useAccount();
  const { disconnect} = useDisconnect();  
  // The 'useSwitchChain' hook allows the user to switch between chains.
  const { switchChain, chains } = useSwitchChain(); 
  const { connectors, connect}  = useConnect(); 
   


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
          <div className="flex flex-col md:flex-row gap-10 items-start justify-between max-w-screen-2xl mx-auto w-full">

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
            Test it for <strong>only 0.01 Sepolia Eth or 0.01 Fuji Avax</strong>
            <br /> 
            <br /> 
            A randomly picked winner selected 
             every <span className='blink'><strong>10 minutes</strong> </span><br /> 
            {''} by tamper-proof decentralized oracles
            <br/> 
            
            
             
            {/*  <LastLotteryBalance /> 
            <br/> 

            {/* Display the last player 
              <LastLotteryPlayer />
            <br /> 

             { /* Display the number of players 
              <NumberOfPlayers /> 
            <br /> 
            
            {/* Display the last winner 
            <LastLotteryWinner />  */}
          </p>
            
            <div className='mt-8 flex flex-col bg-transparent items-center gap-4'> 
          <ConnectButton showBalance={false}/> 
            
        
                  
            
            
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
           

          {/* Right side : images */ } 
<div className="p-18 w-full md:w-1/10">
        <div className="bg-transparent rounded-lg pt-16 pb-2 flex flex-col items-center" style={{width:'600%', height:'250%'}}>
          {["/treasure.png"].map((src, index) => (
            <img key={index} src={src} alt={`Logo ${index + 1}`} 
            width={1000} height={600} className="rounded" />
          ))}
          </div> 
        </div> 
        </div>
      
    <Footer /> 
    </main>
  );
}


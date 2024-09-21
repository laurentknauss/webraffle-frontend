
"use client";  

import { FC, useState, useEffect  } from 'react'; 

import { useWriteContract,  useReadContract, useBalance, useSimulateContract, useSwitchChain, useAccount, useWaitForTransactionReceipt } from 'wagmi'; 
//import { toast , ToastContainer  } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import "react-toastify/dist/ReactToastify.css"; 
import { abi } from '@/app/abi';  
import { contractAddresses } from '@/app/contractAddresses'; 
import {  ethers, isError  } from 'ethers'; 
import Error from 'next/error';
import { config } from '@/app/config'; 


const LotteryEntrance:  FC = () => { 
    const { isConnected , chain} = useAccount(); 
    const [isTransacting, setIsTransacting] = useState(false); 
    //const [isLoading, setIsLoading] = useState(false); 
    const [ message, setMessage ] = useState<{ type : 'info' | 'error' | 'success' ; content: string } | null>(null ); 
    
//    const [isSuccess, setIsSuccess] = useState(false);

  const { writeContract , data: hash,  error: writeError } = useWriteContract(); 
  const {isLoading: isConfirming, isSuccess: isConfirmed} = useWaitForTransactionReceipt({ 
    hash, 
  }); 








    
  const { switchChain, chains } = useSwitchChain(); 

  const supportedChains = [11155111, 43113]; 

  const addresses: { [key: string] : string[] } = contractAddresses; 

  const raffleAddress :  `0x${string}` | undefined =  
  chain && supportedChains.includes(chain?.id!)  
  ? (addresses[chain.id.toString()]?.[0]   as `0x${string}` | undefined ) : undefined;   

// State hooks
const [entranceFee, setEntranceFee] = useState("0");
const [numberOfPlayers, setNumberOfPlayers] = useState("0");
const [recentWinner, setRecentWinner] = useState("0");

// View Functions
const { data: balanceData  } = useBalance({
address : raffleAddress, 
}); 


const { data: entranceFeeData } = useReadContract({
  abi: abi,
  address: raffleAddress,
  functionName: "getEntranceFee",
});

const { data: numPlayersData } = useReadContract({
  abi: abi,
  address: raffleAddress,
  functionName: "getNumberOfPlayers",
    
});

const { data: recentWinnerData } = useReadContract({
  abi: abi,
  address: raffleAddress,
  functionName: "getRecentWinner",
    
    });














    const handleWrite = async () => {
      if (!raffleAddress || !entranceFeeData) {
        setMessage({ type: 'error', content: 'Contract address or entrance fee not available' }); 
        //toast.error("Contract address or entrance fee not available"); 
        return;
      }

      setIsTransacting(true); 
      setMessage({ type: 'info', content: 'Broadcasting transaction to the chain...' }); 
      //setIsLoading(true); 

      // Create a toast ID to update the same toast with the transaction status 
      //const toastId = toast.info("starting transaction...",
      //  { autoClose: false, }); 

      
      try {
        await writeContract({
          abi: abi,
          address: raffleAddress,
          functionName: "enterRaffle",
                    value: entranceFeeData,
        } );



      } catch (error) {
          console.error("Transaction Error:", error);
          setMessage({ type: 'error', content: 'Transaction failed. Please try again' });

      
          
          setIsTransacting(false); 
          
      }
  };

    
    
    
    
    
    
    

    // Wait for transaction receipt
    //Hook that waits for the transaction to be included on a block, and then returns the transaction receipt.
    // If the transaction reverts, then the action will throw an error.
    //const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
      //  hash: writeData,
    //});

useEffect( () => { 
  if  (isConfirmed) { 
    setMessage({ type: 'success', content: 'You successfully entered the lottery!'}); 
    setIsTransacting(false); 
  } 
  if (writeError) { 
    setMessage({ type: 'error', content: 'Error entering the lottery!'}); 
    setIsTransacting(false); 
  }
}, [isConfirmed, writeError]); 








useEffect(() => {
    if (entranceFeeData) {
      setEntranceFee(ethers.formatEther(entranceFeeData.toString()));
    }
    if (numPlayersData) {
      setNumberOfPlayers(numPlayersData.toString());
    }
    if (recentWinnerData) {
      setRecentWinner(recentWinnerData.toString()); 
    }   
  }, [entranceFeeData, numPlayersData, recentWinnerData]); 

console.log("raffleAddress", raffleAddress); 




return ( 
    <div className="flex flex-col justify-center items-center min-h-screen   bg-[#0a0a0a] "> 
    
            <h1 className="text-2xl font-bold text-center      ">  </h1>
            {raffleAddress ? ( 
                <>    
                    
                    <button className="text-[#fc74a6] font-bold mx-4 mb-10 py-8 px-8 rounded-full glitter-button"
                      style={{  background: 'linear-gradient(80deg, #ff7e5f 0%, #00d2ff 5%)' }} 
                      onClick={handleWrite} 
                      // disactivate button when loading or confirming 
                      //disabled={isLoading || isConfirming}  
                      disabled={isTransacting}
                        > 
                        
                        {isTransacting ? ( 
                          // Display the three dots loader when loading or confirming
                        
                         //isConfirming ? 
                         <ThreeDots
                          color='linear-gradient(170deg, #ff7e5f 0%, #00d2ff 90%)'                      
                          height="100"
                          width="140"
                          radius="4" 
                          ariaLabel='three dots loading' 
                          wrapperStyle={{ display: 'flex', justifyContent: 'center' }} 
                          wrapperClass='' 
                          visible={true}
                          /> 
                        ) : (
                         
                          ' PLAY LOTTERY  ' )}
                          </button>
                                        
                              {message && (
                                  <p className={`mt-4 text-center ${
                                      message.type === 'error' ? 'text-red-800 font-bold' : 
                                      message.type === 'success' ? 'text-white font-bold' : 
                                      'text-white'
                                  }`}>
                                      {message.content}
                                  </p>
                              )}  





             <div className="flex text-[#fc74a6]  flex-col items-center ml-10 mr-12 mt-4 bg-[#0a0a0a]">
                
                
                <div className='font-bold text-center text-[#fc74a6] mt-4 bg-black-200'> 
                    EntranceFee : {entranceFee} </div> 
                <br /> 



                <div className='font-bold text-center text-[#fc74a6] mt-4'> 
                    <strong>Current pot to win is 
                      ${balanceData? ethers.formatUnits(balanceData.value, balanceData.decimals) : "0"} {balanceData?.symbol} </strong></div>
                </div> 


                <div className='font-bold text-center text-[#fc74a6] mt-4'> 
                     <strong>Current number of players is {numberOfPlayers}</strong>   </div>
                <br /> 

                <div className='font-bold text-center justify-center  text-[#fc74a6] mt-4'> 
                    <strong>Most recent winner was wallet <br /> '{recentWinner}'</strong> </div> 
                <br /> 

                <div className='font-bold text-center text-[#fc74a6] justify-center mt-4'> 
                    You are interacting with the smart contract  '{raffleAddress}' <br /> 
                     on Chain ID {chain?.id} 
                     </div> 
                      
            
                </> 
                ) : (
                <div>... </div>    
                
                )} 
              
        </div> 
        
        );

    
} ; 
export default LotteryEntrance; 
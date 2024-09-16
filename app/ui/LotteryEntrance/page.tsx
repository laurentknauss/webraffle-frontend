
"use client";  

import { FC, useState, useEffect  } from 'react'; 

import { useWriteContract, UseWriteContractParameters, UseWriteContractReturnType, useReadContract, useBalance, useSimulateContract, useSwitchChain, useAccount, useWaitForTransactionReceipt } from 'wagmi'; 
import { toast , ToastContainer  } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; 
import { abi } from '@/app/abi';  
import { contractAddresses } from '@/app/contractAddresses'; 
import {  ethers, isError  } from 'ethers'; 
import Error from 'next/error';
import { config } from '@/app/config'; 


const LotteryEntrance:  FC = () => { 
    const { isConnected , chain} = useAccount(); 
    const [isLoading, setIsLoading] = useState(false); 
    
    
    const [isSuccess, setIsSuccess] = useState(false);

  const { writeContract , data: hash, isError } = useWriteContract(); 
  const {isLoading: isConfirming, isSuccess: isConfirmed} = useWaitForTransactionReceipt({ 
    hash, 
  }); 


    const handleWrite = async () => {
      if (!raffleAddress || !entranceFeeData) {
        toast.error("Contract address or entrance fee not available"); 
        return;
      }

      setIsLoading(true); 

      // Create a toast ID to update the same toast with the transaction status 
      const toastId = toast.info("starting transaction...",
        { autoClose: false, }); 

      
      try {
        await writeContract({
          abi: abi,
          address: raffleAddress,
          functionName: "enterRaffle",
                    value: entranceFeeData,
        } );

        toast.update(toastId, {
          type: "info",
          render: "Transaction sent , awaiting confirmed on the chain",
          autoClose: false,
        }); 




        toast.update(toastId, {
          type: "success",
          render: "Transaction confirmed on the chain",
          autoClose: 5000, // toasr cloas after 5 seconds 
        })
      
        
      } catch (error) {
          console.error("Transaction Error:", error);
          toast.update(toastId, { 
            type: "error",
            render: "Transaction failed. Please try again",
            autoClose: 5000,
          });

      } finally {
          setIsLoading(false);
      }
  };

    
    
    
    
    
    
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

//  const [error, setError] = useState<string | null>(null) 



// View Functions
const { data: balanceData  } = useBalance({
  address : raffleAddress, 
}); 

const { data: contractStateData } = useSimulateContract({
  abi: abi,
  address: raffleAddress,
  functionName: "getContractState",
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



    

    // Wait for transaction receipt
    //Hook that waits for the transaction to be included on a block, and then returns the transaction receipt.
    // If the transaction reverts, then the action will throw an error.
    //const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
      //  hash: writeData,
    //});










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
                    
                    <button className="text-white font-bold mx-4 mb-10 py-4 px-8 rounded-full"
                      style={{  background: 'linear-gradient(175deg, #ff7e5f 0%, #00d2ff 100%)', }}
                      onClick={handleWrite} 
                      disabled={isLoading || isConfirming}  
                        > 
                        {isLoading ? 'Submitting...' : 
                         isConfirming ? 'Confirming...' : 'Play Lottery ! '}
                          </button>
                          <div className="text-white ">
                       {isError && <p> Error entering the lottery! </p>}    
                      {isConfirmed  && <p className='text-pink'> Successfully entered the lottery! </p>} 



             <div className="flex text-white  flex-col items-center ml-10 mr-12 mt-4 bg-[#0a0a0a]">
                
                
                <div className='font-bold text-center text-white mt-4 bg-black-200'> 
                    EntranceFee : {entranceFee} </div> 
                <br /> 



                <div className='font-bold text-center mt-4'> 
                    current pot to win is  ${balanceData? ethers.formatUnits(balanceData.value, balanceData.decimals) : "0"} {balanceData?.symbol} </div>
                </div> 


                <div className='font-bold text-center mt-4'> 
                     current number of players is {numberOfPlayers}   </div>
                <br /> 

                <div className='font-bold text-center mt-4'> 
                    most recent winner was wallet {recentWinner} </div> 
                <br /> 

                <div className='font-bold text-center justify-center mt-4'> 
                    You are interacting with contract  {raffleAddress} <br /> 
                     on chain id {chain?.id} 
                     </div> 
                      </div> 
                
                </> 
                ) : (
                <div>prout </div>    
                
                )} 
                <ToastContainer /> 
        </div> 
        
        );

    
} ; 
export default LotteryEntrance; 
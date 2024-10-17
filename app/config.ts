

'use client'

import { http, createConfig}  from 'wagmi' 
import { uniswapWallet, ledgerWallet, coreWallet, metaMaskWallet, rainbowWallet, walletConnectWallet, safeWallet, trustWallet  } from '@rainbow-me/rainbowkit/wallets';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';

import { sepolia, avalancheFuji, polygonAmoy } from 'wagmi/chains'; 




const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended', 
      wallets: [coreWallet, metaMaskWallet, uniswapWallet, rainbowWallet, ledgerWallet, walletConnectWallet,  safeWallet, trustWallet], 
    },  
  ], 
{ appName: 'Decentralized Lottery', 
 projectId : '79d26d2584924ff79c6ef63bb76113f6' },

); 


export const config = createConfig({
  chains: [sepolia, avalancheFuji , polygonAmoy], 
  connectors,
  transports: { 
    [sepolia.id]: http('https://sepolia.infura.io/v3/79d26d2584924ff79c6ef63bb76113f6'),
    [avalancheFuji.id]: http('https://avalanche-fuji.infura.io/v3/79d26d2584924ff79c6ef63bb76113f6'),
    [polygonAmoy.id]: http('https://polygon-amoy.infura.io/v3/79d26d2584924ff79c6ef63bb76113f6')

  }
});





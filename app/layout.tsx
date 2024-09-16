
'use client'

import '@/app/ui/global.css'
import { RainbowKitProvider, Chain, darkTheme, midnightTheme } from "@rainbow-me/rainbowkit"; 
import { WagmiProvider} from 'wagmi';
import {ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { config } from '@/app/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Inter } from 'next/font/google' ; 


const avalanche = {
  id: 43_113,
  name: 'Avalanche',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain;




const queryClient = new QueryClient(); 
const inter = Inter({
   subsets: ['latin'], 
    weights: [500, 800],
    display: 'swap', 
    preload: true,
}); 
   export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex`}>
        <QueryClientProvider client={queryClient}> 
         <WagmiProvider config={config}> 
              <RainbowKitProvider 
              modalSize="compact"
              locale="en-US"
              theme={midnightTheme({
              accentColor: '#fc74a6',
              overlayBlur: 'large',
              accentColorForeground: 'black',
              borderRadius: 'large',
              fontStack: 'system' ,
              })}
              initialChain={11155111}>  

              {/* Toast container for notifications */} 
              <ToastContainer 
              position="top-center"           
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              theme='colored'
              

              />
              

                             
        
        
        <div className="flex-grow"> {children} </div>
      
        </RainbowKitProvider>
         </WagmiProvider> 
        </QueryClientProvider>
              </body>
    </html>
  );
}

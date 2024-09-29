
'use client'

import { GoogleAnalytics } from '@next/third-parties/google'; 
import '@/app/ui/global.css'
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client'; 

import { RainbowKitProvider, Chain, midnightTheme } from "@rainbow-me/rainbowkit"; 
import { WagmiProvider} from 'wagmi';
import { config } from '@/app/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Inter } from 'next/font/google' ; 
import { create } from 'domain';
import { createClient } from 'viem';


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
  
/*
const client = createClient({ 
  uri: 'https://api.studio.thegraph.com/query/89842/raffle/version/latest',
  
});
*/
const client = new ApolloClient({ 
  uri: 'https://api.studio.thegraph.com/query/89842/raffle/version/latest',
  cache: new InMemoryCache(), 
}); 

      
      
      
      const queryClient = new QueryClient(); 
      
      const inter = Inter({
         subsets: ['latin'], 
          weight: ["500", "800"],
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
                <ApolloProvider client={client}>   
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
                              initialChain={43113}>  
                  
                      
                        
                                        
                      <div className="flex-grow"> {children} </div>
               
                                </RainbowKitProvider>
                                </WagmiProvider> 
                                </ApolloProvider> 
                                </QueryClientProvider>
                                      
                                    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''} /> 
                                            </body>
                                  
    </html>
  );
}

      
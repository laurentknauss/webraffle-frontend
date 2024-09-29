'use client'; 

import React from 'react';
import '@/app/ui/global.css';
import { Inter  } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'], 
     weight: ["500", "800"],
     display: 'swap', 
     preload: true,
 }); 

 
 
 const Footer = () => {
   return (
     <footer className={`w-full ${inter.className} bg-transparent text-white m-10`}>
       <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col justify-center items-center py-6">
           <p className="text-sm">
             Crafted by{' '}
             <a href="https://knauss.dev" className="text-white hover:underline">
               <strong>Laurent Knauss</strong>
             </a>{' '}
             Blockchain engineer
             <br />
        
           </p>
         </div>
       </div>
     </footer>
   );
 };
 


export default Footer;
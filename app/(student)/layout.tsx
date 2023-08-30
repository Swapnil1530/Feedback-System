import "@/styles/globals.css";


import { Toaster } from "react-hot-toast";
import Header from "../../components/Navbar/header";

import { Analytics } from "@vercel/analytics/react";

import NextAuthProvider from "../provider";
import React from "react";

export default async function HomeLayout({children,}: {children: React.ReactNode;}) {
  return (
    <NextAuthProvider>
      <Header />
      <Toaster />
      <div className="flex items-center justify-center ">
       
          {children}
        
      </div>
      <Analytics />
    </NextAuthProvider>
  );
}

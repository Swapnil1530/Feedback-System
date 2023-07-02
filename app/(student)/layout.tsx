import "@/styles/globals.css";
import { ThemeProvider } from "../../components/theme-provider";

import { Toaster } from "react-hot-toast";
import Header from "../../components/Navbar/header";

import { Analytics } from "@vercel/analytics/react";

import NextAuthProvider from "../provider";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <Header />
      <Toaster />
      <div className="flex items-center justify-center ">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </div>
      <Analytics />
    </NextAuthProvider>
  );
}

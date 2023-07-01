import "@/styles/globals.css";

import Nav from '../../../components/admin-nav';
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Toaster />
    <Nav />
    {children}
    </>
    
  )
}
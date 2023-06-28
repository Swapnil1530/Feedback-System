import "@/styles/globals.css";
import NextAuthProvider from "./provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
  <html>
     <NextAuthProvider>
    <body>
  {children}
  </body>
  </NextAuthProvider>
  </html>
  )
}
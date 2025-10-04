import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import {ConvexClientProvider} from "./ConvexClientProvider";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { shadesOfPurple} from '@clerk/themes'
import Header from "@/components/header";

const inter = Inter({subsets:["latin"]})

export const metadata = {
  title: "AI Content Platform",
  description: "Content Creation powered by AI",
};

export default function RootLayout({ children }) {
  return (
     <ClerkProvider 
      appearance={{
        baseTheme:shadesOfPurple,
      }}
     >
    <html lang="en"  suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ConvexClientProvider>
            <Header/>
            <main className="bg-slate-900 min-h-screen text-white overflow-x-hidden">

            {children}
            </main>
            </ConvexClientProvider>
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}

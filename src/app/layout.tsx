import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import { Header, Sidebar } from "@/components";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "AI notion clone",
  description: "App from youtube course",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-4 bg-gray-100 scrollbar-hide">
              {children}
            </div>
          </div>
          <Toaster position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}

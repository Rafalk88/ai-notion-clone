import "./globals.css";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import { Header } from "@/components";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`
  },
  description: `${siteConfig.description}`,
  keywords: ["AI", "clone", "youtube", "Next.js", "React", "Shadcn", "TailwindCSS", "Sony Sangha"],
  authors: [
    { name: "Sony Sangha", url: "https://www.youtube.com/watch?v=cso7-4oAPNQ&t=16772s"},
    { name: "Rafał Kochanecki", url: "https://github.com/rafalk88" }
  ],
  creator: "Rafał Kochanecki",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png"
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

interface RootLayoutProps {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
        )}>
          <Header />
          <div className="w-full md:max-w-[1200px] mx-auto pt-6 scrollbar-hide">
            {children}
          </div>
          <Toaster position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
};

"use client"
import type { ReactNode } from "react";
import { LiveblocksProvider } from "@liveblocks/react/suspense";

export default function LiveBlockProvider({ children }: { children: ReactNode}) {
  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
    throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY is not set");
  }

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={"/auth-endpoint"}
    >
      {children}
    </LiveblocksProvider>
  )
}

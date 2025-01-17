"use client"
import type { ReactNode } from "react";
import { LiveblocksProvider } from "@liveblocks/react/suspense";
import { env } from "../../../env.mjs";

export default function LiveBlockProvider({ children }: { children: ReactNode}) {
  if (!env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
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

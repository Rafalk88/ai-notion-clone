"use client"
import type { ReactNode } from "react";
import { 
  RoomProvider as RoomProviderWrapper,
  ClientSideSuspense,
} from "@liveblocks/react";
import { LiveCursorProvider, LoadingSpinner } from "@/components";

export default function RoomProvider({ roomId, children}: { roomId: string; children: ReactNode }) {
  return (
    <RoomProviderWrapper
      id={roomId}
      initialPresence={{
        cursor: null
      }}
    >
      <ClientSideSuspense
        fallback={<LoadingSpinner />}
      >
        <LiveCursorProvider>
          {children}
        </LiveCursorProvider>
      </ClientSideSuspense>
    </RoomProviderWrapper>
  )
}

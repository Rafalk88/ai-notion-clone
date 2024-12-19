"use client"
import { ReactNode, PointerEvent,  useCallback } from "react";
import { useMyPresence, useOthers } from "@liveblocks/react";
import { FollowPointer } from "@/components";

export default function LiveCursorProvider({ children}: { children: ReactNode }) {
  const [myPresence, upgradeMyPresence] = useMyPresence();
  const others = useOthers();

  const handlePointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    //! Don't use ClientX and ClientY to not break full page cursor tracking
    const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY)};
    upgradeMyPresence({ cursor });
  }, []);

  const handlePointerLeave = useCallback(() => {
    upgradeMyPresence({ cursor: null });
  }, []);

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {
        others
          .filter((other) => other.presence.cursor !== null)
          .map(({ connectionId, presence, info }) => (
            <FollowPointer
              key={connectionId}
              info={info}
              x={presence.cursor!.x}
              y={presence.cursor!.y}
            />
          ))
      }

      {children}
    </div>
  )
}

import type { ReactNode } from "react";
import { auth } from "@clerk/nextjs/server"
import { RoomProvider } from "@/components";

export default async function DocLayout({ 
  children, 
  params: { id }
}: { 
  children: ReactNode;
  params: { id: string };
}) {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  return (
    <RoomProvider roomId={id}>{children}</RoomProvider>
  )
}

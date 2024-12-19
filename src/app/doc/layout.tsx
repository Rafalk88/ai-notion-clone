import type { ReactNode } from "react"
import { LiveBlockProvider } from "@/components"

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <LiveBlockProvider>
      {children}
    </LiveBlockProvider>
  )
}

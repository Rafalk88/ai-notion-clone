"use client"

import { useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";

import { SignedOut, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRequestADemo = useCallback(() => {
      router.push("/")
    }, [router])

  return (
    <main>
      <div className="flex">
        <div className="w-1/2 flex flex-col justify-between">
          <h1 className="text-6xl font-semibold">The happier workspace</h1>
          <h2 className="text-xl w-3/4">Write. Pan. Collaborate. With a little help from AI.</h2>

          <div className="flex gap-2">
            <SignedOut>
              <SignUpButton>
                <Button
                  className="bg-[#0582FF]"
                  disabled={isPending}
                  size="sm"
                >
                  { isPending ? "Signing..." : "Get Notion-clone free"}
                </Button>
              </SignUpButton>
              <Button
                className="bg-[#EBF5FE] hover:bg-[#d4dde5] text-[#087FE7]"
                disabled={isPending}
                variant="secondary"
                size="sm"
                onClick={handleRequestADemo}
              >
                { isPending ? "Requesting..." : "Request a demo"}
              </Button>
            </SignedOut>
          </div>

          <div>
            <p className="text-gray-400">Trusted by teams at</p>
            <Image
              src="/assets/trusted.png"
              alt="trusted companies"
              width={300}
              height={150}
            />
          </div>
        </div>
        <Image
          src="/assets/hero.png"
          alt="hero image"
          width={800}
          height={800}
        />
      </div>
      
    </main>
  );
}

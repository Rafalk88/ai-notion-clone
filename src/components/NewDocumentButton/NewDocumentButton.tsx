"use client"
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { createNewDocument } from "@/../actions/actions";

export default function NewDocumentButton({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const { docId } = await createNewDocument()
      router.push(`/doc/${docId}`)
    });
  }

  return (
    <Button
      className={className}
      onClick={handleCreateNewDocument}
      disabled={isPending}
    >
      { isPending ? "Creating..." : "New Document"}
    </Button>
    
  )
}

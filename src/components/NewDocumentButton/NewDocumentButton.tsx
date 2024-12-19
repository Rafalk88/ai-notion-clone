"use client"
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { createNewDocument } from "@/../actions/actions";
import { toast } from "sonner";

export default function NewDocumentButton({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = () => {
    try {
      startTransition(async () => {
        const { docId } = await createNewDocument()
        router.push(`/doc/${docId}`)
        toast("New Document created successfully")
      });
    } catch (error) {
      console.error("Failed to create new document", error);
      toast("Uh oh! Something went wrong.", {
        description: "Failed to create new document",
        action: {
          label: 'Try again',
          onClick: handleCreateNewDocument
        }
      });
    }
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

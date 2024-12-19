"use client"
import { useCallback, useState, useTransition } from "react"
import { usePathname, useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { toast } from "sonner"
import { deleteDocument } from "@/../actions/actions";


export default function DeleteDocument() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const handleDelete = useCallback(async () => {
    const roomId = pathname.split("/").pop();
    if(!roomId) return;
    
    startTransition(async () => {
      try {
        const { success } = await deleteDocument(roomId);

        if (success) {
          setIsOpen(false);
          router.replace("/")
          toast("Room Deleted successfully")
        } else {
          toast("Uh oh! Something went wrong.", {
            description: "There was a problem with your request.",
            action: {
              label: 'Try again',
              onClick: handleDelete
            }
          })
        }
      } catch (error) {
        console.error("Failed to delete room", error)
        toast("Uh oh! Something went wrong.", {
          description: "There was a problem with your request.",
        })
      }
    });
  }, [pathname, router]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline" color="destructive">
        <DialogTrigger>
          Delete Account
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure to delete?</DialogTitle>
          <DialogDescription>
            This will delete the document and all its contents, removing all users from deo ducument.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm: justify-end gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

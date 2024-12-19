"use client"
import { FormEvent, useCallback, useState, useTransition } from "react"
import { usePathname } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner"
import { inviteUserToDocument } from "@/../actions/actions";


export default function InviteUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const handleInvite = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    const roomId = pathname.split("/").pop();
    if(!roomId) return;

    startTransition(async () => {
      try {
        const { success } = await inviteUserToDocument(roomId, email);

        if (success) {
          setIsOpen(false);
          setEmail('');
          toast("User Added to Room successfully")
        } else {
          toast("Uh oh! Something went wrong.", {
            description: "There was a problem with your request.",
            action: {
              label: 'Try again',
              onClick: handleInvite
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
  }, [email, pathname]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline" color="destructive">
        <DialogTrigger>Invite</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite User to collaborate!</DialogTitle>
          <DialogDescription>
            Enter the email of the user you want to invite.
          </DialogDescription>
        </DialogHeader>
        <form 
          onSubmit={handleInvite}
          className="flex gap-2"
        >
          <Input
            className="w-full"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            disabled={!email || isPending}
          >
            {isPending ? "Inviting..." : "Invite"}
          </Button>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client"
import { useCallback, useState, useTransition } from "react"
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";

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
import { removeUserFromDocument } from "@/../actions/actions";
import { useOwner } from "@/lib/hooks";
import { db } from "@/../firebase";


export default function ManageUsers() {
  const { user } = useUser();
  const room = useRoom();
  const isOwner = useOwner();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  )

  const handleDelete = useCallback((userId: string) => {
    if (!user) return;

    startTransition(async () => {
      try {
        const { success } = await removeUserFromDocument(room.id, userId);
        if (success) {
          toast("User removed successfully");
        } else {
          toast("Uh oh! Something went wrong.", {
            description: "There was a problem with your request."
          });
        }
      } catch (error) {
        console.error("Failed to remove user", error);
        toast("Uh oh! Something went wrong.", {
          description: "There was a problem with your request.",
        });
      }
    })
  }, [room.id, user]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline" color="destructive">
        <DialogTrigger className="font-bold">Users ({usersInRoom?.docs.length})</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Users with Access</DialogTitle>
          <DialogDescription>
            Below is a list of users who have access to this document.
          </DialogDescription>
        </DialogHeader>

        <hr className="my-2" role="separator" />

        <div className="flex flex-col space-y-2">
          {
            usersInRoom?.docs.map((doc) => (
              <div key={doc.data().userId} className="flex items-center justify-between">
                <p className="font-light">
                  {
                    doc.data().userId === user?.emailAddresses[0].toString() ? (
                      `You (${doc.data().userId})`
                    ) : (
                      doc.data().userId
                    )
                  }
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline">{doc.data().role}</Button>
                  {
                    isOwner && 
                    doc.data().userId !== user?.emailAddresses[0].toString() && (
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(doc.data().userId)}
                        disabled={isPending}
                        size="sm"
                      >
                        {isPending ? "Removing..." : "X"}
                      </Button>
                    )
                  }
                </div>
              </div>
            ))
          }
        </div>
        <DialogFooter className="sm: justify-end gap-2">
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { FormEvent, useState, useTransition, useEffect, useCallback } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/../firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { DeleteDocument, Editor, InviteUser } from "@/components";
import { useOwner } from "@/lib/hooks";
import { toast } from "sonner";

export default function Document({ id }: { id: string }) {
  const [data] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState('');
  const [isUpdating, startTransition] = useTransition();
  const updateTitle = useCallback((e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        try {
          await updateDoc(doc(db, "documents", id), {
            title: input,
          })
          toast("Title changed successfully");
        } catch (error) {
          console.error("Failed to change title", error)
          toast("Uh oh! Something went wrong.", {
            description: "There was a problem with your request.",
            action: {
              label: 'Try again',
              onClick: updateTitle
            }
          })
        }
      });
    } else {
      toast("Uh oh! Something went wrong.", {
        description: "There was a problem with your request.",
        action: {
          label: 'Try again',
          onClick: updateTitle
        }
      })
    }
  }, [id, input]);
  const isOwner = useOwner()

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data])

  return (
    <section className="flex-1 h-full bg-white p-5">
      <div className="flex max-w-6xl mx-auto justify-between">
        <form className="flex flex-1 space-x-2">
          {/* update title... */}
          <Input value={input} onChange={(e) => setInput(e.target.value)}/>

          <Button
            disabled={isUpdating}
            type="submit"
            onClick={updateTitle}
          >
            {isUpdating ? "Updating..." : "Update"}
          </Button>

          {/* if statement */}
          {
            isOwner && (
              <>
                {/* isOwner && InviteUser, DeleteDocument */}
                <InviteUser />
                <DeleteDocument />
              </>
            )
          }
        </form>
      </div>
      <div>
        {/* ManageUsers */}

        {/* Avatars */}
      </div>

      <hr className="pb-10" />

      {/* Collaborative Editor */}
      <Editor />
    </section>
  )
}

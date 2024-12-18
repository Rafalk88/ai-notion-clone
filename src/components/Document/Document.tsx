"use client"

import { FormEvent, useState, useTransition, useEffect, useCallback } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/../firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

export default function Document({ id }: { id: string }) {
  const [data] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState('');
  const [isUpdating, startTransition] = useTransition();

  const updateTitle = useCallback((e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        })
      });
    }
  }, [id, input]);

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data])

  return (
    <section>
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
          {/* isOwner && InviteUser, DeleteDocument */}
        </form>
      </div>
      <div>
        {/* ManageUsers */}

        {/* Avatars */}
      </div>

      {/* Collaborative Editor */}
    </section>
  )
}

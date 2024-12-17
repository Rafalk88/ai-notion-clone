'use client'
import { useState, useEffect, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import { collectionGroup, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { MenuIcon } from "lucide-react";

import type { DocumentData } from "firebase/firestore";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NewDocumentButton } from "@/components";
import { db } from "@/../firebase";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: 'owner' | 'editor';
  roomId: string;
  userId: string;
}

type GroupedData = {
  owner: RoomDocument[];
  editor: RoomDocument[];
}

export default function Sidebar() {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<GroupedData | null>(null);
  const emailAddress = user?.emailAddresses[0]?.toString()
  const [data, loading, error] = useCollection(
    user && (
      query(collectionGroup(db, "rooms"), where('userId', '==', emailAddress))
    )
  );

  const menuOptions = useMemo(() => (
    <>
      {groupedData?.owner.length === 0 ? (
        <h2 className="text-gray-500 font-semibold text-sm">
          No documents found
        </h2>
      ) : (
        <>
          <h2 className="text-gray-500 font-semibold text-sm">
            My Documents
          </h2>
          {groupedData?.owner.map(doc => (
            <p key={doc.id}>{doc.roomId}</p>
            //<SidebarOption
            //  key={doc.id}
            //  id={doc.id}
            //  href={`/doc/${doc.id}`}
            ///>
          ))}
        </>
      )}
    </>
  ), [groupedData]);

  useEffect(() => {
    if(!data) return;

    const grouped = data.docs.reduce<GroupedData>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;

        if (roomData.role === 'owner') {
          acc.owner.push({
            id: curr.id,
            ...roomData
          })
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData
          })
        }

        return acc;
      }, {
        owner: [],
        editor: []
      });

      setGroupedData(grouped)
  }, [data])

  return (
    <aside className="p-2 md:p-5 bg-gray-200 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon
              className="p-2 hover:opacity-30 rounded-lg"
              size={40}
            />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex p-4 flex-col space-y-4 md:max-w-36">
              <NewDocumentButton />
              {menuOptions}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <NewDocumentButton className="hidden md:inline" />
      <div className="hidden md:flex p-4 flex-col space-y-4 md:max-w-36">
        {menuOptions}
      </div>
    </aside>
  )
}

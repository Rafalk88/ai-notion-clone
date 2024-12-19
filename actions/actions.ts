"use server"

import { auth } from "@clerk/nextjs/server"
import { adminDb } from "../firebase-admin";
import { liveblocks } from "@/lib/liveblocks";

export async function createNewDocument() {
  const { sessionClaims, userId, redirectToSignIn } = await auth()

  if (!userId) return redirectToSignIn();

  const documentCollectionRef = adminDb.collection("documents");
  const documentRef = await documentCollectionRef.add({
    title: "New Doc",
  });

  await adminDb
    .collection("users")
    .doc(sessionClaims?.email)
    .collection("rooms")
    .doc(documentRef?.id)
    .set({
      userId: sessionClaims?.email,
      role: 'owner',
      createdAt: new Date(),
      roomId: documentRef.id
    })

  return { docId: documentRef.id };
};

export async function deleteDocument(roomId: string) {
  const { userId, redirectToSignIn } = await auth()

  if (!userId) return redirectToSignIn();

  try {
    //* step 1 - delete the doc ref itself
    await adminDb.collection("documents").doc(roomId).delete();
    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();

    const batch = adminDb.batch();

    //* step 2 - delete the room ref in the user's collection from every user in the room
    query.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    batch.commit();

    //* step 3 - delete the room from liveblocks
    await liveblocks.deleteRoom(roomId);

    return { success: true }
  } catch (error) {
    console.error("Error on deleting document", error)
    return { success: false };
  }
}
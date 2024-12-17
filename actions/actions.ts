"use server"

import { auth } from "@clerk/nextjs/server"
import { adminDb } from "../firebase-admin";

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
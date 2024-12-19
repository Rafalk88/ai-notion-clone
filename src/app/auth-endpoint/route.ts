import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { liveblocks } from "@/lib/liveblocks";
import { adminDb } from "./../../../firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const { sessionClaims, userId, redirectToSignIn } = await auth();

    if (!userId) return redirectToSignIn();

    const body = await req.json();
    const { room } = body;

    if (!room) {
      return new NextResponse("Room parameter is required", { status: 400 });
    }

    const session = liveblocks.prepareSession(sessionClaims?.email, {
      userInfo: {
        fullname: sessionClaims?.fullname || "Unknown User",
        email: sessionClaims?.email || "",
        avatar: sessionClaims?.image || "",
      },
    });

    const usersInRoom = await adminDb
      .collectionGroup("rooms")
      .where("userId", "==", sessionClaims.email)
      .get();

    const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

    if (userInRoom?.exists) {
      session.allow(room, session.FULL_ACCESS);

      const { body, status } = await session.authorize();

      return new NextResponse(body, { status });
    } else {
      return new NextResponse("User not found in room", { status: 404 });
    }
  } catch (error) {
    console.error("Error in Liveblocks auth endpoint:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

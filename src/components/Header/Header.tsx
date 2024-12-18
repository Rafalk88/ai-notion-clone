"use client"

import { SignedOut, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";

export default function Header() {
  const { user } = useUser();
  return (
    <header className="flex items-center justify-between p-5">
      {user && (
        <h1 className="text-2xl">
          {user?.firstName}
          {`'s`} Space
        </h1>
      )}
      <Breadcrumbs />
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}

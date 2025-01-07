"use client"

import React from "react";
import { SignedOut, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Logo } from "./Logo"
import { ListItem } from "./ListItem";
import { OutlinedIcon } from "./OutlinedIcon";

import { BotIcon, BookText, BookOpen, Target } from "lucide-react";

export interface NavMenuComponent {
  title: string;
  description: string;
  href: string;
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
};

const navMenuContent: NavMenuComponent[] = [
  { title: "AI", description : "Integrated AI assistant", href:"/", beforeIcon: <OutlinedIcon><BotIcon /></OutlinedIcon> },
  { title: "Docs", description: "Simple & Powerful", href:"/docs", beforeIcon: <OutlinedIcon><BookText /></OutlinedIcon> },
  { title: "Wikis", description: "Centralize Your knowledge", href:"/wikis", beforeIcon: <OutlinedIcon><BookOpen /></OutlinedIcon> },
  { title: "Projects", description: "For every team or sizes", href:"/projects", beforeIcon: <OutlinedIcon><Target /></OutlinedIcon> },
]

export default function Header() {
  const { user } = useUser();
  return (
    <header className="flex items-center justify-between p-5">
      <div className="flex items-center gap-6">
        <Logo />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] px-1 py-2">
                  {
                    navMenuContent.map(link => (
                      <ListItem
                        key={link.href}
                        title={link.title}
                        href={link.href}
                        beforeIcon={link.beforeIcon}
                      >
                        {link.description}
                      </ListItem>
                    ))
                  }
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {user && (
        <>
          <h1 className="text-2xl">
            {user?.firstName}
            {`'s`} Space
          </h1>
          <Breadcrumbs />
        </>
      )}

      <div>
        <SignedOut>
          <SignInButton>
            <button>Log In</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}

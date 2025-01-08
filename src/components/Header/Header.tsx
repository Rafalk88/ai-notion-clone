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
  NavigationMenuViewport
} from "@/components/ui/navigation-menu";
import navMenuData from "./navMenuData.json"

import { Logo } from "./Logo"
import { ListItem } from "./ListItem";
import { OutlinedIcon } from "./OutlinedIcon";

import {
  BotIcon,
  BookText,
  BookOpen,
  Target, 
  Calendar1,
  Mail,
  Globe,
  TextCursorInput,
  Store,
  Workflow
} from "lucide-react";

const mapIcon = (iconName: string): React.ReactNode => {
  const icons: Record<string, React.ReactNode> = {
    BotIcon: <OutlinedIcon><BotIcon /></OutlinedIcon>,
    BookText: <OutlinedIcon><BookText /></OutlinedIcon>,
    BookOpen: <OutlinedIcon><BookOpen /></OutlinedIcon>,
    Target: <OutlinedIcon><Target /></OutlinedIcon>,
    Calendar1: <OutlinedIcon><Calendar1 /></OutlinedIcon>,
    Mail: <OutlinedIcon><Mail /></OutlinedIcon>,
    Globe: <OutlinedIcon><Globe /></OutlinedIcon>,
    TextCursorInput: <OutlinedIcon><TextCursorInput /></OutlinedIcon>,
    Store: <OutlinedIcon><Store /></OutlinedIcon>,
    Workflow: <OutlinedIcon><Workflow /></OutlinedIcon>,
  };

  if (!icons[iconName]) {
    console.warn(`Icon "${iconName}" not found in lucide-react.`);
    return null;
  };

  return icons[iconName];
};

export default function Header() {
  const { user } = useUser();
  return (
    <header className="flex items-center justify-between p-5">
      <div className="flex items-center gap-6">
        <Logo />
        <NavigationMenu>
          <NavigationMenuList>
            {navMenuData.navMenu.map((menu) => {
              const subMenu = navMenuData.navMenuItems.find(
                (item) => item.parentId === menu.id
              );

              return (
                <NavigationMenuItem key={menu.id}>
                  <NavigationMenuTrigger>{menu.title}</NavigationMenuTrigger>
                  {subMenu && (
                    <NavigationMenuContent>
                      <ul className="grid w-[300px] px-1 py-2">
                        {subMenu.content.map((link) => (
                          <ListItem
                            key={link.id}
                            title={link.title}
                            href={link.href}
                            beforeIcon={mapIcon(link.beforeIcon)}
                            isComingSoon={true}
                          >
                            {link.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  )}
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
          <NavigationMenuViewport className="rounded-sm border-gray-100 shadow-sm" />
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

"use client"

import React, { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignedOut, SignedIn, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
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
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const handleRequestADemo = useCallback(() => {
    router.push("/")
  }, [router])

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

              if (!subMenu) {
                return (
                  <NavigationMenuItem key={menu.id}>
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        {menu.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              }

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

      <div className="flex gap-3 items-center">
        <SignedOut>
            <Button
              className="rounded-sm"
              disabled={isPending}
              variant="ghost"
              size="sm"
              onClick={handleRequestADemo}
            >
              { isPending ? "Requesting..." : "Request a demo"}
            </Button>
          <div className="w-[1px] h-[1.5rem] bg-gray-200" role="separator" />
          <SignInButton>
            <Button
              className="rounded-sm"
              disabled={isPending}
              variant="ghost"
              size="sm"
            >
              { isPending ? "Logging..." : "Log In"}
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button
              className="rounded-sm"
              disabled={isPending}
              size="sm"
            >
              { isPending ? "Signing..." : "Get Notion-clone free"}
            </Button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}

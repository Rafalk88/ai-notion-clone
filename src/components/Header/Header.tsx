"use client"

import React from "react";
import { SignedOut, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { Logo } from "./Logo"
import { cn } from "@/lib/utils";

import { BotIcon, BookText, BookOpen, Target } from "lucide-react";

interface NavMenyComponent {
  title: string;
  description: string;
  href: string;
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
};

type CustomProps = Pick<NavMenyComponent, "beforeIcon" | "afterIcon">;

const navMenuContent: NavMenyComponent[] = [
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

function OutlinedIcon(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, children, ...rest } = props

  return (
  <div
    className={cn(
      "select-none p-1 no-underline rounded-md border-1 bg-white",
      className
    )}
    aria-roledescription="Icon container"
    {...rest}
  >
    {children}
  </div>
  )
}
OutlinedIcon.displayName = "OutlinedIcon"

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & CustomProps
>(({ className, title, children, beforeIcon, afterIcon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex items-center p-2 gap-2 select-none rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          {beforeIcon}
          <div>
            <h3 className="text-sm font-medium leading-none">{title}</h3>
            <p className="text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
          {afterIcon}
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
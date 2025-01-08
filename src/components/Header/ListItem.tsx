import React from 'react';
import {
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { FutureFeature } from "./FutureFeature";
import { cn } from "@/lib/utils";

type CustomProps = {
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
  isComingSoon?: boolean;
};

export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & CustomProps
>(({ className, title, children, beforeIcon, afterIcon, isComingSoon, ...props }, ref) => {
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
            <div className="flex gap-1 items-center">
              <h3 className="text-sm font-medium leading-none">{title}</h3>
              {
                isComingSoon && (
                  <FutureFeature>
                    Coming Soon
                  </FutureFeature>
                )
              }
            </div>
            <p className="text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
          {afterIcon}
        </a>
      </NavigationMenuLink>
    </li>
  )
});

ListItem.displayName = "ListItem"
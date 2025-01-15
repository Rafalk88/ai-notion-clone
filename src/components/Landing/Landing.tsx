"use client"

import { useMemo } from "react";
import Image from "next/image";

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Hero } from "./Hero";
import { icons } from "lucide-react";
import { LucideIcon } from "@/lib/LucideIcon"

import navMenuData from "@/components/Header/navMenuData.json"

type ProductItem = {
  id: number;
  title: string;
  description?: string;
  href: string;
  beforeIcon?: keyof typeof icons;
  afterIcon?: keyof typeof icons;
}

export function Landing() {
  
  const productCategory = useMemo(() => navMenuData.navMenu.find((item) => item.id === 1), []);
  const productItems: ProductItem[] = useMemo(() => {
    return navMenuData.navMenuItems.find(
      (menu) => menu.parentId === productCategory?.id)?.content || []
  }, [productCategory?.id]);

  return (
    <main>
      <Hero />

      <section className="pt-10 flex flex-col items-center gap-4">
        <Image
          src="/assets/menusample.png"
          alt="menusample image"
          width={900}
          height={900}
        />

        <Menubar className="border-none space-x-2">
            {
              productItems.map(item => (
                <MenubarMenu key={item.id}>
                  <MenubarTrigger className="border rounded-md px-3 py-1 cursor-pointer gap-1 hover:bg-accent">
                  {item.beforeIcon ? (
                    <LucideIcon name={item.beforeIcon} />
                  ) : null}
                  {item.title}
                  {item.afterIcon ? (
                    <LucideIcon name={item.afterIcon} />
                  ) : null}
                  </MenubarTrigger>
                </MenubarMenu>
              ))
            }
        </Menubar>
      </section>
    </main>
  )
}

"use client"

import React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { LucideIcon } from "@/lib/LucideIcon"
import { icons } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { type CarouselApi } from "@/components/ui/carousel"

import { cn } from "@/lib/utils";
import navMenuData from "@/components/Header/navMenuData.json"

type ProductItem = {
  id: number;
  title: string;
  description?: string;
  href: string;
  beforeIcon?: keyof typeof icons;
  afterIcon?: keyof typeof icons;
}

export function HeroCarousel() {
  // CAROUSEL API
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  // END OF CAROUSEL API

  // CAROUSEL CUSTOM BUTTONS DATA
  const productCategory = React.useMemo(() => navMenuData.navMenu.find((item) => item.id === 1), []);
  const productItems: ProductItem[] = React.useMemo(() => {
    return navMenuData.navMenuItems.find(
      (menu) => menu.parentId === productCategory?.id)?.content || []
  }, [productCategory?.id]);

  React.useEffect(() => {
    if (!api) return;
  
    const onSelect = () => setCurrent(api.selectedScrollSnap());

    onSelect()

    api.on("select", onSelect);
  
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  //END OF CAROUSEL CUSTOM DATA

  const handleCarouselClick = React.useCallback((index: number) => {
    if (!api) return;

    api.scrollTo(index);
    api.reInit();

    setCurrent(index);
  }, [api]);

  const carouselItems = [
    { src: "/assets/menusample.png", alt: "menusample image" },
    { src: "/assets/menusample.png", alt: "menusample image" },
    { src: "/assets/menusample.png", alt: "menusample image" },
    { src: "/assets/menusample.png", alt: "menusample image" },
    { src: "/assets/menusample.png", alt: "menusample image" },
    { src: "/assets/menusample.png", alt: "menusample image" },
    { src: "/assets/menusample.png", alt: "menusample image" },
    { src: "/assets/menusample.png", alt: "menusample image" },
    { src: "/assets/menusample.png", alt: "menusample image" },
    { src: "/assets/menusample.png", alt: "menusample image" },
  ];

  return (
    <section className="pt-10 flex flex-col items-center gap-4">
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          align: "start",
        }}
        className="w-full max-w-[1200px] mx-auto"
      >
        <CarouselContent>
          {
            carouselItems.map((item, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1200}
                    height={800}
                  />
                </CarouselItem>
            ))
          }
        </CarouselContent>
      </Carousel>

      <Menubar className="border-none space-x-2">
        {
          productItems.map((item, index) => (
            <MenubarMenu key={item.id}>
              <MenubarTrigger
                className={cn(
                  "border rounded-md px-3 py-1 cursor-pointer gap-1 transition-colors duration-300",
                  {
                    "bg-accent text-accent-foreground focus:bg-accent focus:text-accent-foreground": current === index,
                    "hover:bg-accent hover:text-accent-foreground": current !== index,
                    "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground": current === index,
                  }
                )}
                data-state={current === index ? "open" : "closed"}
                aria-expanded={false}
                onClick={() => handleCarouselClick(index)}
              >
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
  )
}
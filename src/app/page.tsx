"use client"

import { useCallback, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";

import { SignedOut, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"

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
import navMenuData from "@/components/Header/navMenuData.json"

const mapIcon = (iconName: string): React.ReactNode => {
  const icons: Record<string, React.ReactNode> = {
    BotIcon: <BotIcon />,
    BookText: <BookText />,
    BookOpen: <BookOpen />,
    Target: <Target />,
    Calendar1: <Calendar1 />,
    Mail: <Mail />,
    Globe: <Globe />,
    TextCursorInput: <TextCursorInput />,
    Store: <Store />,
    Workflow: <Workflow />,
  };

  if (!icons[iconName]) {
    console.warn(`Icon "${iconName}" not found in lucide-react.`);
    return null;
  };

  return icons[iconName];
};

type ProductItem = {
  id: number;
  title: string;
  description?: string;
  href: string;
  beforeIcon?: string;
  afterIcon?: string
}

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const productCategory = useMemo(() => navMenuData.navMenu.find((item) => item.id === 1), []);
  const productItems: ProductItem[] = useMemo(() => {
    return navMenuData.navMenuItems.find(
      (menu) => menu.parentId === productCategory?.id)?.content || []
  }, [productCategory?.id]);

  const handleRequestADemo = useCallback(() => {
      router.push("/")
    }, [router])

  return (
    <main>
      <section className="flex">
        <div className="w-1/2 flex flex-col justify-between">
          <h1 className="text-6xl font-semibold">The happier workspace</h1>
          <h2 className="text-xl w-3/4">Write. Pan. Collaborate. With a little help from AI.</h2>

          <div className="flex gap-2">
            <SignedOut>
              <SignUpButton>
                <Button
                  className="bg-[#0582FF] hover:bg-[#0468cc]"
                  disabled={isPending}
                  size="sm"
                >
                  { isPending ? "Signing..." : "Get Notion-clone free"}
                </Button>
              </SignUpButton>
              <Button
                className="bg-[#EBF5FE] hover:bg-[#d4dde5] text-[#087FE7]"
                disabled={isPending}
                variant="secondary"
                size="sm"
                onClick={handleRequestADemo}
              >
                { isPending ? "Requesting..." : "Request a demo"}
              </Button>
            </SignedOut>
          </div>

          <div>
            <p className="text-gray-400">Trusted by teams at</p>
            <Image
              src="/assets/trusted.png"
              alt="trusted companies"
              width={300}
              height={150}
            />
          </div>
        </div>
        <Image
          src="/assets/hero.png"
          alt="hero image"
          width={800}
          height={800}
        />
      </section>

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
                    {item.beforeIcon ? mapIcon(item.beforeIcon) : null}
                    {item.title}
                    {item.afterIcon ? mapIcon(item.afterIcon) : null}
                  </MenubarTrigger>
                </MenubarMenu>
              ))
            }
        </Menubar>
      </section>
    </main>
  );
}

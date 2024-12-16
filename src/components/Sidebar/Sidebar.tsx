import { NewDocumentButton } from "@/components";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="p-2 md:p-5 bg-gray-200 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon
              className="p-2 hover:opacity-30 rounded-lg"
              size={40}
            />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div>
              <NewDocumentButton />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <NewDocumentButton className="hidden md:inline" />
    </aside>
  )
}

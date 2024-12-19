"use client"
import { useOthers, useSelf } from "@liveblocks/react/suspense";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Avatars() {
  const others = useOthers();
  const self = useSelf();

  const all = [self, ...others]

  return (
    <div className="flex gap-2 items-center">
      <p className="font-light text-sm text-gray-600">
        Users currently editing this page:
      </p>

      <div className="flex -space-x-5">
        {
          all.map((user, idx) => (
            <TooltipProvider key={`${user?.id}-${idx}`}>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar className="border-2 border-white hover:z-50">
                    <AvatarImage src={user?.info.avatar} />
                    <AvatarFallback>{user?.info.fullname}</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{self?.id === user?.id ? "You" : user?.info.fullname}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))
        }
      </div>
    </div>
  )
}

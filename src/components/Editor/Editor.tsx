"use client"
import { useRoom } from "@liveblocks/react/suspense";
import { useCallback, useEffect, useState } from "react";

import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

import { MoonIcon, SunIcon } from "lucide-react";



export default function Editor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev)
  }, [darkMode])

  {/*useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);

    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    }
  }, [room])

  if(!doc || !provider) {
    return null;
  }*/}

  return (
    <div className="max-w-6xl mx-auto ">
      <div className="flex items-center gap-2 justify-end mb-10">
        {/* Translate doc AI */}
        {/* ChatDocument AI */}
        {/* Dark mode */}
        <div className="flex gap-x-1">
          <Switch 
            id="dark-mode"
            checked={darkMode}
            onCheckedChange={toggleDarkMode}
            role="button"
          />
          <Label htmlFor="dark-mode">
            {darkMode ? (<SunIcon />) : (<MoonIcon />)}
          </Label>
        </div>
      </div>

      {/* Block Note */}
      {/*<BlockNote doc={doc} provider={provider} darkMode={darkMode} />*/}
    </div>
  )
}

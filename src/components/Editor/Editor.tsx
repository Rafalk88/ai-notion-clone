"use client"
import { useMemo } from "react";
import { useRoom } from "@liveblocks/react/suspense";
import { useCallback, useEffect, useState } from "react";

import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Button } from "../ui/button";
import { BlockNote } from "./BlockNote"
import { TranslateDocument } from "@/components";

import { MoonIcon, SunIcon } from "lucide-react";

export default function Editor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev)
  }, [])

  const style = useMemo(() => (`hover:text-white ${
    darkMode
    ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
    : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
  }`), [darkMode]);

  useEffect(() => {
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
  }

  return (
    <div className="max-w-6xl mx-auto ">
      <div className="flex items-center gap-2 justify-end mb-10">
        {/* Translate doc AI */}
        <TranslateDocument doc={doc} />
        {/* ChatDocument AI */}
        {/* Dark mode */}
        <Button
          className={style}
          onClick={toggleDarkMode}
          variant="outline"
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>

      {/* Block Note */}
      <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
    </div>
  );
}

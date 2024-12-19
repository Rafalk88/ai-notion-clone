import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";

import * as Y from "yjs";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css"
import { useSelf } from "@liveblocks/react/suspense";
import { stringToColor } from "@/lib/utils";

type EditorProps = {
  doc: Y.Doc;
  provider: any;
  darkMode: boolean;
}

export function BlockNote({ doc, provider, darkMode}: EditorProps) {
  const userInfo = useSelf((me) => me.info);
  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: userInfo?.fullname,
        color: stringToColor(userInfo?.email)
      }
    }
  })

  return (
    <div className="relative max-w-6xl mx-auto">
      <BlockNoteView
        className="min-h-screen"
        editor={editor}
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}
"use client"
import { FormEvent, useCallback, useState, useTransition } from "react"
import * as Y from "yjs";
import Markdown from "react-markdown"

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BotIcon, LanguagesIcon } from "lucide-react";


type Language =
| "english"
| "spanish"
| "portuguese"
| "french"
| "german"
| "chinese"
| "arabic"
| "hindi"
| "russian"
| "polish"
| "japanese"

const languages: Language[] = [
  "english",
  "spanish",
  "portuguese",
  "french",
  "german",
  "chinese",
  "arabic",
  "hindi",
  "russian",
  "polish",
  "japanese",
]
export default function TranslateDocument({ doc }: { doc: Y.Doc}) {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('');
  const [summary, setSummary] = useState('');
  const [question, setQuestion] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleQuestion = useCallback((e: FormEvent) => {
    e.preventDefault();

    startTransition(async() => {
      const documentData = doc.get("document-store").toJSON();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentData,
            targetLang: language,
          }),
        }
      );

      if (res.ok) {
        const { translated_text } = await res.json();
        console.log(translated_text)
        setSummary(translated_text);
        toast("Translated Summary successfully");
      } else {
        toast("Translation failed.", {
          description: "There was a problem with your request.",
        });
      }
    })
  }, [doc, language]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline" color="destructive">
        <DialogTrigger>
          <LanguagesIcon />
          Translate
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translate the Document</DialogTitle>
          <DialogDescription>
            Select a language and AI will translate a summary of the document in
            the selected language.
          </DialogDescription>
          <hr className="mt-5" role="separator" />
          {
            question && <p className="mt-5 text-gray-500">Q: {question}</p>
          }
        </DialogHeader>
        {
          summary && (
            <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
              <div className="flex">
                <BotIcon className="w-10 flex-shrink-0" />
                <p className="font-bold">GTP {isPending ? "is thinking..." : "Says:"}</p>
              </div>
              <p>{isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}</p>
            </div>
          )
        }
        <form 
          onSubmit={handleQuestion}
          className="flex gap-2"
        >
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="submit"
            disabled={!language || isPending}
          >
            {isPending ? "Translating..." : "Translate"}
          </Button>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  )
}

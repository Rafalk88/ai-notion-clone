"use client"
import { FormEvent, useCallback, useState, useTransition } from "react";
import * as Y from "yjs";
import { BotIcon, MessageCircleCode } from "lucide-react";
import Markdown from "react-markdown";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { inviteUserToDocument } from "@/../actions/actions";
import { env } from "../../../env.mjs";


export default function ChatToDocument({ doc }: { doc: Y.Doc }) {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState('');
  const [question, setQuestion] = useState('');

  const handleQuestion = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    setQuestion(input);

    startTransition(async () => {
      const documentData = doc.get('document-store').toJSON();
      const extractedData = arrayToText(extractContent(documentData), " ");

      const res = await fetch(
        `${env.NEXT_PUBLIC_BASE_URL}/chatToDocument`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            documentData: extractedData,
            question: input,
          }),
        }
      );

      try {
        const response = await res.json();

        //! ONLY FOR LEARNING PURPOSE I DON"T HAVE AI PRICING PLAN SO I GET 404 or 429 STATUS
        //! ERRORS. WHEN YOU GET AI PLAN DELETE THIS IF STATEMENT
        if (response.status === 404 || response.status === 429) {
          setSummary('This is test mode without AI plan. You don\'t have permission to use this feature.');
        } else {
          setSummary(response.message);
        }
        //! END OF TEST MODE

        //! UNCOMMENT THIS LINE IF YOU DELETE TEST MODE
        //setSummary(response.message);
        toast("Question asked successfully");
      } catch (error) {
        console.error("Failed to ask question", error);
        toast("Asking failed.", {
          description: "There was a problem with your request.",
        });
      } finally{
        setInput('');
      };
    });
  }, [doc, input]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline" color="destructive">
        <DialogTrigger>
          <MessageCircleCode className="mr-2" />
          Chat to Document
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat to Document!</DialogTitle>
          <DialogDescription>
            Ask a question and chat to the document with AI.
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
              <p>{isPending ? "Thinking..." : <Markdown>{summary.replace(/\^/g, '\n\n')}</Markdown>}</p>
            </div>
          )
        }
        <form 
          onSubmit={handleQuestion}
          className="flex gap-2"
        >
          <Input
            className="w-full"
            type="text"
            placeholder="i.e. what is this about?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            type="submit"
            disabled={!input || isPending}
          >
            {isPending ? "Asking..." : "Ask"}
          </Button>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function extractContent(input: any) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(input, "application/xml");

  const paragraphs = xmlDoc.getElementsByTagName("paragraph");

  const contentArray = [];

  for (let paragraph of paragraphs) {
      const textContent = paragraph.textContent?.trim() ?? "";
      if (textContent) {
          contentArray.push(textContent);
      }
  }

  return contentArray;
}

function arrayToText(array: string[], separator: string = " "): string {
  return array.join(separator);
}
import { ArrowLeftCircle } from "lucide-react";

export function NoDocuments() {
  return (
    <div className="flex space-x-2 items-center animate-pulse">
      <ArrowLeftCircle className="h-12 w-12" />
      <h1 className="font-bold">Get started with creating New Document</h1>
    </div>
  )
}

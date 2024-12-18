"use client"

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/../firebase";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const id = segments[segments.length - 1];
  const [data] = useDocumentData(doc(db, "documents", id));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, idx) => {
          if (!segment) return null;

          const href = `${process.env.SERVER_URL}/${segments.slice(0, idx + 1).join("/")}`;
          const isLast = idx === segments.length - 1;

          return (
            <Fragment key={segment}>
              <BreadcrumbSeparator />
              <BreadcrumbItem >
                {(isLast) ? (
                  <BreadcrumbPage>{data?.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link
      className="flex gap-1 items-center"
      href="/"
    >
      <Image
        src="/assets/Your-Logo-here.png"
        alt="logo image"
        width={60}
        height={60}
      />

      <h2
        className="text-lg font-bold transform scale-y-[1.15] tracking-wide"
      >
        Notion-clone
      </h2>
    </Link>
  )
}

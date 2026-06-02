import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

const MobileSidebar = () => {
  return (
    <aside className={cn("flex h-screen flex-col")}>
      <div className="mt-4 flex flex-col items-stretch gap-2 px-4">
        <Link href={"/"}>Home</Link>
        <Link href={"/about"}>About</Link>
        <Link href={"/contact"}>Contact</Link>
      </div>
      <div className="mt-auto border-t px-4 py-3">
        <Button variant={"outline"} className={"w-full"}>
          Logout
        </Button>
      </div>
    </aside>
  )
}

export default MobileSidebar

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface SidebarProps {
  className?: string
}

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "bg- fixed hidden h-[calc(100vh-var(--header-height))] w-(--sidebar-width) flex-col border-r lg:flex",
        className,
      )}
    >
      <div className="mt-4 flex flex-1 flex-col gap-2 px-4">
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

export default Sidebar

import { ThemeToggle } from "@/components/providers/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import Link from "next/link"
import MobileSidebar from "../sidebar/mobile-sidebar"

const Header = () => {
  return (
    <header className="bg- flex h-(--header-height) items-center justify-between border-b bg-glow p-4">
      <Link href={"/"}>
        <div className="px-4 py-3 text-lg font-bold text-hm-red">Logo</div>
      </Link>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <ThemeToggle />
        {/* Mobile */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger render={<Button variant="outline" size="icon" />}>
              <MenuIcon className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <MobileSidebar />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Header

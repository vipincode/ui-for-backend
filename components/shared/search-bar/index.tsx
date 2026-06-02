import { IconSearch } from "@/components/icons"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  return (
    <div className="relative">
      <IconSearch className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input className="h-12 pl-9" />
    </div>
  )
}

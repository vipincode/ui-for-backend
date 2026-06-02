import { cn } from "@/lib/utils"

interface BasicCardProps {
  title: string
  description: string
  className?: string
}

const BasicCard = ({ title, description, className }: BasicCardProps) => {
  return (
    <div className={cn("flex-1 rounded-2xl border p-4", className)}>
      <h3 className="text-base font-medium">{title}</h3>
      <p className="text-xs font-normal">{description}</p>
    </div>
  )
}

export default BasicCard

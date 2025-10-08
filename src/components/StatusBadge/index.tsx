import { Size } from "@/types/props";
import { StatusBadgeVariant } from "@/components/StatusBadge/type";
import { cn } from "@/lib/utils";
import "./StatusBadge.scss"

type Props = {
  className?: string
  size?: Size,
  variant?: StatusBadgeVariant
}
const StatusBadge = ({
  size = "md",
  variant = "none",
  className
}: Props) => {
  return (
    <div
      className={cn("StatusBadge", variant, size, className)}
      title={variant}
    />
  )
}

export default StatusBadge;
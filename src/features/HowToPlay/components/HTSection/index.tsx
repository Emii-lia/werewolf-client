import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import "./HTSection.scss"

type Props = {
  children: ReactNode
  className?: string
}
const HTSection = ({
  children,
  className
}: Props) => {
  return (
    <div className={cn("HTSection", className)}>
      <div className="HTSection__container">
        {children}
      </div>
    </div>
  )
}

export default HTSection
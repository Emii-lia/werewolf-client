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
    <div className="HTSection">
      <div className={cn("HTSection__container", className)}>
        {children}
      </div>
    </div>
  )
}

export default HTSection
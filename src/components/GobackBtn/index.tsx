import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import "./GobackBtn.scss"
import useGobackBtn from "@/components/GobackBtn/useGobackBtn";

type Props = {
  children?: ReactNode;
  btnClassName?: string;
  className?: string;
}
const GobackBtn = ({
  className,
  btnClassName,
  children
}: Props) => {
  const {
    handleClick
  } = useGobackBtn()
  return (
    <Button
      className={cn("GobackBtn", btnClassName)}
      variant="ghost"
      onClick={handleClick}
    >
      <ArrowLeftIcon className={cn("arrow-icon", className)} />
      {children}
    </Button>
  )
}

export default GobackBtn
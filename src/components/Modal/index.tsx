import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode } from "react";

type Props = {
  trigger: ReactNode
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  asChild?: boolean
  className?: string
  disabled?: boolean
  onOpenChange?: (open: boolean) => void
}
const  Modal = ({
  footer,
  trigger,
  description,
  title,
  children,
  asChild,
  className,
  disabled = false,
  onOpenChange,
}: Props)=> {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild className={className}>
        {asChild ?
          trigger:
          <Button
            variant="outline"
            disabled={disabled}
          >
            {trigger}
          </Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description &&
            <DialogDescription>
              {description}
            </DialogDescription>
          }
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import "./ErrorMessages.scss"

type  Props = {
  errors?: string[];
  className?: string;
  children: ReactNode;
}
const ErrorMessages = ({
  errors,
  className,
  children
}: Props) => {
  return (
    <div className={cn("ErrorMessages", className)}>
      {children}
      {!!errors && errors.length > 0 &&
        <p className="errors">
          {errors.map((error, i) => (
            <span key={i} className="error-message">{error}. </span>
          ))}
        </p>
      }
    </div>
  )
}

export default ErrorMessages;
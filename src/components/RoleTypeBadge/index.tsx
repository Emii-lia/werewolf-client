import { RoleType } from "@/api/openapi";
import { Badge } from "@/components/ui/badge";
import useRoleTypeBadge from "@/components/RoleTypeBadge/useRoleTypeBadge";

type Props = {
  roleType: RoleType
  className?: string
}
const RoleTypeBadge = ({
  roleType,
  className
}: Props) => {
  const {
    variant
  } = useRoleTypeBadge(roleType)
  return (
    <Badge
      className={className}
      variant={variant}
    >
      {roleType}
    </Badge>
  )
}

export default RoleTypeBadge;
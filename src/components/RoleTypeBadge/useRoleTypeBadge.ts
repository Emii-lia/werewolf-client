import { RoleType } from "@/api/openapi";
import { ComponentProps, useMemo } from "react";
import { Badge } from "@/components/ui/badge";

const useRoleTypeBadge = (
  roleType: RoleType
) => {
  type VariantType = ComponentProps<typeof Badge>["variant"]
  const variant: VariantType  = useMemo(() => {
    switch (roleType) {
      case RoleType.BEAST:
        return "destructive"
      case RoleType.CITIZEN:
        return "secondary";
      case RoleType.NEUTRAL:
        return "outline";
      default:
        return "default";

    }
  }, [roleType])

  return {
    variant
  }
}

export default useRoleTypeBadge;
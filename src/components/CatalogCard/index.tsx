import type { CSSProperties } from "react";
import type { RoleResponse } from "@/api/openapi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RoleTypeBadge from "@/components/RoleTypeBadge";
import "./CatalogCard.scss"

type Props = {
  role: RoleResponse
}
const CatalogCard = ({
  role
}: Props) => {
  return (
    <Card className="CatalogCard">
      <CardHeader>
        <div
          className="role-image"
          style={{
            "--bg": `url(${role.image})`
          } as CSSProperties}
        />
      </CardHeader>
      <CardContent className="card-content">
        <CardTitle>
          <div className="role-title">
            {role.name}
            <RoleTypeBadge roleType={role.role_type}/>
          </div>
        </CardTitle>
        <CardDescription>{role.description}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default CatalogCard;
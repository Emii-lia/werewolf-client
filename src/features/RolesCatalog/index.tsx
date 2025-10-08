"use client";
import useRolesCatalog from "@/features/RolesCatalog/useRolesCatalog";
import CatalogCard from "@/components/CatalogCard";
import "./RolesCatalog.scss"
import GobackBtn from "@/components/GobackBtn";

const RolesCatalog = () => {
  const {
    roles,
    isLoading
  } = useRolesCatalog()

  if (isLoading) {
    return (
      <div className="RolesCatalog loading">
        Loading...
      </div>
    )
  }
  return (
    <div className="RolesCatalog">
      <GobackBtn
        className="catalog-title-icon"
        btnClassName="catalog-title-btn"
      >
        <h1 className="catalog-title">
          Available Roles
        </h1>
      </GobackBtn>
        {roles.length > 0?
          <div className="role-list">
            {roles.map(( role ) => (
              <CatalogCard
                role={role}
                key={role.id}
              />
            ))}
          </div>:
          <div className="no-roles">
            No roles available.
          </div>
        }
    </div>
  )
}

export default RolesCatalog;
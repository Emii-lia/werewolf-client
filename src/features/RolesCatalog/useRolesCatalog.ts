import useFetchRoles from "@/rq-hooks/Role/useFetchRoles";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";

const useRolesCatalog = () => {
  const {
    data,
    isLoading,
    isError,
    isSuccess
  } = useFetchRoles()

  const roles = useMemo(() => {
    if (isSuccess && data) {
      return data
    }
    if (isLoading || isError) {
      return []
    }
    return []
  }, [data, isLoading, isError, isSuccess])

  useEffect(() => {
    if (isError) {
      toast.error("An error occurred while fetching roles. Please try again.");
    }
  }, [isError]);

  return {
    roles,
    isLoading
  }
}

export default useRolesCatalog;
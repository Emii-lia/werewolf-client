import { useAuthStore } from "@/stores/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { protectedRoutes } from "@/commons/routes";

const useTopbar = () => {
  const router = useRouter();
  const pathname = usePathname()
  const { user, isGuest, logout, token } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    if (token) {
      let tokenObj = jwtDecode<{ sub: string, exp: number }>(token)
      const currentTime = Math.floor(Date.now() / 1000);
      if (tokenObj.exp < currentTime) {
        logout();
        if (protectedRoutes.some(p => pathname.startsWith(p))) {
          router.push("/login");
        }
      }
    }
  }, [token]);

  return {
    user,
    isGuest,
    handleLogout,
  };
};

export default useTopbar;

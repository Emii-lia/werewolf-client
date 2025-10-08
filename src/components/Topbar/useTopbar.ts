import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";

const useTopbar = () => {
  const router = useRouter();
  const { user, isGuest, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return {
    user,
    isGuest,
    handleLogout,
  };
};

export default useTopbar;

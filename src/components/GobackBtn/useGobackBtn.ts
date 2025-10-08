import { useRouter } from "next/navigation";

const useGobackBtn = () => {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return {
    handleClick,
  }
}

export default useGobackBtn
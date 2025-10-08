import React, { useState } from "react";
import { LoginRequest } from "@/api/openapi";
import useRqLogin from "@/rq-hooks/Auth/useRqLogin";
import useRqCreateGuestSession from "@/rq-hooks/Auth/useRqCreateGuestSession";
import { z } from "zod";
import useZodValidation from "@/hooks/useZodValidation";
import validateForm from "@/utils/validateForm";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useLogin = () => {
  const router = useRouter()
  const { setAuth } = useAuthStore()
  const [loginRequest, setLoginRequest] = useState<LoginRequest>({
    password: "",
    username: ""
  });
  const [errors, setErrors] = useState<{ [key: string]: Array<string> }>({});
  const [showGuestDialog, setShowGuestDialog] = useState(false);
  const [guestUsername, setGuestUsername] = useState("");

  const {
    mutate: login,
  } = useRqLogin()

  const {
    mutate: createGuestSession,
  } = useRqCreateGuestSession()

  const loginFields = {
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
  }

  const { submitSchema } = useZodValidation(loginFields)

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setLoginRequest(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = () => {
    const formErrors = validateForm(loginRequest, submitSchema)
    if (Object.keys(formErrors).length === 0) {
      setErrors({});
      login(loginRequest, {
        onSuccess: (data) => {
          if (data.token && data.user) {
            setAuth(data.user, data.token);
            toast.success("Login successful!");
          }
          router.push("/menu");
        },
        onError: (error: any) => {
          if (error.response?.data?.detail) {
            toast.error(error.response.data.detail);
          } else {
            toast.error("An error occurred during login. Please try again.");
          }
        }
      })
    } else {
      setErrors(formErrors as { [key: string]: Array<string> });
    }
  }

  const handleToSignup = () => {
    router.push("/signup")
  }

  const handlePlayAsGuest = () => {
    setShowGuestDialog(true);
  }

  const handleGuestUsernameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setGuestUsername(e.currentTarget.value);
  }

  const handleGuestSubmit = () => {
    if (!guestUsername.trim()) {
      toast.error("Please enter a username");
      return;
    }

    createGuestSession({ username: guestUsername }, {
      onSuccess: (data) => {
        if (data.token && data.session_id) {
          setAuth(
            { id: data.session_id, username: data.username },
            data.token,
            true
          );
          toast.success(`Welcome, ${data.username}!`);
          router.push("/menu");
        }
      },
      onError: (error: any) => {
        if (error.response?.data?.detail) {
          toast.error(error.response.data.detail);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    });
  }

  const handleCloseGuestDialog = () => {
    setShowGuestDialog(false);
    setGuestUsername("");
  }

  return {
    loginRequest,
    errors,
    handleInputChange,
    handleSubmit,
    handleToSignup,
    showGuestDialog,
    guestUsername,
    handlePlayAsGuest,
    handleGuestUsernameChange,
    handleGuestSubmit,
    handleCloseGuestDialog,
  }
}

export default useLogin;
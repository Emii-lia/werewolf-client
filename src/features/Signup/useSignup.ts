import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { SignupRequest } from "@/api/openapi";
import { z } from "zod";
import useVerifyUsernameExists from "@/rq-hooks/User/useVerifyUsernameExists";
import useZodValidation from "@/hooks/useZodValidation";
import validateForm from "@/utils/validateForm";
import useRqSignup from "@/rq-hooks/Auth/useRqSignup";
import { toast } from "react-toastify";
import { debounce } from "lodash";

const useSignup = () => {
  const router = useRouter()

  const [signupRequest, setSignupRequest] = useState<SignupRequest & { confirmPassword: string }>({
    username: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: Array<string> }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    data: verifyUsernameData,
    isLoading: isVerifyingUsername,
    refetch: verifyUsername,
  } = useVerifyUsernameExists({
    username: signupRequest.username,
    enabled: signupRequest.username.length >= 4,
  })

  const {
    mutate: signup,
    isPending: isSigningUp,
  } = useRqSignup()

  const debouncedVerifyUsername = useMemo(() =>
    debounce(verifyUsername, 300)
  , [verifyUsername]);

  const signupField = {
    username: z.string()
      .min(4, "Username must be at least 4 characters")
      .max(20, "Username must be at most 20 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
      .refine(() => !verifyUsernameData?.exists, "Username already exists"),
    password: z.string()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string()
      .refine((val) => val === signupRequest.password, "Passwords do not match"),
  }

  const { submitSchema, changeSchema } = useZodValidation(signupField)

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setSignupRequest(prev => ({
      ...prev,
      [name]: value,
    }));
    const formErrors = validateForm({ ...signupRequest, [name]: value }, changeSchema)
    if (Object.keys(formErrors).length === 0) {
      setErrors({});
    } else {
      setErrors(formErrors as { [key: string]: Array<string> });
    }
  }

  const handleSubmit = () => {
    const formErrors = validateForm(signupRequest, submitSchema)
    if (Object.keys(formErrors).length === 0) {
      setErrors({});
      setIsSubmitting(true);
      signup({
        username: signupRequest.username,
        password: signupRequest.password,
      }, {
        onSuccess: () => {
          toast.success("Account created successfully! Redirecting to login...");
          router.push("/login");
        },
        onError: (error: any) => {
          if (error.response?.data?.detail) {
            toast.error(error.response.data.detail);
          } else {
            toast.error("An error occurred during signup. Please try again.");
          }
        },
        onSettled: () => {
          setIsSubmitting(false);
        }
      })

    } else {
      setErrors(formErrors as { [key: string]: Array<string> });
    }
  }

  const handleToLogin = () => {
    router.push("/login")
  }

  useEffect(() => {
    if (signupRequest.username.length >= 4) {
      debouncedVerifyUsername()
    }
  }, [signupRequest.username, debouncedVerifyUsername]);

  useEffect(() => {
    if (signupRequest.username.length >= 4 && !!verifyUsernameData) {
      const formErrors = validateForm(signupRequest, changeSchema)
      if (Object.keys(formErrors).length === 0) {
        setErrors({});
      } else {
        setErrors(formErrors as { [key: string]: Array<string> });
      }
    }
  }, [verifyUsernameData]);

  return {
    signupRequest,
    errors,
    isLoading: isSubmitting || isSigningUp || isVerifyingUsername,
    handleInputChange,
    handleSubmit,
    handleToLogin,
  }
}

export default useSignup
"use client"

import { useState } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import useLoginMutation from "@/hooks/auth/useLoginMutation";

export function useLogin () {
    const router = useRouter();
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const loginMutation = useLoginMutation()

    const onSubmit = async () => {
      setError("");
      loginMutation.mutate({ account, password },
        {
          onSuccess: (res) => {
            router.push("/admin")
          },
          onError: (err) => {
            setError(`登入失敗(${err.message})`);
          },
        }
      )
    };

    return {
        account,
        setAccount,
        password,
        setPassword,
        error,
        setError,
        onSubmit
    }
}
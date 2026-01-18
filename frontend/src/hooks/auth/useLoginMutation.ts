import { useMutation } from "@tanstack/react-query"
import { userLogin } from "@/services/auth"

const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: LoginReq) => userLogin(data),
  })
}

export default useLoginMutation

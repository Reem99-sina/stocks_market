import { userRegister } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (user: userRegister) => {
      const { data } = await axios.post("/api/auth/register", {
        name: user.name,
        email: user.email,
        password: user.password,
      });

      return data;
    },
  });
};

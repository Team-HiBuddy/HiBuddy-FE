import { deleteAccount, logout } from "@apis/auth";
import { ResponseBody } from "@models/api";
import { useMutation } from "@tanstack/react-query";

const useAuth = () => {
  const logoutResult = useMutation<ResponseBody, Error>({
    mutationFn: logout,

    onSuccess: () => location.reload(),
  });

  const deleteAccountResult = useMutation<ResponseBody, Error>({
    mutationFn: deleteAccount,

    onSuccess: () => {
      alert("Account deletion complete.");

      location.reload();
    },
  });

  return { logoutResult, deleteAccountResult };
};

export default useAuth;

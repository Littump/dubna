import { useMutation } from "@tanstack/react-query";
import clientService from "@/modules/Client/api/clientService.ts";

export const useDeleteExpense = (id: number) =>
  useMutation({
    mutationFn: () => clientService.deleteExpense(id),
  });

import { useMutation } from "@tanstack/react-query";
import clientService from "@/modules/Client/api/clientService.ts";

export const useDeletePayment = (id: number) =>
  useMutation({
    mutationFn: () => clientService.deletePayment(id),
  });

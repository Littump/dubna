import { useMutation } from "@tanstack/react-query";
import clientService from "@/modules/ClientList/api/clientListService.ts";

export const useDeleteClient = () =>
  useMutation({
    mutationFn: (id: number) => clientService.deleteClient(id),
  });

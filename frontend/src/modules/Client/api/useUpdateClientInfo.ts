import { useMutation } from "@tanstack/react-query";
import AddClientDto from "@/modules/ClientList/types/addClient.dto.ts";
import clientService from "@/modules/Client/api/clientService.ts";

export const useUpdateClient = (id: number) =>
  useMutation({
    mutationFn: (body: AddClientDto) => clientService.updateClient(body, id),
  });

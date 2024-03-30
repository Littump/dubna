import { useMutation } from "@tanstack/react-query";
import AddClientDto from "@/modules/ClientList/types/addClient.dto.ts";
import clientService from "@/modules/ClientList/api/clientListService.ts";

export const useAddClient = () =>
  useMutation({
    mutationFn: (body: AddClientDto) => clientService.addClient(body),
  });

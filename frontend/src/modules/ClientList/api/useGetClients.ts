import { useQuery } from "@tanstack/react-query";
import clientService from "@/modules/ClientList/api/clientListService.ts";

export const useGetClients = () =>
  useQuery({
    queryKey: ["getClients"],
    queryFn: () => clientService.getClients(),
    refetchInterval: 2000,
  });

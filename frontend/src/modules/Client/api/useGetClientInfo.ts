import { useQuery } from "@tanstack/react-query";
import clientService from "@/modules/Client/api/clientService.ts";

export const useGetClientInfo = (id: number) =>
  useQuery({
    queryKey: ["getClient" + id],
    queryFn: () => clientService.getClient(id),
    refetchInterval: 2000,
  });

import { useQuery } from "@tanstack/react-query";
import clientService from "@/modules/Client/api/clientService.ts";

export const useGetPayments = (id: number) =>
  useQuery({
    queryKey: ["getPayments" + id],
    queryFn: () => clientService.getPayments(id),
    refetchInterval: 2000,
  });

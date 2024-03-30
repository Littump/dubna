import { useQuery } from "@tanstack/react-query";
import clientService from "@/modules/Client/api/clientService.ts";

export const useGetExpenses = (id: number) =>
  useQuery({
    queryKey: ["getExpenses" + id],
    queryFn: () => clientService.getExpenses(id),
    refetchInterval: 2000,
  });

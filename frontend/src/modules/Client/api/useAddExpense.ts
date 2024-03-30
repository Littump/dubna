import { useMutation } from "@tanstack/react-query";
import clientService from "@/modules/Client/api/clientService.ts";
import AddExpenseDto from "@/modules/Client/types/addExpense.dto.ts";

export const useAddExpense = () =>
  useMutation({
    mutationFn: (body: AddExpenseDto) => clientService.addExpense(body),
  });

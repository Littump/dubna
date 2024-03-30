import { useMutation } from "@tanstack/react-query";
import clientService from "@/modules/Client/api/clientService.ts";
import AddPaymentDto from "@/modules/Client/types/addPayment.dto.ts";

export const useAddPayment = () =>
  useMutation({
    mutationFn: (body: AddPaymentDto) => clientService.addPayment(body),
  });

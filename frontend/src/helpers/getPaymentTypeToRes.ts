import {
  PaymentType,
  PaymentTypeEnglish,
} from "@/modules/Client/types/addPayment.dto.ts";

const getPaymentTypeToRes = (type: PaymentType | ""): PaymentTypeEnglish => {
  if (type === "QR-код") return "qr";
  if (type === "СПБ") return "SBP";
  if (type === "Корректировка") return "adjustment";
  if (type === "Картой") return "card";
  if (type === "Банковский платеж") return "bank";
  if (type === "Автоплатеж") return "auto";
  if (type === "Сбер-онлайн") return "Sber";
  if (type === "Почта России") return "post";
  else return "cash";
};

export default getPaymentTypeToRes;

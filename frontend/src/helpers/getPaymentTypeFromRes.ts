import {
  PaymentType,
  PaymentTypeEnglish,
} from "@/modules/Client/types/addPayment.dto.ts";

const getPaymentTypeFromRes = (type: PaymentTypeEnglish | ""): PaymentType => {
  if (type === "qr") return "QR-код";
  if (type === "SBP") return "СПБ";
  if (type === "adjustment") return "Корректировка";
  if (type === "card") return "Картой";
  if (type === "bank") return "Банковский платеж";
  if (type === "auto") return "Автоплатеж";
  if (type === "Sber") return "Сбер-онлайн";
  if (type === "post") return "Почта России";
  else return "Наличными";
};

export default getPaymentTypeFromRes;

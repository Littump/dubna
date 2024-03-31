export default interface AddPaymentDto {
  amount: string;
  type: PaymentTypeEnglish;
  client: number;
}
export type PaymentTypeEnglish =
  | "qr"
  | "auto"
  | "bank"
  | "cash"
  | "card"
  | "post"
  | "Sber"
  | "SBP"
  | "adjustment";
export type PaymentType =
  | "QR-код"
  | "Автоплатеж"
  | "Банковский платеж"
  | "Наличными"
  | "Картой"
  | "Почта России"
  | "Сбер-онлайн"
  | "СПБ"
  | "Корректировка";

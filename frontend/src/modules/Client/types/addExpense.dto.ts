export default interface AddExpenseDto {
  amount: string;
  is_cycle?: boolean;
  period?: string;
  services: ResponseServiceTypeEnglish;
  client: number;
}
export type ResponseServiceTypeEnglish =
  | "videonablyudenie"
  | "domofonia"
  | "internet"
  | "oborudovanie"
  | "programmnoe_obespechenie"
  | "televidenie"
  | "telefon"
  | "hosting"
  | "adjustment";
export type ResponseServiceType =
  | "Видеонаблюдение"
  | "Домофония"
  | "Интернет"
  | "Оборудование"
  | "Подписка на программное обеспечение"
  | "Телевидение"
  | "Телефонная связь"
  | "Хостинг веб-ресурсов"
  | "Корректировка";

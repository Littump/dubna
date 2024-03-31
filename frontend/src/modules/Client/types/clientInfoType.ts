export type ClientStatus =
  | "Активен"
  | "Подключение"
  | "Приостановлено"
  | "Блокировка"
  | "Расторгнут";

export type ClientType = "Физ. лицо" | "Юр. лицо";
export interface ServiceType {
  name: string;
  sum: number;
  id: number;
}
export interface PaymentType {
  type: string;
  sum: number;
  date: string;
  id: number;
}
export interface DebitType {
  name: string;
  sum: number;
  date: string;
  id: number;
}
export default interface ClientInfoType {
  name: string;
  status: ClientStatus;
  client_type: ClientType;
  phone: string;
  id: number;
  birthday: Date | null;
  address: string;
  balance: number;
  limit: number;
}

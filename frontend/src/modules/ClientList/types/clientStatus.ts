type ClientStatus =
  | "Активен"
  | "Подключение"
  | "Приостановлено"
  | "Блокировка"
  | "Расторгнут";
export type ClientStatusEnglish =
  | "connecting"
  | "active"
  | "banned"
  | "annulled"
  | "stopped";
export default ClientStatus;

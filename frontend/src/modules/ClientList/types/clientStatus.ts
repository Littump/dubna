type ClientStatus =
  | "Активен"
  | "Подключение"
  | "Приостановлено"
  | "Блокировка"
  | "Расторгнут";
export type ClientStatusEnglish =
  | "connecting"
  | "active"
  | "blocked"
  | "annulled"
  | "stopped";
export default ClientStatus;

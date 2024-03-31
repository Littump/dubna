import { ClientStatusEnglish } from "@/modules/ClientList/types/clientStatus.ts";
import clientStatus from "@/modules/ClientList/types/clientStatus.ts";

const getStatusFromRes = (status: ClientStatusEnglish): clientStatus => {
  if (status === "active") return "Активен";
  if (status === "stopped") return "Приостановлено";
  if (status === "banned") return "Блокировка";
  if (status === "annulled") return "Расторгнут";
  else return "Подключение";
};

export default getStatusFromRes;

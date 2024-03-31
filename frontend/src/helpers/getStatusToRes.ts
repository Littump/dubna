import { ClientStatusEnglish } from "@/modules/ClientList/types/clientStatus.ts";
import clientStatus from "@/modules/ClientList/types/clientStatus.ts";

const getStatusFromRes = (status: clientStatus | ""): ClientStatusEnglish => {
  if (status === "Активен") return "active";
  if (status === "Приостановлено") return "stopped";
  if (status === "Блокировка") return "banned";
  if (status === "Расторгнут") return "annulled";
  else return "connecting";
};

export default getStatusFromRes;

import ClientStatus from "@/modules/ClientList/types/clientStatus.ts";

const getColorByStatus = (status: ClientStatus) => {
  if (status === "Активен") return "text-green";
  if (status === "Приостановлено") return "text-yellow";
  if (status === "Расторгнут") return "text-red";
  if (status === "Подключение") return "text-green";
  else return "text-red";
};

export default getColorByStatus;

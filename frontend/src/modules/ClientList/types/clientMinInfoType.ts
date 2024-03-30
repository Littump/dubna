import ClientStatus from "@/modules/ClientList/types/clientStatus.ts";
import ClientType from "@/modules/ClientList/types/clientType.ts";

export default interface ClientMinInfoType {
  name: string;
  status: ClientStatus;
  type: ClientType;
  mail: string;
  phone: string;
  id: number;
}

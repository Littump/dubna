import { ClientStatusEnglish } from "@/modules/ClientList/types/clientStatus.ts";
import { ClientTypeEnglish } from "@/modules/ClientList/types/clientType.ts";

export default interface ClientResponseType {
  balance: string;
  birthday: string;
  client_type: ClientTypeEnglish;
  connection_address: string;
  id: number;
  name: string;
  last_update: string;
  limit: string;
  phone: string;
  status: ClientStatusEnglish;
}

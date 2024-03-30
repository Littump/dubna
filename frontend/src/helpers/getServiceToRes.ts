import {
  ResponseServiceType,
  ResponseServiceTypeEnglish,
} from "@/modules/Client/types/addExpense.dto.ts";

const getServiceToRes = (
  service: ResponseServiceType | "",
): ResponseServiceTypeEnglish => {
  if (service === "Видеонаблюдение") return "videonablyudenie";
  if (service === "Интернет") return "internet";
  if (service === "Корректировка") return "adjustment";
  if (service === "Хостинг веб-ресурсов") return "hosting";
  if (service === "Подписка на программное обеспечение")
    return "programmnoe_obespechenie";
  if (service === "Оборудование") return "oborudovanie";
  if (service === "Телефонная связь") return "telefon";
  if (service === "Домофония") return "domofonia";
  else return "televidenie";
};

export default getServiceToRes;

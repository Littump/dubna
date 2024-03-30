import {
  ResponseServiceType,
  ResponseServiceTypeEnglish,
} from "@/modules/Client/types/addExpense.dto.ts";

const getServiceToRes = (
  service: ResponseServiceTypeEnglish | "",
): ResponseServiceType => {
  if (service === "videonablyudenie") return "Видеонаблюдение";
  if (service === "internet") return "Интернет";
  if (service === "adjustment") return "Корректировка";
  if (service === "hosting") return "Хостинг веб-ресурсов";
  if (service === "programmnoe_obespechenie")
    return "Подписка на программное обеспечение";
  if (service === "oborudovanie") return "Оборудование";
  if (service === "telefon") return "Телефонная связь";
  if (service === "domofonia") return "Домофония";
  else return "Телевидение";
};

export default getServiceToRes;

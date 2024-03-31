import TextInput from "@/ui/TextInput.tsx";
import DropdownInput from "@/ui/DropdownInput.tsx";
import ClientStatus from "@/modules/ClientList/types/clientStatus.ts";
import ClientType from "@/modules/ClientList/types/clientType.ts";
import { FiltersInitialValues } from "@/modules/ClientList/ui/index.tsx";

interface Props {
  setFieldValue: (name: string, value: string) => void;
  values: FiltersInitialValues;
  summaryData: {
    all: number;
    legal: number;
    individual: number;
    statusActive: number;
    statusStopped: number;
    statusAnnulled: number;
    statusBanned: number;
    statusConnecting: number;
  };
}

function ClientFilters({ values, setFieldValue, summaryData }: Props) {
  const statuses: ClientStatus[] = [
    "Приостановлено",
    "Активен",
    "Блокировка",
    "Подключение",
    "Расторгнут",
  ];
  // const downloadTables = ["За год", "За месяц", "За неделю", "За день"];
  const types: ClientType[] = ["Физ. лицо", "Юр. лицо"];

  return (
    <div className="w-full bg-white gap-10 flex items-center justify-between px-4 py-2 rounded-xl ">
      <TextInput
        name="searchInput"
        placeholder="Поиск"
        className="w-7/12"
        isError={false}
      />
      <div className="w-5/12 flex gap-3 ml-auto items-center justify-end">
        <DropdownInput
          onClick={(val) => setFieldValue("status", val)}
          placeholder="Не выбран"
          items={statuses}
          className="w-40"
        >
          {values.status !== "" ? values.status : "Статус"}
        </DropdownInput>
        <DropdownInput
          onClick={(val) => setFieldValue("type", val)}
          placeholder="Не выбран"
          items={types}
          className="w-40"
        >
          {values.type !== "" ? values.type : "Тип клиента"}
        </DropdownInput>
        <details className="dropdown dropdown-end">
          <summary className="m-1 btn w-44">Получить сводку</summary>
          <div className="py-2 font-medium px-4 grid grid-cols-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-[360px]">
            <div className="flex flex-col gap-2">
              <div>
                Всего: <span className="font-semibold">{summaryData.all}</span>
              </div>
              <div>
                Физ.лиц:{" "}
                <span className="font-semibold">{summaryData.individual}</span>
              </div>
              <div>
                Юр.лиц:{" "}
                <span className="font-semibold">{summaryData.legal}</span>
              </div>
              <div>
                Подключение:{" "}
                <span className="font-semibold">
                  {summaryData.statusConnecting}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                Заблокированных:{" "}
                <span className="font-semibold">
                  {summaryData.statusBanned}
                </span>
              </div>
              <div>
                Приостановленных:{" "}
                <span className="font-semibold">
                  {summaryData.statusStopped}
                </span>
              </div>
              <div>
                Расторгнуто:{" "}
                <span className="font-semibold">
                  {summaryData.statusAnnulled}
                </span>
              </div>
              <div>
                Активных:{" "}
                <span className="font-semibold">
                  {summaryData.statusActive}
                </span>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}

export default ClientFilters;

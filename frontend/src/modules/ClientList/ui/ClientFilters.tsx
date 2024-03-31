import TextInput from "@/ui/TextInput.tsx";
import DropdownInput from "@/ui/DropdownInput.tsx";
import ClientStatus from "@/modules/ClientList/types/clientStatus.ts";
import ClientType from "@/modules/ClientList/types/clientType.ts";
import { FiltersInitialValues } from "@/modules/ClientList/ui/index.tsx";

interface Props {
  setFieldValue: (name: string, value: string) => void;
  values: FiltersInitialValues;
}

function ClientFilters({ values, setFieldValue }: Props) {
  const statuses: ClientStatus[] = [
    "Приостановлено",
    "Активен",
    "Блокировка",
    "Подключение",
    "Расторгнут",
  ];

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

        <span className="ml-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default ClientFilters;

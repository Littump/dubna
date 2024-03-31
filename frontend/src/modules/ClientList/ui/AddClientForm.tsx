import SetFieldValueType from "@/modules/ClientList/types/setFieldValueType.ts";
import TextInput from "@/ui/TextInput.tsx";
import { FormikErrors, FormikTouched } from "formik";
import { addClientValuesInterface } from "@/modules/ClientList/ui/AddClient.tsx";
import DateInput from "@/ui/DateInput.tsx";
import { useEffect } from "react";
import DropdownInput from "@/ui/DropdownInput.tsx";
import clientStatus from "@/modules/ClientList/types/clientStatus.ts";

interface Props {
  setFieldValue: SetFieldValueType;
  isPhysical: boolean;
  touched: FormikTouched<addClientValuesInterface>;
  errors: FormikErrors<addClientValuesInterface>;
  handleSubmit: () => void;
  showResult: boolean;
  isPending: boolean;
  values: addClientValuesInterface;
  setFieldTouched: (text: string) => void;
  setShowResult: (res: boolean) => void;
}
function AddClientForm({
  setFieldValue,
  isPhysical,
  errors,
  touched,
  values,
  showResult,
  setFieldTouched,
  isPending,
  setShowResult,
}: Props) {
  useEffect(() => {
    if (showResult) {
      setFieldValue("step", "final");
      setTimeout(() => setShowResult(false), 500);
    }
  }, [showResult]);

  const statuses: clientStatus[] = [
    "Активен",
    "Приостановлено",
    "Подключение",
    "Блокировка",
    "Расторгнут",
  ];

  return (
    <div className="flex flex-col min-h-[400px]">
      <h2 className="text-2xl">Информация</h2>
      <span className="text-sm px-1 py-2">Статус подключения</span>
      <DropdownInput
        placeholder="Статус"
        items={statuses}
        error={values.status === "" && touched.status}
        onClick={(val) => {
          setFieldTouched("status");
          setFieldValue("status", val);
        }}
      >
        {values.status !== "" ? values.status : "Статус"}
      </DropdownInput>
      <TextInput
        name="name"
        isError={!!(errors.name && touched.name)}
        label={`${isPhysical ? "ФИО" : "Название компании"}`}
        placeholder={`${
          isPhysical ? "Иванов Иван Иванович" : "Название компании"
        }`}
      ></TextInput>
      {isPhysical && <DateInput name="birthday" label="Дата рождения" />}
      <TextInput
        name="phone"
        label="Телефон"
        placeholder="89005552211"
        isError={!!(errors.phone && touched.phone)}
      ></TextInput>
      <TextInput
        name="address"
        label="Адрес подключения"
        placeholder="Москва, улица Профсоюзная, дом 42"
        isError={!!(errors.address && touched.address)}
      ></TextInput>

      <div className="grid grid-cols-2 gap-2 w-full">
        <button
          type="button"
          className="btn border-0 mt-4 text-xl bg-blue text-white btn-neutral"
          onClick={() => setFieldValue("step", "chooseType")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
          Назад
        </button>
        <button
          type="submit"
          className="btn border-0 mt-4 text-xl bg-blue text-white btn-neutral"
        >
          {isPending ? <span className="loading"></span> : "Далее"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default AddClientForm;

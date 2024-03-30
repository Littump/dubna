import SetFieldValueType from "@/modules/ClientList/types/setFieldValueType.ts";
import TextInput from "@/ui/TextInput.tsx";
import { FormikErrors, FormikTouched } from "formik";
import { addClientValuesInterface } from "@/modules/ClientList/ui/AddClient.tsx";

interface Props {
  setFieldValue: SetFieldValueType;
  isPhysical: boolean;
  touched: FormikTouched<addClientValuesInterface>;
  errors: FormikErrors<addClientValuesInterface>;
}
function AddClientForm({ setFieldValue, isPhysical, errors, touched }: Props) {
  return (
    <div className="flex flex-col min-h-[400px]">
      <h2 className="text-2xl">Информация</h2>
      <TextInput
        name="name"
        isError={!!(errors.name && touched.name)}
        label={`${isPhysical ? "ФИО" : "Название компании"}`}
        placeholder={`${
          isPhysical ? "Иван Иванов Иванович" : "Название компании"
        }`}
      ></TextInput>
      {isPhysical && (
        <TextInput
          name="birthday"
          type="date"
          isError={false}
          label="Дата рождения"
        ></TextInput>
      )}
      <TextInput
        name="phone"
        label="Телефон"
        placeholder="89005552211"
        isError={!!(errors.phone && touched.phone)}
      ></TextInput>
      <TextInput
        name="mail"
        label="Почта"
        placeholder="somemail@mail.com"
        isError={!!(errors.mail && touched.mail)}
      ></TextInput>
      <TextInput
        name="address"
        label="Адрес подключения"
        placeholder="Г. Санкт-петербург улица пушкина дом 2"
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
          type="button"
          className="btn border-0 mt-4 text-xl bg-blue text-white btn-neutral"
          onClick={() => setFieldValue("step", "final")}
        >
          Далee
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

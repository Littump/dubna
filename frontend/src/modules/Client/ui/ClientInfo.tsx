import { Form, Formik } from "formik";
import TextInput from "@/ui/TextInput.tsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClientInfoType from "@/modules/Client/types/clientInfoType.ts";
import DateInput from "@/ui/DateInput.tsx";
import getColorByStatus from "@/helpers/getColorByStatus.ts";
import { useGetClientInfo } from "@/modules/Client/api/useGetClientInfo.ts";
import getStatusFromRes from "@/helpers/getStatusFromRes.ts";
import { useUpdateClient } from "@/modules/Client/api/useUpdateClientInfo.ts";
import AddClientDto from "@/modules/ClientList/types/addClient.dto.ts";
import getStatusToRes from "@/helpers/getStatusToRes.ts";
import getBirthdayFromDate from "@/helpers/getBirthdayFromDate.ts";
import DropdownInput from "@/ui/DropdownInput.tsx";
import clientStatus from "@/modules/ClientList/types/clientStatus.ts";
import clientType from "@/modules/ClientList/types/clientType.ts";
import * as yup from "yup";
import AlertComponent from "@/ui/AlertComponent.tsx";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationsSchema = yup.object().shape({
  type: yup.string().required("Введите тип").min(2, "Неверно введён"),
  phone: yup
    .string()
    .required("Выберите телефон")
    .min(2, "Неверно введён")
    .matches(phoneRegExp),
  name: yup.string().required("Введите имя").min(2, "Неверно введён"),
  address: yup.string().required("Введите адрес").min(2, "Неверно введён"),
});
interface InputProps {
  isInput: boolean;
  text: string;
  name: string;
  isError: boolean;
  type?: string;
  label: string;
  className?: string;
}
const InputOrText = ({
  isInput,
  text,
  name,
  isError,
  label,
  type,
  className,
}: InputProps) => {
  return (
    <div className="flex items-center">
      <div className="w-5/12 font-semibold">{label}</div>
      <div className="w-7/12 h-12 flex items-center">
        {isInput ? (
          <TextInput
            className={"w-full" + " " + className}
            type={type}
            name={name}
            isError={isError}
            placeholder={text}
          />
        ) : (
          <span className="px-4 border border-white">{text}</span>
        )}
      </div>
    </div>
  );
};
interface ClientInfoValues {
  status: clientStatus | "";
  type: clientType | "";
  phone: string;
  name: string;
  address: string;
  birthday: Date | null;
  id: number;
}
function ClientInfo() {
  const [isEditable, setIsEditable] = useState(false);
  const { id } = useParams();
  const { data, refetch, isPending, isError } = useGetClientInfo(id ? +id : 0);
  const updateClient = useUpdateClient(id ? +id : 0);
  const navigate = useNavigate();
  const [alertIsShowing, setAlertIsShowing] = useState(false);

  useEffect(() => {
    if (isError && !isPending) navigate("/");
    if (!updateClient.isPending && updateClient.isError) {
      setAlertIsShowing(true);
      setTimeout(() => setAlertIsShowing(false), 5000);
    }
    if (!updateClient.isPending && updateClient.isSuccess) {
      refetch();
    }
  }, [updateClient, isError, isPending]);

  const user: ClientInfoType = {
    id: data?.data.id,
    balance: +data?.data.balance,
    limit: +data?.data.limit,
    birthday:
      data?.data.birthday &&
      new Date(
        +data?.data.birthday.slice(0, 4),
        +data?.data.birthday.slice(5, 7),
        +data?.data.birthday.slice(8, 10),
      ),
    name: data?.data.name,
    client_type: data?.data.client_type === "legal" ? "Юр. лицо" : "Физ. лицо",
    phone: data?.data.phone,
    status: getStatusFromRes(data?.data.status),
    address: data?.data.connection_address,
  };

  const initialValues: ClientInfoValues = {
    status: user.status,
    type: user.client_type,
    phone: user.phone,
    name: user.name,
    address: user.address,
    birthday: user.birthday,
    id: user.id,
  };

  const handleEdit = (body: ClientInfoValues) => {
    if (!isEditable) setIsEditable(true);
    else {
      let data: AddClientDto;
      if (body.type === "Физ. лицо") {
        data = {
          birthday: getBirthdayFromDate(body.birthday as Date),
          client_type: "individual",
          phone: body.phone,
          connection_address: body.address,
          name: body.name,
        };
      } else {
        data = {
          client_type: "legal",
          phone: body.phone,
          connection_address: body.address,
          name: body.name,
        };
      }
      updateClient.mutate(data);
      setIsEditable(false);
    }
  };
  const statuses: clientStatus[] = [
    "Активен",
    "Приостановлено",
    "Подключение",
    "Блокировка",
    "Расторгнут",
  ];

  if (isPending)
    return (
      <div className="w-7/12 min-h-full bg-white rounded-xl flex justify-center items-center">
        <span className="loading-lg"></span>
      </div>
    );
  return (
    <Formik
      onSubmit={(values) => handleEdit(values)}
      validationSchema={validationsSchema}
      initialValues={initialValues}
    >
      {({ values, setFieldTouched, setFieldValue, errors, touched }) => (
        <Form className="w-7/12 min-h-full bg-white rounded-xl flex gap-10 px-6 py-6">
          <div className="w-8/12 flex flex-col gap-2">
            <h2 className="font-semibold text-2xl">Контактные данные</h2>
            <InputOrText
              label="ФИО:"
              name="name"
              isInput={isEditable}
              text={values.name}
              isError={!!(errors.name && touched.name)}
            />
            <div className="flex items-center">
              <div className="w-5/12 font-semibold">Тип:</div>
              <div className="w-7/12 h-12 flex items-center">
                {isEditable ? (
                  <DropdownInput
                    error={!!(touched.type && values.type === "")}
                    className="w-full"
                    items={["Физ. лицо", "Юр. лицо"]}
                    placeholder={"Тип"}
                    onClick={(val) => {
                      setFieldTouched("type");
                      setFieldValue("type", val);
                    }}
                  >
                    {values.type === "" ? "Тип" : values.type}
                  </DropdownInput>
                ) : (
                  <span className="px-4">{values.type}</span>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-5/12 font-semibold">Статус:</div>
              <div className={`w-7/12 h-12 flex items-center `}>
                {isEditable ? (
                  <DropdownInput
                    placeholder="Статус"
                    items={statuses}
                    className="w-full"
                    error={values.status === "" && touched.status}
                    onClick={(val) => {
                      setFieldTouched("status");
                      setFieldValue("status", val);
                    }}
                  >
                    {values.status !== "" ? values.status : "Статус"}
                  </DropdownInput>
                ) : (
                  <span className={`px-4 ${getColorByStatus(user.status)}`}>
                    {user.status}
                  </span>
                )}
              </div>
            </div>
            {values.type === "Физ. лицо" && (
              <div className="flex items-center">
                <div className="w-5/12 font-semibold">День рождения:</div>
                <div className="w-7/12 h-12 flex items-center">
                  {isEditable ? (
                    <DateInput name="birthday" />
                  ) : (
                    <span className="px-4">{`${
                      values.birthday &&
                      values.birthday.getDate() +
                        "." +
                        (values.birthday.getMonth() + 1) +
                        "." +
                        values.birthday.getFullYear()
                    }`}</span>
                  )}
                </div>
              </div>
            )}
            <InputOrText
              label="Адрес подключения:"
              name="address"
              isInput={isEditable}
              text={values.address}
              isError={!!(errors.address && touched.address)}
            />{" "}
            <InputOrText
              label="Телефон"
              name="phone"
              isInput={isEditable}
              text={values.phone}
              isError={!!(errors.phone && touched.phone)}
            />
            <button
              type="submit"
              className="btn  border-0 btn-neutral bg-blue text-white"
            >
              {isEditable ? "Сохранить" : "Редактировать"}
            </button>
          </div>
          <div className="w-4/12 h-32 flex flex-col gap-8 items-center justify-center rounded-xl bg-gray text-blue">
            <span className="flex gap-6 items-center">
              <h2 className="text-xl font-bold">Баланс:</h2>
              {user.balance}
            </span>
            <span className="flex gap-6 items-center">
              <h2 className="text-xl font-bold">Лимит:</h2>
              {user.limit}
            </span>
          </div>
          {updateClient.isError ? (
            <AlertComponent className={`alert-error`} active={alertIsShowing}>
              <>
                <h2 className="prose-md font-bold">
                  Не удалось обновить информацию!
                </h2>
                <p className="prose-sm">{`Проверьте введённые данные ещё раз`}</p>
              </>
            </AlertComponent>
          ) : null}
        </Form>
      )}
    </Formik>
  );
}

export default ClientInfo;

import { Form, Formik } from "formik";
import TextInput from "@/ui/TextInput.tsx";
import { useParams } from "react-router-dom";
import { useGetExpenses } from "@/modules/Client/api/useGetExpenses.ts";
import { useAddExpense } from "@/modules/Client/api/useAddExpense.ts";
import AddExpenseDto, {
  ResponseServiceType,
  ResponseServiceTypeEnglish,
} from "@/modules/Client/types/addExpense.dto.ts";
import DropdownInput from "@/ui/DropdownInput.tsx";
import getServiceToRes from "@/helpers/getServiceToRes.ts";
import { useDeleteExpense } from "@/modules/Client/api/useDeleteExpense.ts";
import getServiceFromRes from "@/helpers/getServiceFromRes.ts";
import * as yup from "yup";

const validationsSchema = yup.object().shape({
  service: yup.string().required("Введите тип").min(2, "Неверно введён"),
  sum: yup.string().required("Введите сумму").min(1, "Неверно введён"),
});
const ServiceComponent = ({ name = "", sum = 0, id = 0 }) => {
  const { mutate, isSuccess } = useDeleteExpense(id);
  if (isSuccess) return null;
  return (
    <div className="flex border-b border-gray py-3">
      <span className="w-5/12">{name}</span>
      <span className="w-5/12">{sum}</span>
      <span className="w-2/12 link link-error" onClick={() => mutate()}>
        Удалить
      </span>
    </div>
  );
};
interface initialValuesInterface {
  service: "" | ResponseServiceType;
  sum: string;
}
function ClientServices() {
  const { id } = useParams();
  const { data, isPending } = useGetExpenses(id ? +id : 0);
  const addExpense = useAddExpense();
  const initialValues: initialValuesInterface = {
    service: "",
    sum: "",
  };

  const handleAddExpense = (body: initialValuesInterface) => {
    const data: AddExpenseDto = {
      amount: body.sum,
      is_cycle: true,
      period: "1 m",
      services: getServiceToRes(body.service),
      client: id ? +id : 0,
    };
    addExpense.mutate(data);
  };

  const servicesEnum: ResponseServiceType[] = [
    "Видеонаблюдение",
    "Домофония",
    "Интернет",
    "Оборудование",
    "Телефонная связь",
    "Хостинг веб-ресурсов",
    "Подписка на программное обеспечение",
    "Телевидение",
  ];

  const services = data?.data.filter(
    ({ is_cycle }: { is_cycle: boolean }) => is_cycle,
  );
  if (isPending)
    return (
      <div className="w-7/12 min-h-full bg-white rounded-xl flex justify-center items-center">
        <span className="loading-lg"></span>
      </div>
    );
  return (
    <Formik
      validationSchema={validationsSchema}
      onSubmit={(values) => handleAddExpense(values)}
      initialValues={initialValues}
    >
      {({ values, setFieldTouched, errors, setFieldValue, touched }) => (
        <Form className="w-7/12 min-h-full bg-white rounded-xl flex flex-col gap-4 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-2xl">Услуги</h2>
            <details className="dropdown dropdown-end ml-auto">
              <summary className="btn border-0 btn-neutral bg-blue text-white">
                Добавить услугу
              </summary>
              <div className="dropdown-content  z-[1] p-2 shadow bg-base-100 rounded-box w-80 gap-4 flex flex-col ">
                <h2 className="text-lg font-semibold">Информация</h2>
                <DropdownInput
                  items={servicesEnum}
                  placeholder="Сервис"
                  error={!!(touched.service && values.service === "")}
                  onClick={(val: string) => {
                    setFieldValue("service", val);
                    setFieldTouched("service");
                  }}
                >
                  {values.service === "" ? "Сервис" : values.service}
                </DropdownInput>

                <TextInput
                  name="sum"
                  type="number"
                  placeholder="Стоимость"
                  isError={!!(errors.sum && touched.sum)}
                ></TextInput>

                <button
                  type="submit"
                  className="btn border-0 mt-4 text-xl bg-blue text-white btn-neutral"
                >
                  {addExpense.isPending ? (
                    <span className="loading"></span>
                  ) : (
                    "Добавить"
                  )}
                </button>
              </div>
            </details>
          </div>
          <div className="flex flex-col">
            {services?.length === 0 || !services ? (
              <div className="mx-auto text-dark-gray mt-36">
                Добавьте услугу
              </div>
            ) : (
              <div className="flex font-semibold py-4">
                <span className="w-5/12">Название</span>
                <span className="w-5/12">Сумма</span>
              </div>
            )}

            {services.map(
              (el: {
                services: ResponseServiceTypeEnglish;
                id: number;
                amount: number;
              }) => (
                <ServiceComponent
                  key={el.id + "service"}
                  name={getServiceFromRes(el?.services)}
                  id={el?.id}
                  sum={el?.amount}
                />
              ),
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ClientServices;

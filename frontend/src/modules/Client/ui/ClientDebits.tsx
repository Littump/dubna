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
  debit: yup.string().required("Введите тип").min(2, "Неверно введён"),
  sum: yup.string().required("Введите сумму").min(1, "Неверно введён"),
});
const DebitComponent = ({ name = "", sum = 0, id = 0 }) => {
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
  debit: "" | ResponseServiceType;
  sum: string;
}
function ClientDebits() {
  const { id } = useParams();
  const { data, isPending } = useGetExpenses(id ? +id : 0);
  const addExpense = useAddExpense();
  const initialValues: initialValuesInterface = {
    debit: "",
    sum: "",
  };

  const handleAddExpense = (body: initialValuesInterface) => {
    const data: AddExpenseDto = {
      amount: body.sum,
      services: getServiceToRes(body.debit),
      client: id ? +id : 0,
      is_cycle: false,
    };
    addExpense.mutate(data);
  };

  const servicesEnum: ResponseServiceType[] = [
    "Видеонаблюдение",
    "Домофония",
    "Интернет",
    "Корректировка",
    "Оборудование",
    "Телефонная связь",
    "Хостинг веб-ресурсов",
    "Подписка на программное обеспечение",
    "Телевидение",
  ];

  const debits = data?.data.filter(
    ({ is_cycle }: { is_cycle: boolean }) => !is_cycle,
  );
  if (isPending)
    return (
      <div className="w-7/12 min-h-full bg-white rounded-xl flex justify-center items-center">
        <span className="loading-lg"></span>
      </div>
    );
  return (
    <Formik
      validationsSchema={validationsSchema}
      onSubmit={(values) => {
        handleAddExpense(values);
      }}
      initialValues={initialValues}
    >
      {({ values, setFieldTouched, setFieldValue, touched }) => (
        <Form className="w-7/12 min-h-full bg-white rounded-xl flex flex-col gap-4 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-2xl">Списания</h2>
            <details className="dropdown dropdown-end ml-auto">
              <summary className="btn border-0 btn-neutral bg-blue text-white">
                Добавить списание
              </summary>
              <div className="dropdown-content  z-[1] p-2 shadow bg-base-100 rounded-box w-80 gap-4 flex flex-col ">
                <h2 className="text-lg font-semibold">Информация</h2>
                <DropdownInput
                  items={servicesEnum}
                  placeholder="Списания"
                  error={!!(touched.debit && values.debit === "")}
                  onClick={(val: string) => {
                    setFieldTouched("debit");
                    setFieldValue("debit", val);
                  }}
                >
                  {values.debit === "" ? "Списания" : values.debit}
                </DropdownInput>

                <TextInput
                  name="sum"
                  type="number"
                  placeholder="Стоимость"
                  isError={!!(values.sum === "" && touched.sum)}
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
            <div className="flex font-semibold py-4">
              <span className="w-5/12">Название</span>
              <span className="w-5/12">Сумма</span>
            </div>

            {debits.map(
              (el: {
                services: ResponseServiceTypeEnglish;
                id: number;
                amount: number;
              }) => (
                <DebitComponent
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

export default ClientDebits;

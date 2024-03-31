import { Form, Formik } from "formik";
import TextInput from "@/ui/TextInput.tsx";
import { useParams } from "react-router-dom";
import DropdownInput from "@/ui/DropdownInput.tsx";
import AddPaymentDto, {
  PaymentType,
  PaymentTypeEnglish,
} from "@/modules/Client/types/addPayment.dto.ts";
import { useGetPayments } from "@/modules/Client/api/useGetPayments.ts";
import getPaymentTypeToRes from "@/helpers/getPaymentTypeToRes.ts";
import { useAddPayment } from "@/modules/Client/api/useAddPayment.ts";
import { useDeletePayment } from "@/modules/Client/api/useDeletePayment.ts";
import getPaymentTypeFromRes from "@/helpers/getPaymentTypeFromRes.ts";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  paymentType: yup.string().required("Введите тип").min(2, "Неверно введён"),
  sum: yup.string().required("Введите сумму").min(1, "Неверно введён"),
});
const PaymentComponent = ({ name = "", sum = 0, date = "", id = 0 }) => {
  const { mutate, isSuccess } = useDeletePayment(id);
  if (isSuccess) return null;
  return (
    <div className="flex border-b border-gray py-3">
      <span className="w-4/12">{name}</span>
      <span className="w-3/12">{sum}</span>
      <span className="w-3/12">{date}</span>
      <span className="w-2/12 link link-error" onClick={() => mutate()}>
        Удалить
      </span>
    </div>
  );
};
interface initialValuesInterface {
  paymentType: "" | PaymentType;
  sum: string;
}
function ClientServices() {
  const { id } = useParams();
  const { data, isPending } = useGetPayments(id ? +id : 0);
  const addPayment = useAddPayment();
  const initialValues: initialValuesInterface = {
    paymentType: "",
    sum: "",
  };

  const handleAddPayment = (body: initialValuesInterface) => {
    const data: AddPaymentDto = {
      amount: body.sum,
      type: getPaymentTypeToRes(body.paymentType),
      client: id ? +id : 0,
    };
    addPayment.mutate(data);
  };

  const paymentsEnum: PaymentType[] = [
    "QR-код",
    "Автоплатеж",
    "Банковский платеж",
    "Картой",
    "Корректировка",
    "Наличными",
    "Почта России",
    "Сбер-онлайн",
    "СПБ",
  ];

  const services = data?.data;
  if (isPending)
    return (
      <div className="w-7/12 min-h-full bg-white rounded-xl flex justify-center items-center">
        <span className="loading-lg"></span>
      </div>
    );
  return (
    <Formik
      validationsSchema={validationSchema}
      onSubmit={(values) => handleAddPayment(values)}
      initialValues={initialValues}
    >
      {({ values, setFieldTouched, setFieldValue, touched }) => (
        <Form className="w-7/12 min-h-full bg-white rounded-xl flex flex-col gap-4 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-2xl">Платежи</h2>
            <details className="dropdown dropdown-end ml-auto">
              <summary className="btn border-0 btn-neutral bg-blue text-white">
                Добавить платёж
              </summary>
              <div className="dropdown-content  z-[1] p-2 shadow bg-base-100 rounded-box w-80 gap-4 flex flex-col ">
                <h2 className="text-lg font-semibold">Информация</h2>
                <DropdownInput
                  items={paymentsEnum}
                  placeholder="Сервис"
                  error={!!(touched.paymentType && values.paymentType === "")}
                  onClick={(val: string) => {
                    setFieldTouched("paymentType");
                    setFieldValue("paymentType", val);
                  }}
                >
                  {values.paymentType === ""
                    ? "Тип платежа"
                    : values.paymentType}
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
                  {addPayment.isPending ? (
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
                Добавьте платёж
              </div>
            ) : (
              <div className="flex font-semibold py-4">
                <span className="w-4/12">Тип</span>
                <span className="w-3/12">Сумма</span>
                <span className="w-3/12">Дата</span>
              </div>
            )}

            {services.map(
              (el: {
                type: PaymentTypeEnglish;
                id: number;
                date: string;
                amount: number;
              }) => (
                <PaymentComponent
                  key={"payment" + el.id}
                  name={getPaymentTypeFromRes(el?.type)}
                  id={el?.id}
                  date={el?.date.slice(0, 10)}
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

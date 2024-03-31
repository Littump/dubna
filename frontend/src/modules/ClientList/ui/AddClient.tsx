import { Form, Formik } from "formik";
import AddClientChooseType from "@/modules/ClientList/ui/AddClientChooseType.tsx";
import AddClientForm from "@/modules/ClientList/ui/AddClientForm.tsx";
import AddClientFinal from "@/modules/ClientList/ui/AddClientFinal.tsx";
import ClientType from "@/modules/ClientList/types/clientType.ts";
import Modal from "@/ui/Modal.tsx";
import { useEffect, useState } from "react";
import { useAddClient } from "@/modules/ClientList/api/addClient.ts";
import AddClientDto from "@/modules/ClientList/types/addClient.dto.ts";
import getBirthdayFromDate from "@/helpers/getBirthdayFromDate.ts";
import * as yup from "yup";
import AlertComponent from "@/ui/AlertComponent.tsx";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationsSchema = yup.object().shape({
  type: yup.string().required("Введите тип"),
  name: yup.string().required("Введите данные"),
  phone: yup
    .string()
    .required("Введите данные")
    .min(11, "Неверно введён")
    .max(11, "Неверно введён")
    .matches(phoneRegExp),
  address: yup.string().required("Введите адрес").min(4, "Неверно введён"),
});
export interface addClientValuesInterface {
  step: "chooseType" | "form" | "final";
  type: ClientType | "";
  name: string;
  birthday: Date;
  phone: string;
  address: string;
}

interface Props {
  refetch: () => void;
}

function AddClient({ refetch }: Props) {
  const { mutate, isPending, isSuccess, isError } = useAddClient();
  const [alertIsShowing, setAlertIsShowing] = useState(false);

  useEffect(() => {
    if (!isPending && isSuccess) {
      refetch();
    }
    if (!isPending && isError) {
      setAlertIsShowing(true);
      setTimeout(() => setAlertIsShowing(false), 5000);
    }
  }, [isPending, isError, isSuccess]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const initialValues: addClientValuesInterface = {
    step: "chooseType",
    type: "",
    name: "",
    birthday: new Date(),
    phone: "",
    address: "",
  };

  const handleSubmit = (body: addClientValuesInterface) => {
    let data: AddClientDto;
    if (body.type === "Физ. лицо") {
      data = {
        birthday: getBirthdayFromDate(body.birthday),
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
    mutate(data);
  };
  useEffect(() => {
    if (!isError && isSuccess && !isPending) {
      setShowResult(true);
    }
  }, [isError, isPending, isSuccess]);
  return (
    <Formik
      validationSchema={validationsSchema}
      onSubmit={(values) => handleSubmit(values)}
      initialValues={initialValues}
    >
      {({ values, setFieldTouched, setFieldValue, errors, touched }) => (
        <Form className="w-2/12 pl-4">
          <Modal
            isModalOpen={isModalOpen}
            setIsModalOpen={() => {
              setIsModalOpen((prev) => !prev);
              setTimeout(() => setFieldValue("step", "chooseType"), 220);
            }}
            heading={
              <>
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>{" "}
                <span>Добавить</span>
              </>
            }
          >
            {values.step === "chooseType" ? (
              <AddClientChooseType
                values={values}
                setFieldValue={setFieldValue}
              />
            ) : values.step === "form" ? (
              <AddClientForm
                setFieldTouched={setFieldTouched}
                values={values}
                errors={errors}
                touched={touched}
                isPhysical={values.type === "Физ. лицо"}
                setFieldValue={setFieldValue}
                handleSubmit={() => handleSubmit(values)}
                showResult={showResult}
                isPending={isPending}
                setShowResult={setShowResult}
              />
            ) : (
              <AddClientFinal />
            )}
          </Modal>
          {isError ? (
            <AlertComponent className={`alert-error`} active={alertIsShowing}>
              <>
                <h2 className="prose-md font-bold">
                  Не удалось добавить клиента!
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

export default AddClient;

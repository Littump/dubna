import { Form, Formik } from "formik";
import AddClientChooseType from "@/modules/ClientList/ui/AddClientChooseType.tsx";
import AddClientForm from "@/modules/ClientList/ui/AddClientForm.tsx";
import AddClientFinal from "@/modules/ClientList/ui/AddClientFinal.tsx";
import ClientType from "@/modules/ClientList/types/clientType.ts";
import Modal from "@/ui/Modal.tsx";
import { useEffect, useState } from "react";
import { useAddClient } from "@/modules/ClientList/api/addClient.ts";
import AddClientDto from "@/modules/ClientList/types/addClient.dto.ts";
import clientStatus from "@/modules/ClientList/types/clientStatus.ts";
import getStatusToRes from "@/helpers/getStatusToRes.ts";
import getBirthdayFromDate from "@/helpers/getBirthdayFromDate.ts";
import * as yup from "yup";
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
  status: yup.string().required("Введите статус").min(4, "Неверно введён"),
  address: yup.string().required("Введите адрес").min(4, "Неверно введён"),
});
export interface addClientValuesInterface {
  step: "chooseType" | "form" | "final";
  type: ClientType | "";
  name: string;
  birthday: Date;
  phone: string;
  status: clientStatus | "";
  address: string;
}

function AddClient() {
  const { mutate, isPending, isSuccess, isError } = useAddClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const initialValues: addClientValuesInterface = {
    step: "chooseType",
    type: "",
    name: "",
    birthday: new Date(),
    phone: "",
    status: "",
    address: "",
  };

  const handleSubmit = (body: addClientValuesInterface) => {
    let data: AddClientDto;
    if (body.type === "Физ. лицо") {
      data = {
        birthday: getBirthdayFromDate(body.birthday),
        client_type: "individual",
        phone: body.phone,
        status: getStatusToRes(body.status),
        connection_address: body.address,
        name: body.name,
      };
    } else {
      data = {
        client_type: "legal",
        phone: body.phone,
        status: getStatusToRes(body.status),
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
      onSubmit={() => {}}
      initialValues={initialValues}
    >
      {({ values, setFieldTouched, setFieldValue, errors, touched }) => (
        <Form className="w-2/12">
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
        </Form>
      )}
    </Formik>
  );
}

export default AddClient;

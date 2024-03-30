import { Form, Formik } from "formik";
import AddClientChooseType from "@/modules/ClientList/ui/AddClientChooseType.tsx";
import AddClientForm from "@/modules/ClientList/ui/AddClientForm.tsx";
import AddClientFinal from "@/modules/ClientList/ui/AddClientFinal.tsx";
import ClientType from "@/modules/ClientList/types/clientType.ts";
import Modal from "@/ui/Modal.tsx";
import { useState } from "react";
import setFieldValueType from "@/modules/ClientList/types/setFieldValueType.ts";

export interface addClientValuesInterface {
  step: "chooseType" | "form" | "final";
  type: ClientType | "";
  name: string;
  birthday: string;
  phone: string;
  mail: string;
  address: string;
}

function AddClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialValues: addClientValuesInterface = {
    step: "chooseType",
    type: "",
    name: "",
    birthday: "",
    phone: "",
    mail: "",
    address: "",
  };
  return (
    <Formik onSubmit={() => {}} initialValues={initialValues}>
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="w-2/12">
          <Modal
            isModalOpen={isModalOpen}
            setIsModalOpen={() => {
              setIsModalOpen((prev) => !prev);
              setTimeout(() => setFieldValue("step", "chooseType"), 220);
              set;
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
                errors={errors}
                touched={touched}
                isPhysical={values.type === "Физ. лицо"}
                setFieldValue={setFieldValue}
              />
            ) : (
              <AddClientFinal
                setIsModalOpen={setIsModalOpen}
                setFieldValue={setFieldValue}
              />
            )}
          </Modal>
        </Form>
      )}
    </Formik>
  );
}

export default AddClient;

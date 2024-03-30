import ClientMinInfoType from "@/modules/ClientList/types/clientMinInfoType.ts";
import { Formik, Form } from "formik";
import clientStatus from "@/modules/ClientList/types/clientStatus.ts";
import clientType from "@/modules/ClientList/types/clientType.ts";
import ClientFilters from "@/modules/ClientList/ui/ClientFilters.tsx";
import ClientListHeader from "@/modules/ClientList/ui/ClientListHeader.tsx";
import ClientsTable from "@/modules/ClientList/ui/ClientsTable.tsx";

export interface FiltersInitialValues {
  searchInput: string;
  status: clientStatus | "";
  type: clientType | "";
}

const ClientList = () => {
  const clientList: ClientMinInfoType[] = [
    {
      name: "Николаев Н. К.",
      status: "Активен",
      type: "Физ. лицо",
      mail: "email@dubna.ru",
      phone: "89602223344",
      id: 1,
    },
    {
      name: "Study",
      status: "Подключение",
      type: "Юр. лицо",
      mail: "email@dubna.ru",
      phone: "89602223344",
      id: 2,
    },
    {
      name: "Study2",
      status: "Расторгнут",
      type: "Юр. лицо",
      mail: "email@dubna.ru",
      phone: "89602223344",
      id: 3,
    },
    {
      name: "Иван Иванов",
      status: "Блокировка",
      type: "Физ. лицо",
      mail: "email@dubna.ru",
      phone: "89602223344",
      id: 4,
    },
    {
      name: "Вася Иванов",
      status: "Приостановлено",
      type: "Физ. лицо",
      mail: "email@dubna.ru",
      phone: "89602223344",
      id: 5,
    },
  ];

  //для поиска и фильтрации
  const initialValues: FiltersInitialValues = {
    searchInput: "",
    status: "",
    type: "",
  };
  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values, setFieldValue }) => (
        <div className="w-full flex flex-col gap-8">
          <Form>
            <ClientFilters setFieldValue={setFieldValue} values={values} />
          </Form>
          <ClientListHeader />
          <ClientsTable
            list={clientList
              .filter((el) => {
                if (values.status === "") return true;
                else return el.status === values.status;
              })
              .filter((el) => {
                if (values.type === "") return true;
                else return el.type === values.type;
              })
              .filter((el) => {
                if (values.searchInput === "") return true;
                else
                  return (
                    el.name
                      .toLowerCase()
                      .indexOf(values.searchInput.toLowerCase()) !== -1 ||
                    el.mail
                      .toLowerCase()
                      .indexOf(values.searchInput.toLowerCase()) !== -1
                  );
              })}
          />
        </div>
      )}
    </Formik>
  );
};

export default ClientList;

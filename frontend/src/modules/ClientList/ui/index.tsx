import ClientMinInfoType from "@/modules/ClientList/types/clientMinInfoType.ts";
import { Formik, Form } from "formik";
import clientStatus from "@/modules/ClientList/types/clientStatus.ts";
import clientType from "@/modules/ClientList/types/clientType.ts";
import ClientFilters from "@/modules/ClientList/ui/ClientFilters.tsx";
import ClientListHeader from "@/modules/ClientList/ui/ClientListHeader.tsx";
import ClientsTable from "@/modules/ClientList/ui/ClientsTable.tsx";
import { useGetClients } from "@/modules/ClientList/api/useGetClients.ts";

import ClientResponseType from "@/modules/ClientList/types/clientInfoType.ts";
import getStatusFromRes from "@/helpers/getStatusFromRes.ts";
import { ClientInfoTypeEnglish } from "@/modules/Client/types/clientInfoType.ts";

export interface FiltersInitialValues {
  searchInput: string;
  status: clientStatus | "";
  type: clientType | "";
}

const ClientList = () => {
  const { data, refetch } = useGetClients();
  console.log(data);
  const clients: ClientInfoTypeEnglish[] = data?.data;
  const summaryData = {
    all: clients?.length | 0,
    legal: clients?.reduce(
      (accumulator: number, currentValue) =>
        accumulator + +(currentValue.client_type === "legal"),
      0,
    ),
    individual: clients?.reduce(
      (accumulator: number, currentValue) =>
        accumulator + +(currentValue.client_type === "individual"),
      0,
    ),
    statusActive: clients?.reduce(
      (accumulator: number, currentValue) =>
        accumulator + +(currentValue.status === "active"),
      0,
    ),
    statusAnnulled: clients?.reduce(
      (accumulator: number, currentValue) =>
        accumulator + +(currentValue.status === "annulled"),
      0,
    ),
    statusBanned: clients?.reduce(
      (accumulator: number, currentValue) =>
        accumulator + +(currentValue.status === "banned"),
      0,
    ),
    statusConnecting: clients?.reduce(
      (accumulator: number, currentValue) =>
        accumulator + +(currentValue.status === "connecting"),
      0,
    ),
    statusStopped: clients?.reduce(
      (accumulator: number, currentValue) =>
        accumulator + +(currentValue.status === "stopped"),
      0,
    ),
  };

  console.log(summaryData);
  const clientList: ClientMinInfoType[] = data?.data.map(
    (el: ClientResponseType) => ({
      name: el.name,
      status: getStatusFromRes(el.status),
      type: el.client_type === "legal" ? "Юр. лицо" : "Физ. лицо",
      address: el.connection_address,
      phone: el.phone,
      id: el.id,
    }),
  );

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
            <ClientFilters
              summaryData={summaryData}
              setFieldValue={setFieldValue}
              values={values}
            />
          </Form>
          <ClientListHeader refetch={refetch} />
          <ClientsTable
            list={
              clientList &&
              clientList
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
                      el.address
                        .toLowerCase()
                        .indexOf(values.searchInput.toLowerCase()) !== -1 ||
                      el.phone
                        .toLowerCase()
                        .indexOf(values.searchInput.toLowerCase()) !== -1
                    );
                })
            }
          />
        </div>
      )}
    </Formik>
  );
};

export default ClientList;

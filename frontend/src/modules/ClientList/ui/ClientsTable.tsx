import ClientMinInfoType from "@/modules/ClientList/types/clientMinInfoType.ts";
import ClientItem from "@/modules/ClientList/ui/ClientItem.tsx";

interface Props {
  list: ClientMinInfoType[] | [];
}

const ClientsTable = ({ list }: Props) => {
  return (
    <div className="flex flex-col rounded-xl">
      {list && list.map((el) => <ClientItem key={el.id + "client"} {...el} />)}
    </div>
  );
};

export default ClientsTable;

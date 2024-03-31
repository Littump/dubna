import AddClient from "@/modules/ClientList/ui/AddClient.tsx";

interface Props {
  refetch: () => void;
}

const ClientListHeader = ({ refetch }: Props) => {
  return (
    <div className="font-semibold flex items-center w-full ">
      <div className="flex w-10/12 bg-white border-b border-gray-dropdown text-center">
        <div className="w-3/12 py-8 flex justify-center items-center text-center">
          Наименования
        </div>
        <div className="w-2/12 py-8 flex justify-center items-center text-center">
          Статус
        </div>
        <div className="w-2/12 py-8 flex justify-center items-center text-center">
          Тип
        </div>
        <div className="w-2/12 py-8 flex justify-center items-center text-center">
          Адрес
        </div>
        <div className="w-3/12 py-8 flex justify-center items-center text-center">
          Номер телефона
        </div>
      </div>
      <AddClient refetch={refetch} />
    </div>
  );
};

export default ClientListHeader;

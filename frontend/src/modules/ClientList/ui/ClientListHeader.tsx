import AddClient from "@/modules/ClientList/ui/AddClient.tsx";

const ClientListHeader = () => {
  return (
    <div className="font-semibold flex items-center w-full gap-4 ">
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
          Почта
        </div>
        <div className="w-3/12 py-8 flex justify-center items-center text-center">
          Номер телефона
        </div>
      </div>
      <AddClient />
    </div>
  );
};

export default ClientListHeader;

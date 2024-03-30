import ClientMinInfoType from "@/modules/ClientList/types/clientMinInfoType.ts";
import getColorByStatus from "@/helpers/getColorByStatus.ts";
import { NavLink } from "react-router-dom";

function ClientItem({
  status,
  mail,
  name,
  type,
  phone,
  id,
}: ClientMinInfoType) {
  return (
    <div className="font-semibold flex items-center w-full gap-4">
      <NavLink
        to={`/client/${id}`}
        className="flex w-10/12 bg-white border-b border-gray-dropdown hover:scale-[102%] transition"
      >
        <div className="w-3/12 py-8 bg-white flex justify-center items-center text-center">
          {name}
        </div>
        <div
          className={`w-2/12 py-8 flex bg-white justify-center items-center text-center ${getColorByStatus(
            status,
          )}`}
        >
          {status}
        </div>
        <div className="w-2/12 py-8 flex bg-white justify-center items-center text-center">
          {type}
        </div>
        <div className="w-2/12 py-8 flex bg-white justify-center items-center text-center">
          {mail}
        </div>
        <div className="w-3/12 py-8 flex bg-white justify-center items-center text-center">
          {phone}
        </div>
      </NavLink>
      <button className="link text-dark-gray text-center w-2/12 transition hover:text-blue">
        Удалить
      </button>
    </div>
  );
}

export default ClientItem;

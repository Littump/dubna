import ClientMinInfoType from "@/modules/ClientList/types/clientMinInfoType.ts";
import getColorByStatus from "@/helpers/getColorByStatus.ts";
import { NavLink } from "react-router-dom";
import { useDeleteClient } from "@/modules/ClientList/api/deleteClient.ts";

function ClientItem({
  status,
  address,
  name,
  type,
  phone,
  id,
}: ClientMinInfoType) {
  const { mutate, isSuccess } = useDeleteClient();
  if (isSuccess) return null;
  return (
    <div className="font-semibold flex items-center w-full gap-4">
      <NavLink
        to={`/client/${id}/info`}
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
        <div className="w-2/12 text-sm py-8 flex bg-white justify-center items-center text-center">
          {address.slice(0, 28)}...
        </div>
        <div className="w-3/12 py-8 text-sm flex bg-white justify-center items-center text-center">
          {phone}
        </div>
      </NavLink>
      <div className="dropdown ">
        <div
          role="button"
          tabIndex={0}
          className="link text-dark-gray text-center w-2/12 transition hover:text-blue"
        >
          Удалить
        </div>
        <div
          tabIndex={0}
          className="dropdown-content text-dark-gray z-[1] menu py-2 px-4 shadow bg-base-100 rounded-box w-40"
        >
          <span>
            Вы уверены?{" "}
            <button
              type="button"
              onClick={() => {
                mutate(id);
              }}
              className="link text-black hover:text-blue"
            >
              Да.
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ClientItem;

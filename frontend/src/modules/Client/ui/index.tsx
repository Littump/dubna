import { NavLink, Outlet } from "react-router-dom";
import ClientSidebar from "@/modules/Client/ui/ClientSidebar.tsx";

function Client() {
  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <NavLink to="/" className="gap-2 text-dark-gray flex text-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 rotate-180"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
        Назад
      </NavLink>
      <div className="flex gap-8 min-h-[440px] w-full">
        <ClientSidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default Client;

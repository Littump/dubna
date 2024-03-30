import { NavLink } from "react-router-dom";

const SidebarLink = ({ text, to }: { text: string; to: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      (isActive ? "bg-gray border-l-4 border-blue " : "border-white") +
      " text-dark-gray font-medium px-4 py-2 w-full transition hover:bg-gray border-l-4 hover:border-blue"
    }
  >
    {text}
  </NavLink>
);

function ClientSidebar() {
  return (
    <div className=" min-h-full w-4/12 bg-white rounded-xl py-4 flex flex-col gap-2">
      <SidebarLink to="info" text="Контактные данные" />
      <SidebarLink to="services" text="Услуги" />
      <SidebarLink to="payments" text="История платежей" />
      <SidebarLink to="debits" text="История списаний" />
    </div>
  );
}

export default ClientSidebar;

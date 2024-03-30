import logo from "@/assets/logo.png";

interface Props {
  showExit: boolean;
}

const Navbar = ({ showExit }: Props) => {
  const handleLeave = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="w-[100vw] z-20 flex justify-between items-center py-3 px-20 bg-white fixed top-0 left-0 backdrop-blur-2xl">
      <span className="flex gap-4 text-2xl font-semibold">
        <span className="flex gap-2">
          <img src={logo} alt="dubna" className="w-20" /> ТМПК
        </span>
        <h2>Биллинг</h2>
      </span>
      {showExit && (
        <button
          className="text-dark-gray flex items-center gap-1 transition hover:text-blue"
          onClick={() => handleLeave()}
        >
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
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
            />
          </svg>
          Выход
        </button>
      )}
    </div>
  );
};

export default Navbar;

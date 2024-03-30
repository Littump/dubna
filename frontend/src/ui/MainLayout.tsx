import Navbar from "../modules/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: JSX.Element | string;
}

function MainLayout({ children }: Props) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/login");
  }, [navigate, token]);

  return (
    <div className="w-full flex flex-col min-h-[100vh] bg-gray items-center ">
      <Navbar showExit={token !== null} />
      <div
        className={`lgw-[90vw] mt-8 w-full px-2 sm:px-6 sm:w-[85vw] mx-auto flex flex-col items-center justify-center ${
          token && "py-6 sm:py-12 md:py-16"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default MainLayout;

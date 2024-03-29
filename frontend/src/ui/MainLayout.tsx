import Navbar from "../modules/Navbar";

interface Props {
  children: JSX.Element | string;
}

const Login = () => {
  return <div>Войдите в аккаунт</div>;
};

function MainLayout({ children }: Props) {
  const token = localStorage.getItem("token");
  return (
    <div className="w-full flex flex-col justify-center items-center bg-white">
      <Navbar />
      <div className="lg:w-[80vw] xl:w-[70vw] w-full px-2 sm:px-6 sm:w-[85vw] mx-auto flex flex-col justify-center py-6 sm:py-12 md:py-16">
        {token ? children : <Login />}
      </div>
    </div>
  );
}

export default MainLayout;

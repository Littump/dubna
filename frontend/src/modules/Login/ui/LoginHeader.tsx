import loginHeader from "@/assets/loginHeader.png";
function LoginHeader() {
  return (
    <div className="rounded-xl relative bg-light-blue text-white h-24 px-4 font-medium justify-between flex w-full items-center">
      <h4 className="w-7/12 text-lg">Добро пожаловать на поисковую систему</h4>
      <img
        src={loginHeader}
        alt=""
        className=" absolute -top-7 w-36 -right-4"
      />
    </div>
  );
}

export default LoginHeader;

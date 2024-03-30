import LoginHeader from "@/modules/Login/ui/LoginHeader.tsx";
import LoginForm from "@/modules/Login/ui/LoginForm.tsx";

const Login = () => {
  return (
    <div className="flex gap-4 w-96 flex-col mt-20 ">
      <LoginHeader />
      <LoginForm />
    </div>
  );
};

export default Login;

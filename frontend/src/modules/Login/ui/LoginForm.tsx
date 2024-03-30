import { Formik } from "formik";
import { Form, useNavigate } from "react-router-dom";
import TextInput from "@/ui/TextInput.tsx";
import loginDto from "@/modules/Login/types/login.dto.ts";

const LoginForm = () => {
  const initialValues: loginDto = {
    phone: "",
    password: "",
  };

  const navigate = useNavigate();

  const handleSubmit = (values: loginDto) => {
    console.log(values);
    localStorage.setItem("token", "123");
    navigate("/");
  };

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values, errors, touched }) => (
        <Form className="py-10 px-6 bg-white rounded-xl">
          <h1 className="text-3xl font-semibold">Вход</h1>
          <div className="flex flex-col gap-4 mt-6">
            <TextInput
              name="phone"
              isError={!!(errors.phone && touched.phone)}
              placeholder="телефон"
            />
            <TextInput
              name="password"
              type="password"
              isError={!!(errors.password && touched.password)}
              placeholder="пароль"
            />
            <button
              type="submit"
              onClick={() => handleSubmit(values)}
              className={`btn text-white mt-2 bg-blue text-xl font-normal border-0 btn-neutral`}
            >
              Войти
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

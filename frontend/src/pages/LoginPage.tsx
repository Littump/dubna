import Login from "@/modules/Login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) navigate("/");
  }, [navigate, token]);
  return <Login />;
}

export default LoginPage;

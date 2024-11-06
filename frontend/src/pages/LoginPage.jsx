import React from "react";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  return (
    <section>
      <AuthForm isLogin={true} />
    </section>
  );
};

export default LoginPage;

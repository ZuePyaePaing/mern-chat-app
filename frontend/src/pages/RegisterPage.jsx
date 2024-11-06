import React from "react";
import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
  return (
    <section>
      <AuthForm  isLogin={false} />
    </section>
  );
};

export default RegisterPage;

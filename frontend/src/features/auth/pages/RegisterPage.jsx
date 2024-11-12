import React from "react";
import RegisterForm from "../components/RegisterForm";
import Container from "../../../components/Container";

const RegisterPage = () => {
  return (
    <section className=" w-full h-screen ">
      <Container className={'flex items-center justify-center'}>
        <RegisterForm />
      </Container>
    </section>
  );
};

export default RegisterPage;

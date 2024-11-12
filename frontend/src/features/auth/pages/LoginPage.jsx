import React from "react";
import LoginForm from "../components/LoginForm";
import Container from "../../../components/Container";

const LoginPage = () => {
  return (
    <section className=" w-full h-screen ">
      <Container className={'flex items-center justify-center'}>
        <LoginForm />
      </Container>
    </section>
  );
};

export default LoginPage;

import React from "react";
import Container from "../../../components/Container";
import DarkMode from "../../../components/DarkMode";
import ProfileSection from "../components/ProfileSection";

const SettingPage = () => {
  return (
    <main className="dark:bg-black bg-white grow">
      <Container>
        <ProfileSection />
        <DarkMode />
      </Container>
    </main>
  );
};

export default SettingPage;

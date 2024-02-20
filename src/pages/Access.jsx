import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginSection from "../components/LoginSection";
import RegisterSection from "../components/RegisterSection";

const AccessPage = () => {
  return (
    <section className="access-section">
      <Routes>
        <Route path="login" element={<LoginSection />} />
        <Route path="register" element={<RegisterSection />} />
      </Routes>
    </section>
  );
};

export default AccessPage;

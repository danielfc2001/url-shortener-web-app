import React from "react";
import ShortenerSection from "../components/ShortenerSection";
import AccessInfo from "../components/AccessInfo";
import ServiceStats from "../components/ServiceStats";

const Index = () => {
  return (
    <>
      <ShortenerSection />
      <div className="container-separator"></div>
      <AccessInfo />
      {/* <ServiceStats /> */}
    </>
  );
};

export default Index;

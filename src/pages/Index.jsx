import React from "react";
import ShortenerSection from "../components/IndexPageComponents/ShortenerSection";
import AccessInfo from "../components/AccessInfo";
import CommentBox from "../components/IndexPageComponents/CommentBox";

const Index = () => {
  return (
    <>
      <ShortenerSection />
      <div className="container-separator"></div>
      <h3 className="title-why-use-shortener">
        Porque usar un acortador de enlaces?...
      </h3>
      <div className="container-why-use-shortener">
        <div className="card-why-user-shortener">
          <i className="bi bi-graph-up-arrow"></i>
          <h5>Optimized performance</h5>
          <p>Understand how your links are performing</p>
        </div>
        <div className="card-why-user-shortener">
          <i className="bi bi-link-45deg"></i>
          <h5>Create branded links</h5>
          <p>Customize your links to increase brand awareness</p>
        </div>
        <div className="card-why-user-shortener">
          <i className="bi bi-shield-lock"></i>
          <h5>Secure your links</h5>
          <p>Protect your links from fraud and malware</p>
        </div>
        <div className="card-why-user-shortener">
          <i className="bi bi-globe"></i>
          <h5>Reach a global audience</h5>
          <p>Geotarget your audience with localized links</p>
        </div>
      </div>
      {/* <AccessInfo /> */}
      <CommentBox />
    </>
  );
};

export default Index;

import React from "react";
import Header from "../common/Header";
import MainNav from "../common/MainNav";
import TopNav from "../common/TopNav";
import Footer from "../common/Footer";

const MainLayout = (props) => {
  return (
    <React.Fragment>
      <div className="landing-layer">
        <div className="container">
          <TopNav />
          <Header />
        </div>
      </div>
      <MainNav />
      <main id="home-page">
        <div className="container">{props.children}</div>
      </main>
      <Footer />
    </React.Fragment>
  );
};
export default MainLayout;

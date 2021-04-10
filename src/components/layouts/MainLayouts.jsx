import React from "react";
import { withRouter } from "react-router-dom";
import Header from "../common/Header";
import MainNav from "../common/MainNav";
import TopNav from "../common/TopNav";
import Footer from "../common/Footer";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
const MainLayout = (props) => {
  const { pathname } = props.location;
  return (
    <React.Fragment>
      <Helmet>
        <title>تاپ لرن</title>
      </Helmet>
      <div className="landing-layer">
        <div className="container">
          <TopNav />
          {pathname === "/" ? <Header /> : null}
        </div>
      </div>
      <MainNav />
      <main id="home-page">
        <div className="container">{props.children}</div>
      </main>
      <Footer />
      <ToastContainer />
    </React.Fragment>
  );
};
export default withRouter(MainLayout);

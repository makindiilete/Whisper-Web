import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import NavigationPage from "../../components/NavigationPage";
import OtherLinksNav from "../../components/navs/OtherLinksNav";
import Footer from "../../components/Footer";

const OtherLinksContainer = ({ children }) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div>
      <OtherLinksNav />
      <div
        style={
          !mobile
            ? { marginTop: "-4rem", minHeight: "70vh" }
            : { minHeight: "70vh" }
        }
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default OtherLinksContainer;

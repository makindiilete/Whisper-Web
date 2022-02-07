import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import OtherLinksContainer from "./OtherLinksContainer";

const ContactPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <OtherLinksContainer>
        <h4>Contact</h4>
      </OtherLinksContainer>
    </>
  );
};

export default ContactPage;

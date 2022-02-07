import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import OtherLinksContainer from "./OtherLinksContainer";
import background from "../../assets/images/others/getInTouch.jpg";

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
        <div className="position-relative" style={{ marginTop: "-4rem" }}>
          <img
            src={background}
            style={{
              width: "100%",
              height: "39.7rem",
              objectFit: "cover",
            }}
            alt=""
            className="img-fluid"
          />
          <div className="position-absolute" style={{ top: "0" }}>
            <div
              className="w-100 d-flex align-items-center"
              style={{ height: "39.7rem" }}
            >
              <div style={!mobile ? { marginLeft: "19rem" } : null}>
                <h3 className="text-white text-center text-md-left ">
                  Get In touch
                </h3>
                {!mobile ? (
                  <p className="text-white text-center text-md-left ">
                    Ac amet proin volutpat morbi. Leo rhoncus nisi <br />{" "}
                    pretium senectus arcu interdum nullam aliquam
                  </p>
                ) : (
                  <p className="text-white text-center text-md-left ">
                    Ac amet proin volutpat morbi. Leo rhoncus nisi pretium
                    senectus arcu interdum nullam aliquam
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </OtherLinksContainer>
    </>
  );
};

export default ContactPage;

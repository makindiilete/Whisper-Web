import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import OtherLinksContainer from "./OtherLinksContainer";
import image from "../../assets/images/others/terms.png";

const TermsPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <OtherLinksContainer>
      <div
        className="position-relative"
        style={{
          marginTop: "-4rem",
          width: "100%",
          height: "27.6rem",
          backgroundColor: "#F9F2FF",
        }}
      >
        <img
          src={image}
          style={{
            width: "21.7rem",
            height: "19.2rem",
            objectFit: "cover",
            position: "absolute",
            right: mobile ? "5rem" : "15rem",
            bottom: "-9rem",
          }}
          alt=""
          className="img-fluid"
        />
        <div className="position-absolute" style={{ top: "0" }}>
          <div
            className="w-100 d-flex align-items-center"
            style={{ height: "27.6rem" }}
          >
            <div style={!mobile ? { marginLeft: "19rem" } : null}>
              <h3 className="text-center text-md-left ">Terms & Conditions</h3>
              {!mobile ? (
                <p className="text-center text-md-left ">
                  Ac amet proin volutpat morbi. Leo rhoncus nisi <br /> pretium
                  senectus arcu interdum nullam aliquam
                </p>
              ) : (
                <p className="text-center text-md-left ">
                  Ac amet proin volutpat morbi. Leo rhoncus nisi pretium
                  senectus arcu interdum nullam aliquam
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </OtherLinksContainer>
  );
};

export default TermsPage;

import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import OtherLinksContainer from "./OtherLinksContainer";
import image from "../../assets/images/others/faq.png";
import { Input } from "antd";
import Accordion from "../../components/Accordion";

const FaqPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log(query);
  };

  /*
  {
    height: 4.8rem;
    display: flex;
    align-items: center;
}
  * */

  const btnStyle = {
    height: "4.8rem",
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  };

  return (
    <OtherLinksContainer>
      <div
        className="position-relative"
        style={{
          marginTop: "-4rem",
          width: "100%",
          height: "27.6rem",
          backgroundColor: "#FFF7EF",
        }}
      >
        <img
          src={image}
          style={
            !mobile
              ? {
                  width: "21.7rem",
                  height: "19.2rem",
                  objectFit: "contain",
                  position: "absolute",
                  right: "15rem",
                  bottom: "-9rem",
                }
              : {
                  width: "12.7rem",
                  height: "10.2rem",
                  objectFit: "contain",
                  position: "absolute",
                  right: "0.5rem",
                  bottom: "-8rem",
                }
          }
          alt=""
          className="img-fluid"
        />
        <div className="position-absolute" style={{ top: "0" }}>
          <div
            className="w-100 d-flex align-items-center"
            style={{ height: "27.6rem" }}
          >
            <div
              style={
                !mobile
                  ? { marginLeft: "19rem", width: "50vw" }
                  : { width: "100%" }
              }
            >
              <h3 className="text-center text-md-left ">
                Frequently Asked Questions
              </h3>
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
              <div className="d-flex align-items-center px-2 px-md-0">
                <Input
                  name="search"
                  onChange={(e) => setQuery(e.target.value)}
                  className="input-white"
                />
                <button className="btn btn-primary ml-3" style={btnStyle}>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div
        className="container"
        style={!mobile ? { padding: "0 12rem" } : { marginTop: "5rem" }}
      >
        <br />
        <Accordion />
        <br />
        <br />
      </div>
    </OtherLinksContainer>
  );
};

export default FaqPage;

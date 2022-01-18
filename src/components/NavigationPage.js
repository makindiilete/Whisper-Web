import React from "react";
import { Menu } from "antd";
// import "../assets/css/navigation.css";
import { useHistory, useLocation } from "react-router-dom";

const NavigationPage = (props) => {
  const history = useHistory();
  let location = useLocation();
  const { pathname } = location;
  const current = pathname.split("/")[1];

  return (
    <section className="nav">
      <div className="card">
        <p>Navigation</p>
      </div>
    </section>
  );
};

export default NavigationPage;

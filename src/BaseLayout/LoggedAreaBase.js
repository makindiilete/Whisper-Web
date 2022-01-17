import React, { useContext, useEffect, useState } from "react";
import { Layout } from "antd";
import ErrorBoundary from "../Utils/ErrorBoundary";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../Utils/context";
import NavigationPage from "../components/NavigationPage";
import logo from "../assets/images/WhisperLogo.svg";
import routes from "../routes";
import useMobile from "../hooks/useMobile";

const { Sider, Content } = Layout;
const LoggedAreaBase = ({ children }) => {
  const history = useHistory();
  const mobile = useMobile();
  const { user, setUser } = useContext(AuthContext);
  let location = useLocation();
  const { pathname } = location;
  const current = pathname.split("/")[1];
  const [path, setPath] = useState(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!user) {
    console.log("token not found");
    history.push("/");
    return null;
  } else {
    return (
      <div
        style={{
          minHeight: "100vh",
        }}
      > <ErrorBoundary>
        <NavigationPage />
        <div
            style={{
              marginTop: "13rem",
              marginLeft: "-4rem",
            }}
        >
          {children}
        </div>
      </ErrorBoundary>
      </div>
    );
  }
};

export default LoggedAreaBase;

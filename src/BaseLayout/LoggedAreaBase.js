import React, { useEffect, useState } from "react";
import ErrorBoundary from "../Utils/ErrorBoundary";
import { useHistory, useLocation } from "react-router-dom";
import NavigationPage from "../components/NavigationPage";
import routes from "../routes";
import useMobile from "../hooks/useMobile";

const LoggedAreaBase = ({ children }) => {
  const history = useHistory();
  const mobile = useMobile();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  let location = useLocation();
  const { pathname } = location;
  const current = pathname.split("/")[1];
  const [path, setPath] = useState(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!user) {
    history.push(routes.login);
    return null;
  } else {
    return (
      <div
        style={{
          minHeight: "100vh",
        }}
      >
        <ErrorBoundary>
          <NavigationPage />
          <div>{children}</div>
        </ErrorBoundary>
      </div>
    );
  }
};

export default LoggedAreaBase;

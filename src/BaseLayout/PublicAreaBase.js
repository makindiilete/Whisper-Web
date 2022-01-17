import React, { useEffect } from "react";
import ErrorBoundary from "../Utils/ErrorBoundary";
import NavigationPage from "../components/NavigationPage";
import { useLocation } from "react-router-dom";

const PublicAreaBase = ({ children }) => {
  let location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div>
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  );
};

export default PublicAreaBase;

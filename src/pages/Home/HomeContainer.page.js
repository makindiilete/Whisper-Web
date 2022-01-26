import React, { useEffect, useState } from "react";
import "../../assets/css/Home.css";

export function HomeContainerPage({ children }) {
  return <div className="container-fluid provider-home">{children}</div>;
}

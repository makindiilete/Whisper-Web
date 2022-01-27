import React, { useEffect, useState } from "react";
import noData from "../assets/images/SVG/empty.svg";

export function NoData({ text }) {
  const [,] = useState();
  useEffect(() => {}, []);
  return (
    <>
      <div className="container-fluid">
        <div
          className="d-flex flex-column justify-content-center"
          style={{ height: "80vh" }}
        >
          <div>
            <div className="d-flex justify-content-center">
              <img src={noData} className="img-fluid w-25" alt="" />
            </div>
            {/* /.d-flex justify-content-center */}
            <br />
            <p className="text-center font-weight-bold">{text}</p>
          </div>
        </div>
      </div>
      {/* /.container-fluid */}
    </>
  );
}

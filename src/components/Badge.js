import React, { useEffect, useState } from "react";

export function Badge({ text }) {
  function calcColor() {
    let textLength = text?.length;
    if (textLength <= 3) {
      return "primary";
    }
    if (textLength <= 5) {
      return "secondary";
    }
    if (textLength <= 7) {
      return "tertiary";
    }
    if (textLength <= 9) {
      return "success";
    } else {
      return "primary";
    }
  }

  return (
    <span
      className={`badges ${
        calcColor() === "primary"
          ? "badges-primary"
          : calcColor() === "secondary"
          ? "badges-secondary"
          : calcColor() === "success"
          ? "badges-success"
          : "badges-tertiary"
      } `}
    >
      <h5 className="padding-none">{text}</h5>
    </span>
  );
}

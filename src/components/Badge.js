import React, { useEffect, useState } from "react";

export function Badge({ text }) {
  function calcColor() {
    switch (text?.toString()?.toLowerCase()) {
      case "companion":
        return "primary";
      case "xrated":
        return "secondary";
      case "average":
        return "primary";
      case "cigarette":
        return "secondary";
      case "vodka":
        return "tertiary";
      default:
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
          : "badges-tertiary"
      } `}
    >
      <h5 className="padding-none">{text}</h5>
    </span>
  );
}

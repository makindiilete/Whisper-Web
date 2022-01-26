import React, { useEffect, useState } from "react";

export function Badge({ text, type = "primary" }) {
  return (
    <span
      className={`badges ${
        type === "primary"
          ? "badges-primary"
          : type === "secondary"
          ? "badges-secondary"
          : "badges-tertiary"
      } `}
    >
      <h5 className="padding-none">{text}</h5>
    </span>
  );
}

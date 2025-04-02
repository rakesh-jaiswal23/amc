"use client";
import React from "react";

const UspButton = ({ usp, isActive, index, handleUSPClick }) => {
  return (
    <li className="nav-item usp_nav_item" role="presentation">
      <button
        className={isActive ? "nav-link active" : "nav-link"}
        id={`pills-job-tab${index}`}
        onClick={() => handleUSPClick(usp)}
        type="button"
        role="tab"
        aria-controls={`#pills-job${index}`}
        aria-selected="true"
        style={{ marginBottom: 15 }}
      >
        {usp.title}
      </button>
    </li>
  );
};

export default UspButton;

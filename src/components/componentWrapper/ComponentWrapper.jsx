import React from "react";
import SideNav from "../sideNav/SideNav";

function ComponentWrapper({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <SideNav />
      <div
        style={{
          width: "calc(100vw - 160px",
          height: "100%",
          margin: "auto"
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default ComponentWrapper;

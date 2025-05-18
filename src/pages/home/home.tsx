import React from "react";
import "./home.scss";

export default function Home() {
  return (
    <React.Fragment>
      <h2 className={"content-block"}>Home</h2>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <div className={"logos-container"}></div>
        </div>
      </div>
    </React.Fragment>
  );
}

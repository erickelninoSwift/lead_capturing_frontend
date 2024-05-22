import React from "react";

import { Outlet } from "react-router-dom";

const Applayout = () => {
  return (
    <div className="m-[50px]">
      <Outlet />
    </div>
  );
};

export default Applayout;

import React from "react";

import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const isRoles = localStorage.getItem("role");

  return isRoles === "Admin" ? <Outlet /> : <Navigate to="/" />;
}

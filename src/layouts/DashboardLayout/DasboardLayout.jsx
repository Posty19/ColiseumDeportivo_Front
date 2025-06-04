import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { GlobalContext } from "../../contexts/GlobalContext/GlobalContext";
import DashboardNav from "../DashboardNav/DashboardNav";

const DashBoardLayout = () => {
  const { user } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    !user || user.role !== "admin" ? navigate("/") : null;
  });

  return (
    <div className="dashboardContainer">
      <DashboardNav />
      <Outlet />
    </div>
  );
};
export default DashBoardLayout;

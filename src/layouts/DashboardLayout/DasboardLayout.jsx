import { Outlet } from "react-router-dom";

import DashboardNav from "../DashboardNav/DashboardNav";

const DashBoardLayout = () => {
  return (
    <div className="dashboardContainer">
      <DashboardNav />
      <Outlet />
    </div>
  );
};
export default DashBoardLayout;

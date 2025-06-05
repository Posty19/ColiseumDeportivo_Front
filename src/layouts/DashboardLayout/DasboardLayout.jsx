import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import './DasboardLayout.css';

import { GlobalContext } from "../../contexts/GlobalContext/GlobalContext";
import DashboardNav from "../DashboardNav/DashboardNav";

const DashBoardLayout = () => {
  const { user,saveUser  } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!user.email && storedUser) {
      saveUser(storedUser);
    }
  }, [user.email, saveUser]);

  useEffect(() => {
    !user || user.role !== "admin" ? navigate("/") : null;
  });

  return (
    <div className="dashboardContainer">
      <DashboardNav />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
export default DashBoardLayout;

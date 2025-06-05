import { Outlet } from "react-router-dom";
import "./HomeLayout.css";

import { createContext, useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../contexts/GlobalContext/GlobalContext";
import axiosInstance from "../../api/axiosConfig";

import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useQuery } from "@tanstack/react-query";

export const viewContext = createContext();

const getUsers = async () => {
  const res = await axiosInstance.get("/users/users");
  return res.data;
};

const HomeLayout = () => {
  const [view, setView] = useState(true);
  const { user, saveUser } = useContext(GlobalContext);

  const { data,isLoading,error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 0,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!user.email && storedUser) {
      saveUser(storedUser);
    }
  }, [user.email, saveUser]);

  if (isLoading)
    return (
      <div className="homeContainer">
        <viewContext.Provider value={{ setView }}>
          <NavBar />

          <Footer />
        </viewContext.Provider>
      </div>
    );
    if(error) console.log(error);
  return (
    <div className="homeContainer">
      <viewContext.Provider value={{ setView }}>
        {view ? <NavBar /> : null}
        <Outlet />
        {view ? <Footer /> : null}
      </viewContext.Provider>
    </div>
  );
};
export default HomeLayout;

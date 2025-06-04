import { Outlet } from "react-router-dom";

import { createContext, useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../contexts/GlobalContext/GlobalContext";

import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

export const viewContext = createContext();

const HomeLayout = () => {
  const [view, setView] = useState(true);
  const { user, saveUser } = useContext(GlobalContext);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!user.email && storedUser) {
      saveUser(storedUser);
    }
  }, [user.email, saveUser]);

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

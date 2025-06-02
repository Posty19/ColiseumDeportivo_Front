import { Outlet } from "react-router-dom";

import { createContext, useState } from "react";

import NavBar from "../NavBar/NavBar";
import Footer from '../Footer/Footer';

export const viewContext = createContext();

const HomeLayout = () => {
  const [view, setView] = useState(true);
  

  return (
    <div className="homeContainer">
      <viewContext.Provider value={{setView}}>
        {view?<NavBar />:null}
        <Outlet />
        {view?<Footer />:null}
      </viewContext.Provider>
    </div>
  );
};
export default HomeLayout;

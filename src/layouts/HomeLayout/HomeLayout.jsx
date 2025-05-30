import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { useEffect } from "react";

const HomeLayout = () => {
    useEffect(()=>{
        console.log('coso creado');
    },[]);
  return (
    <div className="homeContainer">
      <NavBar />
      <h1>Contenido de prueba</h1>
      <Outlet />
    </div>
  );
};
export default HomeLayout;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GlobalProvider } from "./contexts/GlobalContext/GlobalContext";

import HomeLayout from "./layouts/HomeLayout/HomeLayout";

import DashBoardLayout from "./layouts/DashboardLayout/DasboardLayout";
import DashboardUsers from "./views/DashboardUsers/DashboardUsers";
import DashboardArticles from "./views/DashboardArticles/DashboardArticles";
import DashboardNotables from "./views/DashboardNotables/DashboardNotables";

import "./App.css";

function App() {
  /*  
    rutas:
      home
      articulos => coments
      personajes
      contacto
      signIn/Cuenta
      NotFound 404
      dashboard => protegidas
        dashboard home
        CRUD articulos
        CRUD personajes
    
    layouts:
      home
      dasboard
      login? => layout o ternario para ocultar nav/footer

    components:
      formulario
        input
        button
      card 
        contenido
        errores => modal
      content => pensar nombre mejor
        notable?
        article?

    estado global:
      datos de user => cargar al logIn
      artigulos => cargar al entrar en la pagina por primmera vez
      personajes => cargar al entrar en la pagina por primmera vez
      crew => => cargar al entrar en la pagina por primmera vez
      variables necesarias
  */

  return (
      <GlobalProvider>
        <BrowserRouter>
          <Route element={<HomeLayout />}>
            {/* comentario para evitar que el formateo automatico de problemas */}
          </Route>
          <Route path="/dashboard" element={<DashBoardLayout />}>
            <Route path="Users" element={<DashboardUsers />} />
            <Route path="Articles" element={<DashboardArticles />} />
            <Route path="Notables" element={<DashboardNotables />} />
          </Route>
        </BrowserRouter>
      </GlobalProvider>
  );
}

export default App;

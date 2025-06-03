import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { GlobalProvider } from "./contexts/GlobalContext/GlobalContext";

import HomeLayout from "./layouts/HomeLayout/HomeLayout";
import Home from "./views/Home/Home";
import Sesion from "./views/Sesion/Sesion";
import User from "./views/user/User";
import ArticlesList from "./views/ArticlesList/ArticlesList";
import Notables from "./views/Notables/Notables";

import DashBoardLayout from "./layouts/DashboardLayout/DasboardLayout";
import DashboardUsers from "./views/DashboardUsers/DashboardUsers";
import DashboardArticles from "./views/DashboardArticles/DashboardArticles";
import DashboardNotables from "./views/DashboardNotables/DashboardNotables";

import "./App.css";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<HomeLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/sesion" element={<Sesion />} />
              <Route path="/user" element={<User />} />
              <Route path="/articles" element={<ArticlesList />} />
              <Route path="/notables" element={<Notables />} />
            </Route>
            <Route path="/dashboard" element={<DashBoardLayout />}>
              <Route path="Users" element={<DashboardUsers />} />
              <Route path="Articles" element={<DashboardArticles />} />
              <Route path="Notables" element={<DashboardNotables />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </QueryClientProvider>
  );
}

export default App;

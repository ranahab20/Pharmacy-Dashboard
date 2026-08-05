import React from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Home from "../pages/Home/Home";
import { Outlet } from 'react-router-dom';
import "./MainLayout.css"

const MainLayout = () => {
  return (
    <>

      <Header />

      <div className="layout">

        <main className="content">
          <Outlet />
        </main>
        <Sidebar />
       
      </div>
    </>
  );
};

export default MainLayout;

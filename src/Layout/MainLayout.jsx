import React from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from 'react-router-dom';

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

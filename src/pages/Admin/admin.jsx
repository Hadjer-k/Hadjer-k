// src/pages/Admin/Admin.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardPage from "./dashbord";
import Statistique from "./statistique";
import NonDef from "./nondef"; // ✅ page Non-Défaillants
import Defaillants from "./defaillant"; // ✅ nouvelle page Défaillants

const Admin = () => {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar onSelectPage={setActivePage} activePage={activePage} />

      {/* Charger la page choisie */}
      {activePage === "dashboard" && <DashboardPage />}
      {activePage === "defaillants" && <Defaillants />} {/* ✅ affiche Défaillants */}
      {activePage === "nonDefaillants" && <NonDef />}   {/* ✅ affiche Non-Défaillants */}
      {activePage === "statistique" && <Statistique />}
    </div>
  );
};

export default Admin;

// src/components/Sidebar.jsx
import React from "react";

const Sidebar = ({ onSelectPage, activePage }) => {
  const menuItems = [
    { name: "Tableau de bord", key: "dashboard" },
    { name: "Défaillants", key: "defaillants" },
    { name: "Non-Défaillants", key: "nonDefaillants" },
    { name: "Statistique", key: "statistique" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-gray-200 flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-8 text-white">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onSelectPage(item.key)}
            className={`text-left px-4 py-2 rounded-lg transition ${
              activePage === item.key
                ? "bg-gray-700 text-white"
                : "hover:bg-gray-700"
            }`}
          >
            {item.name}
          </button>
        ))}

     <button
  onClick={() => {
    // Si tu stockes un token/session, supprime-le
    localStorage.removeItem("token");

    // Redirection vers la page d'accueil
    window.location.href = "/";
  }}
  className="text-left px-4 py-2 text-red-400 hover:bg-red-700 hover:text-white rounded-lg transition mt-6"
>
  Déconnexion
</button>


      </nav>
    </aside>
  );
};

export default Sidebar;

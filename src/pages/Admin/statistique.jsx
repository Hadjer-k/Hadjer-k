// src/pages/Admin/Statistique.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Statistique = () => {
  // Données fictives
  const defaillantsParMois = [
    { mois: "Jan", defaillants: 5, nonDefaillants: 15 },
    { mois: "Fév", defaillants: 8, nonDefaillants: 12 },
    { mois: "Mar", defaillants: 3, nonDefaillants: 20 },
    { mois: "Avr", defaillants: 10, nonDefaillants: 18 },
  ];

  const globalData = [
    { name: "Défaillants", value: 26 },
    { name: "Non-Défaillants", value: 65 },
    { name: "Relances", value: 12 },
  ];

  const COLORS = ["#EF4444", "#10B981", "#F59E0B"]; // rouge, vert, jaune

  return (
    <div className="flex-1 p-10 space-y-10">
      {/* Titre */}
      {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">
         Tableau de Statistiques
      </h1> */}

      {/* Cartes résumé */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Défaillants</h3>
          <p className="text-3xl font-bold text-red-500">26</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Non-Défaillants</h3>
          <p className="text-3xl font-bold text-green-500">65</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Relances</h3>
          <p className="text-3xl font-bold text-yellow-500">12</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Personnes</h3>
          <p className="text-3xl font-bold text-indigo-600">91</p>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Bar Chart */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Défaillants vs Non-Défaillants (par mois)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={defaillantsParMois}>
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="defaillants" fill="#EF4444" />
              <Bar dataKey="nonDefaillants" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Répartition Globale
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={globalData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {globalData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Statistique;

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

  const COLORS = ["#EF4444", "#10B981", "#F59E0B"];

  return (
    <div className="flex-1 p-6 sm:p-10 space-y-10">
      {/* Cartes résumé */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "Défaillants", value: 26, color: "text-red-500" },
          { label: "Non-Défaillants", value: 65, color: "text-green-500" },
          { label: "Relances", value: 12, color: "text-yellow-500" },
          { label: "Total Personnes", value: 91, color: "text-indigo-600" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl p-4 sm:p-6 text-center"
          >
            <h3 className="text-sm sm:text-lg font-semibold text-gray-700">
              {item.label}
            </h3>
            <p className={`text-2xl sm:text-3xl font-bold ${item.color}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Graphiques (cachés sur petit écran) */}
      <div className="hidden lg:flex flex-col lg:flex-row gap-10">
        {/* Bar Chart */}
        <div className="bg-white shadow-md rounded-xl p-6 flex-1 min-h-[300px]">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Défaillants vs Non-Défaillants (par mois)
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={defaillantsParMois}>
                <XAxis dataKey="mois" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="defaillants" fill="#EF4444" />
                <Bar dataKey="nonDefaillants" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-md rounded-xl p-6 flex-1 min-h-[300px]">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Répartition Globale
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={globalData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
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
    </div>
  );
};

export default Statistique;

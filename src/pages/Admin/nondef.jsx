// src/pages/Admin/NonDefaillants.jsx
import React, { useState } from "react";

const NonDefaillants = () => {
  const [people, setPeople] = useState([
    {
      id: 1,
      nom: "Ahmed",
      prenom: "Ali",
      email: "ahmed.karim@example.com",
      nif: "123456789",
      nis: "987654321",
      c12: true,
      declarationDate: "2025-08-20",
    },
    {
      id: 2,
      nom: "Nadia",
      prenom: "Meziane",
      email: "nadia.meziane@example.com",
      nif: "777888999",
      nis: "111999333",
      c12: true,
      declarationDate: "2025-09-05",
    },
  ]);

  const [search, setSearch] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    nif: "",
    nis: "",
    c12: true,
    declarationDate: new Date().toISOString().split("T")[0],
  });

  // Ouvrir formulaire
  const openForm = () => {
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      nif: "",
      nis: "",
      c12: true,
      declarationDate: new Date().toISOString().split("T")[0],
    });
    setIsFormOpen(true);
  };

  // Soumettre formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNaN(formData.nif) || isNaN(formData.nis)) {
      alert("⚠️ NIF et NIS doivent être numériques !");
      return;
    }

    setPeople([...people, { ...formData, id: Date.now() }]);
    setIsFormOpen(false);
  };

  // Supprimer
  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette personne ?")) {
      setPeople(people.filter((p) => p.id !== id));
    }
  };

  // Recherche (nom, prénom, email, nif, nis, date)
  const filteredPeople = people.filter(
    (p) =>
      p.nom.toLowerCase().includes(search.toLowerCase()) ||
      p.prenom.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.nif.includes(search) ||
      p.nis.includes(search) ||
      p.declarationDate.includes(search)
  );

  // Regrouper par mois
  const groupByMonth = (list) => {
    const grouped = {};
    list.forEach((p) => {
      const month = new Date(p.declarationDate).toLocaleString("fr-FR", {
        month: "long",
        year: "numeric",
      });
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(p);
    });
    return grouped;
  };

  const groupedPeople = groupByMonth(filteredPeople);

  return (
    <div className="flex-1 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Liste des Non-Défaillants
        </h1>
        <button
          onClick={openForm}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          ➕ Ajouter Personne
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher par nom, prénom, email, NIF, NIS ou date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg shadow-sm"
        />
      </div>

      {/* Tableau groupé par mois */}
      {Object.keys(groupedPeople).map((month) => (
        <div key={month} className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            📅 {month}
          </h2>
          <div className="bg-white shadow-lg rounded-xl p-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Nom</th>
                  <th className="p-3 text-left">Prénom</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Date Déclaration</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupedPeople[month].map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{p.id}</td>
                    <td className="p-3">{p.nom}</td>
                    <td className="p-3">{p.prenom}</td>
                    <td className="p-3">{p.email}</td>
                    <td className="p-3">{p.declarationDate}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => setSelectedPerson(p)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      >
                        Voir
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Modal Voir */}
      {selectedPerson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Infos de {selectedPerson.nom} {selectedPerson.prenom}
            </h2>
            <p><strong>Email:</strong> {selectedPerson.email}</p>
            <p><strong>NIF:</strong> {selectedPerson.nif}</p>
            <p><strong>NIS:</strong> {selectedPerson.nis}</p>
            <p><strong>Date déclaration:</strong> {selectedPerson.declarationDate}</p>
            <p><strong>Statut:</strong> ✅ Non-Défaillant</p>
            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedPerson(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ajouter */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Ajouter Personne</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="text"
                name="prenom"
                placeholder="Prénom"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="text"
                name="nif"
                placeholder="NIF"
                value={formData.nif}
                onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="text"
                name="nis"
                placeholder="NIS"
                value={formData.nis}
                onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="date"
                name="declarationDate"
                value={formData.declarationDate}
                onChange={(e) =>
                  setFormData({ ...formData, declarationDate: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NonDefaillants;

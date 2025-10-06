// src/pages/Admin/DashboardPage.jsx
import React, { useState } from "react";

const DashboardPage = () => {
  const [people, setPeople] = useState([
    {
      id: 1,
      nom: "Ahmed",
      prenom: "Ali",
      nif: "123456789",
      nis: "987654321",
      c12: true,
      declarationDate: "2025-08-20",
      email: "ahmed.karim@example.com",
    },
    {
      id: 2,
      nom: "Sara",
      prenom: "Khelifa",
      nif: "555666777",
      nis: "111222333",
      c12: false,
      declarationDate: "2025-09-10",
      email: "sara.khelifa@example.com",
    },
    {
      id: 3,
      nom: "Rafik",
      prenom: "Brahimi",
      nif: "222333444",
      nis: "444555666",
      c12: false,
      declarationDate: "2025-07-15",
      email: "rafik.brahimi@example.com",
    },
    {
      id: 5,
      nom: "Nadia",
      prenom: "Meziane",
      nif: "777888999",
      nis: "111999333",
      c12: true,
      declarationDate: "2025-09-05",
      email: "nadia.meziane@example.com",
    },
    {
      id: 6,
      nom: "Karim",
      prenom: "Said",
      nif: "444222111",
      nis: "222333111",
      c12: false,
      declarationDate: "2025-09-22",
      email: "karim.said@example.com",
    },
  ]);

  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editPerson, setEditPerson] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    nif: "",
    nis: "",
    email: "",
    c12: false,
    declarationDate: "",
  });

  // Déterminer statut
  const getStatus = (p) => {
    if (p.c12) return "Déclaré";
    const declarationDate = new Date(p.declarationDate);
    const now = new Date();
    const diff = (now - declarationDate) / (1000 * 60 * 60 * 24);
    if (diff > 30) return "Mise en demeure";
    return "En attente";
  };

  // Ouvrir formulaire
  const openForm = (person = null) => {
    if (person) {
      setEditPerson(person);
      setFormData(person);
    } else {
      setEditPerson(null);
      setFormData({
        nom: "",
        prenom: "",
        nif: "",
        nis: "",
        email: "",
        c12: false,
        declarationDate: new Date().toISOString().split("T")[0],
      });
    }
    setIsFormOpen(true);
  };

  // Input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editPerson) {
      setPeople(
        people.map((p) =>
          p.id === editPerson.id ? { ...formData, id: p.id } : p
        )
      );
    } else {
      setPeople([...people, { ...formData, id: Date.now() }]);
    }
    setIsFormOpen(false);
  };

  // Suppression
  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette personne ?")) {
      setPeople(people.filter((p) => p.id !== id));
    }
  };

  // 🔥 Recherche + filtre par mois
  const filteredPeople = people.filter((p) => {
    const matchSearch =
      p.nom.toLowerCase().includes(search.toLowerCase()) ||
      p.prenom.toLowerCase().includes(search.toLowerCase()) ||
      p.declarationDate.includes(search) ||
      (p.email && p.email.toLowerCase().includes(search.toLowerCase()));

    const matchMonth = month
      ? new Date(p.declarationDate).getMonth() + 1 === parseInt(month)
      : true;

    return matchSearch && matchMonth;
  });

  return (
    <div className="flex-1 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Bienvenue, Admin</h1>
        <button
          onClick={() => openForm()}
          className="bg-[#521E9B] text-white px-4 py-2 rounded-lg hover:bg-[#3e1678] transition"
        >
          Ajouter Personne
        </button>
      </div>

      {/* Recherche + filtre par mois */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher par nom, prénom, email ou date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border px-4 py-2 rounded-lg shadow-sm"
        />
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border px-4 py-2 rounded-lg shadow-sm"
        >
          <option value="">-- Tous les mois --</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("fr-FR", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      {/* Tableau */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Liste des Personnes
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Prénom</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Statut</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPeople.length > 0 ? (
              filteredPeople.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="p-3">{p.id}</td>
                  <td className="p-3">{p.nom}</td>
                  <td className="p-3">{p.prenom}</td>
                  <td className="p-3">{p.email || "—"}</td>
                  <td className="p-3">
                    {getStatus(p) === "Déclaré" && (
                      <span className="px-2 py-1 bg-green-200 text-green-600 rounded-lg text-sm">
                        ✅ Déclaré
                      </span>
                    )}
                    {getStatus(p) === "En attente" && (
                      <span className="px-2 py-1 bg-yellow-200 text-yellow-600 rounded-lg text-sm">
                        ⏳ En attente
                      </span>
                    )}
                    {getStatus(p) === "Mise en demeure" && (
                      <span className="px-2 py-1 bg-red-200 text-red-600 rounded-lg text-sm">
                        ⚠ Mise en demeure
                      </span>
                    )}
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => setSelectedPerson(p)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      Voir
                    </button>
                    <button
                      onClick={() => openForm(p)}
                      className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  Aucun résultat trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Voir */}
      {selectedPerson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Infos de {selectedPerson.nom} {selectedPerson.prenom}
            </h2>
            <p><strong>NIF:</strong> {selectedPerson.nif}</p>
            <p><strong>NIS:</strong> {selectedPerson.nis}</p>
            <p><strong>Email:</strong> {selectedPerson.email || "—"}</p>
            <p><strong>Date déclaration:</strong> {selectedPerson.declarationDate}</p>
            <p><strong>Statut:</strong> {getStatus(selectedPerson)}</p>
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

      {/* Modal Formulaire */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editPerson ? "Modifier Personne" : "Ajouter Personne"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="text"
                name="prenom"
                placeholder="Prénom"
                value={formData.prenom}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="text"
                name="nif"
                placeholder="NIF"
                value={formData.nif}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="text"
                name="nis"
                placeholder="NIS"
                value={formData.nis}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="c12"
                  checked={formData.c12}
                  onChange={handleChange}
                />
                C12 déclaré ?
              </label>
              <input
                type="date"
                name="declarationDate"
                value={formData.declarationDate}
                onChange={handleChange}
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
                  className="bg-[#521E9B] text-white px-4 py-2 rounded-lg hover:bg-[#3e1678]"
                >
                  {editPerson ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;

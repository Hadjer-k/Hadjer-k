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

  const getStatus = (p) => {
    if (p.c12) return "Déclaré";
    const declarationDate = new Date(p.declarationDate);
    const now = new Date();
    const diff = (now - declarationDate) / (1000 * 60 * 60 * 24);
    if (diff > 30) return "Mise en demeure";
    return "En attente";
  };

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

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

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette personne ?")) {
      setPeople(people.filter((p) => p.id !== id));
    }
  };

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
    <div className="flex-1 p-4 sm:p-6 md:p-10 overflow-x-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
       
        <button
          onClick={() => openForm()}
          className="bg-[#521E9B] text-white px-3 py-2 rounded-lg text-sm sm:text-base hover:bg-[#3e1678] transition w-full sm:w-auto"
        >
          Ajouter Personne
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border px-3 py-2 rounded-lg shadow-sm text-sm"
        />
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border px-3 py-2 rounded-lg shadow-sm text-sm"
        >
          <option value="">-- Tous les mois --</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("fr-FR", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 overflow-x-auto">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
          Liste des Personnes
        </h2>
        <table className="min-w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-2 sm:p-3 text-left">ID</th>
              <th className="p-2 sm:p-3 text-left">Nom</th>
              <th className="p-2 sm:p-3 text-left">Prénom</th>
              <th className="p-2 sm:p-3 text-left">Email</th>
              <th className="p-2 sm:p-3 text-left">Statut</th>
              <th className="p-2 sm:p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPeople.length > 0 ? (
              filteredPeople.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="p-2 sm:p-3">{p.id}</td>
                  <td className="p-2 sm:p-3">{p.nom}</td>
                  <td className="p-2 sm:p-3">{p.prenom}</td>
                  <td className="p-2 sm:p-3">{p.email || "—"}</td>
                  <td className="p-2 sm:p-3">
                    {getStatus(p) === "Déclaré" && (
                      <span className="px-2 py-1 bg-green-200 text-green-600 rounded-lg text-xs sm:text-sm">
                        ✅ Déclaré
                      </span>
                    )}
                    {getStatus(p) === "En attente" && (
                      <span className="px-2 py-1 bg-yellow-200 text-yellow-600 rounded-lg text-xs sm:text-sm">
                        ⏳ En attente
                      </span>
                    )}
                    {getStatus(p) === "Mise en demeure" && (
                      <span className="px-2 py-1 bg-red-200 text-red-600 rounded-lg text-xs sm:text-sm">
                        ⚠ Mise en demeure
                      </span>
                    )}
                  </td>
                  <td className="p-2 sm:p-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedPerson(p)}
                      className="px-2 py-1 bg-blue-500 text-white rounded-lg text-xs sm:text-sm hover:bg-blue-600 transition"
                    >
                      Voir
                    </button>
                    <button
                      onClick={() => openForm(p)}
                      className="px-2 py-1 bg-yellow-400 text-white rounded-lg text-xs sm:text-sm hover:bg-yellow-500 transition"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-lg text-xs sm:text-sm hover:bg-red-600 transition"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-[90%] sm:w-96 shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold mb-4">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-[90%] sm:w-96 shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold mb-4">
              {editPerson ? "Modifier Personne" : "Ajouter Personne"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
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
              <label className="flex items-center gap-2 text-sm sm:text-base">
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
                  className="bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 text-sm sm:text-base"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-[#521E9B] text-white px-3 py-2 rounded-lg hover:bg-[#3e1678] text-sm sm:text-base"
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
